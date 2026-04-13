# Configuração MeshCore Recomendada

Este guia explica como configurar seu dispositivo MeshCore para operar na Mesh Sorocaba e no Brasil.

## LoRa

- **Região/Preset**: `Australia: SA, WA`
- **Frequência**: 923.125 MHz
- **Bandwidth**: 62.5 KHz
- **Spreading Factor (SF)**: 8
- **Coding Rate (CR)**: 8

O preset `Australia: SA, WA` opera na faixa de 915 a 928 MHz, que é a mesma faixa liberada pela ANATEL para dispositivos de radiação restrita com até 1W de potência. Essa faixa é amplamente utilizada pela comunidade MeshCore e Meshtastic no Brasil, garantindo compatibilidade com a maioria dos dispositivos já em operação no país. 

A frequência utilizada por esse preset é a 923.125 MHz. Em nossos testes, foi a frequência que encontramos que estava mais livre de interferências. Além disso, a largura de banda de 62.5 kHz proporcionou melhor sensibilidade para longas distâncias e/ou sinais mais atenuados, quando comparados com a largura de 250 kHz (mesmo para **link budget** semelhantes).

## Tipos de Dispositivo

O MeshCore suporta três modos de operação principais, cada um com características específicas:

### Companion (Acompanhante)

O dispositivo **companion** é o modo padrão para uso pessoal e móvel. É o dispositivo que você carrega consigo, pareado com seu celular via Bluetooth.

**Características:**

- Projetado para uso móvel (no bolso, mochila, etc.)
- Entra em modo de economia de energia quando não está em uso
- Ideal para troca de mensagens diretas e em grupos
- Pode funcionar como repetidor quando está ligado, mas não é otimizado para isso

**Recomendações de uso:**

- Mantenha o celular pareado para digitar mensagens
- Carregue regularmente (bateria dura de 1 a 7 dias dependendo do modelo)
- Evite deixar em locais fechados (gavetas, bolsos internos) por longos períodos

---

### Repeater (Repetidora)

O dispositivo **repeater** é dedicado exclusivamente a estender o alcance da rede mesh. Ele não precisa estar pareado com um celular e funciona de forma autônoma.

**Características:**

- Modo de baixo consumo de energia
- Não mantém conexão Bluetooth ativa
- Retransmite todas as mensagens que recebe
- Pode ficar ligado meses com uma bateria adequada
- Aparece no mapa como nó fixo

**Recomendações de posicionamento:**

| Fator | Recomendação |
|-------|--------------|
| **Altura** | Quanto mais alto, melhor. Telhados, sacadas de prédios, topo de postes. |
| **Linha de visada** | Evite obstáculos como prédios, árvores e morros na direção de outros nós. |
| **Antena** | Use antena externa de maior ganho (5-8 dBi) se possível. |
| **Proteção** | Proteja da chuva e sol direto com caixa estanque (IP65 ou superior). |
| **Energia** | Use painel solar + bateria para operação contínua sem manutenção. |
| **Distância de outros repetidores** | Entre 1-5 km em área urbana; até 10-15 km em área rural com visada livre. |

!!! tip "Dica de Ouro"
    A melhor posição para uma repetidora é no ponto mais alto disponível, com visada livre para o maior número de direções possível. Um telhado de prédio alto ou um poste elevado pode multiplicar o alcance da rede por vários quilômetros.

---

## Precisa de ajuda?

Entre em contato pelo Telegram com a comunidade [Mesh Sorocaba](https://t.me/meshsorocaba) ou pela [comunidade MeshCore Brasil](https://t.me/meshcore_br).
