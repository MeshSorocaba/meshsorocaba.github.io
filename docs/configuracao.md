# Valor para a Região de Sorocaba

As configurações recomendadas nesta seção variam de acordo com a função do seu nó Meshtastic e priorizam a estabilidade da rede através da redução de tráfego desnecessário em nossa banda compartilhada.

## Por que um padrão de configurações regional é importante?

Por padrão, os nós Meshtastic transmitem uma grande quantidade de informação via rádio, como identificação do nó, status da bateria, localização, identificação de nós na vizinhança, etc. Porém, a rede Meshtastic opera em um canal compartilhado com apenas **1kbps** de largura de banda utilizável (sob o regime `LONG_FAST`). [Foi observado pelos próprios desenvolvedores](https://meshtastic.org/blog/why-your-mesh-should-switch-from-longfast/) que à medida que a malha de nós cresce em uma cidade, a rede pode se saturar, impedindo que mensagens chegam ao seu destino. 

Para corrigir isso, comunidades Meshtastic ao redor do mundo se alinharam para que os usuários reduzissem a publicação de telemetria, garantindo que a rede permaneça utilizável para todos.

!!! note "Observação"
    As configurações abaixo são baseadas na experiência coletiva de comunidades Meshtastic pelo mundo como a do [Oregon (EUA)](https://meshoregon.com/), [Montes Apalaches (EUA)](https://mtnme.sh/), [Brno (República Tcheca)](https://meshtastic--czbrno-blogspot-com.translate.goog/2025/01/meshtastic-moznost-soucasne-existence.html?_x_tr_sl=cs&_x_tr_tl=en&_x_tr_hl=cs&_x_tr_pto=wapp). As configurações estão sujeitas a alterações conforme a rede Mesh Sorocaba cresça e demande novos valores.

## 📱 1. Nós Móveis Pessoais

Para dispositivos que você carrega consigo, unidades veiculares e outros dispositivos de uso cotidiano.

### LoRa

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Região** | `Australia / Brazil / New Zealand` | Faixa de 915 a 928 MHz autorizada pela ANATEL para dispositivos de baixa potência |
| **Use Preset** | `ligado` | |
| **Modem Preset** | `LONG_FAST` | Valor padrão, usado enquanto a região ainda não possui tantos nós |
| **Ignorar MQTT** | `desligado` | Se desligado, aceita mensagens que tenham transitado via MQTT |
| **OK to MQTT** | `ligado` | Permite que o nó seja monitorado pelas ferramentas web e auxilia na coordenação da rede |
| **Transmit Enabled** | `ligado` | Habilite se quiser que o nó seja capaz de transmitir |
| **Ignorar ciclo de trabalho** | `ligado` | Ignora o limite de ciclos, cujo limite só existe na Europa |
| **Number of Hops** | `4` ou `5` | Um número alto tem risco de congestionar a malha de acordo com simulações |
| **Slot** | `20` | Número padrão do canal `LongFast`. O valor 0 calculará automaticamente a frequência com base no Nome do Canal |
| **RX Boosted Gain** | `ligado` | opção específica para a série de chips SX126x que permite ao chip consumir uma pequena quantidade de energia adicional para aumentar a sensibilidade de recepção |

### Canais

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Nome do canal** | `LongFast` | Canal público padrão para o preset `LONG_FAST` |
| **PSK** | `AQ==` | Chave padrão do canal |
| **Uplink ativado** | `ligado` | Permite que o nó seja monitorado pelas ferramentas web e auxilia na coordenação da rede |
| **Downlink ativado** | `desligado` | Reduz tráfego desnecessário do MQTT para o rádio |
| **Posição ativada** | `desligado` | Ignora pedidos de anúncio de posição |
| **Localização precisa** | `desligado` | Desnecessário se anúncio de posição está desligado |

### Usuário
| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Nome** | qualquer | Nome longo do seu nó |
| **Short Name** | 4 caracteres ou um emoji | Abreviação do seu nó |
| **Impossível enviar mensagens** | `desligado` | Mantenha a opção desligada para poder receber mensagens privadas |

### Dispositivo

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Papel do dispositivo** | `CLIENT_MUTE` ou `CLIENT` | Use `CLIENT_MUTE` na maioria dos casos, especialmente com múltiplos dispositivos recebendo de um nó com posição mais privilegiada; `CLIENT` se você necessita retransmitir informações por alguma razão específica |
| **Modo de retransmissão** | `ALL` | |
| **Node Info Broadcast Interval** | `12 hours` | Não significa que o nó só será visto 2x ao dia; qualquer pacote transmitido contém info sobre o nó |
| **Time Zone** | `GMT3` | Ou clique em "Use phone time zone" |

### Posição

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Intervalo de difusão** | `3 hours` | Intervalo base quando estacionado |
| **Posição inteligente ativada** | `ligado` | Atualiza a posição do nó somente se você se deslocar além de uma certa distância |
| **Intervalo mínimo da transmissão inteligente (segundos)** | `900` (15 minutos) | Intervalo quando em movimento |
| **Distância mínima da transmissão inteligente (metros)** | `200` | Deslocamento mínimo em metros para que posição seja atualizada |
| **Usar posição fixa** | `desligado` | Nós móveis devem usar GPS/Localização do celular |
| **Intervalo de atualização do GPS (segundos)** | `900` (15 minutos) |  |
| **Position Flags** | `ALTITUDE` e `ALTITUDE_MSL` | Qualquer outra informação sobre o sensor apenas ocupa a banda desnecessariamente  |

### MQTT

Para o MQTT, seguimos por enquanto as instruções da comunidade [Meshtastic Brasil](https://www.meshbrasil.com/).

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Endereço** | `platform.meshbrasil.com:1883` | |
| **Nome de usuário** | `meshdev` | |
| **Senha** | `large4cats` | |
| **Criptografia ativada** | `ligado` | |
| **Saída JSON ativada** | `desligado` | |
| **TLS ativado** | `desligado` | |
| **Tópico principal** | `meshdev` | |
| **Proxy para cliente ativado** | `ligado` ou `desligado` | `ligado` se o nó só pode se comunicar pela internet através do seu celular, `desligado` se ele possui WiFi configurado e funcionando | 

### Telemetria
| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Send Device Telemetry** | `desligado` | Ao contrário de um nó solar ou uma estação base, não é necessário anunciar seu nível de bateria a toda a malha |
| **Módulo de métricas do ambiente ativado** | `desligado` | Não é útil para nós portáteis |

---

## 🏠 2. Infraestrutura Pessoal/Local

Para estações base residenciais, nós em sótãos/telhados, mastros em quintais e instalações solares regionais de altura média.

### LoRa

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Região** | `Australia / Brazil / New Zealand` | Faixa de 915 a 928 MHz autorizada pela ANATEL para dispositivos de baixa potência |
| **Use Preset** | `ligado` | |
| **Modem Preset** | `LONG_FAST` | Valor padrão, usado enquanto a região ainda não possui tantos nós |
| **Ignorar MQTT** | `desligado` | Se desligado, aceita mensagens que tenham transitado via MQTT |
| **OK to MQTT** | `ligado` | Permite monitorar o nó pelas ferramentas web e auxilia na coordenação da rede |
| **Transmit Enabled** | `ligado` | |
| **Ignorar ciclo de trabalho** | `ligado` | O limite de ciclos só é necessário na Europa |
| **Number of Hops** | `3` | Número de hops alto não é útil para nós de infraestrutura, pois normalmente não origina tráfego |
| **Slot** | `20` | Padrão LongFast (919.875 MHz) |
| **RX Boosted Gain** | `ligado` | opção específica para a série de chips SX126x que permite ao chip consumir uma pequena quantidade de energia adicional para aumentar a sensibilidade de recepção |

### Canais

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Nome do canal** | `LongFast` | Canal público padrão para o preset `LONG_FAST` |
| **PSK** | `AQ==` | Chave padrão do canal |
| **Uplink ativado** | `ligado` | Permite que o nó seja monitorado pelas ferramentas web e auxilia na coordenação da rede |
| **Downlink ativado** | `desligado` | Reduz tráfego desnecessário do MQTT para o rádio |
| **Posição ativada** | `ligado` | Para nós estacionários com posição fixa configurada |
| **Localização precisa** | `desligado` | A critério do usuário |

### Usuário
| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Nome** | qualquer | Nome do seu nó; considere adicionar o emoji 🔀 como sufixo para destacar que se trata de um nó de infraestrutura |
| **Short Name** | 4 caracteres ou um emoji | Abreviação do nome do seu nó |
| **Impossível enviar mensagens** | `desligado` | Para nós não-monitorados, evita que usuários enviem mensagens na espera de uma resposta |

### Dispositivo

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Papel do dispositivo** | `CLIENT_BASE` | `CLIENT_BASE` ajuda a garantir que as mensagens dos seus nós favoritados tenham prioridade |
| **Modo de retransmissão** | `ALL` | |
| **Node Info Broadcast Interval** | `12 hours` | Não significa que o nó só será visto 2x ao dia; qualquer pacote transmitido contém info sobre o nó |
| **Time Zone** | `GMT3` | Ou clique em "Use phone time zone" |

### Posição

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Intervalo de transmissão de posição (segundos)** | `86400` (24 horas) | Por ser um nó estacionário, não há necessidade de anunciar posição com frequência |
| **Posição inteligente ativada** | `desligado` | Nó estacionário, não é necessário |
| **Usar posição fixa** | `ligado` | Defina as coordenadas manualmente no app se não houver GPS por hardware |
| **Intervalo de atualização do GPS (segundos)** | `86400` (24 horas) | Para nós com sensor de GPS mesmo sendo estacionários |
| **Position Flags** | `ALTITUDE` e `ALTITUDE_MSL` | Qualquer outra informação transmitida sobre o sensor de GPS apenas ocupa tempo de banda desnecessariamente  |

### MQTT

Para o MQTT, seguimos por enquanto as instruções da comunidade [Meshtastic Brasil](https://www.meshbrasil.com/).

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Endereço** | `platform.meshbrasil.com:1883` | |
| **Nome de usuário** | `meshdev` | |
| **Senha** | `large4cats` | |
| **Criptografia ativada** | `ligado` | |
| **Saída JSON ativada** | `desligado` | |
| **TLS ativado** | `desligado` | |
| **Tópico principal** | `meshdev` | |
| **Proxy para cliente ativado** | `ligado` ou `desligado` | `ligado` se o nó só pode se comunicar pela internet através do seu celular, `desligado` se ele possui WiFi configurado e funcionando | 

### Telemetria

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Send Device Telemetry** | `3 hours` | Apenas para nós solares, caso deseje-se acompanhar os níveis de bateria; caso contrário, desabilite |
| **Módulo de métricas do ambiente ativado** | `3 hours` | Apenas se equipado; usado para verificar vazamentos de bateria ou superaquecimento; caso contrário, desabilite |

---

## 🏔️ 3. Infraestrutura Pública Coordenada

Para pontos altos que conectam regiões. Geralmente são torres de radioamadores em locais elevados ou relevos extremamente propícios para cobrir uma grande extensão de região metropolitana.

!!! warning "Atenção"
    Nós de infraestrutura coordenados devem ser discutidos entre a comunidade. Roteadores com essa configuração mal posicionados podem causar degradação em toda a rede. Entre em contato com a comunidade Mesh Sorocaba para discutir seu ponto antes de usar qualquer configuração que não seja `CLIENT`, `CLIENT_MUTE` ou `CLIENT_BASE`.

