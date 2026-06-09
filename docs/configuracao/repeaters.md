# Configurando uma Repetidora

As repetidoras são a **espinha dorsal da rede**. Isso acontece porque os dispositivos pessoais (_companions_) **não retransmitem** mensagens; somente as repetidoras fazem isso. Sem elas, o alcance da sua comunicação se limita ao raio direto entre dois companions.

A boa notícia é que repetidoras MeshCore não exigem hardware diferente dos companions. O mesmo aparelho que você usa no bolso pode ser configurado como repetidora — basta mudar o firmware e instalar em um local fixo.

## O que você vai precisar

- **Um rádio LoRa compatível**: Praticamente qualquer dispositivo que funciona com Meshtastic funciona com MeshCore. Consulte a [lista de dispositivos suportados](https://flasher.meshcore.io/){:target="_blank"}. Além disso, veja a lista de [Equipamentos Recomendados](../equipamento.md).
- **Um local semi-permanente**: repetidoras precisam ser fixas. Quanto mais alto, melhor.
- **Uma fonte de energia confiável**: USB, bateria, painel solar ou energia elétrica.

## Gravação do firmware (Flashing)

A forma mais simples de gravar o firmware MeshCore é usando o **web flasher** oficial.

1. Conecte o dispositivo ao computador usando um navegador baseado em Chromium (Chrome, Edge etc.) e acesse [https://flasher.meshcore.io/](https://flasher.meshcore.io/){:target="_blank"}.
2. Selecione o tipo do seu dispositivo. Você pode digitar o nome do fabricante e escolher a placa específica.
3. Escolha o modo **"Repeater"**.
4. Clique em **Flash**. Dependendo do hardware, pode ser necessário entrar no modo DFU antes. Se ocorrer um erro, tente novamente — geralmente funciona na segunda tentativa.
5. Quando solicitado, selecione **"Configure via USB"**.

    !!! warning "Importante"
        Repetidoras MeshCore **não** são configuradas via Bluetooth. Use sempre a configuração por USB.

6. Preencha as configurações iniciais (veja a seção abaixo).
7. Clique em **Send Advert** — isso ajuda seu companion a encontrar a nova repetidora.

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

Dê à sua repetidora um nome que indique a localização — um marco, bairro ou ruas principais. Isso ajuda outros usuários a entender a cobertura da rede. Use o [Gerador de Nomes para Repetidoras](../ferramentas/nomes-repetidoras.md) para obter um nome que segue os padrões da comunidade.

### Localização

Defina a latitude e longitude em formato decimal (ex.: -23.50, -47.46). Isso permite que sua repetidora apareça nos mapas da rede.

!!! tip "Dica"
    Em vez de usar um módulo GPS (que consome bateria constantemente), defina a posição manualmente pelo mapa na interface de configuração. Basta zoom na sua área, clicar no ponto e salvar.

### Senhas

- **Admin**: defina uma senha forte. É por ela que você acessará o gerenciamento remoto da repetidora.
- **Guest**: se deixada em branco, qualquer usuário MeshCore poderá ver as informações do proprietário (_Owner Info_). Se preenchida, será exigida para visualizar esses dados.

### Informações do proprietário (_Owner Info_)

Campo de texto livre para incluir seu indicativo de radioamador, e-mail, nome no Discord ou qualquer outro contato. Útil caso alguém precise notificar você sobre um problema na repetidora. Isso é opcional e fica a seu critério.

### Intervalos de anúncio (_Advert Intervals_)

Os anúncios informam à rede que a repetidora está ativa e onde está. O MeshCore é econômico com esses anúncios, mas ainda assim vale a pena ajustar:

| Parâmetro | Valor recomendado | Descrição |
| :--- | :--- | :--- |
| Advert Interval (min) | **360** | Intervalo entre anúncios diretos (0 hop). |
| Flood Advert Interval (h) | **48** | Intervalo entre anúncios que inundam toda a rede. |

!!! tip "Rede em crescimento"
    Com poucas repetidoras na região, intervalos mais curtos ajudam a rede a descobrir novos nós. Conforme a rede cresce, você pode aumentar esses valores para reduzir o tráfego de anúncios.

### Modo de repetição

Certifique-se de que o **Repeat Mode** está ativado. Sem ele, a repetidora não retransmite pacotes e não contribui para a rede.

## Configurações avançadas

As configurações abaixo são opcionais, mas podem melhorar significativamente a performance da sua repetidora e da rede como um todo.

### Temporização (txdelay e rxdelay)

Ajustar os atrasos de transmissão e recepção ajuda a reduzir colisões quando há várias repetidoras na mesma área. A recomendação é configurar o `txdelay` de acordo com o perfil de elevação da instalação:

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

Defina como **Moderate** para evitar que pacotes fiquem circulando indefinidamente na rede.

### Multi ACKs

**Ative** essa opção. Ela faz a repetidora enviar 2 confirmações em vez de 1, melhorando a experiência de gerenciamento remoto.

### AGC Reset

Se perceber que a repetidora fica "surda" após algum tempo de funcionamento, configure o intervalo de reset do AGC para um valor maior que 0 (o mínimo é 4). Quanto menor o valor, mais frequente será o reset.

## Gerenciamento remoto

Antes de instalar a repetidora em um local de difícil acesso, pratique o gerenciamento remoto usando um companion:

1. No app MeshCore, vá em **Contato** → **Adicionar Contato**.
2. Preencha:
    - **Tipo**: Repeater
    - **Nome**: o nome da sua repetidora
    - **Chave Pública**: a chave gerada durante a configuração
3. Salve o contato.
4. Clique no nome da repetidora ou clique nos três pontos e selecione **Gerir**.
5. Insira a senha de admin e faça login.

Agora você pode ver estatísticas, emitir comandos de console e reconfigurar a repetidora sem precisar de acesso físico.

## Posicionamento

Uma repetidora com antena omnidirecional precisa de **linha de visada** para outras repetidoras. Isso significa instalá-la o mais alto possível:

- No **telhado** ou em um **mastro** acima da laje
- Em local **aberto**, sem obstáculos próximos
- Para antenas direcionais, aponte para a repetidora que deseja conectar

Quanto melhor o posicionamento, maior o alcance efetivo e menos repetidoras a rede precisa para cobrir a mesma área.

## Testando sua repetidora

Depois de configurada e instalada:

1. Acesse o [CoreScope](https://corescope.meshsorocaba.org){:target="_blank"} e busque pelo nome ou chave pública da sua repetidora.
2. Pelo app ou gerenciamento remoto, emita o comando de anúncio para forçar a repetidora a se anunciar.
3. No CoreScope, expanda um anúncio recente e verifique as visualizações **Paths** e **Graph** — elas mostram quem está recebendo seus anúncios diretamente e via mesh.

Se sua repetidora aparece no mapa e no MeshExplorer, parabéns! 🎉 Ela está operando e contribuindo para a Mesh Sorocaba.
