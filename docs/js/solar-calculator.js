/**
 * Battery & Solar Panel Calculator for MeshCore Solar Nodes
 * 
 * Estimates battery bank size and solar panel requirements based on
 * device current draw, battery voltage range, and local solar conditions.
 * Supports automatic estimation of dark days via NASA POWER API and
 * an interactive Leaflet.js map.
 */

(function () {
    'use strict';

    // Default values
    const DEFAULTS = {
        'device-type': 'esp32',
        'current-draw': 80,
        'voltage-max': 4.2,
        'voltage-min': 3.6,
        'dark-days': 7,
        'sunny-days': 3,
        'peak-hours': 3.4,
        'dark-days-mode': 'manual'
    };

    const DEVICE_CURRENT = {
        'esp32': 80,
        'nrf52840': 10
    };

    // Leaflet map instance and marker
    let map = null;
    let marker = null;

    // NASA POWER API endpoint
    const NASA_POWER_URL = 'https://power.larc.nasa.gov/api/temporal/climatology/point';

    // Month names in Portuguese
    const MONTH_NAMES = {
        'JAN': 'janeiro', 'FEB': 'fevereiro', 'MAR': 'março',
        'APR': 'abril', 'MAY': 'maio', 'JUN': 'junho',
        'JUL': 'julho', 'AUG': 'agosto', 'SEP': 'setembro',
        'OCT': 'outubro', 'NOV': 'novembro', 'DEC': 'dezembro'
    };

    /**
     * Estimate State of Charge (%) from battery voltage using
     * a 5th-degree polynomial approximation.
     * Valid for V between 3.03 V and 4.18 V.
     * Outside that range, clamp to 0 or 100.
     */
    function estimateSOC(voltage) {
        if (voltage >= 4.18) return 100;
        if (voltage <= 3.03) return 0;

        const V = voltage;
        const soc = 287.39 * Math.pow(V, 5)
            - 5181.73 * Math.pow(V, 4)
            + 37185.21 * Math.pow(V, 3)
            - 132703.14 * Math.pow(V, 2)
            + 235499.32 * V
            - 166288.13;

        return Math.max(0, Math.min(100, soc));
    }

    /**
     * Format a number with thousands separator and fixed decimal places
     */
    function formatNumber(value, decimals) {
        const parts = value.toFixed(decimals).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return parts.join(',');
    }

    /**
     * Initialize the Leaflet map centered on Brazil
     */
    function initMap() {
        if (map !== null) return;

        const mapContainer = document.getElementById('dark-days-map');
        if (!mapContainer) return;

        map = L.map('dark-days-map').setView([-14.235, -51.925], 4);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19
        }).addTo(map);

        map.on('click', onMapClick);

        // Force a resize in case the container was hidden when initialized
        setTimeout(function () {
            map.invalidateSize();
        }, 100);
    }

    /**
     * Find the critical month (highest value) and its value
     */
    function getCriticalMonth(monthlyData, fillValue) {
        let maxVal = -Infinity;
        let maxMonth = '';
        for (const [month, value] of Object.entries(monthlyData)) {
            if (month === 'ANN') continue;
            if (value === fillValue) continue;
            if (value > maxVal) {
                maxVal = value;
                maxMonth = month;
            }
        }
        return { month: maxMonth, value: maxVal };
    }

    /**
     * Handle map click: fetch NASA POWER data for clicked coordinates
     */
    function onMapClick(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // Update or create marker
        if (marker) {
            marker.setLatLng(e.latlng);
        } else {
            marker = L.marker(e.latlng).addTo(map);
        }

        // Update status — loading
        var mapStatus = document.getElementById('map-status');
        mapStatus.textContent = 'Consultando dados da NASA para ' + lat.toFixed(4) + ', ' + lng.toFixed(4) + '…';
        mapStatus.className = 'form-hint map-status-loading';

        // Fetch from NASA POWER API
        var params = new URLSearchParams({
            parameters: 'MAX_EQUIV_NO_SUN_DAYS',
            community: 'RE',
            longitude: lng.toString(),
            latitude: lat.toString(),
            format: 'JSON'
        });

        fetch(NASA_POWER_URL + '?' + params.toString())
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Erro na consulta à API da NASA (código ' + response.status + ').');
                }
                return response.json();
            })
            .then(function (data) {
                var monthlyData = data.properties.parameter.MAX_EQUIV_NO_SUN_DAYS;
                var fillValue = data.header.fill_value || -999;

                // Find the maximum value across all months
                var critical = getCriticalMonth(monthlyData, fillValue);

                if (critical.value <= 0 || !isFinite(critical.value)) {
                    throw new Error('Dados indisponíveis para a localização selecionada.');
                }

                // Round up to nearest integer
                var darkDays = Math.ceil(critical.value);

                // Update the input field
                document.getElementById('dark-days').value = darkDays;

                // Update status — success
                mapStatus.textContent = 'Localização: ' + lat.toFixed(4) + ', ' + lng.toFixed(4)
                    + ' — Estimativa: ' + darkDays + ' dias sem sol'
                    + ' (pior mês: ' + (MONTH_NAMES[critical.month] || critical.month)
                    + ', com ' + critical.value.toFixed(1) + ' dias)';
                mapStatus.className = 'form-hint map-status-success';
            })
            .catch(function (error) {
                mapStatus.textContent = 'Falha ao obter dados: ' + error.message;
                mapStatus.className = 'form-hint map-status-error';
            });
    }

    /**
     * Toggle between manual and estimate modes for dark days
     */
    function onDarkDaysModeChange() {
        var mode = document.querySelector('input[name="dark-days-mode"]:checked').value;
        var darkDaysInput = document.getElementById('dark-days');
        var mapContainer = document.getElementById('map-container');

        if (mode === 'estimate') {
            darkDaysInput.disabled = true;
            mapContainer.style.display = 'block';
            initMap();
            // Invalidate map size after display change
            setTimeout(function () {
                if (map) map.invalidateSize();
            }, 50);
        } else {
            darkDaysInput.disabled = false;
            mapContainer.style.display = 'none';
        }
    }

    function calculate() {
        var deviceType = document.getElementById('device-type').value;
        var currentDraw = parseFloat(document.getElementById('current-draw').value);
        var voltageMax = parseFloat(document.getElementById('voltage-max').value);
        var voltageMin = parseFloat(document.getElementById('voltage-min').value);
        var darkDays = parseInt(document.getElementById('dark-days').value);
        var sunnyDays = parseInt(document.getElementById('sunny-days').value);
        var peakHours = parseFloat(document.getElementById('peak-hours').value);

        // Validation
        var errors = [];
        if (isNaN(currentDraw) || currentDraw <= 0) {
            errors.push('O consumo médio do dispositivo deve ser um valor positivo.');
        }
        if (isNaN(voltageMax) || isNaN(voltageMin)) {
            errors.push('As tensões da bateria devem ser valores numéricos.');
        }
        if (!isNaN(voltageMax) && !isNaN(voltageMin) && voltageMax <= voltageMin) {
            errors.push('A tensão máxima deve ser maior que a tensão mínima.');
        }
        if (isNaN(darkDays) || darkDays <= 0) {
            errors.push('O número de dias sem sol deve ser positivo.');
        }
        if (isNaN(sunnyDays) || sunnyDays <= 0) {
            errors.push('O número de dias de sol deve ser positivo.');
        }
        if (isNaN(peakHours) || peakHours <= 0) {
            errors.push('As horas de pico solar devem ser positivas.');
        }

        var errorBox = document.getElementById('error-message');
        var resultBox = document.getElementById('result');

        if (errors.length > 0) {
            errorBox.innerHTML = errors.map(function (e) { return '<span class="error-item">⚠️ ' + e + '</span>'; }).join('');
            errorBox.style.display = 'block';
            resultBox.style.display = 'none';
            return;
        }

        errorBox.style.display = 'none';

        // SOC estimation
        var socMax = estimateSOC(voltageMax);
        var socMin = estimateSOC(voltageMin);
        var socDelta = socMax - socMin;

        if (socDelta <= 0) {
            errorBox.innerHTML = '<span class="error-item">⚠️ A faixa de tensão informada resulta em uma faixa útil de SOC nula ou negativa. Verifique os valores de tensão.</span>';
            errorBox.style.display = 'block';
            resultBox.style.display = 'none';
            return;
        }

        // Battery bank capacity (mAh)
        var batteryCapacity = (currentDraw * 24 * darkDays) / (socDelta / 100);

        // Solar panel current (mA): must recharge the battery bank AND power the device
        // during the sunny recovery days
        var energyToRecharge = batteryCapacity * (socDelta / 100) + currentDraw * 24 * sunnyDays;
        var solarCurrent = energyToRecharge / (peakHours * sunnyDays);

        // Display results
        document.getElementById('battery-capacity').textContent = formatNumber(batteryCapacity, 0) + ' mAh';
        document.getElementById('solar-current').textContent = formatNumber(solarCurrent, 0) + ' mA';

        document.getElementById('soc-max-value').textContent = formatNumber(socMax, 1) + '%';
        document.getElementById('soc-min-value').textContent = formatNumber(socMin, 1) + '%';
        document.getElementById('soc-delta-value').textContent = formatNumber(socDelta, 1) + '%';

        resultBox.style.display = 'block';
    }

    function resetDefaults() {
        document.getElementById('device-type').value = DEFAULTS['device-type'];
        document.getElementById('current-draw').value = DEFAULTS['current-draw'];
        document.getElementById('voltage-max').value = DEFAULTS['voltage-max'];
        document.getElementById('voltage-min').value = DEFAULTS['voltage-min'];
        document.getElementById('dark-days').value = DEFAULTS['dark-days'];
        document.getElementById('sunny-days').value = DEFAULTS['sunny-days'];
        document.getElementById('peak-hours').value = DEFAULTS['peak-hours'];

        // Reset dark days mode to manual
        var manualRadio = document.querySelector('input[name="dark-days-mode"][value="manual"]');
        if (manualRadio) manualRadio.checked = true;
        onDarkDaysModeChange();

        // Remove marker from map
        if (marker && map) {
            map.removeLayer(marker);
            marker = null;
        }

        // Reset map status
        var mapStatus = document.getElementById('map-status');
        if (mapStatus) {
            mapStatus.textContent = 'Clique no mapa para marcar a localização do repetidor. O valor será estimado automaticamente com dados históricos da NASA.';
            mapStatus.className = 'form-hint';
        }

        document.getElementById('error-message').style.display = 'none';
        document.getElementById('result').style.display = 'none';
    }

    function onDeviceTypeChange() {
        var deviceType = document.getElementById('device-type').value;
        var currentDrawInput = document.getElementById('current-draw');
        if (DEVICE_CURRENT[deviceType] !== undefined) {
            currentDrawInput.value = DEVICE_CURRENT[deviceType];
        }
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        var calcBtn = document.getElementById('calculate-btn');
        var resetBtn = document.getElementById('reset-btn');
        var deviceTypeSelect = document.getElementById('device-type');

        if (calcBtn) calcBtn.addEventListener('click', calculate);
        if (resetBtn) resetBtn.addEventListener('click', resetDefaults);
        if (deviceTypeSelect) deviceTypeSelect.addEventListener('change', onDeviceTypeChange);

        // Dark days mode radio buttons
        var modeRadios = document.querySelectorAll('input[name="dark-days-mode"]');
        modeRadios.forEach(function (radio) {
            radio.addEventListener('change', onDarkDaysModeChange);
        });

        // Auto-calculate on page load
        calculate();
    });
})();
