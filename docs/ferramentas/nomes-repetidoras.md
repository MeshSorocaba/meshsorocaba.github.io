# Gerador de Nomes de Repetidoras v3

Este formulário ajuda a gerar nomes padronizados para repetidoras MeshCore no Brasil. As abreviações são únicas para cada município em todo território nacional.

<form class="repeater-form">
    <div class="form-group">
        <label for="state-select">
            <strong>Estado (UF)</strong>
        </label>
        <select id="state-select">
            <option value="">Selecione o estado...</option>
        </select>
        <span class="form-hint">Escolha o estado onde a repetidora está localizada.</span>
    </div>

    <div class="form-group">
        <label for="city-select">
            <strong>Cidade</strong>
        </label>
        <select id="city-select" disabled>
            <option value="">Selecione a cidade...</option>
        </select>
        <span class="form-hint">Escolha a cidade. A abreviação será obtida automaticamente da lista oficial.</span>
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
        <div class="char-counter">
            <span id="name-char-count" class="char-counter-value">0</span>
            <span class="char-counter-separator">/</span>
            <span class="char-counter-limit">23</span>
            <span class="char-counter-label">caracteres no nome final</span>
        </div>
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
        <span class="form-hint">Encontre no app MeshCore nas Configurações (ícone da engrenagem) → Public Key</span>
    </div>

    <div id="char-limit-warning" class="char-limit-warning" style="display: none;">
        ⚠️ O nome gerado terá mais de <strong>23 caracteres</strong>. Reduza o identificador regional para que o nome final não ultrapasse o limite.
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

**Explicação**

Os nomes das repetidoras seguem o formato:

```
<CIDADE>-<REGIONAL>-<PUBKEY>
```

O nome completo **não pode ultrapassar 23 caracteres** (incluindo os hífens). Isso significa que o identificador regional deve ter, no máximo, 14 caracteres.

Onde:

- **CIDADE**: Abreviação de **3 letras maiúsculas** da cidade. Ela segue a convenção estabelecida pelo [Código das Nações Unidas para o Comércio e Transportes Locais (UN/LOCODE)](https://unlocode.unece.org/directory/locodes/?country=BR). 
- **REGIONAL**: Identificador regional como bairro, ponto de referência ou localidade (maiúsculo)
- **PUBKEY**: Primeiros **4 dígitos** da chave pública (public key) do dispositivo em hexadecimal (maiúsculo)

Exemplos:

| Nome | Descrição |
|------|-----------|
| `SOR-SAOBENTO-A1B2` | Repetidora no mosteiro São Bento de Sorocaba |
| `SAO-PAULISTA-9D4E` | Repetidora na Paulista, São Paulo |
| `SBC-VILANOVA-3C7D` | Repetidora na Vila Nova, São Paulo |

