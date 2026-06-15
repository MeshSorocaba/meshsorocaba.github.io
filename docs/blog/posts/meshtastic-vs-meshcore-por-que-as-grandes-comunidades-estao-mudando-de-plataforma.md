---
date: 2026-04-27
draft: false
authors:
  - Bruno
lastmod: 2026-05-22T10:32:38-0300
title: "MeshCore vs. Meshtastic: por que as grandes comunidades estão mudando de plataforma"
---

Entre as soluções de rede mesh baseadas em LoRa, duas dominam a conversa hoje: o **Meshtastic** e o **MeshCore**. Para quem está montando uma rede local com algumas dezenas de nós, o Meshtastic continua sendo a escolha natural. O problema aparece quando a rede começa a crescer. A partir de certo ponto, a experiência se deteriora e o esforço para se coordenar uma configuração ótima entre todos os participantes da rede acaba se tornando uma experiência frustrante.

<!-- more -->

Foi exatamente essa frustração que motivou o surgimento do MeshCore. Neste artigo, explico por que ele tem se consolidado como a melhor opção para redes de larga escala e quais decisões de arquitetura, tomadas anos atrás pelo Meshtastic, o tornaram menos ideal para grandes comunidades.

## Das trilhas para as metrópoles

O **Meshtastic** foi criado em 2020 por Kevin Hester, engenheiro de software, com uma proposta então inédita: usar transceptores LoRa para construir redes mesh de forma intuitiva e acessível. A intenção original era atender pequenos grupos em locais sem cobertura de internet. Na postagem que apresentou o projeto no Hackster.io, em fevereiro daquele ano, Kevin resumiu a motivação:

> "Esses rádios são ótimos para caminhadas, esqui, parapente, essencialmente qualquer hobby onde você não tem acesso confiável à internet. Cada membro da sua rede mesh privada pode sempre ver a localização e a distância de todos os outros membros, além de qualquer mensagem de texto enviada ao bate-papo do grupo."

Com o tempo, o Meshtastic incorporou compatibilidade com ferramentas táticas como o ATAK e com uma ampla gama de sensores IoT - detectores de movimento, barômetros, monitores de qualidade do ar -, indo muito além da troca de mensagens. A popularidade explodiu, tanto entre hobistas quanto entre usuários sem repertório técnico.

O sucesso, porém, levou o projeto a um terreno que ele não havia sido desenhado para ocupar. A proposta original não previa redes cobrindo cidades inteiras, regiões metropolitanas ou países. Quando algumas comunidades passaram de dezenas para centenas de participantes - somando-se a isso o tráfego de sensores -, as falhas na entrega de mensagens passaram a ocorrer com muita frequência.

Foi nesse contexto que Scott Powell, também engenheiro de software, [lançou em 2024 o **MeshCore**](https://www.hackster.io/scottpowell69/the-r2-mesh-system-695f4b). Enquanto o Meshtastic se propunha a ser uma ferramenta universal para redes mesh, o MeshCore partia de uma premissa restritiva e deliberada: **foco na troca de mensagens**.

Meses depois do lançamento do MeshCore, a equipe do Meshtastic incorporou ao firmware mudanças que aproximaram as duas plataformas. [Desde a versão 2.6](https://meshtastic.org/blog/meshtastic-2-6-preview/), por exemplo, o Meshtastic adota um algoritmo de roteamento de pacotes (chamado _next-hop_) semelhante ao do MeshCore. Mas certas decisões tomadas no início do projeto não podem ser solucionadas apenas com pequenas atualizações, pelo menos não sem quebrar a compatibilidade com versões anteriores - algo que a comunidade Meshtastic tem evitado (e com razão).

A seguir, discuto três dessas decisões de arquitetura do Meshtastic e explico por que, em comunidades grandes, o MeshCore se mostra a alternativa mais escalável.

<div class="center-table" markdown>

| Característica | Meshtastic | MeshCore |
| --- | --- | --- |
| Ano de criação | 2020 | 2024 |
| Transmissão de telemetria | Por anúncio próprio ou sob demanda | Apenas sob demanda |
| Ponte MQTT nativa | Sim | Não |
| Limite de saltos (padrão / máximo) | 3 / 7 | 64 / 64 |
| Algoritmo de roteamento | _Managed flooding_ + _next-hop_ (desde 2.6) | _Flood-then-direct_ (nativo) |
| Funções possíveis do dispositivo | 11  | 4   |

</div>

## Excesso de transmissões desnecessárias

Ambas as plataformas compartilham uma mesma limitação: diferentemente dos rádios troncalizados (como DMR e P25), que alocam canais dinamicamente, as redes mesh LoRa operam em uma única frequência. Isso significa que, se dois dispositivos transmitirem simultaneamente, os pacotes colidem e nenhum deles chega ao destino.

Essa colisão é um problema notório no Meshtastic a partir de algumas dezenas de nós em uma mesma região, diagnóstico reconhecido inclusive [por um dos próprios desenvolvedores do projeto](https://meshtastic.org/blog/why-your-mesh-should-switch-from-longfast/).

Isso ocorre porque o Meshtastic permite transmitir uma grande variedade de informações via rádio: identificação do dispositivo, posição, leituras de sensores, nível de bateria, dados de vizinhança. Todo esse tráfego consome o precioso tempo de ar da única frequência disponível.

Para contornar o problema, comunidades pelo mundo passaram a recomendar configurações que reduzissem ou eliminassem qualquer transmissão que não fosse mensagem de texto (como a [NY Mesh](https://nyme.sh/getting-started/#meshtastic), [Mountain Mesh](https://mtnme.sh/mediumfast/) e [Mesh Oregon](https://meshoregon.com/meshtastic-node-setup/)).

Para aliviar ainda mais o espectro, algumas adotaram a predefinição `MEDIUM_FAST` em vez do padrão `LONG_FAST` do Meshtastic, o que reduz em cerca de 67% o tempo de transmissão dos pacotes, embora com algum sacrifício de alcance.

As medidas ajudam, mas dependem de algo que escapa ao controle dos administradores: **a colaboração de cada usuário**. É comum encontrar dispositivos desassistidos, rodando configurações de fábrica e operando contra as boas práticas estabelecidas pela comunidade.

O MeshCore evita este problema e **não implementa transmissão automática de telemetria**. Para obter informações sobre um nó específico, o usuário precisa solicitá-las manualmente. Esse paradigma simples mantém a frequência desobstruída para o que realmente importa.

A tabela e gráfico abaixo mostram a quantidade de pacotes transmitidos por usuários ativos por dia nas redes MeshCore e Meshtastic. Os dados foram obtidos a partir dos serviços [CoreScope (MeshCore Brasil)](https://corescope.meshcore.com.br/#/analytics) e [Meshview World (Brasil)](https://my.meshview.world/brazil/stats).

<div class="center-table" markdown>

| Tipo de pacote | MeshCore | Meshtastic |
|---|---:|---:|
| Anúncio do nó (nome, chave pública, etc) | 3,3 | 14,3 |
| Mensagens (privadas ou públicas) | 3,2 | 1,2 |
| Posição | 0,0 | 21,4 |
| Telemetria | 0,0 | 7,7 |
| Roteamento | 3,9 | 1,7 |
| **Total** | **10,4** | **46,3** |

</div>

<div style="padding: 1rem 0;">
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 20px; margin: 0 0 1.25rem; font-size: 13px; color: var(--color-text-secondary);">
    <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 12px; height: 12px; border-radius: 2px; background: #7F77DD;"></span>Anúncio do nó</span>
    <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 12px; height: 12px; border-radius: 2px; background: #1D9E75;"></span>Mensagens</span>
    <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 12px; height: 12px; border-radius: 2px; background: #BA7517;"></span>Posição</span>
    <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 12px; height: 12px; border-radius: 2px; background: #378ADD;"></span>Telemetria</span>
    <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 12px; height: 12px; border-radius: 2px; background: #D85A30;"></span>Roteamento</span>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <div>
      <p style="text-align: center; font-size: 15px; font-weight: 500; margin: 0;">MeshCore</p>
      <p style="text-align: center; font-size: 12px; color: var(--color-text-secondary); margin: 2px 0 6px;">10,4 pacotes/usuário/dia no total</p>
      <div style="position: relative; width: 100%; height: 260px;">
        <canvas id="chartMeshCore" role="img" aria-label="Gráfico de pizza da rede MeshCore: Roteamento 37,4 por cento, Anúncio do nó 32,0 por cento, Mensagens 30,6 por cento. Posição e Telemetria com zero por cento.">Distribuição MeshCore: Anúncio 32,0%, Mensagens 30,6%, Roteamento 37,4%.</canvas>
      </div>
    </div>
    <div>
      <p style="text-align: center; font-size: 15px; font-weight: 500; margin: 0;">Meshtastic</p>
      <p style="text-align: center; font-size: 12px; color: var(--color-text-secondary); margin: 2px 0 6px;">46,3 pacotes/usuário/dia no total</p>
      <div style="position: relative; width: 100%; height: 260px;">
        <canvas id="chartMeshtastic" role="img" aria-label="Gráfico de pizza da rede Meshtastic: Posição 46,2 por cento, Anúncio do nó 31,0 por cento, Telemetria 16,6 por cento, Roteamento 3,6 por cento, Mensagens 2,5 por cento.">Distribuição Meshtastic: Anúncio 31,0%, Mensagens 2,5%, Posição 46,2%, Telemetria 16,6%, Roteamento 3,6%.</canvas>
      </div>
    </div>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<script>
const labels = ['Anúncio do nó', 'Mensagens', 'Posição', 'Telemetria', 'Roteamento'];
const colors = ['#7F77DD', '#1D9E75', '#BA7517', '#378ADD', '#D85A30'];
const meshcoreData = [3.3, 3.2, 0, 0, 3.9];
const meshtasticData = [14.3, 1.2, 21.4, 7.7, 1.7];

const sliceLabels = {
  id: 'sliceLabels',
  afterDatasetDraw(chart) {
    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(0);
    const values = chart.data.datasets[0].data;
    const total = values.reduce(function(a,b){return a+b;}, 0);

    meta.data.forEach(function(arc, i) {
      if (values[i] === 0) return;
      const pct = values[i] / total * 100;
      if (pct < 3.5) return;
      const pos = arc.tooltipPosition();
      ctx.fillStyle = '#fff';
      ctx.font = '500 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(pct.toFixed(1).replace('.', ',') + '%', pos.x, pos.y);
    });
  }
};

function makePie(canvasId, data) {
  return new Chart(document.getElementById(canvasId), {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderColor: 'rgba(255,255,255,0.9)',
        borderWidth: 1.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(c) {
              const total = c.dataset.data.reduce(function(a,b){return a+b;}, 0);
              const pct = (c.parsed / total * 100).toFixed(1).replace('.', ',');
              return c.label + ': ' + c.parsed.toLocaleString('pt-BR') + ' (' + pct + '%)';
            }
          }
        }
      }
    },
    plugins: [sliceLabels]
  });
}

makePie('chartMeshCore', meshcoreData);
makePie('chartMeshtastic', meshtasticData);
</script>


A diferença de perfil entre as duas redes é bastante expressiva. No MeshCore o tráfego se divide quase em três terços entre roteamento (37,4%), anúncio de nó (32,0%) e mensagens (30,6%). Pacotes de telemetria não aparecem no gráfico, pois são apenas obtidos sob demanda e quase nunca solicitados. Em contrapartida, a posição de dispositivos MeshCore é compartilhada nas mensagens de texto.

Já o Meshtastic é dominado por dados automáticos: posição (46,2%) e telemetria (16,6%) somam quase 2/3 de todo o tráfego, e anúncios de nó ocupam mais 31,0%. Sobra pouco espaço para o que costuma ser a prioridade em uma rede mesh de larga escala: mensagens são apenas 2,5% do total.  Isso significa que **no Meshtastic, dos 46,3 pacotes transmitidos por um usuário por dia em média, apenas 1,2 é uma mensagem de texto**.

## O uso abusivo da ponte MQTT

Se o excesso de transmissões locais é o primeiro vetor de saturação no Meshtastic, o segundo opera em escala muito maior: a forma como a ponte MQTT é utilizada na prática.

A intenção original da funcionalidade de ponte MQTT no Meshtastic era nobre: permitir que redes geograficamente distantes se comunicassem pela internet. O problema é que o firmware não distingue um pacote que chegou pela internet daquele recebido por rádio; todos são processados e retransmitidos igualmente por todas as interfaces. Um pacote vindo da internet é automaticamente lançado ao ar, e vice-versa.

A consequência é previsível. Quando dispositivos de um país inteiro habilitam a ponte MQTT e compartilham a mesma predefinição, **todos os pacotes recebidos via internet são retransmitidos simultaneamente via rádio** por cada nó que os escuta. Telemetria, posições, mensagens - tudo é despejado no espectro local, mesmo quando se origina a milhares de quilômetros de distância.

O servidor MQTT oficial do Meshtastic (`mqtt.meshtastic.org`) tenta conter o estrago com [uma política de **zero saltos**](https://meshtastic.org/docs/software/integrations/mqtt/): pacotes que passam por ele com destino a um canal público têm sua contagem de saltos automaticamente zerada. Servidores privados, no entanto, raramente implementam essa regra. O servidor Meshtastic brasileiro, por exemplo, não aplica a política - e o resultado é um volume excessivo de tráfego ocupando o ar.

Durante os horários de pico, um único dispositivo Meshtastic com configuração padrão conectado a esse servidor chega a ocupar a frequência por quase **50% do tempo**.

![](../../img/utilizacao-canal-mt-mc.png)
/// caption
///

À esquerda no gráfico, temos um único dispositivo Meshtastic com servidor brasileiro de MQTT ligado, isolado na região. A ocupação do canal (channel utilization) chega a quase 49,1% em determinada hora. À direita, um dispositivo MeshCore em contato com o repetidor na Serra do Japi, que serve a 20 dispositivos e um canal público frequentemente utilizado, ocupa apenas 3% da frequência.

O Meshtastic oferece algumas mitigações locais. É possível desabilitar o `downlink` de canais públicos ou ativar a opção `Ignorar MQTT`. Mas essas configurações resolvem apenas para um dispositivo individual, não para os outros nós ao redor. Mesmo recusando os pacotes que chegam de terceiros, o usuário continua esperando que a frequência se desobstrua das transmissões alheias.

A resposta do MeshCore foi radical: **não oferecer ponte MQTT nativa**. A funcionalidade, idealizada para unir redes distantes, tem gerado, na prática, mais problemas do que benefícios em redes de larga escala.

## Número de saltos insuficiente

A sobrecarga de canais não é o único gargalo. Mesmo com uma frequência limpa, a topografia pode inviabilizar a comunicação. A figura abaixo mostra a disposição aproximada de alguns dispositivos Meshtastic na região onde moro, complementada por outros que acrescentei para ilustrar o cenário.

![](../../img/nohops.jpg)
/// caption
///

Os dispositivos `A` e `B` estão em um vale, separados de `D`, `E` e `F` por uma pequena elevação que bloqueia a visada direta. Para que uma mensagem saída de `A` alcance `F`, ela precisa contornar o relevo passando por `C`, situado no alto de um morro.

O firmware do Meshtastic adota, por padrão, [um limite de apenas **3 saltos** por mensagem](https://meshtastic.org/docs/configuration/radio/lora/). Com essa configuração, a contagem se esgota em `E`, e a mensagem jamais chega ao destino. Aumentar o limite para 7 (o máximo permitido pelo Meshtastic) resolveria esse caso específico. Mas em terrenos acidentados, com múltiplos morros e vales separando comunidades, os 7 saltos costumam se esgotar muito antes de a mensagem atravessar uma cidade, quanto mais alcançar a região vizinha.

No MeshCore, [o limite padrão é de **64 saltos**](https://www.austinmesh.org/learn/meshcore-vs-meshtastic/). A margem é suficiente para permitir a propagação entre regiões metropolitanas adjacentes e, em alguns cenários, até mesmo cobrindo países inteiros.

## Papéis em excesso e pouco intuitivos

Enquanto um dispositivo MeshCore pode adotar apenas três papéis, o de repetidor (_repeater_), o de nó pessoal (_companion_) e o de sensor (_sensor_), o [Meshtastic oferece cerca de uma dúzia](https://meshtastic.org/docs/configuration/radio/device/). Os mais usados são `CLIENT`, `CLIENT_MUTE`, `CLIENT_BASE`, `ROUTER` e `ROUTER_LATE`, mas o catálogo também inclui papéis especializados como `TRACKER`, `SENSOR`, `TAK`, `TAK_TRACKER` e `LOST_AND_FOUND`.

Ao contrário do que o nome sugere, dispositivos `CLIENT` não se limitam ao papel de nó pessoal: eles também retransmitem mensagens recebidas, comportando-se como repetidores oportunistas. Apesar dessa duplicidade, é justamente esse o papel recomendado para a maioria absoluta dos dispositivos.

Os dispositivos `ROUTER`, por sua vez, também repetem mensagens, mas são reservados a nós de infraestrutura instalados em posições privilegiadas (normalmente no alto de torres, prédios ou montanhas, com cobertura de 360 graus sobre o maior número possível de dispositivos). Essa designação lhes confere prioridade na janela de transmissão: eles entram na fila antes de qualquer outro dispositivo. Caso outros dispositivos detectem uma retransmissão prévia de um `ROUTER`, eles cancelam a própria retransmissão. O mecanismo estabelece uma hierarquia clara entre quem deve transmitir e, ao mesmo tempo, reduz a quantidade de pacotes duplicados no ar.

O sistema, porém, depende de algo frágil: a leitura correta dos nomes pelos usuários. Tomemos como exemplo o `ROUTER`, que é [o papel mais mal utilizado do Meshtastic](https://www.seeedstudio.com/blog/2026/03/17/meshtastic-node-guide/). A comunidade tem sinalizado repetidamente que roteadores mal configurados são a principal causa de degradação do desempenho da rede. Por trás do mau uso há uma armadilha de nomenclatura: quem nunca operou uma rede mesh tende a presumir que `ROUTER` é simplesmente uma versão "melhor" de `CLIENT` e marca seu dispositivo assim sem atentar para a posição em que ele está instalado.

O resultado é prejudicial: quando um nó em local sub-ótimo entra na fila com prioridade, ele emudece os vizinhos e, em vez de estender o alcance da mensagem, gasta os saltos disponíveis em uma retransmissão que não vai a lugar nenhum, comprometendo a entrega em toda a região. Em algumas comunidades, a situação chegou a um ponto em que [administradores precisaram criar "listas de ignorados"](https://mspmesh.org/roles/) para neutralizar roteadores mal configurados cujos donos não respondem aos pedidos de correção.

<div class="center-table" markdown>

| Papel do Meshtastic | Equivalente MeshCore |
| --- | --- |
| `CLIENT`, `CLIENT_BASE`, `CLIENT_HIDDEN`, `ROUTER`, `ROUTER_LATE` | `Repeater`, `Room` |
| `CLIENT_MUTE` | `Companion` |
| `SENSOR` | `Sensor` |

</div>

O MeshCore opta pela simplicidade do desenho: há apenas 4 papéis, sendo os dois mais utilizados o `Companion` e `Repeater`. O primeiro destina-se a nós móveis e pessoais; o segundo, a nós de infraestrutura. Apenas o `Repeater` retransmite mensagens, e o faz sem nenhuma hierarquia interna entre repetidores. Se um repetidor é instalado em local pouco vantajoso, isso não prejudica a rede como um todo. No pior cenário, o nó simplesmente não contribui. Para reforçar o caráter deliberado da escolha, o MeshCore exige que o usuário grave um firmware diferente para colocar o dispositivo em modo repetidor - um atrito intencional que desencoraja configurações inadvertidas e enfatiza o peso da decisão.

## Conclusão

Há quem argumente que uma rede Meshtastic poderia, sim, ser configurada e otimizada para operar em larga escala. A receita até existe: cada participante precisaria configurar o papel correto do dispositivo, desabilitar a ponte MQTT, silenciar a transmissão automática de telemetria, migrar da predefinição `LONG_FAST` para uma mais rápida e, por fim, instalar um firmware customizado capaz de aceitar mais de sete saltos por mensagem — ao custo de romper a compatibilidade com qualquer dispositivo rodando o firmware oficial. É um caminho possível, mas de adoção difícil em comunidades grandes e heterogêneas. O MeshCore parte de um conjunto diferente de padrões e evita esses ajustes desde o início.

A experiência prática talvez seja o melhor argumento. Como desabafou [nullrouten no Reddit](https://old.reddit.com/r/sonomacounty/comments/1rmuuvq/comment/o93ogmh/), administrador da Meshtastic Bay Area, uma das comunidades mais bem-sucedidas dos Estados Unidos:

> Ajudei a construir (de várias formas) a malha Meshtastic aqui. Funciona... mas levou um ano de otimização e de uma batalha incessante contra as "regras, diretrizes e fatos" do projeto principal. \[...\] Implantamos o MeshCore em poucos meses e simplesmente funcionou. Por quê? Porque ele não fica entupido de spam de informações sobre nós, atualizações de posição e telemetria. Os padrões do MeshCore são configurados para maior alcance - o que funciona justamente porque ele não é inundado com tráfego de fundo.
>
> \[...\]
>
> Estou rodando os dois e gosto dos dois... mas nossa malha Meshtastic de 1100 nós está estourando pelas costuras, enquanto as malhas MeshCore precisariam chegar a 2000-3000 nós para ter problemas de carga parecidos. Nenhuma malha escala infinitamente. Estamos trabalhando duro para corrigir o Meshtastic e melhorá-lo... mas é difícil mudar o rumo daquele navio. \[...\] Várias metrópoles importantes lutaram com o Meshtastic por anos, finalmente desistiram e migraram \[para o MeshCore\] e funcionou, e elas ficaram felizes em pouquíssimo tempo.

Vale frisar que o MeshCore sacrifica deliberadamente parte do que o Meshtastic oferece. Se a sua aplicação exige telemetria automática, leitura contínua de sensores, ou se a rede opera em movimento constante (sem a possibilidade de instalar nós fixos de infraestrutura), o Meshtastic permanece a melhor opção. Mas para comunidades estacionárias, geograficamente extensas e distribuídas por várias cidades, o MeshCore foi construído exatamente para essa missão: **mensagens que chegam, com engenharia focada no essencial**.
