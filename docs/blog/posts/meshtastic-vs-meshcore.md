---
date: 2026-04-27
draft: true
authors: 
  - Bruno
---

# 5 Razões Pelas Quais o Meshtastic Não Escala para Grandes Regiões

## 1. Congestão da rede devido a transmissão de telemetria

Tanto o Meshtastic quanto o MeshCore possuem uma limitação: os dispositivos devem disputar pela frequência para enviarem uma mensagem. Desse modo, torna-se essencial que os dispositivos ocupem o menor tempo de transmissão possível para dar lugar ao próximo. Caso isso não ocorra, pacotes acabam se colidindo e deixam de chegar aos destinatários.

Essa limitação é especialmente notável no Meshtastic a partir de 20 ou 30 nós numa região. Isso acontece porque dispositivos Meshtastic permitem a transmissão de uma gama de informações: identificação do dispositivo, localização, leitura de sensores, nível de bateria, dados sobre dispositivos na vizinhança, etc. Muitas dessas são enviadas por padrão, com a configuração inicial do dispositivo. 

A fim de contornar esse problema, comunidades pelo mundo passaram a encorajar seus usuários a usarem configurações alternativas que reduzissem ou eliminassem completamente a transmissão de telemetria.

Por exemplo, algumas comunidades passaram a sair do canal `LONG_FAST`, que é o padrão adotado pelo Meshtastic, e a adotar o preset `MEDIUM_FAST`, cujo tempo de transmissão de pacotes é 67% menor (embora ao custo de -4 dB na sensitividade de recepção).

Essas medidas ajudam a controlar o tempo de uso do canal. Porém, nem todo mundo tem a aptidão ou boa vontade para otimizar a configuração de seus dispositivos. Muitos donos de dispositivos abandonam seus aparelhos ligados e desatendidos e não acompanham a orientação da comunidade.

## 2. Abuso do gateway com a Internet

O Meshtastic implementa nativamente uma ponte com a Internet. A ideia dos desenvolvedores era a de permitir que malhas distantes demais pudessem se conectar via protocolo MQTT; o mesmo protocolo usado por dispositivos IoT para se comunicarem via TCP/IP.

O grandeproblema

Outra medida promovida pelas redes Meshtastic é orientar as pessoas a, voluntariamente, pararem de transmitirem na rede a telemetria de seus dispositivos, bem como desligarem o downlink do MQTT.

## 2. Baixo limite de saltos

## 3. Código monolítico