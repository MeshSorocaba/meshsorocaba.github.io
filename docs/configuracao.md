# Configuração da Mesh Sorocaba

## Por que não usar a configuração padrão?

A configuração padrão do Meshtastic possui uma limitação: a partir de 30 dispositivos numa mesma região, a taxa de falha no recebimento de mensagens aumenta drasticamente. Isso ocorre porque os dispositivos Meshtastic, por natureza, transmitem uma grande quantidade de informações: identificação, localização, telemetria (leitura de sensores internos e externos aos dispositivos), dados sobre dispositivos na vizinhança e — o que alguns consideram um equívoco dos desenvolvedores — mensagens do país inteiro recebidas via Internet (MQTT) e retransmitidas via rádio. Quando muitos dispositivos enviam tantas informações ao mesmo tempo numa banda de rádio tão restrita, a colisão de pacotes aumenta, atrapalhando o tráfego de mensagens que realmente importam.

A fim de contornar essa limitação, comunidades pelo mundo passaram a encorajar seus usuários a usarem configurações alternativas. Geralmente, essas configurações focam em reduzir a publicação de telemetria e atribuir papéis específicos aos dispositivos pessoais para não ocupar a banda de 1 kbps de rádio com dados desnecessários.

Dito isso, para garantir que a rede Mesh Sorocaba seja a mais confiável possível, sugerimos as configurações abaixo. Elas foram inspiradas no sucesso da comunidade [Mntme.sh](https://mtnme.sh/) dos Montes Apalaches (EUA), que alcançou a incrível marca de 100% de entrega de mensagens entre seus quase 500 dispositivos. Embora opcionais, adotar esse padrão é um gesto de colaboração que fortalece a rede para todos dispositivos.

!!! note "Observação"
     As configurações sugeridas abaixo estão sujeitas a alterações conforme a rede Mesh Sorocaba cresça e demande novos valores.

## Tipos de dispositivos

As configurações devem variar de acordo com o tipo de dispositivo:

🤳 **Dispositivos Pessoais e Móveis**: aqueles você carrega consigo na bolsa ou mochila, que ficam dentro de casa sobre sua mesa, unidades veiculares e outros dispositivos de uso cotidiano. Normalmente não estão em uma posição privilegiada, não possuem uma grande antena, ou estão constantemente se movendo.

🗼 **Dispositivos de Infraestrutura**: estações-base como dispositivos instalados no telhado, mastros em quintais ou no alto de prédios urbanos.

## Valores

### LoRa

- **Região**: `Australia / Brazil / New Zealand`
- **Use Preset**: `ligado`
- **Modem Preset**: `LONG_FAST`
- **OK to MQTT**: `ligado`
- **Transmit Enabled**: `ligado`
- **Ignorar ciclo de trabalho**: `ligado`
- **Number of Hops**: `7`
- **Slot**: `0` ou `20`
- **RX Boosted Gain**: `ligado`

??? "Explicação"

     A região `Australia / Brazil / New Zealand` corresponde à faixa de 915 a 928 MHz, liberada pela ANATEL para dispositivos de radiação restrita com até 1W de potência. Apesar de haver uma região chamada `Brazil 902`, que vai de 902 a 908 MHz, a maioria dos dispositivos no país utiliza a primeira opção.

     A opção **OK to MQTT** permite que o dispositivo seja monitorado pelas ferramentas web e auxilia na coordenação da rede, por isso é sugerido que permaneça ligado.

     **Ignorar ciclo de trabalho** permite que o dispositivo opere a qualquer momento. Ele deve permanecer `ligado` (limites de ciclo só são exigidos na Europa).

     No número do slot, deixe em `0` para que o número seja calculado automaticamente com base no nome do preset (`LONG_FAST`), ou digite `20` para fixá-lo. O recomendado é `0` e deixar que o programa calcule o valor automaticamente.

### Canais

- **Nome do canal**: `LongFast`
- **PSK**: `AQ==`
- **Uplink ativado**: `ligado`
- **Downlink ativado**: `desligado`
- **Posição ativada**: `ligado`

??? "Explicação"

     `LongFast` é o canal público padrão para o preset `LONG_FAST`; deve ser o primeiro canal da lista.

     `AQ==` é a chave padrão do canal.

     **Uplink ativado** permite que o dispositivo apareça nas ferramentas web e auxilia na coordenação da rede.

     **Downlink ativado** deve ficar `desligado` para que mensagens públicas sejam recebidas somente via rádio; isso evita retransmissões desnecessárias do servidor MQTT para o rádio.

### Usuário

- **Nome**: qualquer
    - 🗼 Infraestrutura: considere adicionar o emoji 🔁 como sufixo.
- **Short Name**: 4 caracteres ou um emoji
- **Impossível enviar mensagens**:
    - 🤳 Pessoais/Móveis: `desligado`
    - 🗼 Infraestrutura: `ligado`

??? "Explicação"

     O emoji 🔁 como sufixo deixa claro que o dispositivo serve somente para repetir mensagens de outros dispositivos da rede e não é monitorado.

     **Impossível enviar mensagens** deve ficar `desligado` em dispositivos pessoais/móveis para poder receber mensagens privadas. Para dispositivos de infraestrutura não-monitorados, deve ficar `ligado` para evitar que usuários enviem mensagens na espera de uma resposta.

### Dispositivo

- **Papel do dispositivo**:
    - 🤳 Pessoais/Móveis: `CLIENT_MUTE`
    - 🗼 Infraestrutura: `CLIENT_BASE`
- **Node Info Broadcast Interval**:
    - 🤳 Pessoais/Móveis: `3 horas`
    - 🗼 Infraestrutura: `6 horas`
- **Time Zone**: `GMT3`

??? "Explicação"

     Para nós pessoais, prefira sempre `CLIENT_MUTE`. Em raros casos, use `CLIENT` se houver necessidade de retransmitir dados alheios por alguma razão específica.

     `CLIENT_BASE` ajuda a garantir que as mensagens de dispositivos favoritados tenham prioridade. Além disso, dispositivos `CLIENT_BASE` que tenham dispositivos `ROUTERS` adicionados à lista de favoritos não subtraem a contagem de "hops" por mensagens retransmitidas.

     O intervalo de broadcast não significa que o dispositivo só será visto algumas vezes ao dia; qualquer pacote transmitido contém info sobre o dispositivo.

     Em **Time Zone**, você também pode clicar em "Use phone time zone" em vez de definir manualmente.

### Posição

- **Intervalo de transmissão de posição**: `6 horas`
- **Posição inteligente ativada**:
    - 🤳 Pessoais/Móveis: `ligado`
    - 🗼 Infraestrutura: `desligado`
- **Intervalo mínimo da transmissão inteligente** (apenas 🤳 Pessoais/Móveis): `15 minutos`
- **Distância mínima da transmissão inteligente** (apenas 🤳 Pessoais/Móveis): `1000` metros
- **Usar posição fixa**:
    - 🤳 Pessoais/Móveis: `desligado`
    - 🗼 Infraestrutura: `ligado`
- **Intervalo de atualização do GPS (segundos)**:
    - 🤳 Pessoais/Móveis: `900`
    - 🗼 Infraestrutura: `12 horas`
- **Position Flags**: `ALTITUDE` e `ALTITUDE_MSL`

??? "Explicação"

     O intervalo de transmissão de posição é o intervalo base quando estacionado para dispositivos pessoais/móveis. Para infraestrutura, por ser um dispositivo estacionário, não há necessidade de anunciar posição com frequência.

     **Posição inteligente ativada** atualiza a posição do dispositivo somente se você se deslocar além de uma certa distância. Para dispositivos de infraestrutura, não é necessário pois são estacionários.

     O valor `900` segundos equivale a 15 minutos. O intervalo de `12 horas` é para dispositivos com sensor de GPS mesmo sendo estacionários.

     Defina as coordenadas manualmente no app se não houver GPS por hardware.

     Qualquer outra informação sobre o sensor além de `ALTITUDE` e `ALTITUDE_MSL` apenas ocupa a banda desnecessariamente.

### MQTT

- **Endereço**: `mqtt.meshsorocaba.org`
- **Nome de usuário**: `meshdev`
- **Senha**: `large4cats`
- **Criptografia ativada**: `ligado`
- **Saída JSON ativada**: `desligado`
- **TLS ativado**: `desligado`
- **Tópico principal**: `msh/BR/meshsorocaba`
- **Proxy para cliente ativado**: `ligado` ou `desligado`

??? "Explicação"

     O endereço `mqtt.meshsorocaba.org` tem downlink desabilitado por padrão; posição e telemetria são encaminhados para o servidor oficial Meshtastic somente para fins estatísticos e ajudar a promover a rede.

     **Proxy para cliente ativado** deve ficar `ligado` se o dispositivo só pode se comunicar pela internet através do seu celular.

### Telemetria

- **Send Device Telemetry**:
    - 🤳 Pessoais/Móveis: `desligado`
    - 🗼 Infraestrutura: `3 horas`
- **Módulo de métricas do ambiente ativado**:
    - 🤳 Pessoais/Móveis: `desligado`
    - 🗼 Infraestrutura: `3 horas`

??? "Explicação"

     Ao contrário de um dispositivo solar ou uma estação base, não é necessário anunciar o nível de bateria de dispositivos pessoais/móveis a toda a malha.

     O intervalo de `3 horas` para infraestrutura é apenas para dispositivos solares, caso deseje acompanhar os níveis de bateria; caso contrário, desabilite.

     O módulo de métricas do ambiente não é útil para dispositivos portáteis. Para infraestrutura, é usado para verificar vazamentos de bateria ou superaquecimento, apenas se equipado; caso contrário, desabilite.

---

## Roteadores

A função `ROUTER` destina-se a dispositivos robustos e instalados em local permanente, geridos por voluntários e capazes de conectar múltiplas regiões que outrotra estariam isoladas. Geralmente estão instalados em torres de antenas de rádio amadores de no mínimo 20 metros de altura, ou em elevações geográficas (montanhas, morros altos). São propícios para cobrir uma grande extensão de região metropolitana.

Apesar de serem necessários para uma rede Meshtastic de longo alcance, nenhum dispositivo deve ser configurado como `ROUTER` sem antes ser debatido entre a comunidade. Roteadores mal posicionados ou mal configurados podem causar degradação em toda a rede. Por garantia, leia a documentação [Pré-Requisitos para Roteadores Meshtastic](roteadores.md) e, uma vez atendendo a todos os pré-requisitos, entre em contato com a comunidade Mesh Sorocaba.
