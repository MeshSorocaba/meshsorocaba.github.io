# Gerador de Nomes de Repetidoras v2.0

Este formulário ajuda a gerar nomes padronizados para repetidoras MeshCore seguindo a convenção estabelecida pela rede.

<form class="repeater-form">
    <div class="form-group">
        <label for="city-name">
            <strong>Nome da Cidade</strong>
        </label>
        <input type="text" id="city-name" 
               placeholder="Ex: Sorocaba, São Paulo, Campinas..."
               autocomplete="off">
        <span class="form-hint">Digite o nome completo da cidade. A abreviação será gerada automaticamente.</span>
        <div class="abbreviation-display">
            <span class="abbreviation-label">Abreviação:</span>
            <span id="city-abbreviation" class="abbreviation-value">---</span>
        </div>
    </div>
    
    <div class="form-group">
        <label for="regional-id">
            <strong>Identificador Regional</strong> (bairro ou referência)
        </label>
        <input type="text" id="regional-id" 
               placeholder="Ex: Centro, VilaNova, Itapecerica"
               autocomplete="off">
        <span class="form-hint">Nome do bairro, região ou ponto de referência. Palavras juntas com iniciais maiúsculas (ex: VilaNova)</span>
    </div>
    
    <div class="form-group">
        <label for="pubkey">
            <strong>Public Key do Dispositivo</strong> (primeiros 4 dígitos)
        </label>
        <input type="text" id="pubkey" 
               placeholder="Ex: A1B2"
               maxlength="4"
               autocomplete="off"
               value="1234">
        <span class="form-hint">Encontre no app Meshtastic em: Configurações → LoRa Radio → Public Key</span>
    </div>
    
    <div class="form-buttons">
        <button type="button" id="generate-btn" class="md-button md-button--primary">
            Gerar Nome
        </button>
        <button type="button" id="reset-btn" class="md-button">
            Limpar
        </button>
    </div>
</form>

<div id="error-message" class="error-box" style="display: none;"></div>

<div id="result" class="result-box" style="display: none;">
    <h3>Nome Gerado</h3>
    <div class="generated-name-container">
        <span id="generated-name" class="generated-name"></span>
        <button type="button" id="copy-btn" class="copy-button" title="Copiar para área de transferência">
            📋 Copiar
        </button>
    </div>
</div>

## Convenção de Nomenclatura

Os nomes das repetidoras seguem o formato:

```
<CIDADE>-<REGIONAL>-<PUBKEY>
```

Onde:

- **CIDADE**: Abreviação de **3 letras maiúsculas** da cidade (gerada automaticamente)
- **REGIONAL**: Identificador regional como bairro, ponto de referência ou localidade (maiúsculo)
- **PUBKEY**: Primeiros **4 dígitos** da chave pública (public key) do dispositivo em hexadecimal (maiúsculo)

Exemplos:

| Nome | Descrição |
|------|-----------|
| `SOR-SAOBENTO-A1B2` | Repetidora no mosteiro São Bento de Sorocaba |
| `SAO-PAULISTA-9D4E` | Repetidora na Paulista, São Paulo |
| `SBC-VILANOVA-3C7D` | Repetidora na Vila Nova, São Paulo |

