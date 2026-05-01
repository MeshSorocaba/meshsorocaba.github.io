---
date: 2026-04-27
draft: true
authors: 
  - Bruno
---

# 5 Razões Pelas Quais o Meshtastic Não Escala para Grandes Regiões

## 1. Excesso de transmissões desnecessárias

Tanto o Meshtastic quanto o MeshCore possuem uma limitação: os dispositivos devem disputar pela frequência livre para enviarem uma mensagem. Desse modo, torna-se essencial que os dispositivos ocupem o menor tempo de transmissão possível para dar lugar ao próximo. Caso isso não ocorra, pacotes acabam se colidindo e deixam de chegar aos destinatários.

Essa limitação é especialmente notável no Meshtastic a partir de 20 ou 30 nós numa região. Isso ocorre porque o Meshtastic permite a transmissão de uma gama de informações: identificação do dispositivo, localização, leitura de sensores, nível de bateria, dados sobre dispositivos na vizinhança, etc. Muitas dessas são enviadas por padrão, isto é, com a configuração inicial do dispositivo. 

A fim de contornar esse problema, comunidades pelo mundo passaram a encorajar seus usuários a usarem configurações alternativas que reduzissem ou eliminassem completamente a transmissão de telemetria.

Por exemplo, algumas comunidades passaram a sair do canal `LONG_FAST`, que é o padrão adotado pelo Meshtastic, e a adotar o preset `MEDIUM_FAST`, cujo tempo de transmissão de pacotes é 67% menor (embora ao custo de -4 dB na sensitividade de recepção).

Essas medidas ajudam a controlar o tempo de uso do canal. Porém, nem todo mundo tem a aptidão ou boa vontade para otimizar a configuração de seus dispositivos. Muitos donos de dispositivos abandonam seus aparelhos ligados e desatendidos e não acompanham a orientação da comunidade.

## 2. Abuso do gateway com a Internet

O Meshtastic implementa nativamente uma ponte com a Internet. A ideia dos desenvolvedores era a de permitir que malhas distantes demais pudessem se conectar via Internet através do protocolo MQTT; o mesmo protocolo usado por dispositivos IoT para se comunicarem.

O firmware do Meshtastic, novamente por padrão, não faz distinção entre pacotes que foram recebidos pela Internet ou pelo rádio. Dessa forma, para previnir que o conteúdo de toda uma região de preset seja encaminhado para a rede via rádio, o servidor MQTT oficial do Meshtastic (`mqtt.meshtastic.org`) implementa uma política de **zero hops**. Se um pacote passa pelo servidor com destino a um canal público, o número de saltos disponíveis é automaticamente reduzido a zero.

Porém, servidores privados não implementam essa regra. Logo, dispositivos conectados a esse servidor despejam na malha tudo que recebem: de mensagens de texto a pacotes de telemetria, provenientes de dispositivos do país inteiro. 

Há duas maneiras de contornar um servidor MQTT privado mal-configurado: desabilitar o `downlink` de canais públicos e habiliar a opção `Ignorar MQTT`. A primeira opção impede que qualquer mensagem seja recebida via MQTT via canais públicos; a segunda, ignora completamente mensagens que alguma vez transitaram pela Internet em algum dos saltos.

Contúdo, mesmo que você e toda a cidade adotem essas medidas, elas irão por água abaixo se apenas um rádio estiver "mal configurado" (isto é, com a configuração padrão). Em um teste prático, observei que um dispositivo que retransmite tudo que recebe da Internet chega a ocupar a frequência até 20% do tempo em horários de máxima atividade. Para referência, com 40% de ocupação da frequência, as mensagens começam a ter problemas para chegar. Você pode ignorar esse dispositivo especificamente e não receber nenhum de seus pacots, mas a frequência continuará sendo ocupada.

## 3. Número de saltos insuficientes

A figura abaixo mostra a localização aproximada de dispositivos Meshtastic na região onde moro, mais outros que adicionei para ilustrar o problema. Os dispositivos `A` e `B` estão em um vale, separados de `D`, `E` e `F` por uma pequena elevação que impede a visada entre eles. Dessa forma, a única maneira para que uma mensagem de `A` chegue até `F` é contornando o relevo através de `C`, que está no alto de um morro.

![](img/nohops.jpg)

O firmware do Meshtastic possui um limite de 3 saltos por mensagens, podendo ser configurado até o máximo de 7. Se deixamos a configuração padrão, note que o número de saltos disponíveis acaba em `E` e a mensagem nunca chega até `F`.

"Mas se todos os dispositivos estivere configurados com 7 saltos, este problema se resolveria". De fato, neste cenário específico o problema se resolveria. Mas e quando a malha crescer para uma cidade toda? E para várias cidades? Em uma topologia semelhante a essa, especialmente onde há muitos morros e vales, o número de saltos é consumido rapidamente.
