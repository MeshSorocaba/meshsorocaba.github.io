---
title: Calculadora de Bateria e Placa Solar
---

Este formulário ajuda a estimar o tamanho do banco de baterias e a potência necessária da placa solar para um nó repetidor MeshCore operar de forma ininterrupta na região de Sorocaba, mesmo durante períodos prolongados sem sol.

<form class="repeater-form" id="solar-calculator">

    <div class="form-group">
        <label for="device-type">
            <strong>Tipo de Dispositivo</strong>
        </label>
        <select id="device-type">
            <option value="esp32" selected>ESP32</option>
            <option value="nrf52840">nRF52840</option>
        </select>
        <span class="form-hint">Microcontrolador da sua repetidora. Heltec V3 e V4 e XIAO S3 usam ESP32. RAK4631, Heltec T114, XIAO nRF52 e Faketec (ProMicro) usam nRF52840.
    </div>

    <div class="form-group">
        <label for="current-draw">
            <strong>Consumo Médio do Dispositivo</strong> (mA)
        </label>
        <input type="number" id="current-draw" value="45" min="1" step="1">
        <span class="form-hint">Corrente média de operação do repetidor em milliampères. O valor muda automaticamente ao selecionar o tipo de dispositivo acima, mas pode ser editado manualmente. Para ESP32 e firmware MeshCore <1.16, utilize 86 mA. Com módulo GPS, adicione 30-60 mA.</span>
    </div>

    <div class="form-group">
        <label for="voltage-max">
            <strong>Tensão Máxima da Bateria</strong> (V)
        </label>
        <input type="number" id="voltage-max" value="4.2" min="3.0" max="4.5" step="0.01">
        <span class="form-hint">Tensão da bateria completamente carregada. Para baterias Li-Ion/Li-Po típicas, esse valor é 4,2 V.</span>
    </div>

    <div class="form-group">
        <label for="voltage-min">
            <strong>Tensão Mínima da Bateria</strong> (V)
        </label>
        <input type="number" id="voltage-min" value="3.6" min="2.5" max="4.5" step="0.01">
        <span class="form-hint">Tensão mínima da bateria. Um valor seguro é 3,6 V para evitar reinicializações do dispositivo durante picos de transmissão (considere 3,8 V para Heltec V4).</span>
    </div>

    <div class="form-group">
        <label>
            <strong>Dias Seguidos Sem Sol</strong>
        </label>
        <div class="dark-days-mode-toggle">
            <label class="radio-option">
                <input type="radio" name="dark-days-mode" value="manual" checked>
                <span>Inserir manualmente</span>
            </label>
            <label class="radio-option">
                <input type="radio" name="dark-days-mode" value="estimate">
                <span>Estimar pelo mapa</span>
            </label>
        </div>
        <input type="number" id="dark-days" value="9" min="1" max="30" step="1">
        <span class="form-hint">Número máximo de dias consecutivos sem irradiação solar significativa.</span>
        <div id="map-container" style="display: none;">
            <div id="dark-days-map"></div>
            <span id="map-status" class="form-hint">Clique no mapa para marcar a localização do repetidor. O valor será estimado automaticamente com dados históricos da NASA.</span>
        </div>
    </div>

    <div class="form-group">
        <label for="sunny-days">
            <strong>Dias de Sol para Recarregar</strong>
        </label>
        <input type="number" id="sunny-days" value="2" min="1" max="30" step="1">
        <span class="form-hint">Número de dias com sol disponível para recarregar o banco de baterias após o período sem sol.</span>
    </div>

    <div class="form-group">
        <label for="peak-hours">
            <strong>Horas de Pico Solar por Dia</strong>
        </label>
        <input type="number" id="peak-hours" value="4.2" min="0.5" max="8" step="0.1">
        <span class="form-hint">Equivalente em horas de irradiação máxima (1000 W/m²) por dia. O valor de 3,4 h representa o valor diário médio do mês com menos irradiância solar na região de Sorocaba e uma placa solar na horizontal. Utilize a calculadora do <a href="http://www.solarelectricityhandbook.com/solar-irradiance.html">Solar Electricity Handbook</a> para valores mais precisos.</span>
    </div>

    <div class="form-buttons">
        <button type="button" id="calculate-btn" class="md-button md-button--primary">
            Calcular
        </button>
        <button type="button" id="reset-btn" class="md-button md-button--primary">
            Restaurar Padrão
        </button>
    </div>
</form>

<div id="error-message" class="error-box" style="display: none;"></div>

<div id="result" class="result-box" style="display: none;">

    <h3 style="margin-top: 0;">Resultados</h3>

    <div class="result-item">
        <span class="result-label">Capacidade do Banco de Baterias:</span>
        <span id="battery-capacity" class="result-value"></span>
    </div>

    <div class="result-item">
        <span class="result-label">Corrente Mínima de Carregamento Solar:</span>
        <span id="solar-current" class="result-value"></span>
    </div>

    <div id="soc-details" class="abbreviation-display" style="margin-top: 1rem;">
        <div>
            <span class="abbreviation-label">Carga a 4,2 V:</span>
            <span id="soc-max-value" style="color: #8ecae6; font-weight: 600;"></span>
            &nbsp;|&nbsp;
            <span class="abbreviation-label">Carga a 3,6 V:</span>
            <span id="soc-min-value" style="color: #8ecae6; font-weight: 600;"></span>
            &nbsp;|&nbsp;
            <span class="abbreviation-label">Faixa útil:</span>
            <span id="soc-delta-value" style="color: #8ecae6; font-weight: 600;"></span>
        </div>
    </div>
</div>

## Explicação

### Por que dimensionar para "dias sem sol"?

A região de Sorocaba, assim como grande parte do sudeste brasileiro, experimenta períodos de baixa irradiação solar — especialmente entre novembro e fevereiro, quando frentes frias e sistemas meteorológicos podem bloquear a luz solar direta por vários dias consecutivos.

O dimensionamento segue então uma lógica simples:

1. **O banco de baterias deve sobreviver** à pior sequência de dias sem sol.
2. **A placa solar deve ser grande o suficiente** para repor toda a energia gasta — e ainda alimentar o repetidor — durante a janela de dias ensolarados que segue.

### Como é calculado o banco de baterias

O consumo total de energia durante o período sem sol é:

$$E_{\text{gasto}} = I_{\text{dispositivo}} \times 24 \times N_{\text{dias sem sol}}$$

Porém, as baterias de lítio não podem ser usadas de 0% a 100% de sua capacidade. Para estimar a faixa útil de carga da bateria, usamos a tensão da bateria com a seguinte aproximação polinomial:

$$\text{carga}(\%) = 287{,}39\,V^5 - 5181{,}73\,V^4 + 37185{,}21\,V^3 - 132703{,}14\,V^2 + 235499{,}32\,V - 166288{,}13$$

Válida para **V entre 3,03 V e 4,18 V**. Fora desse intervalo, a porcentagem de carga é truncada para 0% ou 100%.

A capacidade necessária do banco de baterias é então:

$$C_{\text{bateria}} = \frac{I_{\text{dispositivo}} \times 24 \times N_{\text{dias sem sol}}}{\text{% carga}_{\text{máx}} - \text{% carga}_{\text{mín}}}$$

onde:

- $\text{% carga}_{\text{máx}}$ refere-se à porcentagem de carga na tensão máxima da bateria (ex: 4,2 V → ≈100%)
- $\text{% carga}_{\text{mín}}$ refere-se à porcentagem de carga na tensão mínima de corte (ex: 3,6 V → ≈32%)

A diferença entre eles representa a fração da bateria que efetivamente pode ser utilizada.

### Como é calculada a placa solar

Após a sequência de dias sem sol, a placa solar precisa repor toda a energia gasta **e ainda alimentar o repetidor** durante os dias de recarga. A energia total a ser entregue é:

$$E_{\text{recarga}} = C_{\text{bateria}} \times (\text{% carga}_{\text{máx}} - \text{% carga}_{\text{mín}}) + I_{\text{dispositivo}} \times 24 \times N_{\text{dias de sol}}$$

Dividindo pelas horas de pico solar disponíveis:

$$I_{\text{solar}} = \frac{E_{\text{recarga}}}{H_{\text{pico}} \times N_{\text{dias de sol}}}$$

A potência da placa solar é estimada multiplicando a corrente pela tensão nominal do painel (tipicamente 5 V ou 6 V para painéis USB/portáteis).

### Sobre os dados de dias sem sol

O parâmetro **MAX_EQUIV_NO_SUN_DAYS** (Máximo de Dias Equivalentes Sem Sol) utilizado na estimativa automática é obtido da API [NASA POWER](https://power.larc.nasa.gov/){:target="_blank"} (Prediction Of Worldwide Energy Resources). Esse valor representa o número máximo de dias consecutivos equivalente sem sol, calculado a partir de dados climatológicos de 20 anos (janeiro de 2001 a dezembro de 2020). O script seleciona o mês com o maior valor e o arredonda para cima, garantindo um dimensionamento conservador.

Ao informar o valor manualmente, considere usar como referência os dados da NASA POWER para a sua localização ou dados de estações meteorológicas locais.

### Sobre as horas de pico solar

A "hora de pico solar" (HSP) é uma unidade que equivale a 1 hora de irradiação a 1000 W/m². Mesmo que o sol brilhe por 10 horas, a efetiva energia captada pode corresponder a apenas 3–4 HSP, pois a irradiação varia ao longo do dia (ângulo de incidência, atmosfera, etc.). O valor de **3,4 HSP** representa o pior cenário observado em Sorocaba, garantindo que o dimensionamento seja conservador.

!!! tip "Dica"
    Sempre arredonde para cima os valores calculados. Baterias e placas solares vêm em capacidades e potências padronizadas — escolha o modelo mais próximo acima do valor indicado. Considere também uma margem de segurança de 20–30% para compensar perdas por temperatura, envelhecimento da bateria e sujeira na placa solar.
