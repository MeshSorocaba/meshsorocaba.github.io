# Configurações Recomendadas

Para manter uma rede mesh saudável, recomendamos as configurações abaixo com base na função do seu nó. Essas configurações priorizam a estabilidade da rede através da redução de tráfego desnecessário em nossa banda compartilhada.

!!! note "Observação"
    Essas configurações são baseadas na experiência coletiva de algumas comunidades Meshtastic pelo mundo. As configurações estão sujeitas a alterações conforme a rede Mesh Sorocaba cresça.

## 📱 1. Nós Móveis Pessoais

Para dispositivos portáteis, unidades veiculares e dispositivos de uso cotidiano.

### Rádio & LoRa

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Region** | `Australia / Brazil / New Zealand` | Faixa de 915 a 928 MHz autorizada pela ANATEL para dispositivos de baixa potência |
| **Device Role** | `CLIENT` ou `CLIENT_MUTE` | Use `CLIENT_MUTE` a menos que você tenha uma necessidade específica de retransmitir |
| **Modem Preset** | `LONG_FAST` | Padrão adotado pela Mesh Sorocaba |
| **Frequency Slot** | `20` | Padrão LongFast (919.875 MHz) |
| **NodeInfo Interval** | `10800` (3 horas) | |
| **Hop Limit** | `5` | Por favor, não defina acima de `6` 🙏 |
| **Ignore MQTT** | `False` | Opcional |
| **OK to MQTT** | `True` | Permite monitorar o nó pelas ferramentas web e auxilia na coordenação da rede |
| **Transmit Enabled** | `Ligado` | |
| **Override Duty Cycle** | `Ligado` | O limite de ciclos só é necessário na Europa |

### Posição & Telemetria

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Smart Position** | `True` | Atualiza com mais frequência enquanto você está em movimento |
| **Broadcast Interval** | `10800` (3 horas) | Intervalo base quando estacionário |
| **Fixed Position** | `False` | Nós móveis devem usar GPS/Localização do celular |
| **Device Metrics** | `Disabled` | Os outros na rede não precisam saber seu nível de bateria |
| **Env. Metrics** | `Disabled` | Não é útil para nós móveis |


## 🏠 2. Infraestrutura Pessoal/Local

Para estações base residenciais, nós em sótãos/telhados, mastros em quintais e instalações solares regionais de altura média.

### Rádio & LoRa

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Region** | `Australia / Brazil / New Zealand` | Faixa de 915 a 928 MHz autorizada pela ANATEL para dispositivos de baixa potência |
| **Device Role** | `CLIENT` ou `CLIENT_BASE` | `CLIENT_BASE` ajuda a garantir que as mensagens dos seus nós móveis tenham prioridade |
| **Is Un-Messagable** | `True` | Defina em nós não monitorados para evitar que usuários enviem mensagens diretas e fiquem frustrados |
| **Modem Preset** | `LONG_FAST` | Padrão adotado pela Mesh Sorocaba |
| **Frequency Slot** | `20` | Padrão LongFast (919.875 MHz) |
| **NodeInfo Interval** | `21600` (6 horas) | Nós estacionários não alteram informações com frequência |
| **Hop Limit** | `3` | Contagem alta de hops não é útil, pois normalmente não é um nó que recebe mensagens |
| **Ignore MQTT** | `False` | Opcional |
| **OK to MQTT** | `True` | Permite monitorar o nó pelas ferramentas web e auxilia na coordenação da rede |
| **Transmit Enabled** | `Ligado` | |
| **Override Duty Cycle** | `Ligado` | O limite de ciclos só é necessário na Europa |

### Posição & Telemetria

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Smart Position** | `False` | Nó estacionário, não é necessário |
| **Broadcast Interval** | `21600` (6 horas) | É estacionário; não há necessidade de lembrar as pessoas a cada hora |
| **Fixed Position** | `True` | Defina as coordenadas manualmente no app se não houver GPS por hardware |
| **Device Metrics** | `10800` (3 horas) | Apenas para nós solares; caso contrário, desabilite |
| **Env. Metrics** | `10800` (3 horas) | Apenas se equipado; usado para verificar vazamentos ou superaquecimento; caso contrário, desabilite |

## 🏔️ 3. Infraestrutura Pública Coordenada

Para pontos altos que movimentam mensagens pela região. Geralmente são torres de radioamadores em locais elevados.

!!! warning "Atenção"
    Apenas nós de infraestrutura coordenados devem usar o papel `ROUTER`. Roteadores mal configurados podem causar degradação em toda a rede. Entre em contato com a comunidade Mesh Sorocaba para discutir seu ponto antes de usar essas configurações.

### Rádio & LoRa

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Region** | `Australia / Brazil / New Zealand` | Faixa de 915 a 928 MHz autorizada pela ANATEL para dispositivos de baixa potência |
| **Device Role** | `ROUTER_LATE` | Melhor para a saúde da rede em 95% dos casos do que `ROUTER` |
| **Modem Preset** | `LONG_FAST` | Padrão adotado pela Mesh Sorocaba |
| **Frequency Slot** | `20` | Padrão LongFast (919.875 MHz) |
| **NodeInfo Interval** | `21600` (6 horas) | Pontos altos são constantes; atualizações mínimas necessárias |
| **Rebroadcast Mode** | `CORE_PORTNUMS_ONLY` | Filtra tráfego não essencial (ex.: ATAK e teste de alcance) |
| **Hop Limit** | `3` | Impede que a telemetria se propague além do útil |
| **Ignore MQTT** | `True` | **Crucial:** Protege a rede contra inundação vinda da internet |
| **OK to MQTT** | `True` | Permite monitorar o nó pelas ferramentas web e auxilia na coordenação da rede |
| **Transmit Enabled** | `Ligado` | |
| **Override Duty Cycle** | `Ligado` | O limite de ciclos só é necessário na Europa |

### Posição & Telemetria

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Smart Position** | `False` | Ponto alto estacionário. |
| **Broadcast Interval** | `21600` (6 horas) | Estacionário; atualizações a cada 6 horas são suficientes. |
| **Fixed Position** | `True` | Defina as coordenadas manualmente no app se não houver GPS por hardware. |
| **Device Metrics** | `10800` (3 horas) | Monitoramento de energia solar e saúde da rede. |
| **Env. Metrics** | `10800` (3 horas) | Apenas se equipado; usado para verificar vazamentos ou superaquecimento no invólucro; caso contrário, desabilite. |

---

## Por que essas configurações são importantes?

A rede Meshtastic opera em um canal compartilhado com aproximadamente **1kbps** de largura de banda utilizável sob LongFast. Nós "tagarelas" — aqueles que enviam atualizações com mais frequência do que o necessário — podem saturar rapidamente a rede, impedindo que mensagens reais sejam transmitidas. Ao aumentar os intervalos e limitar os hops, garantimos que a rede permaneça utilizável para todos.
