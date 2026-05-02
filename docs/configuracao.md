# Configuração do MeshCore para Sorocaba e Região

Este guia explica como configurar seu dispositivo MeshCore para operar na Mesh Sorocaba.

## Passo-a-passo

- Abra o aplicativo MeshCore (se estiver usando celular) ou o cliente web (se estiver usando o computador).
- Clique no ícone ⚙️ na barra superior.
- Em **Radio Settings**, clique em **Choose Preset** e selecione "Australia: SA, WA".
- Verifique se os parâmetros estão conforme a tabela abaixo.
- Clique no ícone ✔ no canto superior direito da tela.

| Parâmetro             | Valor               |
| --------------------- | ------------------- |
| Região/Preset         | `Australia: SA, WA` |
| Frequência            | 923.125 MHz         |
| Bandwidth             | 62.5 KHz            |
| Spreading Factor (SF) | 8                   |
| Coding Rate (CR)      | 8                   |

O preset `Australia: SA, WA` opera na faixa de 915 a 928 MHz, que é a mesma faixa liberada pela Anatel para dispositivos de radiação restrita com até 1W de potência ([resolução Anatel no. 680 de 27 de junho de 2017](https://informacoes.anatel.gov.br/legislacao/resolucoes/2017/936-resolucao-680)). Essa faixa é divida com outros dispositivos LoRa (como diversos tipos de sensores) e também com radioamadores, que operam na faixa em caráter secundário ([resolução Anatel no. 772 de 16 de janeiro de 2025](https://informacoes.anatel.gov.br/legislacao/resolucoes/2025/2001-resolucao-772)).

A frequência utilizada por esse preset, 923.125 MHz, foi a frequência que encontramos que estava mais livre de interferências em nossos testes. Além disso, a largura de banda de 62.5 kHz proporcionou melhor sensibilidade para longas distâncias e/ou sinais mais atenuados, quando comparados com a largura de 250 kHz (mesmo para **link budget** semelhantes).

## Tipos de Dispositivo

O MeshCore suporta três modos de operação principais, cada um com características específicas:

### Companion

O dispositivo **companion** é o modo padrão para uso pessoal e móvel. É o dispositivo que você carrega consigo, pareado com seu celular via Bluetooth.

**Características:**

- Projetado para uso móvel (no bolso, mochila, etc.).
- Entra em modo de economia de energia quando não está em uso.
- Usado para troca de mensagens diretas e em grupos.

### Repeater (Repetidora)

O dispositivo **repeater** é dedicado exclusivamente a estender o alcance da rede mesh. Ele não precisa estar pareado com um celular e funciona de forma autônoma.

**Características:**

- Modo de baixo consumo de energia.
- Retransmite todas as mensagens que recebe.
- Aparece no mapa como nó fixo.

**Recomendações de posicionamento:**

| Fator                               | Recomendação                                                              |
| ----------------------------------- | ------------------------------------------------------------------------- |
| **Altura**                          | Quanto mais alto, melhor. Telhados, sacadas de prédios, topo de postes.   |
| **Linha de visada**                 | Evite obstáculos como prédios, árvores e morros na direção de outros nós. |
| **Antena**                          | Use antena externa de maior ganho (5-8 dBi) se possível.                  |
| **Proteção**                        | Proteja da chuva e sol direto com caixa estanque (IP65 ou superior).      |
| **Energia**                         | Use painel solar + bateria para operação contínua sem manutenção.         |
| **Distância de outros repetidores** | Entre 1-5 km em área urbana; até 50 km em área rural com visada livre. |

!!! tip "Dica de Ouro"
    A melhor posição para uma repetidora é no ponto mais alto disponível, com visada livre para o maior número de direções possível. Um telhado de prédio alto ou um poste elevado pode multiplicar o alcance da rede por vários quilômetros.

## Veja também

- [Como Configurar um Observer no MeshCore](como-configurar-um-observer-no-meshcore.md): Configure um dispositivo como `Observer` para monitorar a rede e contribuir com a comunidade.
- [Gerador de Nomes para Repetidoras](nomes-repetidoras.md): Auxilia na escolha de um nome para sua repetidora MeshCore.

---

## Precisa de ajuda?

Entre em contato pelo Telegram com a comunidade [Mesh Sorocaba](https://t.me/meshsorocaba) ou pela [comunidade MeshCore Brasil](https://t.me/meshcore_br).
