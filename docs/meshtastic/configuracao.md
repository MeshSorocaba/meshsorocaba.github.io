# Configuração Meshtastic Recomendada

## LoRa

- **Região**: `Australia / Brazil / New Zealand`
- **Use Preset**: `ligado`
- **Modem Preset**: `LONG_FAST`
- **OK to MQTT**: `ligado`
- **Transmit Enabled**: `ligado`
- **Ignorar ciclo de trabalho**: `ligado`
- **Number of Hops**: `7`
- **Slot**: `0` ou `20`
- **RX Boosted Gain**: `ligado`

A região `Australia / Brazil / New Zealand` corresponde à faixa de 915 a 928 MHz, liberada pela ANATEL para dispositivos de radiação restrita com até 1W de potência. Apesar de haver uma região chamada `Brazil 902`, que vai de 902 a 908 MHz, a maioria dos dispositivos no país utiliza a primeira opção.

A opção **OK to MQTT** permite que o dispositivo seja monitorado pelas ferramentas web e auxilia na coordenação da rede, por isso é sugerido que permaneça ligado.

**Ignorar ciclo de trabalho** permite que o dispositivo opere a qualquer momento. Ele deve permanecer `ligado` (limites de ciclo só são exigidos na Europa).

No número do slot, deixe em `0` para que o número seja calculado automaticamente com base no nome do preset (`LONG_FAST`), ou digite `20` para fixá-lo. O recomendado é `0` e deixar que o programa calcule o valor automaticamente.

## Canais

- **Nome do canal**: `LongFast`
- **PSK**: `AQ==`
- **Uplink ativado**: `ligado`
- **Downlink ativado**: `desligado`
- **Posição ativada**: `ligado`

`LongFast` é o canal público padrão para o preset `LONG_FAST`; deve ser o primeiro canal da lista.

`AQ==` é a chave padrão do canal.

**Uplink ativado** permite que o dispositivo apareça nas ferramentas web e auxilia na coordenação da rede.

**Downlink ativado** deve ficar `desligado` para que mensagens públicas sejam recebidas somente via rádio; isso evita retransmissões desnecessárias do servidor MQTT para o rádio.

## Usuário

- **Nome**: qualquer
- **Short Name**: 4 caracteres ou um emoji

## MQTT

- **Endereço**: `mqtt.meshsorocaba.org`
- **Nome de usuário**: `meshdev`
- **Senha**: `large4cats`
- **Criptografia ativada**: `ligado`
- **Saída JSON ativada**: `desligado`
- **TLS ativado**: `desligado`
- **Tópico principal**: `msh/BR/meshsorocaba`
- **Proxy para cliente ativado**: `ligado` ou `desligado`

O endereço `mqtt.meshsorocaba.org` tem downlink desabilitado por padrão; posição e telemetria são encaminhados para o servidor oficial Meshtastic somente para fins estatísticos e ajudar a promover a rede.

**Proxy para cliente ativado** deve ficar `ligado` se o dispositivo só pode se comunicar pela internet através do seu celular.

