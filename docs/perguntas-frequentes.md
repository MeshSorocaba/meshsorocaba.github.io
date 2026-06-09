# Perguntas Frequentes sobre o MeshCore

## Gerenciamento de Contatos

### Como adicionar um contato?

Existem várias formas de adicionar um contato no MeshCore:

- **Descoberta automática**: Quando outro nó transmite algo na rede (anúncio, telemetria, mensagem), ele aparece automaticamente na lista "Descobrir Contatos". A partir dessa lista, você pode optar por adicionar o nó à sua lista de contatos.

- **QR Code**: Você pode escanear o QR Code de um contato ou canal. O formato do QR Code é:
  - Canal: `meshcore://channel/add?name=<nome>&secret=<segredo>`
  - Contato: `meshcore://contact/add?name=<nome>&public_key=<chave>&type=<tipo>`

- **Anúncios**: Quando você e outra pessoa enviam um anúncio e vocês estão ao alcance um do outro, isso sinaliza sua presença na rede e vocês aparecem mutuamente na lista de dispositivos descobertos.

### Qual a diferença entre a lista de Contatos e "Descobrir Contatos"?

- **Descobrir Contatos (Discovery List)**: Mostra os dispositivos que, desde que seu rádio foi ligado, foram ouvidos conversando, mandando telemetria, anunciando-se, ou qualquer outra atividade na radiofrequência. É uma lista dinâmica de nós que foram detectados, mas que você ainda não adicionou oficialmente.

- **Lista de Contatos**: É sua lista pessoal de contatos salvos (como uma "Pokédex"). Somente contatos que estão nesta lista permitem que você envie mensagens privadas diretas para eles. As rotas para seus contatos também são armazenadas nesta lista.

A diferença prática é que você pode ver dispositivos na lista de descobertas, mas só consegue enviar mensagens diretas para quem está na sua lista de contatos.

### Consigo conversar com uma pessoa no canal público, mas não com mensagens diretas. Por quê?

Isso acontece porque as mensagens diretas (privadas) requerem que o destinatário esteja na sua lista de contatos. Canais públicos funcionam de forma diferente:

- **Canais públicos**: Usam flood routing, ou seja, a mensagem é transmitida para todos os nós ao alcance. Não há caminho definido, então funciona mesmo sem o destinatário estar nos seus contatos.

- **Mensagens diretas**: O MeshCore descobre e armazena rotas específicas para cada contato. Quando você envia a primeira mensagem para alguém, ela chega via flood routing, e o destinatário envia de volta um relatório de entrega com o caminho que a mensagem percorreu. Esse caminho é então usado para mensagens futuras. Para isso funcionar, o contato precisa estar na sua lista.

**Solução**: Adicione a pessoa à sua lista de contatos antes de tentar enviar mensagens diretas.

### O que significa um nó "descoberto"?

Quando dois rádios são ligados numa região, não há como saberem que o outro existe sem que antes eles escutem alguma coisa.

Então a "Discovery List" dos apps do MeshCore mostra os dispositivos que, desde que seu rádio está ligado, foram ouvidos conversando, mandando telemetria, anunciando-se, ou qualquer coisa que envolva a radiofrequência.

Aí você pode optar por adicionar esses nós descobertos na sua lista de contatos (sua Pokedex) ou não. Eu sei que o app oficial existe a opção de adicionar automaticamente nós descobertos na lista de contatos. Eu não lembro do meshcore-open, preciso pegar o meu outro nó que está no carro pra testar.

Somente quando se tem alguém na lista de contatos é que você consegue, por exemplo, mandar uma mensagem privada.

## Roteamento

### Como ver o caminho que minha mensagem tomou?

No MeshCore, quando você envia uma mensagem pela primeira vez para um contato, ela é roteada via flood (inundação). Quando o destinatário recebe a mensagem, ele envia de volta um relatório de entrega contendo todos os repetidores pelos quais a mensagem passou. Esse relatório é a base para o caminho direto que será usado nas mensagens futuras.

Para analisar caminhos e fazer troubleshooting, você pode usar ferramentas como o [LetsMesh.net Analyzer](https://analyzer.letsmesh.net/packets?region=SOD).

### O que é um "trace route"?

O "trace route" é uma ferramenta para identificar o caminho que um pacote percorre através da rede mesh até chegar ao seu destino. No MeshCore, isso mostra quais repetidores retransmitiram sua mensagem.

