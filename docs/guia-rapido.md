# Guia Rápido

## Como funciona uma rede mesh

Redes mesh, ou simplesmente malhas, funcionam como um sistema de mensagens que **não depende de wifi nem de sinal de celular**. Imagine uma conversa por WhatsApp, mas com a capacidade de enviar mensagens de texto que podem "saltar" de um dispositivo para outro até chegar ao destinatário sem depender da internet.

Cada dispositivo na rede é chamado de **nó**. Quando você envia uma mensagem, ela viaja de nó em nó até encontrar quem deve recebê-la. Quanto mais pessoas participam da rede com seus dispositivos, maior é o alcance e melhor funciona a comunicação para todos.

![Exemplo de malha Meshtastic](img/lora-mesh-darkbg.png)

**Alguns pontos importantes:**

- **Alcance**: Um único dispositivo pode se comunicar a vários quilômetros de distância em linha de visada. Em área urbana com obstáculos, o alcance é menor, mas a rede se beneficia de múltiplos nós.
- **Privacidade**: As mensagens são criptografadas. Somente o destinatário, seja uma pessoa ou várias (em um canal), consegue ler o conteúdo.
- **Bateria**: Os dispositivos consomem pouca energia e podem funcionar por dias ou até meses com uma única carga, dependendo do modelo e uso.
- **Custo**: Não há mensalidade nem contrato. Você compra o dispositivo uma vez e usa à vontade.

## Escolhendo um dispositivo

Existem vários modelos de dispositivos compatíveis com o MeshCore e o Meshtastic. Via de regra, se um dispositivo é anunciado como feito para o Meshtastic, quase sempre funciona para o MeshCore também. Na dúvida, consulte-nos nos canais do Telegram.

### Dispositivos Recomendados

Os aparelhos abaixo são apropriados tanto para iniciantes quanto usuários experientes. São aparelhos que já vêm prontos para usar (exceto pelo Heltec V3, que precisa ser montado e a bateria comprada a parte, mas incluído aqui pelo preço diferencial).

<div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin: 1.5rem 0;">
  <div style="flex: 1 1 150px; max-width: 200px; text-align: center;">
    <img src="/img/heltec_v3.webp" alt="Heltec V3" style="width: 100%; height: auto; border-radius: 0.5rem;">
    <p style="margin-top: 0.5rem; font-weight: 500;">Heltec V3</p>
  </div>
  <div style="flex: 1 1 150px; max-width: 200px; text-align: center;">
    <img src="/img/wishmesh_tag.webp" alt="RAK WisMesh Tag" style="width: 100%; height: auto; border-radius: 0.5rem;">
    <p style="margin-top: 0.5rem; font-weight: 500;">RAK WisMesh Tag</p>
  </div>
  <div style="flex: 1 1 150px; max-width: 200px; text-align: center;">
    <img src="/img/wio_tracker.webp" alt="Seeed Wio Tracker L1 Pro" style="width: 100%; height: auto; border-radius: 0.5rem;">
    <p style="margin-top: 0.5rem; font-weight: 500;">Wio Tracker L1</p>
  </div>
  <div style="flex: 1 1 150px; max-width: 200px; text-align: center;">
    <img src="/img/lilygo_techo.jpg" alt="Lilygo T-Echo" style="width: 100%; height: auto; border-radius: 0.5rem;">
    <p style="margin-top: 0.5rem; font-weight: 500;">Lilygo T-Echo</p>
  </div>
</div>


| Modelo                       | Preço Médio | Processador | Bateria | WiFi | Bluetooth | Tela | GPS  | Observações                                                                |
| :--------------------------- | :---------- | :---------- | :------ | :--- | :-------- | :--- | :--- | :------------------------------------------------------------------------- |
| **Heltec V3**                | R$ 293,00   | ESP32       | Não     | Sim  | Sim       | OLED  | Não  | Case e bateria comprados à parte; consome mais bateria, porém mais barato. |
| **RAK WisMesh Tag**          | R$ 344,67   | nRF52840    | Sim     | Não  | Sim       | (sem tela)  | Sim  | Compacto, ideal para carregar no bolso; porém, carregador não é USB-C.     |
| **Seeed Wio Tracker L1 Pro** | R$ 381,54   | nRF52840    | Sim     | Não  | Sim       | OLED  | Sim  | O botão funciona como um joystick para navegar o menu.                     |
| **Lilygo T-Echo**            | R$ 580,58   | nRF52840    | Sim     | Não  | Sim       | E-ink  | Sim  | Tela e-paper (tipo Kindle) com retro-iluminação por toque.                 |

!!! info
    Preços consultados em 27 de abril de 2026.

!!! warning "Atenção"
    Na hora da compra, independente da marca do dispositivo, certifique-se que ele é capaz de transmitir na faixa de **915 MHz**.

### Antenas

A antena que acompanha o dispositivo geralmente é suficiente para uso comum, mas longe do ideal. Se quiser aumentar o alcance, é possível trocar por uma antena externa de maior ganho. A comunidade pode ajudar com recomendações.

## Onde comprar

Você pode encontrar dispositivos compatíveis com Meshtastic (e, consequentemente, MeshCore) em lojas internacionais e em alguns vendedores brasileiros:

### Lojas internacionais

- **AliExpress**: Grande variedade e preços competitivos. O prazo de entrega costuma ser de 2 a 8 semanas.
- **Amazon (EUA)**: Entrega mais rápida, mas frete mais caro.
- **Lilygo Store** (AliExpress): Loja oficial do fabricante Lilygo.

!!! warning "Atenção"
    Verifique se o dispositivo é compatível com a frequência **915 MHz**, que é a autorizada no Brasil. Alguns modelos são vendidos em frequências diferentes (como 868 MHz ou 433 MHz) e **não podem ser usados legalmente no país**.

### Vendedores nacionais

Alguns membros da comunidade Meshtastic Brasil revendem dispositivos já trazidos para o país. A vantagem é a entrega mais rápida e suporte em português. Consulte o grupo [Meshtastic Brasil no Telegram](https://t.me/meshtastic_br) para indicações atualizadas.


## Configuração inicial

Depois de adquirir seu dispositivo, escolha qual sistema instalar:

- Se você quer fazer uso extensivo de sensores (temperatura, luminosidade, umidade, etc.) e monitorá-los de forma rápida e fácil pela Internet, ou brincar com a troca de mensagens via rede mesh em pequenos grupos (acampamentos, shows, eventos), use o Meshtastic.
- Se você quer se dedicar à troca de mensagens com a comunidade de Sorocaba e região, com maior garantia de que suas mensagens chegarão ao destino, use o MeshCore.

**tl;dr** Ambos o MeshCore e o Meshtastic são sistemas de mensagens em mesh que oferecem a opção de mensagens públicas ou privadas (e criptografadas). O Meshtastic possui mais usuários, porém funciona melhor com pequenos grupos. O MeshCore possui um algoritmo de roteamento mais robusto, sendo mais indicado para a comunicação entre comunidades.

!!! info "Nota"
    Ambos os sistemas funcionam melhor quando um "nó" é instalado em uma localização mais privilegiada, como no telhado, na sacada de prédios ou em postes altos e dedicado somente à repetição de mensagens. Portanto, é aconselhável a aquisição de no mínimo dois dispositivos: um como repetidor, outro para dentro das residências ou uso móvel.

## Dúvidas frequentes

### Preciso de licença de radioamador?

**Não.** Os dispositivos Meshtastic operam na faixa de 915 MHz, que é destinada a dispositivos de baixa potência e não requer licenciamento específico no Brasil.

### Posso usar sem celular?

**Sim.** Alguns dispositivos possuem tela e podem funcionar de forma independente. O celular é usado principalmente para configurar o dispositivo e digitar mensagens mais confortavelmente.

### Qual o alcance real?

Varia muito. Em campo aberto com linha de visada, pode ultrapassar 10 km. Em área urbana com prédios, o alcance é reduzido para alguns quilômetros ou menos. A presença de outros nós intermediários ajuda a estender a comunicação.

## Precisa de ajuda?

Entre em contato conosco pelo [Telegram](https://t.me/meshsorocaba) ou pela [comunidade Meshtastic Brasil](https://t.me/meshtastic_br). A comunidade é acolhedora e está sempre disposta a ajudar novos participantes.
