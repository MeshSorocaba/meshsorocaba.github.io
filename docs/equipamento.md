# Equipamento Recomendado

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


| Modelo                       | Preço Médio | Processador | Bateria | WiFi | Bluetooth | Tela      | GPS  | Observações                                                                |
| :--------------------------- | :---------- | :---------- | :------ | :--- | :-------- | :-------- | :--- | :------------------------------------------------------------------------- |
| **Heltec V3**                | R$ 293,00   | ESP32       | Não     | Sim  | Sim       | OLED      | Não  | Case e bateria comprados à parte; consome mais bateria, porém mais barato. |
| **RAK WisMesh Tag**          | R$ 344,67   | nRF52840    | Sim     | Não  | Sim       | (nenhuma) | Sim  | Compacto, ideal para carregar no bolso; porém, carregador não é USB-C.     |
| **Seeed Wio Tracker L1 Pro** | R$ 381,54   | nRF52840    | Sim     | Não  | Sim       | OLED      | Sim  | O botão funciona como um joystick para navegar o menu.                     |
| **Lilygo T-Echo**            | R$ 580,58   | nRF52840    | Sim     | Não  | Sim       | E-ink     | Sim  | Tela e-paper (tipo Kindle) com retro-iluminação por toque.                 |

!!! info
    Preços consultados em 27 de abril de 2026, já somando frete e impostos.

!!! warning "Atenção"
    Na hora da compra, independente da marca do dispositivo, certifique-se que ele é capaz de transmitir na faixa de **915 MHz**.

## Repetidores

Os dispositivos pessoais não tem um grande alcance, seja pela antena que costuma ser mais compacta pela praticidade, ou pelo fato desses dispositivos estarem dentro de casa ou de veículos. Portanto, é sempre recomendado colocar um repetidor no exterior para garantir que você usufrue a Mesh Sorocaba sem dores de cabeça.

Repetidores usam o mesmo hardware que os dispositivos pessoais, mas com firmwares diferentes. Eles podem ser alimentados pela rede elétrica ou por pequenas placas solares e geralmente são alojados, juntamente com as baterias, em uma caixa hermética.

Você pode comprar repetidores de marcas conhecidas ou adquirir diretamente de outros usuários, que confeccionam repetidores sob encomenda. 

### Repetidores já montados

<div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin: 1.5rem 0;">
  <div style="flex: 1 1 150px; max-width: 200px; text-align: center;">
    <img src="/img/cordeiro.jpg" alt="Repetidor feito por Marcelo Cordeiro" style="width: 100%; height: auto; border-radius: 0.5rem;">
    <p style="margin-top: 0.5rem; font-weight: 500;">Repetidor por Marcelo Cordeiro</p>
  </div>
  <div style="flex: 1 1 150px; max-width: 200px; text-align: center;">
    <img src="/img/renatotattoo.jpg" alt="Repetidor feito por Renato Tattoo" style="width: 100%; height: auto; border-radius: 0.5rem;">
    <p style="margin-top: 0.5rem; font-weight: 500;">Repetidor por Renato Tattoo</p>
  </div>
  <div style="flex: 1 1 150px; max-width: 200px; text-align: center;">
    <img src="/img/gitfos_gat562.jpg" alt="Lilygo T-Echo" style="width: 100%; height: auto; border-radius: 0.5rem;">
    <p style="margin-top: 0.5rem; font-weight: 500;">GITFOS GAT562</p>
  </div>
</div>

| Fabricante/Modelo       | Preço Médio    | Processador | Bateria | WiFi | Bluetooth | Tela      | GPS  | Observações                                                                                                                                        |
| :---------------------- | :------------- | :---------- | :------ | :--- | :-------- | :-------- | :--- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Marcelo Cordeiro** ([Telegram](https://t.me/Cordeiro_BR))   | (sob consulta) | nRF52840    | Sim     | Não  | Sim       | (nenhuma) | Não  |                                                                                                                                                    |
| **Renato Tattoo** ([Telegram](https://t.me/Renato_Tattoo))      | (sob consulta) | nRF52840 ou ESP32    | Sim     | Somente na versão ESP32  | Sim       | (nenhuma) | Não  |                                                                                                                                                |
| **GITFOS GAT562 Solar** | R$ 429,00      | nRF52840    | Sim     | Não  | Sim       | (nenhuma) | Não  | Vem com placa solar e bateria. Exige habilidades com solda caso precise usar a porta USB. Demanda sol pleno, ou bateria não carrega completamente. |



### Hardware para montagem própria

<div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin: 1.5rem 0;">
  <div style="flex: 1 1 150px; max-width: 200px; text-align: center;">
    <img src="/img/heltec-t114.webp" alt="Heltec T114" style="width: 100%; height: auto; border-radius: 0.5rem;">
    <p style="margin-top: 0.5rem; font-weight: 500;">Heltec T114</p>
  </div>
  <div style="flex: 1 1 150px; max-width: 200px; text-align: center;">
    <img src="/img/xiao-nrf52840.webp" alt="Seeed Xiao nRF52840" style="width: 100%; height: auto; border-radius: 0.5rem;">
    <p style="margin-top: 0.5rem; font-weight: 500;">Xiao nRF52840</p>
  </div>
</div>

| Modelo                  | Preço Médio | Processador | Bateria | WiFi | Bluetooth | Tela      | GPS  | Observações                                                                                     |
| :---------------------- | :---------- | :---------- | :------ | :--- | :-------- | :-------- | :--- | :---------------------------------------------------------------------------------------------- |
| **Heltec T114**         | R$ 230,00   | nRF52840    | Não     | Não  | Sim       | (nenhuma) | Não  | Possui controlador de carga solar interno.                                                      |
| **Seeed Xiao nRF52840** | R$ 99,34    | nRF52840    | Não     | Não  | Sim       | (nenhuma) | Não  | Mais barato, porém exige mais trabalho manual. Fio de carregamento de bateria deve ser soldado. |
