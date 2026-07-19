/**
 * IATA Airport Map for MeshCore Observers
 *
 * Displays airports on a Leaflet map so users can find the IATA code
 * of their region when configuring a MeshCore observer (set mqtt.iata CODE).
 * Data source: js/airports.csv
 */

(function () {
    'use strict';

    const CSV_URL = '/js/airports.csv';
    const DEFAULT_CENTER = [-23.4777, -47.4901]; // Sorocaba (SOD)
    const DEFAULT_ZOOM = 8;
    const MAX_SEARCH_RESULTS = 30;

    let map = null;
    let markersLayer = null;
    let highlightLayer = null;
    let airports = [];

    /**
     * Parse a single CSV line, handling quoted fields with embedded commas.
     */
    function parseCSVLine(line) {
        const fields = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (inQuotes) {
                if (ch === '"') {
                    if (line[i + 1] === '"') { current += '"'; i++; }
                    else inQuotes = false;
                } else { current += ch; }
            } else {
                if (ch === '"') inQuotes = true;
                else if (ch === ',') { fields.push(current); current = ''; }
                else current += ch;
            }
        }
        fields.push(current);
        return fields;
    }

    /**
     * Parse CSV text into an array of airport objects.
     */
    function parseCSV(text) {
        const lines = text.split(/\r?\n/);
        const headers = parseCSVLine(lines[0]).map(h => h.trim());
        const result = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line) continue;
            const fields = parseCSVLine(line);
            const obj = {};
            headers.forEach((h, idx) => { obj[h] = (fields[idx] || '').trim(); });
            if (!obj.code) continue;
            obj.latitude = parseFloat(obj.latitude);
            obj.longitude = parseFloat(obj.longitude);
            if (isNaN(obj.latitude) || isNaN(obj.longitude)) continue;
            result.push(obj);
        }
        return result;
    }

    function initMap() {
        map = L.map('iata-map', { preferCanvas: true, minZoom: 2, worldCopyJump: true })
            .setView(DEFAULT_CENTER, DEFAULT_ZOOM);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19
        }).addTo(map);
        markersLayer = L.layerGroup().addTo(map);
        highlightLayer = L.layerGroup().addTo(map);
    }

    function isBrazilFilterOn() {
        const el = document.getElementById('iata-brazil-only');
        return el ? el.checked : false;
    }

    function renderMarkers() {
        markersLayer.clearLayers();
        const brazilOnly = isBrazilFilterOn();
        let count = 0;
        for (const a of airports) {
            if (brazilOnly && a.country !== 'BR') continue;
            const isBR = a.country === 'BR';
            L.circleMarker([a.latitude, a.longitude], {
                radius: 4,
                color: isBR ? '#8ecae6' : '#5a5a5a',
                fillColor: isBR ? '#8ecae6' : '#888',
                fillOpacity: 0.7,
                weight: 1
            })
                .bindPopup(buildPopup(a))
                .on('click', function () { selectAirport(a); })
                .addTo(markersLayer);
            count++;
        }
        const countEl = document.getElementById('iata-result-count');
        if (countEl) {
            countEl.textContent = count.toLocaleString('pt-BR') + ' aeroportos no mapa';
        }
    }

    function buildPopup(a) {
        const loc = [a.city, a.state, a.country].filter(Boolean).join(', ');
        return '<div class="iata-popup">' +
            '<div class="iata-popup-code">' + escapeHTML(a.code) + '</div>' +
            '<div class="iata-popup-name">' + escapeHTML(a.name || '—') + '</div>' +
            (loc ? '<div class="iata-popup-loc">' + escapeHTML(loc) + '</div>' : '') +
            '</div>';
    }

    function escapeHTML(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function selectAirport(a) {
        highlightLayer.clearLayers();
        L.circleMarker([a.latitude, a.longitude], {
            radius: 9,
            color: '#fca311',
            weight: 3,
            fillColor: '#fca311',
            fillOpacity: 0.15
        }).addTo(highlightLayer);

        document.getElementById('selected-code').textContent = a.code;
        document.getElementById('selected-icao').textContent = a.icao || '—';
        document.getElementById('selected-name').textContent = a.name || '—';
        const loc = [a.city, a.state, a.country].filter(Boolean).join(', ') || '—';
        document.getElementById('selected-location').textContent = loc;
        document.getElementById('selected-panel').style.display = 'block';
    }

    function panToAirport(a) {
        map.setView([a.latitude, a.longitude], Math.max(map.getZoom(), 10));
        selectAirport(a);
        markersLayer.eachLayer(function (layer) {
            const ll = layer.getLatLng();
            if (Math.abs(ll.lat - a.latitude) < 1e-6 && Math.abs(ll.lng - a.longitude) < 1e-6) {
                layer.openPopup();
            }
        });
    }

    function normalize(str) {
        return (str || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    }

    function search(query) {
        const resultsEl = document.getElementById('iata-search-results');
        if (!resultsEl) return;
        resultsEl.innerHTML = '';
        const q = normalize(query.trim());
        if (!q) { resultsEl.style.display = 'none'; return; }

        const brazilOnly = isBrazilFilterOn();
        const matches = airports
            .filter(a => !brazilOnly || a.country === 'BR')
            .filter(a =>
                normalize(a.code).startsWith(q) ||
                normalize(a.icao).startsWith(q) ||
                normalize(a.city).includes(q) ||
                normalize(a.name).includes(q) ||
                normalize(a.state).includes(q)
            );

        if (matches.length === 0) {
            resultsEl.innerHTML = '<div class="iata-search-empty">Nenhum aeroporto encontrado.</div>';
            resultsEl.style.display = 'block';
            return;
        }

        // Sort: exact IATA match first, then by code
        matches.sort((a, b) => {
            const aExact = normalize(a.code) === q ? 0 : 1;
            const bExact = normalize(b.code) === q ? 0 : 1;
            if (aExact !== bExact) return aExact - bExact;
            return a.code.localeCompare(b.code);
        });

        const shown = matches.slice(0, MAX_SEARCH_RESULTS);
        for (const a of shown) {
            const item = document.createElement('button');
            item.type = 'button';
            item.className = 'iata-search-item';
            const loc = [a.city, a.state, a.country].filter(Boolean).join(', ');
            item.innerHTML =
                '<span class="iata-search-code">' + escapeHTML(a.code) + '</span>' +
                '<span class="iata-search-info">' +
                '<span class="iata-search-name">' + escapeHTML(a.name || a.city || '—') + '</span>' +
                '<span class="iata-search-loc">' + escapeHTML(loc) + '</span>' +
                '</span>';
            item.addEventListener('click', function () {
                panToAirport(a);
                resultsEl.style.display = 'none';
                document.getElementById('iata-search').value = '';
            });
            resultsEl.appendChild(item);
        }
        if (matches.length > MAX_SEARCH_RESULTS) {
            const more = document.createElement('div');
            more.className = 'iata-search-more';
            more.textContent = '+' + (matches.length - MAX_SEARCH_RESULTS) +
                ' outros resultados. Refine a busca.';
            resultsEl.appendChild(more);
        }
        resultsEl.style.display = 'block';
    }

    async function loadAirports() {
        const status = document.getElementById('iata-status');
        try {
            if (status) {
                status.textContent = 'Carregando lista de aeroportos…';
                status.className = 'form-hint map-status-loading';
                status.style.display = 'block';
            }
            const response = await fetch(CSV_URL);
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const text = await response.text();
            airports = parseCSV(text);
            if (status) status.style.display = 'none';
            renderMarkers();
            // Pre-select Sorocaba (SOD)
            const sod = airports.find(a => a.code === 'SOD');
            if (sod) selectAirport(sod);
        } catch (err) {
            console.error('Erro ao carregar aeroportos:', err);
            if (status) {
                status.textContent = 'Não foi possível carregar a lista de aeroportos.';
                status.className = 'form-hint map-status-error';
            }
        }
    }

    function debounce(fn, ms) {
        let t;
        return function () {
            clearTimeout(t);
            const args = arguments;
            t = setTimeout(() => fn.apply(null, args), ms);
        };
    }

    document.addEventListener('DOMContentLoaded', function () {
        initMap();
        loadAirports();

        const searchInput = document.getElementById('iata-search');
        const brazilToggle = document.getElementById('iata-brazil-only');
        const copyBtn = document.getElementById('iata-copy-btn');
        const searchBox = document.getElementById('iata-search-box');

        if (searchInput) {
            searchInput.addEventListener('input', debounce(function () {
                search(searchInput.value);
            }, 200));
        }

        // Hide search results when clicking outside the search box
        document.addEventListener('click', function (e) {
            const results = document.getElementById('iata-search-results');
            if (results && searchBox && !searchBox.contains(e.target)) {
                results.style.display = 'none';
            }
        });

        if (brazilToggle) {
            brazilToggle.addEventListener('change', function () {
                renderMarkers();
                search(searchInput ? searchInput.value : '');
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', function () {
                const code = document.getElementById('selected-code').textContent;
                if (!code) return;
                navigator.clipboard.writeText(code).then(function () {
                    const original = copyBtn.textContent;
                    copyBtn.textContent = '✓ Copiado!';
                    copyBtn.classList.add('copied');
                    setTimeout(function () {
                        copyBtn.textContent = original;
                        copyBtn.classList.remove('copied');
                    }, 2000);
                }).catch(function () {
                    const ta = document.createElement('textarea');
                    ta.value = code;
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                });
            });
        }
    });
})();
