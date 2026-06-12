---
title: Como Configurar um Repetidor no MeshCore
---

Os repetidores são a **espinha dorsal da rede**. Isso acontece porque os dispositivos pessoais (_companions_) **não retransmitem** mensagens; somente os repetidores fazem isso. Sem eles, o alcance da sua comunicação se limita ao raio direto entre dois companions.

A boa notícia é que repetidores MeshCore não exigem hardware diferente dos companions. O mesmo aparelho que você usa no bolso pode ser configurado como repetidor — basta mudar o firmware e instalar em um local fixo.

## O que você vai precisar

- **Um rádio LoRa compatível**: Praticamente qualquer dispositivo que funciona com Meshtastic funciona com MeshCore. Consulte a [lista de dispositivos suportados](https://flasher.meshcore.io/){:target="_blank"}. Além disso, veja a lista de [Equipamentos Recomendados](../equipamento.md).
- **Um local semi-permanente**: repetidores precisam ser fixos. Quanto mais alto, melhor.
- **Uma fonte de energia confiável**: USB, bateria, painel solar ou energia elétrica.

## Gravação do firmware (Flashing)

A forma mais simples de gravar o firmware MeshCore é usando o **web flasher** oficial.

1. Conecte o dispositivo ao computador usando um navegador baseado em Chromium (Chrome, Edge etc.) e acesse [https://flasher.meshcore.io/](https://flasher.meshcore.io/){:target="_blank"}.
2. Selecione o tipo do seu dispositivo. Você pode digitar o nome do fabricante e escolher a placa específica.
3. Escolha o modo **"Repeater"**.
4. Clique em **Flash**. Dependendo do hardware, pode ser necessário entrar no modo DFU antes. Se ocorrer um erro, tente novamente — geralmente funciona na segunda tentativa.
5. Quando solicitado, selecione **"Configure via USB"**.

    !!! warning "Importante"
        Repetidores MeshCore **não** são configurados via Bluetooth. Use sempre a configuração por USB.

6. Preencha as configurações iniciais (veja a seção abaixo).
7. Clique em **Send Advert** — isso ajuda seu companion a encontrar o novo repetidor.

## Configuração inicial

Após a gravação, acesse as configurações pela interface web em [https://config.meshcore.io/](https://config.meshcore.io/){:target="_blank"} (com o dispositivo conectado via USB) ou, mais tarde, pelo aplicativo MeshCore via gerenciamento remoto.

### Definições de rádio

Ajuste os parâmetros de rádio para a predefinição correta do Brasil:

| Parâmetro | Valor |
| :--- | :--- |
| Predefinição | **Australia: SA, WA, Brazil** |
| Frequência | 923.125 MHz |
| Largura de Banda | 62.5 kHz |
| Fator de Espalhamento | 8 |
| Taxa de Codificação | 8 |

!!! info "Por que esse preset?"
    O preset `Australia: SA, WA, Brazil` opera na faixa de 915 a 928 MHz, liberada pela Anatel para dispositivos de radiação restrita com até 1 W de potência. A frequência de 923.125 MHz foi a que apresentou menor interferência em nossos testes na região de Sorocaba.

!!! warning "Potência de transmissão (TX Power)"
    Alguns dispositivos possuem amplificador externo de potência (ex.: Station G2, Ikoka 1W/2W, RAK 1W, Heltec V4). O valor configurado no firmware **não** considera esse amplificador. Verifique a documentação do seu nó para garantir que a potência final não ultrapasse o limite legal de **30 dBm (1 W)**.

### Nome

Dê ao seu repetidor um nome que indique a localização — um marco, bairro ou ruas principais. Isso ajuda outros usuários a entender a cobertura da rede. Use o [Gerador de Nomes para Repetidores](../ferramentas/nomes-repetidores.md) para obter um nome que segue os padrões da comunidade.

### Localização

Defina a latitude e longitude em formato decimal (ex.: -23.50, -47.46). Isso permite que seu repetidor apareça nos mapas da rede.

!!! tip "Dica"
    Em vez de usar um módulo GPS (que consome bateria constantemente), defina a posição manualmente pelo mapa na interface de configuração. Basta zoom na sua área, clicar no ponto e salvar.

### Senhas

- **Admin**: defina uma senha forte. É por ela que você acessará o gerenciamento remoto do repetidor.
- **Guest**: se deixada em branco, qualquer usuário MeshCore poderá ver as informações do proprietário (_Owner Info_). Se preenchida, será exigida para visualizar esses dados.

### Informações do proprietário (_Owner Info_)

Campo de texto livre para incluir seu indicativo de radioamador, e-mail, nome no Discord ou qualquer outro contato. Útil caso alguém precise notificar você sobre um problema no repetidor. Isso é opcional e fica a seu critério.

### Intervalos de anúncio (_Advert Intervals_)

Os anúncios informam à rede que o repetidor está ativo e onde está. O MeshCore é econômico com esses anúncios, mas ainda assim vale a pena ajustar:

| Parâmetro | Valor recomendado | Descrição |
| :--- | :--- | :--- |
| Advert Interval (min) | **360** | Intervalo entre anúncios diretos (0 hop). |
| Flood Advert Interval (h) | **48** | Intervalo entre anúncios que inundam toda a rede. |

!!! tip "Rede em crescimento"
    Com poucos repetidores na região, intervalos mais curtos ajudam a rede a descobrir novos nós. Conforme a rede cresce, você pode aumentar esses valores para reduzir o tráfego de anúncios.

### Modo de repetição

Certifique-se de que o **Repeat Mode** está ativado. Sem ele, o repetidor não retransmite pacotes e não contribui para a rede.

## Configurações avançadas

As configurações abaixo são opcionais, mas podem melhorar significativamente a performance do seu repetidor e da rede como um todo.

### Temporização (txdelay e rxdelay)

Ajustar os atrasos de transmissão e recepção ajuda a reduzir colisões quando há vários repetidores na mesma área. A recomendação é configurar o `txdelay` de acordo com o perfil de elevação da instalação:

| Perfil | `txdelay` | Onde se aplica |
| :--- | :--- | :--- |
| :fontawesome-solid-house: **BAIXO** | 0.5 | Telhados, postes, nível do solo. Poucos vizinhos, alcance local. |
| :fontawesome-solid-building: **MÉDIO** | 1.0 | Prédios, torres baixas, morros. Conecta bairros. |
| :fontawesome-solid-mountain: **ALTO** | 2.0 | Montanhas, picos, torres altas com visada de 360°. Espinha dorsal regional. |

Para ativar o atraso de recepção (recomendado para a maioria dos cenários):

```bash
set rxdelay 3
```

Para entender em detalhes como funciona a temporização e a deduplicação de pacotes, consulte a página [Temporização e Deduplicação](temporizacao-e-deduplicacao.md).

### Detecção de loop

A detecção de loop faz o repetidor rejeitar pacotes flood que já circularam por ele, evitando que uma mesma mensagem seja retransmitida indefinidamente até o limite de 64 hops — o que gera uma enxurrada de pacotes e congestiona a rede.

O recurso é configurado pelo comando `set loop.detect` e aceita quatro níveis:

| Nível | Comportamento |
| :--- | :--- |
| `off` | Desativado (padrão). |
| `minimal` | Tolerante — descarta o pacote somente se o ID do repetidor já aparece várias vezes no caminho. Pode ser usado mesmo antes da rede adotar hashes multibyte. |
| `moderate` | Equilíbrio entre tolerância e proteção. |
| `strict` | Agressivo — descarta o pacote com pouquíssimas repetições do ID no caminho. |

Defina como **Moderate** para a maioria dos cenários. Isso protege a rede contra repetidores com firmware problemático que corrompem e retransmitem o mesmo pacote em loop.

A lógica de detecção combina o nível escolhido com o tamanho do hash de caminho do pacote para determinar quantas vezes o ID do próprio repetidor pode aparecer no caminho antes de o pacote ser descartado:

| Nível \ Hash | 1 byte | 2 bytes | 3 bytes |
| :--- | :---: | :---: | :---: |
| `minimal` | 4 | 2 | 1 |
| `moderate` | 2 | 1 | 1 |
| `strict` | 1 | 1 | 1 |

### Multi ACKs

**Ative** essa opção. Ela faz o repetidor enviar 2 confirmações em vez de 1, melhorando a experiência de gerenciamento remoto.

### AGC Reset

Se perceber que o repetidor fica "surdo" após algum tempo de funcionamento, configure o intervalo de reset do AGC para um valor maior que 0 (o mínimo é 4). Quanto menor o valor, mais frequente será o reset. Valor recomendado: 300.

## Gerenciamento remoto

Antes de instalar o repetidor em um local de difícil acesso, pratique o gerenciamento remoto usando um companion:

1. No app MeshCore, vá em **Contato** → **Adicionar Contato**.
2. Preencha:
    - **Tipo**: Repeater
    - **Nome**: o nome do seu repetidor
    - **Chave Pública**: a chave gerada durante a configuração
3. Salve o contato.
4. Clique no nome do repetidor ou clique nos três pontos e selecione **Gerir**.
5. Insira a senha de admin e faça login.

Agora você pode ver estatísticas, emitir comandos de console e reconfigurar o repetidor sem precisar de acesso físico.

## Posicionamento

Um repetidor com antena omnidirecional precisa de **linha de visada** para outros repetidores. Isso significa instalá-lo o mais alto possível:

- No **telhado** ou em um **mastro** acima da laje
- Em local **aberto**, sem obstáculos próximos
- Para antenas direcionais, aponte para o repetidor que deseja conectar

Quanto melhor o posicionamento, maior o alcance efetivo e menos repetidores a rede precisa para cobrir a mesma área.

## Testando seu repetidor

Depois de configurada e instalada:

1. Acesse o [CoreScope](https://corescope.meshsorocaba.org){:target="_blank"} e busque pelo nome ou chave pública do seu repetidor.
2. Pelo app ou gerenciamento remoto, emita o comando de anúncio para forçar o repetidor a se anunciar.
3. No CoreScope, expanda um anúncio recente e verifique as visualizações **Paths** e **Graph** — elas mostram quem está recebendo seus anúncios diretamente e via mesh.

Se seu repetidor aparece no mapa e no MeshExplorer, parabéns! 🎉 Ele está operando e contribuindo para a Mesh Sorocaba.

## Sumário de parâmetros

A tabela abaixo resume todos os parâmetros que devem ser configurados em um repetidor, com os valores recomendados para a rede Mesh Sorocaba. Use-a como checklist ao configurar um novo nó.

| Parâmetro CLI | Valor sugerido | O que faz |
| :--- | :--- | :--- |
| `set radio 923.125,62.5,8,8` | `923.125,62.5,8,8` | Define frequência (MHz), largura de banda (kHz), fator de espalhamento e taxa de codificação do rádio. |
| `set advert.interval` | `360` | Intervalo (em minutos) entre anúncios diretos (0 hop). Valor arredondado para múltiplo de 2. |
| `set flood.advert.interval` | `47` | Intervalo (em horas) entre anúncios que inundam toda a rede. |
| `set txdelay` | `0.5` / `1.0` / `2.0` | Fator de atraso antes de retransmitir flood. Use 0.5 (baixo), 1.0 (médio) ou 2.0 (alto) conforme a elevação. |
| `set rxdelay` | `3` | Atraso de processamento para cópias recebidas com sinal fraco, dando prioridade a caminhos fortes. |
| `set loop.detect` | `moderate` | Detecção de loop — descarta pacotes que já circularam pelo nó, evitando tempestades. |
| `set multi.acks` | `1` | Ativa envio de 2 confirmações em vez de 1, melhorando a confiabilidade do gerenciamento remoto. |
| `set agc.reset.interval` | `300` | Intervalo (segundos) para reset do AGC. |
| `set radio.rxgain` | `on` | Ativa o modo de ganho de recepção amplificado (SX12xx / LR1110, firmware ≥ 1.14.1). |
| `set path.hash.mode` | `1` | Tamanho do hash de caminho nos anúncios. 1 = 2 bytes (65.536 IDs), necessário para redes com muitos repetidores. |