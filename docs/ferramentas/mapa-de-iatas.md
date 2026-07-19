---
title: Mapa de Códigos IATA
---

Encontre o código IATA de três letras do aeroporto da sua região para usar na configuração do seu observador MeshCore. No contexto da rede MeshCore, códigos IATA identificam grandes regiões — normalmente a do aeroporto que você usaria para viajar.

<div class="repeater-form" id="iata-tool">

    <div class="form-group" id="iata-search-box">
        <label for="iata-search">
            <strong>Buscar aeroporto</strong>
        </label>
        <input type="text" id="iata-search" placeholder="Digite o código IATA/ICAO, a cidade ou o nome do aeroporto" autocomplete="off">
        <div id="iata-search-results" class="iata-search-results" style="display: none;"></div>
        <span class="form-hint">Busque pelo código (ex.: SOD, GRU), pelo nome da cidade (Sorocaba, Campinas) ou pelo nome do aeroporto.</span>
    </div>

    <div class="form-group">
        <label class="radio-option" style="margin-bottom: 0;">
            <input type="checkbox" id="iata-brazil-only" checked>
            <span>Mostrar apenas aeroportos do Brasil</span>
        </label>
    </div>

    <div class="form-group">
        <div id="iata-map"></div>
        <span id="iata-status" class="form-hint" style="display: none;"></span>
        <span id="iata-result-count" class="form-hint"></span>
    </div>

    <div id="selected-panel" class="result-box" style="display: none;">

        <h3 style="margin-top: 0;">Aeroporto selecionado</h3>

        <div class="result-item">
            <span class="result-label">Código IATA:</span>
            <span id="selected-code" class="result-value"></span>
        </div>

        <div class="result-item">
            <span class="result-label">Código ICAO:</span>
            <span id="selected-icao" class="result-value"></span>
        </div>

        <div class="result-item">
            <span class="result-label">Nome:</span>
            <span id="selected-name" class="result-value"></span>
        </div>

        <div class="result-item">
            <span class="result-label">Localização:</span>
            <span id="selected-location" class="result-value"></span>
        </div>

        <div class="form-buttons">
            <button type="button" id="iata-copy-btn" class="md-button md-button--primary copy-button">
                Copiar código IATA
            </button>
        </div>
    </div>

</div>

## Como usar

1. **Busque** pelo código, cidade ou nome do aeroporto na caixa de busca.
2. **Clique** em um resultado da lista ou em um marcador do mapa para selecioná-lo.
3. **Copie** o código IATA de três letras usando o botão em "Aeroporto selecionado".
4. Use o código no comando abaixo ao configurar o seu observador:

    ```
    set mqtt.iata CODIGO
    ```

Marcadores em azul representam aeroportos brasileiros; marcadores em cinza, demais países. O código IATA de Sorocaba é **SOD**.

!!! info "Sobre identificadores IATA"
    O IATA é um código de 3 letras usado originalmente para identificar aeroportos. No MeshCore, esses códigos servem para referenciar grandes regiões com múltiplos municípios. Na dúvida sobre qual IATA utilizar, pergunte-se qual aeroporto você usaria normalmente para viajar e localize-o no mapa acima.

    Saiba mais na página de [configuração de observadores](../configuracao/observers.md).

!!! tip "Sorocaba e região"
    A cidade de Sorocaba possui o código IATA **SOD**. Para municípios vizinhos sem aeroporto próprio — como Votorantim, Alumínio, Mairinque, Itu e Salto — utilize o código da região mais próxima.
