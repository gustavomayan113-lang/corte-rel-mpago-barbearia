# Corte Relâmpago — landing page de barbearia (projeto de portfólio)

Site de uma página para a barbearia fictícia **Corte Relâmpago**, feito para demonstrar
trabalho de front-end: HTML semântico, CSS em camadas, JavaScript vanilla e fotos de
barbearia. **Não há back-end, banco de dados nem envio de dados** — o formulário
de agenda é apenas uma simulação de front-end.

## Como abrir

Basta abrir `index.html` no navegador (funciona em `file://`, sem build e sem servidor).

```bash
# opcional, para servir localmente
npx serve .
# ou
python -m http.server 8080
```

## Estrutura

```
.
├── index.html               # página única (todas as seções)
├── templates/               # partials gerados a partir do index.html
│   ├── head.html
│   ├── navbar.html
│   ├── hero.html
│   ├── servicos.html
│   ├── galeria.html
│   ├── equipe.html
│   ├── depoimentos.html
│   ├── agenda.html
│   ├── local.html
│   └── rodape.html
└── estaticos/
    ├── css/
    │   ├── main.css             # importa as camadas na ordem certa
    │   ├── base/                # variáveis, reset, tipografia, utilitários
    │   ├── componentes/         # botões, navbar, cartões, formulários, selos
    │   ├── secoes/              # hero, serviços, galeria, equipe, depoimentos,
    │   │                        # agenda, local, rodapé
    │   └── animacoes.css        # keyframes em uso + classe .revelar
    ├── js/
    │   ├── utilitarios.js       # helpers ($, $$, aoProntar, chips)
    │   ├── navegacao.js         # navbar ao rolar, progresso, menu, scroll spy
    │   ├── revelacao.js         # animação de entrada + contadores
    │   ├── galeria.js           # filtros e lightbox
    │   ├── depoimentos.js       # carrossel com avanço automático
    │   ├── agenda.js            # validação e resumo do formulário (demo)
    │   ├── rodape.js            # ano corrente e botão "voltar ao topo"
    │   └── main.js              # ponto de entrada
    └── img/
        ├── logo.svg
        ├── favicon.svg
        ├── selo.svg
        ├── fotos/               # fotos reais (Pexels) de clientes e equipe
        │   ├── hero.jpg
        │   ├── cliente-01..08.jpg
        │   ├── equipe-01..04.jpg
        │   └── CREDITOS.md      # origem e licença de cada foto
        └── texturas/            # grade, pontos, raios, faixa, papel
ferramentas/
└── gerar-arte-svg.mjs          # script que gera logo, favicon, selo e texturas
```

## Paleta

| Token            | Valor     | Uso                                  |
| ---------------- | --------- | ------------------------------------ |
| `--preto`        | `#07080d` | fundo base                           |
| `--azul`         | `#0e2a5c` | fundos, brilhos e profundidade       |
| `--vermelho`     | `#e01b2d` | botões, etiquetas e acentos          |
| `--dourado`      | `#e3b23c` | detalhes, bordas e texto de destaque |
| `--branco`       | `#f7f8fb` | texto e surfaces                     |

Tokens definidos em `estaticos/css/base/variaveis.css`.

## Tipografia

- **Bebas Neue** — títulos de display
- **Barlow Condensed** — subtítulos e navegação
- **Inter** — texto corrido
- **JetBrains Mono** — etiquetas e microcopy

Carregadas do Google Fonts, com fontes de sistema como fallback.

## Recursos

- Navbar fixa com blur, barra de progresso da página e menu mobile animado
- Hero com título em degradê, selo de status, cartela de informações sob a foto e
  uma faixa de selos de serviço com os diferenciais da barbearia
- Revelação das seções por `IntersectionObserver` (classe `.revelar`)
- Contadores animados no hero
- Galeria com filtros e lightbox (teclado: `Esc`, setas)
- Carrossel de avaliações com autoplay e pontos de navegação
- Formulário de agenda com validação, resumo de serviço/preço e aviso simulado
- Mapa ilustrado, tabela de horários e FAQ em `<details>`
- Respeita `prefers-reduced-motion`

Movimento é usado com parcimônia: só há uma animação de entrada por seção, o carrossel
avança sozinho e o marcador do mapa pulsa devagar. Nenhum efeito gira ou brilha em
loop permanente, o que deixa a leitura mais sóbria e a interface mais profissional.

## Conteúdo fictício

Endereço, telefone, CNPJ, preços, equipe e avaliações foram inventados para o projeto.
O CNPJ usado (`12.345.678/0001-90`) é sequencial e não corresponde a uma empresa real.
As fotos são reais, vindas do Pexels — ver `estaticos/img/fotos/CREDITOS.md`.
