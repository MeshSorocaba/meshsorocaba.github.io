---
date: 2026-04-13
authors: 
  - Bruno
---

# Testando presets do MeshCore para São Paulo e região

Foi realizada uma bateria de testes entre dois dispositivos com 75 km de distância — um no Morro de Araçoiaba, outro no Morro da Placa na Serra do Japi — para decidirmos qual o melhor preset para a região. De todas as configurações, o preset **Australia: SA, WA** foi o que melhor se saiu. 

<!-- more -->

## Contexto

Enquanto o Júnior (PY2PE) estava a caminho da torre no alto da Serra do Japi para instalar uma nova repetidora MeshCore, eu e o Marcelo Cordeiro resolvemos aproveitar a ocasião para testarmos combinações diferentes de frequência, largura de banda, spreading factor e coding factor. A ideia era fechar com a melhor configuração possível naquele momento para evitar uma nova subida até a torre da repetidora posteriormente.

O Brasil não possui (ainda) um preset oficial, portanto decidimos testar os presets australianos, como já é feito no Meshtastic.

Enquanto eu permaneci à meia altura do Morro de Araçoiaba, o Cordeiro se posicionou no alto do Morro da Placa em Cajamar.

![](/img/aracoiabajapi.jpg)

## Teste 1: Preset "Australia (Narrow)" com SF=8
- Frequência: 916.575
- BW: 62.5
- SF: 8
- CR: 8
- Link Budget (teórico): 151.5 dB

Nosso primeiro teste foi bem sucedido e eu recebi a mensagem do Cordeiro logo de primeira. Praticamente todas as mensagens foram enviadas com sucesso, salve algumas que, por conta da euforia, foram enviadas uma seguida da outra. Essa sequência rápida de mensagens pode ter saturado o canal.

Apesar de funcionando, as mensagens demoravam alguns segundos para chegarem ao destino.

## Teste 2: Preset "Australia (Narrow)" padrão
- Frequência: 916.575
- BW: 62.5
- SF: 7
- CR: 8
- Link Budget (teórico): 149.0 dB

Por conta do SF menor, o link budget piorou em 2.5 dB segundo os cálculos, o que acabou se confirmando na prática. Algumas mensagens chegavam ao destino, outras não. Repetimos o teste uma segunda vez e, de repente, nenhuma das mensagens passou a chegar.

Ao subir o SF pra 8, as mensagens voltaram a fluir, mas só depois de 2 ou 3 tentativas. 

## Teste 3: Preset "Australia: SA, WA"
- Frequência: 923.125
- BW: 62.5
- SF: 8
- CR: 8
- Link Budget (teórico): 151.5 dB

As mensagens **voavam**! Tanto o envio quanto a resposta eram imediatos. Eu senti como se estivessemos usando o WhatsApp. 

Os fatores de SF e CR foram os mesmos do **Australia Narrow** depois de subirmos o SF para 8. Porém os resultados foram bem melhores. Isso indica que possivelmente a frequência de 916.575 MHz do **Australia Narrow** esteja sofrendo interferências. A frequência do **Australia: SA, WA** de 923.125 MHz, mesmo que um pouco mais distance da frequência ressonante das nossas antenas, teve um desempenho visivelmente superior.

## Teste 4: Preset "Australia" padrão

- Frequência: 915.8
- BW: 250
- SF: 10
- CR: 5
- Link Budget (teórico): 151.0 dB

Apesar do **link budget** ser praticamente idêntico aos presets testados anteriormente, nenhuma mensagem chegou ao destino.

## Conclusões

A teoria por trás das propriedades do protocolo LoRa garantem que o tempo-no-ar de uma transmissão se correlaciona fortemente com o *link budget* (a soma de todas as perdas e ganhos em dB do sistema).

No entanto, mantendo o mesmo link budget, a combinação de banda mais estreita (62.5 kHz vs. 250 kHz) e a frequência de 923.125 MHz (vs. 916.5 e 915.8 MHz) teve um desempenho significativamente superior. Ou seja, apesar de todos os presets terem uma robustez semelhante de acordo com a teoria, percebemos que há outros fatores em jogo além dessas propriedades.

Porém, visto que o teste com 250 kHz de largura tinha um budget estimado **maior** que a de 62.5 kHz, suspeito que os europeus, norte-americanos e australianos estejam certos sobre a eficiência de sinais mais estreitos. É possível observar no [mapa oficial do MeshCore](https://map.meshcore.io), por exemplo, que praticamente o mundo inteiro migrou para o sinal de 62.5 kHz de largura. Vídeos a respeito do tema podem ser vistos [aqui](https://www.youtube.com/watch?v=egLcRr7moj0) e [aqui](https://www.youtube.com/watch?v=31ZKal-LZNQ).

Concluimos, então, que para o propósito de estabelecer uma conexão entre as torres mais altas ao redor de São Paulo, dada a distância que se encontram, é necessário que adotemos o padrão **Australia: SA, WA**. Esse preset possivelmente nos permitirá estabelecer uma malha que cubra não somente a região de Sorocaba, mas também a região metropoliana de São Paulo.