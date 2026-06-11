---
title: Guia de configuração da rede MeshCore no Brasil
---

:octicons-arrow-right-24: [Configurando um dispositivo pessoal (companion)](companions.md)

:octicons-arrow-right-24: [Configurando um repetidor](repeaters.md)

:octicons-arrow-right-24: [Bônus: Configurando um observador](observers.md)


## Valores comuns a todos os modos

| Parâmetro | Valor | Descrição |
| :--- | :--- | :--- |
| Predefinição | `Australia: SA, WA, Brazil` | Regulação de frequência compatível com a faixa de 915–928 MHz liberada pela Anatel. |
| Frequência | 923.125 MHz | Frequência com menor interferência em nossos testes. |
| Largura de Banda | 62.5 kHz | Melhor sensibilidade para longas distâncias e sinais atenuados. |
| Fator de Espalhamento | 8 | Compromisso entre alcance e taxa de dados. |
| Taxa de Codificação | 8 | Maior redundância para melhor tolerância a erros. |
| Modo do Hash de Caminho | `2 bytes` | Tamanho do hash de identificação nos anúncios. |

!!! info "Sobre o hash de caminho"
    O `path.hash.mode` define o tamanho do identificador usado nos anúncios e no caminho dos pacotes. O valor padrão de fábrica é 1 byte (apenas 256 IDs), que é insuficiente para redes com muitos nós. Configurar 2 bytes (65536 IDs) é recomendado para o MeshCore no Brasil.