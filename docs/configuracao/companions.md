# Configuração de dispositivos pessoais no MeshCore

Este guia explica como configurar seu dispositivo MeshCore no Brasil.

## Passo-a-passo

- Abra o aplicativo MeshCore (se estiver usando celular) ou o cliente web (se estiver usando o computador).
- Clique no ícone ⚙️ na barra superior.
- Em **Definições de Rádio**, clique em **Escolher Predefinição** e selecione "Australia: SA, WA, Brazil".
- Verifique se os parâmetros estão conforme a tabela abaixo.
- Clique no ícone ✔ no canto superior direito da tela.

| Parâmetro             | Valor               |
| --------------------- | ------------------- |
| Predefinição Selecionada         | `Australia: SA, WA, Brazil` |
| Frequência            | 923.125 MHz         |
| Largura de Banda             | 62.5 KHz            |
| Fator de Espalhamento | 8                   |
| Taxa de Codificação      | 8                   |

O preset `Australia: SA, WA, Brazil` opera na faixa de 915 a 928 MHz, que é a mesma faixa liberada pela Anatel para dispositivos de radiação restrita com até 1W de potência ([resolução Anatel no. 680 de 27 de junho de 2017](https://informacoes.anatel.gov.br/legislacao/resolucoes/2017/936-resolucao-680)). Essa faixa é divida com outros dispositivos LoRa (como diversos tipos de sensores) e também com radioamadores, que operam na faixa em caráter secundário ([resolução Anatel no. 772 de 16 de janeiro de 2025](https://informacoes.anatel.gov.br/legislacao/resolucoes/2025/2001-resolucao-772)).

A frequência utilizada por esse preset, 923.125 MHz, foi a frequência que encontramos que estava mais livre de interferências em nossos testes. Além disso, a largura de banda de 62.5 kHz proporcionou melhor sensibilidade para longas distâncias e/ou sinais mais atenuados, quando comparados com a largura de 250 kHz (mesmo para **link budget** semelhantes).
