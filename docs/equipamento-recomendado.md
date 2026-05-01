# Equipamento Recomendado da Mesh Sorocaba

Existem vários modelos de dispositivos compatíveis com o MeshCore, o firmware oficial da Mesh Sorocaba. Alguns podem vir anunciados como "feito para o MeshCore" ou "feito para o Meshtastic". Via de regra, se um dispositivo funciona com o Meshtastic, que é um firmware mais antigo, provavelmente funciona também com o MeshCore. Na dúvida, consulte a [lista de dispositivos suportados pelo MeshCore](https://flasher.meshcore.io/).

## Dispositivos Pessoais e Móveis
Os aparelhos abaixo são apropriados tanto para iniciantes quanto usuários experientes. São aparelhos que já vêm prontos para usar e são ideais para uso móvel ou pessoal.

Uma exceção a essas condições é o Heltec V3 que, apesar de já vir com a tela e outros componentes soldados na placa, alguns não vem com bateria nem case. Ele está incluído na lista por ter o menor preço de todos e por ser normalmente a porta de entrada ao mundo das redes mesh.

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
    Preços consultados em 27 de abril de 2026, já somando frete e impostos.

!!! warning "Atenção"
    Na hora da compra, independente da marca do dispositivo, certifique-se que ele é capaz de transmitir na faixa de **915 MHz**.

### Repetidoras

Os dispositivos pessoais não tem um grande alcance, seja pela antena que costuma ser mais compacta pela praticidade, ou pelo fato desses dispositivos estarem dentro de casa ou de veículos. Portanto, é sempre recomendado colocar uma repetidora no exterior para garantir que você usufrue a Mesh Sorocaba sem dores de cabeça.

Repetidoras usam o mesmo hardware que os dispositivos pessoais, mas com firmwares diferentes. Elas podem ser alimentadas pela rede elétrica ou por pequenas placas solares e geralmente são alojadas, juntamente com as baterias, em uma caixa hermética.

Você pode comprar repetidoras de marcas conhecidas ou adquirir diretamente de outros usuários, que confeccionam repetidoras sob encomenda.

<!-- 
<div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin: 1.5rem 0;">
  <div style="flex: 1 1 150px; max-width: 200px; text-align: center;">
    <img src="/img/gitfos_gat562.jpg" alt="Heltec V3" style="width: 100%; height: auto; border-radius: 0.5rem;">
    <p style="margin-top: 0.5rem; font-weight: 500;">Gitfos GAT562</p>
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

## Antenas

-->