---
title: Temporização e Deduplicação em Repetidores do MeshCore
---

## Resumo

Quando um repetidor MeshCore ouve um pacote, ele não o retransmite imediatamente. O firmware do MeshCore utiliza um mecanismo de atraso para espaçar as transmissões e evitar que múltiplos repetidores falem ao mesmo tempo, diminuindo o número de colisões. Esse mecanismo consiste em disparar o pacote em um momento aleatório dentro de uma janela de oportunidade pré-definida. Contudo, quando há muitos repetidores em uma mesma região, as chances de colisão podem ser significativas, mesmo que os repetidores transmitam aleatoriamente dentro de uma mesma janela.

Uma maneira inteligente de contornar esse problema é configurando um `txdelay` diferente para cada perfil de repetidor:

| Perfil | `txdelay` | Onde se aplica |
|---|---|---|
| :fontawesome-solid-house: **BAIXO** | 0.5 | Telhados, postes, instalações ao nível do solo. Poucos vizinhos, alcance local. |
| :fontawesome-solid-building: **MÉDIO** | 1.0 | Prédios, torres baixas, morros baixos. Conecta bairros e áreas suburbanas. |
| :fontawesome-solid-mountain: **ALTO** | 2.0 | Montanhas, picos, torres muito altas com boa visada de 360°. A espinha dorsal da rede. |

Dessa forma:

- Repetidores pessoais têm prioridade e fazem o trabalho local.
- Repetidores um pouco mais altos se integram suavemente, meio segundo depois, para completar o trabalho dos primeiros.
- Por último, os repetidores regionais, no alto dos picos, são acionados por último e retransmitem pacotes que necessitam sair para outras regiões (se houver).
- A rede em malha sofre menos colisões.
- As chances de entrega bem-sucedida de pacotes aumentam.

Para configurar os repetidores dessa forma, basta entrar no modo **Linha de Comando** do gerenciamento remoto e digitar:

```
set txdelay VALOR
```

Além disso, é possível adicionar um mecanismo extra de atraso baseado no **SNR** ou intensidade do sinal, configurado através do parâmetro `rxdelay`. Através dele, caminhos cujo sinal-ruído é mais forte tem maior prioridade. Por padrão, o atraso de recepção está desativado. Para ativá-lo, defina `rxdelay` para um número positivo (recomenda-se `3` para a maioria dos cenários).

```
set rxdelay 3
```

Caso você queira saber mais como esses mecanismos funcionam, continue lendo.

## Atraso de transmissão (`txdelay`)

Quando um repetidor decide encaminhar um pacote de inundação, ele **aguarda um tempo aleatório** antes de retransmitir. Esse atraso não é fixo, mas escolhido aleatoriamente dentro de um intervalo que escala com o tamanho do pacote.

O cálculo funciona assim:

1. O repetidor estima quanto tempo o pacote levaria para ser transmitido (seu **tempo no ar** ou **airtime**).
2. Multiplica-se isso por um **fator de atraso** configurável via `txdelay` (para pacotes via inundação) ou `direct.txdelay` (para pacotes diretos).
3. O atraso final é um **valor aleatório entre 0 e 5× esse resultado**.

Como o atraso é inteiramente aleatório dentro do intervalo, não há espera mínima garantida. Um pacote *pode* ser retransmitido quase imediatamente, ou pode aguardar até o máximo. A ideia é que múltiplos repetidores que ouvem o mesmo pacote escolham atrasos aleatórios diferentes, tornando colisões improváveis.

### Exemplo prático

Imagine que um repetidor recebe um pacote de inundação que levaria aproximadamente **1,5 segundos** para ser transmitido pelo ar. Com o fator de atraso padrão para inundação (`txdelay = 0.5`):

1. **Tempo no ar × fator de atraso** = 1,5 s × 0,5 = **0,75 segundo** (base de cálculo).
2. **Atraso final** = valor aleatório entre **0 e 5× a base** = entre 0 e 3,75 s.

!!! info "Nota"
    Os pacotes enviados por inundação usam um fator de atraso mais longo porque muitos repetidores podem estar envolvidos e as chances de colisão são maiores. Se o mesmo pacote fosse direto/roteado (`direct.txdelay = 0,3`), a base seria 2 s × 0,3 = 0,6 s, e o atraso final ficaria entre 0 e 3 s — intervalo mais curto, refletindo a maior prioridade do tráfego direto.


## Atraso de recepção (`rxdelay`)

Além do atraso de transmissão, existe a opção por um **atraso de recepção**. Ou seja, quando um repetidor recebe um pacote por inundação, ele não o processa imediatamente. Ele aplica um pequeno atraso baseado na **qualidade do sinal** (SNR) da cópia recebida antes de realizar qualquer ação. 

Se o parâmetro `rxdelay` da repetidora não for definido (ou tiver valor 0), o atraso de recepção não é aplicado. Caso contrário, a fórmula do atraso é dada em milisegundos por:

$$\left(r^{\,0.85 - S} - 1\right) \times t$$

Onde:

- **$r$** = `rxdelay`, configurável entre 0.0 e 20.0
- **$S$** = pontuação de qualidade do sinal (baseada no SNR), no intervalo $[0,\, 1]$
- **$t$** = tempo estimado de transmissão pelo ar (ms)

A comunidade [WNY MeshCore](https://wnymeshcore.org/blog/repeater-setup-naming-guides) da Austrália recomenda um `rxdelay` de `3.0` para todos os casos, independente do perfil do repetidor.

## Como o SNR afeta o atraso

Com `rxdelay = 3.0`, o atraso de recepção teria o seguinte efeito:

| Pontuação | Expoente | Multiplicador | Efeito |
|:---:|:---:|:---:|:---|
| 1.0 (excelente) | −0.15 | ×0.84 | Atraso curto |
| 0.5 (boa) | 0.35 | ×1.47 | Atraso moderado |
| 0.0 (ruim) | 0.85 | ×2.54 | Atraso longo |

Em outras palavras:

- Um pacote recebido com um **sinal forte e limpo** recebe um **atraso curto** (ou nenhum atraso).
- Um pacote recebido com um **sinal fraco e ruidoso** recebe um **atraso mais longo**.

!!! info "Nota"
    O atraso é limitado a um **máximo de 32 segundos**, e qualquer atraso abaixo de **50 ms** é considerado desprezível e o pacote é processado imediatamente.


O raciocínio é que um sinal forte provavelmente é a "melhor" cópia do pacote; ou seja, veio de uma fonte próxima ou teve um caminho limpo. Essa cópia deve ser encaminhada primeiro. Uma cópia fraca pode ser um eco redundante de um repetidor distante e atrasá-la dá tempo para que a cópia mais forte seja transmitida primeiro.

Se o sinal for muito ruim, o atraso pode ser bastante longo (até alguns segundos). A ideia é que se você mal conseguiu ouvir o pacote, alguém provavelmente o ouviu melhor e o encaminhará antes de você.


Por padrão, o atraso de recepção está **desativado** (`rxdelay = 0`). Todos os pacotes de inundação são processados imediatamente, independentemente da qualidade do sinal.

!!! info "Nota"
    Pacotes diretos/roteados são **sempre** processados imediatamente. O atraso de recepção só se aplica apenas ao tráfego de inundação.

## Deduplicação de pacotes

Cada repetidor mantém um **histórico rotativo** de pacotes vistos recentemente. Quando um repetidor ouve um pacote, ele verifica se o conteúdo exato desse pacote já foi visto antes. Se sim, ele **descarta a duplicata**, sem processamento ou encaminhamento.

- O histórico armazena uma impressão digital (hash) do conteúdo de cada pacote.
- Ele comporta cerca de **160 entradas recentes**.
- Conforme novos pacotes chegam, as entradas mais antigas são sobrescritas — o cache está sempre atualizado, focado no tráfego recente.

Todos os tipos de pacotes são verificados no cache antes de serem processados — dados de inundação, mensagens roteadas, anúncios, solicitações de login, confirmações, etc. Isso impede que um repetidor:

- Encaminhe o mesmo pacote de inundação múltiplas vezes (por exemplo, se ouvido de dois vizinhos diferentes).
- Processe o mesmo anúncio repetidas vezes.
- Re-encaminhe suas próprias transmissões se elas retornarem de outro repetidor.

## Retransmissões pendentes não são canceladas

Um grande detalhe: se um repetidor já enfileirou um pacote para retransmissão, ouvir esse mesmo pacote encaminhado por outro repetidor **não fará com que ele cancele sua própria transmissão pendente**.

### Exemplo prático

Imagine três repetidores: **A**, **B** e **C**, todos dentro do alcance uns dos outros.

1. O nó original envia o pacote X. Os três repetidores o ouvem.
2. Cada repetidor escolhe um atraso de retransmissão aleatório. B acontece de escolher o menor atraso.
3. B transmite X. A e C ouvem a cópia de X de B.
4. A e C reconhecem X como duplicata ("Eu já vi isso!") e **descartam a cópia recebida** — não a processam novamente nem enfileiram outra retransmissão.
5. Mas A e C **ainda têm sua própria retransmissão original de X na fila**, aguardando seus atrasos aleatórios expirarem. Essas transmissões prosseguem conforme planejado.

**Resultado:** O pacote X é enviado três vezes (uma por cada repetidor), mesmo embora a cópia de B sozinha pudesse ter sido suficiente para alcançar todos os nós downstream.

### Isso é um problema?

Na maioria dos cenários, as transmissões extras são inofensivas e resultam apenas em um pouco de tempo no ar desperdiçado. Os atrasos aleatórios tornam improvável que as transmissões redundantes colidam. E o histórico de deduplicação garante que nenhum repetidor encaminhará o mesmo pacote *mais de uma vez* — o pior caso é uma cópia extra por pacote por repetidor que ouviu o original.

No entanto, em **redes densas** com muitos repetidores em alcance próximo, isso pode levar a um congestionamento perceptível do tempo no ar. Se 10 repetidores ouvirem o mesmo pacote, todos os 10 o transmitirão, embora 2 ou 3 pudessem ter sido suficientes.

### Como isso difere de outras redes mesh

Em outras implementações de mesh LoRa, como o Meshtastic, quando um repetidor ouve um vizinho encaminhar um pacote que estava planejando encaminhar, **cancela** sua retransmissão pendente. O raciocínio: "Alguém já fez o trabalho, então eu não preciso."

A abordagem do MeshCore troca alguma eficiência de tempo no ar por **confiabilidade e simplicidade**. O pacote tem garantia de ser encaminhado por cada repetidor que ouviu o original, independentemente do tempo. Isso o torna mais robusto em redes esparsas onde nem todos os repetidores podem se ouvir, mas menos eficiente em redes densas.

## Temporização baseada na elevação da repetidora

O princípio fundamental é simples: **nós mais altos devem aguardar mais antes de retransmitir**. Isso permite que nós mais baixos, que cobrem áreas locais, transmitam primeiro e atendam ao tráfego local. Nós mais altos, com alcance muito maior, entram depois para cobrir os saltos de longa distância. O resultado é uma malha que naturalmente prefere os caminhos mais fortes e limpos, sem roteamento manual.

Quando um pacote de inundação é transmitido, todos os repetidores que o ouvem o enfileiram para retransmissão — mas cada um aguarda um tempo aleatório proporcional ao seu `txdelay`. Com a hierarquia de elevação:

1. O nó **BAIXO** (atraso curto) tem maior probabilidade de transmitir primeiro, atendendo vizinhos próximos.
2. O nó **MÉDIO** (atraso intermediário) transmite em seguida, cobrindo a área que o nó baixo não alcançou.
3. O nó **ALTO** (atraso longo) transmite por último, garantindo que o pacote alcance nós distantes que apenas a espinha dorsal consegue atingir.

O `rxdelay` complementa essa hierarquia: cópias recebidas com sinal forte (de um vizinho próximo) são processadas rapidamente; cópias com sinal fraco (ecos distantes) são atrasadas e frequentemente descartadas como duplicatas antes de gerar retransmissões. O resultado líquido é que o tráfego local é resolvido localmente, e a espinha dorsal só entra em ação quando necessário.

Essa abordagem foi desenvolvida e validada por comunidades mesh na Austrália, que enfrentaram os mesmos problemas de colisão e desperdício de tempo no ar ao implementar dezenas de repetidores em terrenos variados.

## Como configurar o atraso de transmissão por perfil de elevação

Escolha o perfil que melhor descreve a instalação do seu repetidor e aplique a configuração correspondente.

| Perfil | `txdelay` | Onde se aplica |
|---|---|---|
| **BAIXO** | 0.5 | Telhados, postes, instalações ao nível do solo. Poucos vizinhos, alcance local. |
| **MÉDIO** | 1.0 | Prédios, torres baixas, morros baixos. Conecta bairros e áreas suburbanas. |
| **ALTO** | 2.0 | Montanhas, picos, torres muito altas com boa visada de 360°. A espinha dorsal da rede. |


## Como configurar o atraso de recepção

Por padrão, o atraso de recepção está **desativado**. Para ativá-lo, defina `rxdelay` para um número positivo (recomenda-se `3` para a maioria dos cenários).

**Quando ativar:** Se você tem muitos repetidores em proximidade e nota pacotes duplicados ou colisões, ativar o atraso de RX pode ajudar a reduzir o tempo no ar redundante. Em redes esparsas com poucos repetidores, geralmente é bom deixá-lo desativado.
