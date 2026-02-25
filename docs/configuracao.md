# Configurações Recomendadas

As configurações recomendadas nesta seção variam de acordo com a função do seu nó Meshtastic e priorizam a estabilidade da rede através da redução de tráfego desnecessário em nossa banda compartilhada.

## Por que um padrão de configurações regional é importante?

Por padrão, os nós Meshtastic transmitem uma grande quantidade de informação via rádio, como identificação do nó, status da bateria, localização, identificação de nós na vizinhança, etc. Porém, a rede Meshtastic opera em um canal compartilhado com apenas **1kbps** de largura de banda utilizável (sob o regime `LONG_FAST`). [Foi observado pelos próprios desenvolvedores](https://meshtastic.org/blog/why-your-mesh-should-switch-from-longfast/) que à medida que a malha de nós cresce em uma cidade, a rede pode se saturar, impedindo que mensagens chegam ao seu destino. 

Para corrigir isso, comunidades Meshtastic ao redor do mundo se alinharam para que os usuários reduzissem a publicação de telemetria, garantindo que a rede permaneça utilizável para todos.

!!! note "Observação"
    As configurações abaixo são baseadas na experiência coletiva de comunidades Meshtastic pelo mundo como a do [Oregon (EUA)](https://meshoregon.com/), [Montes Apalaches (EUA)](https://mtnme.sh/), [Brno (República Tcheca)](https://meshtastic--czbrno-blogspot-com.translate.goog/2025/01/meshtastic-moznost-soucasne-existence.html?_x_tr_sl=cs&_x_tr_tl=en&_x_tr_hl=cs&_x_tr_pto=wapp). As configurações estão sujeitas a alterações conforme a rede Mesh Sorocaba cresça e demande novos valores.

## 📱 1. Nós Móveis Pessoais

Para dispositivos portáteis, unidades veiculares e dispositivos de uso cotidiano.

### LoRa

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Region** | `Australia / Brazil / New Zealand` | Faixa de 915 a 928 MHz autorizada pela ANATEL para dispositivos de baixa potência |
| **Use Preset** | `ligado` | |
| **Modem Preset** | `LONG_FAST` | Valor padrão, usado enquanto a região ainda não possui tantos nós |
| **Ignore MQTT** | `desligado` | Se desligado, aceita mensagens que tenham transitado via MQTT |
| **OK to MQTT** | `ligado` | Permite que o nó seja monitorado pelas ferramentas web e auxilia na coordenação da rede |
| **Transmit Enabled** | `ligado` | Habilite se quiser que o nó seja capaz de transmitir |
| **Override Duty Cycle** | `ligado` | Ignora o limite de ciclos, cujo limite só existe na Europa |
| **Number of Hops** | `3` ou `4` | Um número alto gera risco de congestionar a malha de acordo com simulações |
| **Frequency Slot** | `20` | Número padrão do canal `LongFast`. O valor 0 calculará automaticamente a frequência com base no Nome do Canal |
| **RX Boosted Gain** | `ligado` | opção específica para a série de chips SX126x que permite ao chip consumir uma pequena quantidade de energia adicional para aumentar a sensibilidade de recepção |

### Channels

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Name** | `LongFast` | Canal público padrão para o preset `LONG_FAST` |
| **PSK** | `AQ==` | Chave padrão do canal |
| **Uplink Enabled** | `ligado` | Permite que o nó seja monitorado pelas ferramentas web e auxilia na coordenação da rede |
| **Downlink enabled** | `desligado` | Reduz tráfego desnecessário do MQTT para o rádio |
| **Position enabled** | `desligado` | Ignora pedidos de anúncio de posição |
| **Precise location** | `desligado` | Desnecessário se anúncio de posição está desligado |


### Device

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Device Role** | `CLIENT_MUTE` ou `CLIENT` | Use `CLIENT_MUTE` na maioria dos casos, especialmente com múltiplos dispositivos recebendo de um nó com posição mais privilegiada; `CLIENT` se você necessita retransmitir informações por alguma razão específica |
| **Rebroadcast Mode** | `ALL` | |
| **NodeInfo Interval** | `6 hours` | Não significa que o nó será visto somente a cada 6 horas, pois qualquer pacote transmitido contém sua identificação |
| **Time Zone** | `GMT3` | Ou clique em "Use phone time zone" |

### Position

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Broadcast Interval** | `3 hours` | Intervalo base quando estacionado |
| **Smart Position** | `ligado` | Atualiza a posição do nó somente se você se deslocar além de uma certa distância |
| **Smart Interval** | `15 minutes` | Intervalo quando em movimento |
| **Smart Distance** | `200` | Deslocamento mínimo em metros para que posição seja atualizada |
| **Fixed Position** | `desligado` | Nós móveis devem usar GPS/Localização do celular |
| **GPS polling interval** | `15 minutes` |  |

### MQTT

Para configuração do MQTT, siga as instruções atualizadas da comunidade [Meshtastic Brasil](https://www.meshbrasil.com/).

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Address** | `platform.meshbrasil.com:1883` | |
| **Username** | `meshdev` | |
| **Password** | `large4cats` | |
| **Encryption enabled** | `ligado` | |
| **JSON output enabled** | `desligado` | |
| **TLS enabled** | `desligado` | |
| **Root topic** | `meshdev` | |
| **Proxy to client enabled** | `ligado` ou `desligado` | `ligado` se o nó só pode se comunicar pela internet através do seu celular, `desligado` se ele possui WiFi configurado e funcionando | 

### Telemetry
| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Send Device Telemetry** | `desligado` | Ao contrário de um nó solar ou uma estação base, não é necessário anunciar seu nível de bateria a toda a malha |
| **Environment metrics module enabled** | `desligado` | Não é útil para nós portáteis |


## 🏠 2. Infraestrutura Pessoal/Local

Para estações base residenciais, nós em sótãos/telhados, mastros em quintais e instalações solares regionais de altura média.

### LoRa

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Region** | `Australia / Brazil / New Zealand` | Faixa de 915 a 928 MHz autorizada pela ANATEL para dispositivos de baixa potência |
| **Use Preset** | `ligado` | |
| **Modem Preset** | `LONG_FAST` | Valor padrão, usado enquanto a região ainda não possui tantos nós |
| **Ignore MQTT** | `desligado` | Se desligado, aceita mensagens que tenham transitado via MQTT |
| **OK to MQTT** | `ligado` | Permite monitorar o nó pelas ferramentas web e auxilia na coordenação da rede |
| **Transmit Enabled** | `ligado` | |
| **Override Duty Cycle** | `ligado` | O limite de ciclos só é necessário na Europa |
| **Number of Hops** | `2` | Número de hops alto não é útil para nós de infraestrutura, pois normalmente não origina tráfego |
| **Frequency Slot** | `20` | Padrão LongFast (919.875 MHz) |
| **RX Boosted Gain** | `ligado` | opção específica para a série de chips SX126x que permite ao chip consumir uma pequena quantidade de energia adicional para aumentar a sensibilidade de recepção |

### Channels

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Name** | `LongFast` | Canal público padrão para o preset `LONG_FAST` |
| **PSK** | `AQ==` | Chave padrão do canal |
| **Uplink Enabled** | `ligado` | Permite que o nó seja monitorado pelas ferramentas web e auxilia na coordenação da rede |
| **Downlink enabled** | `desligado` | Reduz tráfego desnecessário do MQTT para o rádio |
| **Position enabled** | `ligado` | Para nós estacionários com posição fixa configurada |
| **Precise location** | `desligado` | A critério do usuário |

### User
| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Unmessagable** | `ligado` | Para nós não-monitorados, evita que usuários enviem mensagens na espera de uma resposta |


### Device

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Device Role** | `CLIENT_BASE` | `CLIENT_BASE` ajuda a garantir que as mensagens dos seus nós favoritados tenham prioridade |
| **Rebroadcast Mode** | `ALL` | |
| **NodeInfo Interval** | `6 hours` | Quanto maior, melhor (nós estacionários não alteram informações com frequência) |
| **Time Zone** | `GMT3` | Ou clique em "Use phone time zone" |

### Position

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Broadcast Interval** | `24 hours` | Por ser um nó estacionário, não há necessidade de anunciar posição com frequência |
| **Smart Position** | `desligado` | Nó estacionário, não é necessário |
| **Fixed Position** | `ligado` | Defina as coordenadas manualmente no app se não houver GPS por hardware |
| **GPS polling interval** | `24 hours` | Para nós com hardware GPS, mesmo sendo estacionários |

### MQTT

Para configuração do MQTT, siga as instruções atualizadas da comunidade [Meshtastic Brasil](https://www.meshbrasil.com/).

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Address** | `platform.meshbrasil.com:1883` | |
| **Username** | `meshdev` | |
| **Password** | `large4cats` | |
| **Encryption enabled** | `ligado` | |
| **JSON output enabled** | `desligado` | |
| **TLS enabled** | `desligado` | |
| **Root topic** | `meshdev` | |
| **Proxy to client enabled** | `ligado` ou `desligado` | `ligado` se o nó só pode se comunicar pela internet através do seu celular, `desligado` se ele possui WiFi configurado e funcionando | 

### Telemetry

| **Opção** | **Configuração Recomendada** | **Observações** |
| :--- | :--- | :--- |
| **Send Device Telemetry** | `3 hours` | Apenas para nós solares, caso deseje-se acompanhar os níveis de bateria; caso contrário, desabilite |
| **Environment metrics module enabled** | `3 hours` | Apenas se equipado; usado para verificar vazamentos de bateria ou superaquecimento; caso contrário, desabilite |

## 🏔️ 3. Infraestrutura Pública Coordenada

Para pontos altos que conectam regiões. Geralmente são torres de radioamadores em locais elevados ou relevos extremamente propícios para cobrir uma grande extensão de região metropolitana.

!!! warning "Atenção"
    Nós de infraestrutura coordenados devem ser discutidos entre a comunidade. Roteadores com essa configuração mal posicionados podem causar degradação em toda a rede. Entre em contato com a comunidade Mesh Sorocaba para discutir seu ponto antes de usar qualquer configuração que não seja `CLIENT`, `CLIENT_MUTE` ou `CLIENT_BASE`.

