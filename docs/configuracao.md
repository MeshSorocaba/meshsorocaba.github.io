# Configuração da Mesh Sorocaba

## Por que não usar a configuração padrão?

A configuração padrão do Meshtastic possui uma limitação: a partir de 30 dispositivos numa mesma região, a taxa de falha no recebimento de mensagens aumenta drasticamente. Isso ocorre porque os dispositivos Meshtastic, por natureza, transmitem uma grande quantidade de informações: identificação, localização, telemetria (leitura de sensores internos e externos aos dispositivos), dados sobre dispositivos na vizinhança e — o que alguns consideram um equívoco dos desenvolvedores — mensagens do país inteiro recebidas via Internet (MQTT) e retransmitidas via rádio. Quando muitos dispositivos enviam tantas informações ao mesmo tempo numa banda de rádio tão restrita, a colisão de pacotes aumenta, atrapalhando o tráfego de mensagens que realmente importam.

A fim de contornar essa limitação, comunidades pelo mundo passaram a encorajar seus usuários a usarem configurações alternativas. Geralmente, essas configurações focam em reduzir a publicação de telemetria e atribuir papéis específicos aos dispositivos pessoais para não ocupar a banda de 1 kbps de rádio com dados desnecessários.

Dito isso, para garantir que a rede Mesh Sorocaba seja a mais confiável possível, sugerimos as configurações abaixo. Elas foram inspiradas no sucesso da comunidade [Mntme.sh](https://mtnme.sh/) dos Montes Apalaches (EUA), que alcançou a incrível marca de 100% de entrega de mensagens entre seus quase 500 dispositivos. Embora opcionais, adotar esse padrão é um gesto de colaboração que fortalece a rede para todos dispositivos.

!!! note "Observação"
     As configurações sugeridas abaixo estão sujeitas a alterações conforme a rede Mesh Sorocaba cresça e demande novos valores.

## 📱 Dispositivos Pessoais e Móveis

Para dispositivos que você carrega consigo na bolsa ou mochila, que ficam dentro de casa sobre sua mesa, unidades veiculares e outros dispositivos de uso cotidiano.

### LoRa

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Região** | `Australia / Brazil / New Zealand` | Faixa de 915 a 928 MHz, liberada pela ANATEL |
| **Use Preset** | `ligado` | |
| **Modem Preset** | `LONG_FAST` |  |
| **OK to MQTT** | `ligado` | Permite que o dispositivo seja monitorado pelas ferramentas web e auxilia na coordenação da rede |
| **Transmit Enabled** | `ligado` | Habilite se quiser que o dispositivo seja capaz de transmitir |
| **Ignorar ciclo de trabalho** | `ligado` | Ignora o limite de ciclos, cujo limite só existe na Europa |
| **Number of Hops** | `5` |  |
| **Slot** | `0` ou `20` | 0 = calcula automaticamente a frequência com base no nome do canal primário; 20 = Número padrão do canal `LongFast` |
| **RX Boosted Gain** | `ligado` |  |

### Canais

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Nome do canal** | `LongFast` | Canal público padrão para o preset `LONG_FAST`; deve ser o primeiro canal da lista (canal primário) |
| **PSK** | `AQ==` | Chave padrão do canal |
| **Uplink ativado** | `ligado` | Permite que o dispositivo apareça nas ferramentas web e auxilia na coordenação da rede |
| **Downlink ativado** | `desligado` | Mensagens públicas somente via rádio |
| **Posição ativada** | `ligado` | Envia informação da sua posição para as ferramentas web |
| **Localização precisa** | `desligado` | |

### Usuário
| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Nome** | qualquer | Nome longo do seu dispositivo |
| **Short Name** | 4 caracteres ou um emoji | Abreviação do seu dispositivo |
| **Impossível enviar mensagens** | `desligado` | Mantenha a opção desligada para poder receber mensagens privadas |

### Dispositivo

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Papel do dispositivo** | `CLIENT_MUTE` | Use `CLIENT_MUTE` na maioria dos casos; `CLIENT` somente se houver necessidade de retransmitir dados alheios por alguma razão específica |
| **Modo de retransmissão** | `ALL` | |
| **Node Info Broadcast Interval** | `3 horas` | Não significa que o dispositivo só será visto 4x ao dia |
| **Time Zone** | `GMT3` | Ou clique em "Use phone time zone" |

### Posição

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Intervalo de difusão** | `1 hora` | Intervalo base quando estacionado |
| **Posição inteligente ativada** | `ligado` | Atualiza a posição do dispositivo somente se você se deslocar além de uma certa distância |
| **Intervalo mínimo da transmissão inteligente** | `15 minutos` | Intervalo de difusão quando em movimento |
| **Distância mínima da transmissão inteligente** | `200` | Deslocamento mínimo em metros para que posição seja atualizada |
| **Usar posição fixa** | `desligado` | dispositivos móveis devem usar GPS/Localização do celular |
| **Intervalo de atualização do GPS (segundos)** | `900` (15 minutos) |  |
| **Position Flags** | `ALTITUDE` e `ALTITUDE_MSL` | Qualquer outra informação sobre o sensor apenas ocupa a banda desnecessariamente  |

### MQTT

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Endereço** | `mqtt.meshtastic.org` | |
| **Nome de usuário** | `meshdev` | |
| **Senha** | `large4cats` | |
| **Criptografia ativada** | `ligado` | |
| **Saída JSON ativada** | `desligado` | |
| **TLS ativado** | `desligado` | |
| **Tópico principal** | `msh/BR/meshsorocaba` | |
| **Proxy para cliente ativado** | `ligado` ou `desligado` | `ligado` se o dispositivo só pode se comunicar pela internet através do seu celular | 

### Telemetria
| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Send Device Telemetry** | `desligado` | Ao contrário de um dispositivo solar ou uma estação base, não é necessário anunciar seu nível de bateria a toda a malha |
| **Módulo de métricas do ambiente ativado** | `desligado` | Não é útil para dispositivos portáteis |

---

## 🏠 Infraestrutura Pessoal

Para estações-base residencias como dispositivos instalados no telhado, mastros em quintais ou no alto de prédios urbanos.

### LoRa

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Região** | `Australia / Brazil / New Zealand` |  |
| **Use Preset** | `ligado` | |
| **Modem Preset** | `LONG_FAST` |  |
| **Ignorar MQTT** | `ligado` |  |
| **OK to MQTT** | `ligado` |  |
| **Transmit Enabled** | `ligado` | |
| **Ignorar ciclo de trabalho** | `ligado` |  |
| **Number of Hops** | `3` | Número de hops alto não é útil para dispositivos de infraestrutura, pois normalmente não origina tráfego |
| **Slot** | `0` ou `20` |  |
| **RX Boosted Gain** | `ligado` |  |

### Canais

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Nome do canal** | `LongFast` | |
| **PSK** | `AQ==` | Chave padrão do canal |
| **Uplink ativado** | `ligado` | Permite que o dispositivo seja monitorado pelas ferramentas web e auxilia na coordenação da rede |
| **Downlink ativado** | `desligado` | Evitar retransmissões desnecessárias de todo o servidor MQTT para o rádio |
| **Posição ativada** | `ligado` | |
| **Localização precisa** | `ligado` ou `desligado` | A critério do usuário |

### Usuário
| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Nome** | qualquer | Considere adicionar um emoji que sugira o tipo de estrutura da instalação (🌳, 🏠, 🏢, 🗼, ⛰️, etc.), e opcionalmente 📵 como sufixo para salientar que se trata de um dispositivo não-monitorado |
| **Short Name** | 4 caracteres |  |
| **Impossível enviar mensagens** | `desligado` | Para dispositivos não-monitorados, evita que usuários enviem mensagens na espera de uma resposta |

### Dispositivo

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Papel do dispositivo** | `CLIENT` ou `CLIENT_BASE` | `CLIENT_BASE` ajuda a garantir que as mensagens de dispositivos favoritados tenham prioridade |
| **Modo de retransmissão** | `CORE_PORTNUMS_ONLY` | Ignora pacotes de portnums não-padrão (TAK, RangeTest, PaxCounter, etc). |
| **Node Info Broadcast Interval** | `6 horas` | Não significa que o dispositivo só será visto somente 2x/dia; qualquer pacote transmitido contém info sobre o dispositivo |
| **Time Zone** | `GMT3` | Ou clique em "Use phone time zone" |

### Posição

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Intervalo de transmissão de posição (segundos)** | `1 hora` | Por ser um dispositivo estacionário, não há necessidade de anunciar posição com frequência |
| **Posição inteligente ativada** | `desligado` | dispositivo estacionário, não é necessário |
| **Usar posição fixa** | `ligado` | Defina as coordenadas manualmente no app se não houver GPS por hardware |
| **Intervalo de atualização do GPS (segundos)** | `12 horas` | Para dispositivos com sensor de GPS mesmo sendo estacionários |
| **Position Flags** | `ALTITUDE` e `ALTITUDE_MSL` | Qualquer outra informação transmitida sobre o sensor de GPS apenas ocupa tempo de banda desnecessariamente  |

### MQTT

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Endereço** | `mqtt.meshtastic.org` | |
| **Nome de usuário** | `meshdev` | |
| **Senha** | `large4cats` | |
| **Criptografia ativada** | `ligado` | |
| **Saída JSON ativada** | `desligado` | |
| **TLS ativado** | `desligado` | |
| **Tópico principal** | `msh/BR/meshsorocaba` | |
| **Proxy para cliente ativado** | `ligado` ou `desligado` | `ligado` se o dispositivo só pode se comunicar pela internet através do seu celular | 

### Telemetria

| **Opção** | **Valor** | **Observações** |
| :--- | :--- | :--- |
| **Send Device Telemetry** | `2 horas` | Apenas para dispositivos solares, caso deseje acompanhar os níveis de bateria; caso contrário, desabilite |
| **Módulo de métricas do ambiente ativado** | `2 horas` | Apenas se equipado; usado para verificar vazamentos de bateria ou superaquecimento; caso contrário, desabilite |

---

## 🏔️ Infraestrutura Pública (Roteadores)

Para dispositivos confiáveis e instalados permanentemente, gerido por voluntários e capazes de conectar múltiplas regiões que outrotra estariam isoladas. Geralmente estão instalados em torres de antena com 20 metros ou morros elevados e montanhas; propícios para cobrir uma grande extensão de região metropolitana de Sorocaba.

!!! warning "Atenção"
    Dispositivos de infraestrutura pública usualmente recebem uma configuração especial e devem ser debatidos entre a comunidade antes de serem ativados. Roteadores mal posicionados ou mal configurados podem causar degradação em toda a rede. Por garantia, leia a documentação [Pré-Requisitos para Roteadores Meshtastic](roteadores.md) e, uma vez atendendo a todos os pré-requisitos, entre em contato com a comunidade Mesh Sorocaba.

