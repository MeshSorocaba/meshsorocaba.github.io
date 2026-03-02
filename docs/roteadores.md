# Pré-Requisitos para Roteadores Meshtastic

<p align="center">
   <figure>
   <img src="/img/router-view.webp">
   <figcaption>Exemplo de roteador Meshtastic apropriadamente localizado.<br><small>Créditos: Cully@KBOXLABS</small></figcaption>
   </figure>
</p>

`ROUTER` é a configuração mais agressiva no ecossistema Meshtastic. Ele "fura a fila" de todos os outros perfis para retransmitir pacotes, sempre retransmite (nunca cede espaço para um vizinho) e faz com que todos os nós do tipo `CLIENT`, `CLIENT_MUTE` e `CLIENT_BASE` em sua área de cobertura cancelem suas próprias retransmissões. Atribuir esse papel ao nó errado não apenas deixa de ajudar, como **prejudica ativamente a rede mesh para todos os usuários**.

Os requisitos abaixo foram baseados na documentação oficial do projeto Meshtastic, nas regras de grandes redes estabelecidas (como a MSP Mesh, SoCalMesh e BayMesh) e em princípios fundamentais de engenharia de rádiofrequência.

---

## 1. Elevação Extrema com Linha de Visão 

**Requisito:** A antena deve estar em um local com uma visão panorâmica e sem obstáculos, idealmente em todas as direções (salve exceções onde mesmo sem uma visada de 360 graus o nó contribua para a malha). Exemplos: topos de montanhas, picos de serras, torres de comunicação altas. Redes consolidadas costumam exigir uma altura mínima de 25 a 30 metros acima do nível do solo.

<p align="center">
   <figure>
   <img src="/img/mountain.jpg">
   <figcaption>Se a vista do seu roteador não se parece com isso, então provavelmente a configuração CLIENT ou CLIENT_BASE é mais apropriada.<br><small>Créditos: ContributionHead9820@reddit</small></figcaption>
   </figure>
</p>

**O que NÃO qualifica:** O telhado de uma casa comum, um mastro em uma residência térrea, um node em um carro, um node na varanda, um topo de morro que não seja o mais alto da região.

**Por que:** Um `ROUTER` tem prioridade sobre todos os outros. Se um `CLIENT` ou `CLIENT_BASE` ouve o `ROUTER`, ele cancela sua própria retransmissão, confiando que o `ROUTER` fará um trabalho melhor. Se o seu `ROUTER` não tiver um alcance vasto, ele "rouba" um salto (*hop*) sem ganho real — ou pior, cria um beco sem saída para o pacote. É o que chamamos de "consumo prematuro de hops".

**Como verificar:** Use ferramentas de análise de visada como o [HeyWhatsThat](https://www.heywhatsthat.com/profiler.html) ou [Ubiquiti Design Center](https://ispdesign.ui.com/#), e o [Meshtastic Site Planner](https://site.meshtastic.org/) para gerar um mapa de cobertura. O resultado deve mostrar uma cobertura ampla e ininterrupta pelas áreas que você pretende atender.

---

## 2. Contato de Rádio Bidirecional Direto com Diversos Nodes de Infraestrutura

**Requisito:** O `ROUTER` deve ter comunicação de rádio bidirecional confirmada de forma direta (salto único) com outros nós do tipo `ROUTER`.

**O que NÃO qualifica:** Ver muitos `CLIENTS` na sua lista de nodes; conseguir ouvir um `ROUTER` distante, mas ele não conseguir te ouvir de volta; receber tráfego através de outros nodes intermediários em vez de conexão direta.

**Por que:** O trabalho de um roteador é transportar o tráfego entre diferentes regiões da rede. Se ele alcança poucos vizinhos, ele se torna um gargalo, não uma ponte. A comunicação bidirecional é essencial: se você ouve um node mas ele não te ouve, as mensagens serão perdidas silenciosamente em uma direção, criando uma "comunicação assimétrica".

**Como verificar:** Execute testes de traceroute com outros nodes `ROUTER` no alcance. Confirme se o seu node aparece na rota e se as respostas retornam consistentemente em diferentes horários e condições climáticas.

---

## 3. Antena Externa de Qualidade, Sintonizada e Bem Montada

**Requisito:** O node deve usar uma antena externa omnidirecional de qualidade, sintonizada para a frequência da região (915 MHz), montada externamente, na vertical, e conectada com o cabo coaxial mais curto possível e de baixa perda (mínimo LMR-200; LMR-400 para cabos com mais de 1 metro).

**O que NÃO qualifica:** Antenas que vêm de fábrica com as placas (T-Beam, Heltec, etc.); antenas internas; cabos RG-174 baratos e longos; antenas montadas dentro de janelas ou sótãos.

**Por que:** Cada decibel conta. Se a antena for medíocre, a "pegada" real de cobertura será menor do que o papel de `ROUTER` exige. Nodes próximos vão parar de retransmitir ao ouvir o `ROUTER`, mas o sinal fraco do roteador não chegará longe, criando uma "sumidouro" onde as mensagens morrem.

**Como verificar:** O ideal é testar a antena com um analisador **NanoVNA**. O VSWR deve estar abaixo de 2:1 na frequência central da rede.

---

## 4. Integridade a Longo Prazo

**Requisito:** Ativar um `ROUTER` é um ato de comprometimento. Um ou vários dispositivos podem ser instalados numa região contando que seu roteador garantirá um link com o restante da rede **permanentemente**. Dessa forma, se seu dispositivo está instalado em um local sem controle de acesso e pode ser vandalizado, furtado ou retirado sem seu consentimento, muito provavelmente a configuração `CLIENT` ou `CLIENT_BASE` é mais apropriada. Além disso, deve-se prevenir que intempéries afetem a integridade do dispositivo, que deve estar em uma caixa hermética com classificação mínima **IP65** (preferencialmente IP67). Deve-se usar prensa-cabos e, idealmente, uma válvula de respiro para evitar condensação interna devido às mudanças de temperatura.

---

## 5. Alimentação Confiável e Ininterrupta

**Requisito:** O node deve operar 24 horas por dia, 365 dias por ano. Isso exige energia da rede elétrica com backup de bateria (Nobreak) ou um sistema solar dimensionado corretamente para aguentar vários dias sem sol.

**Por que:** O papel de `ROUTER` prioriza a continuidade do serviço. Se um roteador fica offline, ele deixa um buraco na malha de roteamento. Mensagens que dependiam dele serão perdidas.

---

## 6. Capacidade de Administração Remota

**Requisito:** O node deve ser gerenciável à distância, seja via canal de administrador configurado no Meshtastic ou via Wi-Fi (se houver conectividade).

**Por que:** Por padrão, o papel de `ROUTER` desativa o Bluetooth para economizar energia. Isso torna a reconfiguração física difícil. Ter acesso remoto permite ajustar parâmetros (como contagem de hops ou atualizações de firmware) sem precisar subir em uma torre ou telhado toda vez.

---

## 7. Telemetria Responsável e Mínima

**Requisito:** Nodes infraestruturais devem enviar telemetria e posição em intervalos longos para não saturar o espectro. 
- **Sugestão:** Posição a cada 24 horas; Telemetria do dispositivo a cada 2 horas.

**Por que:** O Meshtastic opera em uma largura de banda muito limitada. Como os ROUTERs já retransmitem tudo, eles são os que mais consomem tempo de ar (*airtime*). Enviar telemetria a cada poucos minutos é um desperdício irresponsável.

---

## 8. Proprietário Acessível e Responsivo

**Requisito:** O dono do `ROUTER` deve ser um membro ativo e fácil de encontrar na comunidade local.

**Por que:** Se o seu node apresentar problemas ou estiver prejudicando a rede, alguém precisa conseguir te avisar para que você o conserte ou desligue. Um "ROUTER órfão" que começa a falhar é um dos maiores problemas para uma rede mesh.

---

## 9. Validação e Aprovação da Comunidade Antes da Instalação

**Requisito:** Antes de configurar qualquer node como `ROUTER`, o local proposto e a análise de cobertura devem ser revisados e aprovados pela comunidade mesh local. 

**Por que:** Ninguém consegue ver a topologia completa de uma rede grande sozinho. Um local que parece excelente para você pode causar interferência destrutiva com um `ROUTER` já existente ou criar uma "armadilha de hops" em um vale. A revisão da comunidade evita esses problemas. Nodes configurados incorretamente que não respondem a tentativas de contato costumam ser colocados em "listas de ignorados" (*ignore lists*) pelos outros roteadores da rede, sendo efetivamente banidos.

**Como cumprir:** Entre no [grupo do Telegram da Mesh Sorocaba](https://t.me/MeshSorocaba) e compartilhe seu mapa de cobertura, fotos da instalação e especificações da antena. Pergunte se um `ROUTER` ali traria benefícios. Se a recomendação for usar `CLIENT` ou `CLIENT_BASE`, aceite — quase sempre é a escolha certa.


## Resumo: Devo configurar meu dispositivo como `ROUTER`?

Responda honestamente:

1. Minha antena está em elevação extrema com visada de 360°?
2. Tenho contato direto com outros roteadores?
3. Uso antena externa de qualidade e cabo de baixa perda?
4. Meu dispositivo está fisicamente seguro?
5. Minha energia é 100% confiável (solar ou backup)?
6. Posso administrar este nó remotamente?
7. Meu nó anuncia o mínimo de telemetria possível?
8. Sou um membro ativo e acessível no grupo da rede?
9. A comunidade local aprovou esta instalação?

**Se você respondeu "NÃO" para qualquer uma dessas perguntas: USE O PERFIL `CLIENT` ou `CLIENT_BASE`.**

Seu node ainda será extremamente valioso para a rede, ajudando a retransmitir pacotes na sua área local, mas sem os riscos de degradar a malha global que um `ROUTER` mal posicionado introduz.
