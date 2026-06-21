/**
 * Battery & Solar Panel Calculator for MeshCore Solar Nodes
 * 
 * Estimates battery bank size and solar panel requirements based on
 * device current draw, battery voltage range, and local solar conditions
 * for the Sorocaba region.
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
        'peak-hours': 3.4
    };

    const DEVICE_CURRENT = {
        'esp32': 80,
        'nrf52840': 10
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

    function calculate() {
        const deviceType = document.getElementById('device-type').value;
        const currentDraw = parseFloat(document.getElementById('current-draw').value);
        const voltageMax = parseFloat(document.getElementById('voltage-max').value);
        const voltageMin = parseFloat(document.getElementById('voltage-min').value);
        const darkDays = parseInt(document.getElementById('dark-days').value);
        const sunnyDays = parseInt(document.getElementById('sunny-days').value);
        const peakHours = parseFloat(document.getElementById('peak-hours').value);

        // Validation
        const errors = [];
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

        const errorBox = document.getElementById('error-message');
        const resultBox = document.getElementById('result');

        if (errors.length > 0) {
            errorBox.innerHTML = errors.map(e => '<span class="error-item">⚠️ ' + e + '</span>').join('');
            errorBox.style.display = 'block';
            resultBox.style.display = 'none';
            return;
        }

        errorBox.style.display = 'none';

        // SOC estimation
        const socMax = estimateSOC(voltageMax);
        const socMin = estimateSOC(voltageMin);
        const socDelta = socMax - socMin;

        if (socDelta <= 0) {
            errorBox.innerHTML = '<span class="error-item">⚠️ A faixa de tensão informada resulta em uma faixa útil de SOC nula ou negativa. Verifique os valores de tensão.</span>';
            errorBox.style.display = 'block';
            resultBox.style.display = 'none';
            return;
        }

        // Battery bank capacity (mAh)
        const batteryCapacity = (currentDraw * 24 * darkDays) / (socDelta / 100);

        // Solar panel current (mA): must recharge the battery bank AND power the device
        // during the sunny recovery days
        const energyToRecharge = batteryCapacity * (socDelta / 100) + currentDraw * 24 * sunnyDays;
        const solarCurrent = energyToRecharge / (peakHours * sunnyDays);

        // Solar panel power (W) at typical panel voltages
        const solarPower5V = solarCurrent * 5 / 1000;
        const solarPower6V = solarCurrent * 6 / 1000;

        // Display results
        document.getElementById('battery-capacity').textContent = formatNumber(batteryCapacity, 0) + ' mAh';
        document.getElementById('solar-current').textContent = formatNumber(solarCurrent, 0) + ' mA';
        // document.getElementById('solar-power-5v').textContent = formatNumber(solarPower5V, 1) + ' W';
        // document.getElementById('solar-power-6v').textContent = formatNumber(solarPower6V, 1) + ' W';

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

        document.getElementById('error-message').style.display = 'none';
        document.getElementById('result').style.display = 'none';
    }

    function onDeviceTypeChange() {
        const deviceType = document.getElementById('device-type').value;
        const currentDrawInput = document.getElementById('current-draw');
        if (DEVICE_CURRENT[deviceType] !== undefined) {
            currentDrawInput.value = DEVICE_CURRENT[deviceType];
        }
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        const calcBtn = document.getElementById('calculate-btn');
        const resetBtn = document.getElementById('reset-btn');
        const deviceTypeSelect = document.getElementById('device-type');

        if (calcBtn) calcBtn.addEventListener('click', calculate);
        if (resetBtn) resetBtn.addEventListener('click', resetDefaults);
        if (deviceTypeSelect) deviceTypeSelect.addEventListener('change', onDeviceTypeChange);

        // Auto-calculate on page load
        calculate();
    });
})();
