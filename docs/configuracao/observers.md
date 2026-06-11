---
title: "Como Configurar um Observer no MeshCore"
---

Observadores tem um papel especial na rede MeshCore. Eles servem para escutar o tráfego da rede mesh e encaminhar os pacotes recebidos para um servidor central. Ou seja, ele tem como foco o monitoramento passivo que captura e registra a atividade da rede em sua região.

Se você tem um repetidor com chip baseado no ESP32 e acesso a um ponto de Wifi, este dispositivo é um ótimo candidato a se tornar um Observador. Continue lendo para saber mais.

## Como funciona o modo observador

Um dispositivo observador exerce normalmente sua função de repetidor. A diferença é que, além disso, ele se conecta diretamente à rede WiFi local e envia os dados que trafegam por ele para um servidor MQTT graças um firmware customizado. Isso permite que a comunidade tenha visibilidade sobre a cobertura e atividade da rede em diferentes localidades. 

![](../img/corescope.jpg)

Visto que observadores fornecem os dados necessários para depurar problemas na rede, configurar um observer é uma excelente forma de contribuir para a comunidade.


## Como gravar o firmware de observador no dispositivo

1) Acesse o endereço [observer.gessaman.com](https://observer.gessaman.com). Atualmente, os navegadores que suportam a conexão com dispositivos via USB são o Chrome e o Firefox (nightly).

2) Selecione o modelo do seu dispositivo.

3) Escolha o modo de operação: `Repeater` (repetidor com uplink MQTT) ou `Room Server` (servidor de salas com uplink MQTT).

4) Selecione a versão do firmware disponível.

5) Clique em **Flash** para gravar o firmware diretamente pelo navegador. Se for a primeira vez que você grava esse firmware no dispositivo, marque a opção **Erase device** para gravar o firmware mesclado (merged), que inclui o bootloader e a tabela de partições atualizada.

!!! danger "Perigo"

    Esteja ciente de que, ao instalar o firmware _merged_, você perderá as configurações atuais do seu dispositivo.

## Configure o MQTT

O firmware Observer usa um sistema de **slots** (até 6 conexões MQTT simultâneas) com presets embutidos. Cada slot pode ser configurado com um broker conhecido (preset) ou com um broker personalizado (custom).

Recomendamos a seguinte configuração para observadores na nossa região:

| Slot | Broker | Preset | Descrição |
|------|--------|--------|-----------|
| 1 | `mqtt.meshcore.com.br` | `custom` | Broker comunitário MeshCore Brasil |
| 2 | MeshMapper | `meshmapper` | Broker do MeshMapper (WSS + JWT) |

Os slots 3 a 6 podem ser deixados como `none` (desativados) ou configurados com outros presets, se desejar.

### Configuração via Console Serial

Acesse o console serial usando o [recurso Console do web flasher](https://flasher.meshcore.dev/) (ícone no canto superior direito da página) ou um terminal serial (115200 baud). Configure as propriedades conforme abaixo e depois reinicie o dispositivo.

**Configurações obrigatórias:**

```
set wifi.ssid nome_da_sua_rede
set wifi.pwd sua_senha_wifi
set mqtt.iata <código IATA do principal aeroporto da sua região>
set timezone America/Sao_Paulo
```

**Configurar o Slot 1 — Broker comunitário (mqtt.meshcore.com.br):**

```
set mqtt1.preset custom
set mqtt1.server mqtt.meshcore.com.br
set mqtt1.port 1883
set mqtt1.username meshcore
set mqtt1.password meshcore
```

**Configurar o Slot 2 — MeshMapper:**

```
set mqtt2.preset meshmapper
```

O preset `meshmapper` já configura automaticamente o servidor (`mqtt.meshmapper.cc:443`), a autenticação JWT (assinatura do dispositivo) e o transporte WSS. Não é necessário definir servidor, porta ou credenciais manualmente.

!!! info "Redundância"

    Conectar a ambos os brokers é recomendado, mas não obrigatório. O MeshMapper recebe dados de múltiplos brokers e elimina duplicatas automaticamente. Se quiser apenas o broker comunitário, configure o Slot 1 e deixe o Slot 2 como `none`.

**Configurações opcionais:**

```
set mqtt.owner <chave pública do seu nó companion>
set mqtt.email <seu e-mail>
```

`mqtt.owner` e `mqtt.email` são incluídos nos tokens JWT e visíveis publicamente como identificação do proprietário do observador.

**Reinicie para conectar:**

```
reboot
```

### Verificar a configuração

Após a reinicialização, verifique se tudo está correto:

```
get wifi.status
get mqtt.status
get mqtt1.preset
get mqtt2.preset
get mqtt.iata
get bridge.enabled
get mqtt.rx
get mqtt.tx
```

O comando `get mqtt.status` mostra o estado de conexão de cada slot. Se um slot estiver conectado, ele exibirá informações como o broker e o status da autenticação.

## Dispositivos sem PSRAM

Placas sem PSRAM (como o **LilyGo T-LoRa V2.1–1.6** / TTGO LoRa32 V1.0) suportam **apenas uma conexão WSS/TLS ativa por vez**, pois cada conexão TLS exige cerca de 40 KB de memória heap. Nesse caso, configure o broker de sua preferência no Slot 1 e defina os demais slots como `none`:

```
set mqtt1.preset custom
set mqtt1.server mqtt.meshcore.com.br
set mqtt1.port 1883
set mqtt1.username meshcore
set mqtt1.password meshcore
set mqtt2.preset none
```

Dispositivos com PSRAM (como **Heltec V3**, **Heltec V4** e **Station G2**) suportam todos os slots ativos simultaneamente.

## Após a configuração

Depois que seu observador conectar e começar a enviar pacotes recebidos, pode levar até **5 minutos** para ele aparecer na lista de Observers no [CoreScope](https://corescope.meshcore.com.br) e no dropdown de Regiões em toda a aplicação, e somente após um anúncio ser recebido do seu observador.

Se um anúncio não for recebido do seu observador, ele não aparecerá no dropdown de Observadores ou na página, mas ainda assim poderá enviar pacotes para a região selecionada.

## Solução de problemas

### Dispositivo não conecta ao WiFi

```
get wifi.ssid
get wifi.pwd
set wifi.powersave none
reboot
```

### Nenhuma mensagem MQTT está sendo enviada

```
get bridge.enabled
set bridge.enabled on
get mqtt.rx
set mqtt.rx on
get mqtt.status
get mqtt1.diag
get mqtt2.diag
```

O comando `get mqttN.diag` mostra os detalhes do último erro de cada slot (por exemplo, falhas de TLS, timeout de conexão etc.).

### Problemas de fuso horário

```
get timezone
set timezone America/Sao_Paulo
```

## Precisa de ajuda?

Se você tiver problemas ou dúvidas, entre em contato com a comunidade no Telegram [MeshCore Brasil](https://t.me/meshcorebrasil).
## Código IATA

Para `mqtt.iata`, use o código do aeroporto mais próximo da sua região. Alguns exemplos:

| Cidade | Código IATA |
|--------|-------------|
| Sorocaba | SOD |
| Campinas | VCP |
| São Paulo | GRU |
| Jundiaí | QDV |

**Deve ser um código IATA válido.** Para consultar a lista completa, acesse a [Lista de aeroportos do Brasil por código aeroportuário](https://pt.wikipedia.org/wiki/Lista_de_aeroportos_do_Brasil_por_c%C3%B3digo_aeroportu%C3%A1rio_IATA).

