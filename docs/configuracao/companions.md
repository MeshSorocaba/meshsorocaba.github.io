---
title: Configuração passo-a-passo de dispositivos pessoais no MeshCore
---

# Configuração passo-a-passo de dispositivos pessoais

- Primeiramente, abra o aplicativo MeshCore (se estiver usando celular) ou o cliente web (se estiver usando o computador) e então clique no ícone :material-cog:️ na barra superior.
- Confira os valoes na seção **Informação Pública**:

| Parâmetro             | Valor               |
| --------------------- | ------------------- |
| Nome     | Nome que aparecerá aos seus contatos (pode incluir emojis) |
| Latitude e longitude | Clique no ícone :material-map: à direita ou preencha manualmente |
| Partilhar Posição no Anúncio | Habilite somente se quiser mostrar sua posição publicamente |

- Em **Definições de Rádio**, clique em **Escolher Predefinição** e selecione "Australia: SA, WA".
- Verifique se os parâmetros estão conforme a tabela abaixo.

| Parâmetro             | Valor               |
| --------------------- | ------------------- |
| Frequência            | 923.125 MHz         |
| Largura de Banda             | 62.5 KHz            |
| Fator de Espalhamento | 8                   |
| Taxa de Codificação      | 8                   |
| Potência de Transmissão (dBm)      | 22                   |

!!! info 
    O preset `Australia: SA, WA, Brazil` opera na faixa de 915 a 928 MHz, que é a mesma faixa liberada pela Anatel para dispositivos de radiação restrita com até 1W de potência ([resolução Anatel no. 680 de 27 de junho de 2017](https://informacoes.anatel.gov.br/legislacao/resolucoes/2017/936-resolucao-680)). Essa faixa é divida com outros dispositivos LoRa (como diversos tipos de sensores) e também com radioamadores, que operam na faixa em caráter secundário ([resolução Anatel no. 772 de 16 de janeiro de 2025](https://informacoes.anatel.gov.br/legislacao/resolucoes/2025/2001-resolucao-772)).

- Em seguida, na seção **Outras definições** logo abaixo, clique no botão **Definições Experimentais**.
- Mude o **Tamanho Predefinido do Hash do Caminho** para `2 bytes (máx. 32 saltos)`.
- Por fim, volte para a tela anterior e pressione o ícone :material-check: no canto superior direito para salvar as novas configurações.

## Adicionando seu dispositivo no mapa

Caso queira publicar manualmente seu dispositivo no [Mapa da Internet](https://map.meshcore.io):

- Clique em :material-dots-vertical: no canto superior direito
- Em seguida **Mapa da Internet**, :material-dots-vertical: no canto superior direito novamente e então **Adicionar-me ao Mapa**.