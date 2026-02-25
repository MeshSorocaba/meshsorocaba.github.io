# Como participar da rede Meshtastic

## Como funciona a rede

A rede Meshtastic funciona como um sistema de mensagens que **não depende de wifi nem de sinal de celular**. Imagine uma conversa por WhatsApp, mas com a capacidade de enviar mensagens de texto que podem "saltar" de um dispositivo para outro até chegar ao destinatário sem depender da internet.

Cada dispositivo na rede é chamado de **nó**. Quando você envia uma mensagem, ela viaja de nó em nó até encontrar quem deve recebê-la. Quanto mais pessoas participam da rede com seus dispositivos, maior é o alcance e melhor funciona a comunicação para todos.

**Alguns pontos importantes:**

- **Alcance**: Um único dispositivo pode se comunicar a vários quilômetros de distância em linha de visada. Em área urbana com obstáculos, o alcance é menor, mas a rede se beneficia de múltiplos nós.
- **Privacidade**: As mensagens são criptografadas. Somente o destinatário, seja uma pessoa ou várias (em um canal), consegue ler o conteúdo.
- **Bateria**: Os dispositivos consomem pouca energia e podem funcionar por dias ou até meses com uma única carga, dependendo do modelo e uso.
- **Custo**: Não há mensalidade nem contrato. Você compra o dispositivo uma vez e usa à vontade.

## Escolhendo um dispositivo

Existem vários modelos de dispositivos compatíveis com Meshtastic. Para quem está começando, recomendamos considerar os seguintes fatores:

### Dispositivos prontos para uso

São aparelhos que já vêm montados e prontos para usar — basta carregar a bateria e parear com o celular:

| Modelo | Bateria | Tela | Observações |
| :--- | :--- | :--- | :--- |
| **RAK WisMesh Pocket** | Incluída (até 1 semana) | Sim | Compacto, ideal para carregar no bolso. Recomendado para iniciantes. |
| **Lilygo T-Echo** | Incluída (até 1 semana) | Sim | Tela e-paper (tipo Kindle), fácil leitura mesmo no sol. |
| **Lilygo T-Beam** | Incluída (até 1 semana) | Sim | Inclui GPS integrado. Um pouco maior que os anteriores. |
| **Heltec V3** | Não incluída | Sim | Menos recursos que os anteriores, porém mais barato. |
| **RAK WisBlock** | Não incluída | Depende | Sistema modular que permite adicionar sensores e baterias. Mais versátil, mas exige mais conhecimento. |

!!! tip "Dica para iniciantes"
    Se você não tem experiência com eletrônica, comece com um dispositivo pronto como o **RAK WisMesh Pocket** ou **Lilygo T-Echo**. Eles eliminam a necessidade de solda ou montagem de componentes.

### Antenas

A antena que acompanha o dispositivo geralmente é suficiente para uso comum, mas longe do ideal. Se quiser aumentar o alcance, é possível trocar por uma antena externa de maior ganho. A comunidade pode ajudar com recomendações.

## Onde comprar

Você pode encontrar dispositivos Meshtastic em lojas internacionais e em alguns vendedores brasileiros:

### Lojas internacionais

- **AliExpress**: Grande variedade e preços competitivos. O prazo de entrega costuma ser de 2 a 8 semanas.
- **Amazon (EUA)**: Entrega mais rápida, mas frete mais caro.
- **Lilygo Store** (AliExpress): Loja oficial do fabricante Lilygo.

### Vendedores nacionais

Alguns membros da comunidade Meshtastic Brasil revendem dispositivos já trazidos para o país. A vantagem é a entrega mais rápida e suporte em português. Consulte o grupo [Meshtastic Brasil no Telegram](https://t.me/meshtastic_br) para indicações atualizadas.

!!! warning "Cuidado"
    Verifique se o dispositivo é compatível com a frequência **915 MHz**, que é a autorizada no Brasil. Alguns modelos são vendidos em frequências diferentes (como 868 MHz ou 433 MHz) e **não podem ser usados legalmente no país**.

## Configuração inicial

Depois de adquirir seu dispositivo, siga estes passos básicos:

### 1. Instale o aplicativo

Baixe o aplicativo Meshtastic no seu celular:

- **Android**: [Google Play](https://play.google.com/store/apps/details?id=com.geeksville.mesh) ou [F-Droid](https://f-droid.org/packages/com.geeksville.mesh/)
- **iOS**: [App Store](https://apps.apple.com/us/app/meshtastic/id1589025257)

### 2. Pareie o dispositivo

1. Ligue o dispositivo Meshtastic
2. Ative o Bluetooth do celular
3. Abra o aplicativo e toque em "Conectar"
4. Selecione seu dispositivo na lista

### 3. Configure seu nome

No aplicativo, acesse as configurações do nó e defina um nome para identificá-lo na rede. Pode ser seu apelido ou nome — é o que outros verão quando você estiver na rede.

### 4. Verifique o canal

Certifique-se de que o canal está configurado como **LongFast** (o padrão público). Isso permite que você se comunique com outros dispositivos da região.

### 5. Teste a comunicação

Se houver outros nós por perto, você eventualmente verá eles aparecerem na lista de nós do aplicativo. Isso pode levar um tempo (algumas horas), já que os dispositivos são configurados com um certo intervalo para não ocuparem constantemente a banda. Tente enviar uma mensagem no canal público para verificar se está tudo funcionando.

---

Uma vez testado seu Meshtastic com a configuração inicial, recomendamos visitar a página [Configuração Recomendada](configuracao/) para saber quais são os valores sugeridos para os nós de Meshtastic na região de Sorocaba.

## Dúvidas frequentes

### Preciso de licença de radioamador?

**Não.** Os dispositivos Meshtastic operam na faixa de 915 MHz, que é destinada a dispositivos de baixa potência e não requer licenciamento específico no Brasil.

### Posso usar sem celular?

**Sim.** Alguns dispositivos possuem tela e podem funcionar de forma independente. O celular é usado principalmente para configurar o dispositivo e digitar mensagens mais confortavelmente.

### E se não houver ninguém por perto?

A rede cresce com a participação. Você pode ser o primeiro da sua região e, com o tempo, mais pessoas se juntam. Também existe a possibilidade de conectar-se via internet (MQTT) para interagir com a rede mesmo sem nós físicos próximos.

### Qual o alcance real?

Varia muito. Em campo aberto com linha de visada, pode ultrapassar 10 km. Em área urbana com prédios, o alcance é reduzido para alguns quilômetros ou menos. A presença de outros nós intermediários ajuda a estender a comunicação.

## Precisa de ajuda?

Entre em contato conosco pelo [Telegram](https://t.me/meshsorocaba) ou pela [comunidade Meshtastic Brasil](https://t.me/meshtastic_br). A comunidade é acolhedora e está sempre disposta a ajudar novos participantes.
