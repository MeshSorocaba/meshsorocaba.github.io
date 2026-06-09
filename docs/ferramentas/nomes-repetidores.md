---
title: Gerador de Nomes para Repetidores
---

Este formulário ajuda a gerar nomes padronizados para repetidores MeshCore no Brasil. As abreviações são únicas para cada município em todo território nacional.

<form class="repeater-form">
    <div class="form-group">
        <label for="state-select">
            <strong>Estado (UF)</strong>
        </label>
        <select id="state-select">
            <option value="">Selecione o estado...</option>
        </select>
        <span class="form-hint">Escolha o estado onde o repetidor está localizado.</span>
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
        <button type="button" id="reset-btn" class="md-button md-button--primary">
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

!!! warning "Atenção"
    Após ajustar o nome do repetidor, lembre-se de:

    **1) Anunciar o repetidor**: na aba "Definições" do gerenciamento remoto, clique em "Anúncio".

    **2) Reenviar o repetidor para o mapa da Internet**: Na tela anterior, na sua lista de contatos, clique nos três pontos ao lado do nome do repetidor > "Partilhar" > "Carregar para Mapa da Internet".

## Explicação

Os nomes dos repetidores seguem o formato:

```
<CIDADE>-<REGIONAL>-<PUBKEY>
```

O nome completo **não pode ultrapassar 23 caracteres** (incluindo os hífens). Isso significa que o identificador regional deve ter, no máximo, 14 caracteres.

Onde:

- **CIDADE**: Abreviação de **3 letras maiúsculas** da cidade. Ela segue a convenção estabelecida pelo [Código das Nações Unidas para o Comércio e Transportes Locais (UN/LOCODE)](https://unlocode.unece.org/directory/locodes/?country=BR). 
- **REGIONAL**: Identificador regional como bairro, ponto de referência ou localidade (maiúsculo)
- **PUBKEY**: Primeiros **4 dígitos** da chave pública (public key) do dispositivo em hexadecimal (maiúsculo)

É sugerido que apenas os dispositivos repetidores tenham o nome padronizado. Os dispositivos pessoais (companions) são livres para serem nomeados de qualquer maneira.

Exemplos:

- `SOR-SAOBENTO-A1B2`: Repetidor no mosteiro São Bento de Sorocaba 
- `SAO-PAULISTA-9D4E`:  Repetidor na Paulista, São Paulo 
- `SBC-VILANOVA-3C7D`: Repetidor na Vila Nova, São Bernardo do Campo 

## Por que não simplesmente usar qualquer nome?

Sem um padrão, você acaba com nomes como "Nó do João", "teste123" e "Repeater2". Quando se está resolvendo um problema de roteamento ou tentando entender por que uma mensagem deu 6 saltos em vez de 3, esses nomes não dizem nada. Uma convenção de nomenclatura consistente permite que operadores e membros da comunidade:

- Identifiquem a localização do nó sem consultar um mapa;
- Rastreiem rotas usando o prefixo da chave pública;
- Evitem conflitos, já que o sufixo da chave pública garante a exclusividade.

## Consulta reversa

Para saber a qual cidade uma abreviação se refere, consulte o [Código das Nações Unidas para o Comércio e Transportes Locais (UN/LOCODE)](https://unlocode.unece.org/directory/locodes/?country=BR). 


## Últimas Alterações

**07/06/2026** - Dado o crescimento da rede MeshCore, houve a necessidade de criar abreviações únicas para cada cidade no Brasil a fim de evitar conflitos. Dessa forma, o usuário não digita mais manualmente o nome da cidade, mas seleciona de uma lista. A abreviação de cada cidade é dada agora pela denominação das Nações Unidas.

**20/04/2026** - Primeira versão da ferramenta. Utiliza o algoritmo que toma a primeira letra de cada palavra do nome da cidade. Caso a letra consecutiva se repita, a próxima é utilizada, e assim por diante.