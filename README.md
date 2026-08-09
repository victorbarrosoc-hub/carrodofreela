# Carro do Freela

Protótipo de conceito: **agenda e contratação de freelas do audiovisual**.
Quem contrata escolhe a praça, vê quem está com o dia livre e monta a escala.
Quem é freela mantém a própria agenda — e a disponibilidade pública sai disso sozinha.

O nome nasceu no grupo, não numa agência: *"olha o carro do freela passando"*.

> **Escale sua equipe sem adivinhar.**

---

## ⚠️ Antes de tornar o link público — leia

Este protótipo contém **dados profissionais reais de 109 pessoas**, informados por
elas próprias num cadastro de freelas (nome, cidade, função, equipamento, portfólio).
Telefones **não** estão incluídos.

Estas coisas são **simuladas** e aparecem atribuídas a pessoas reais:

- a **agenda** (quem está livre em cada data)
- a **reputação de operação** (agenda em dia, tempo de resposta, jobs concluídos)
- o **pagamento garantido** (quem aceita, quem exige, valores em custódia)
- as **integrações** (Google Agenda, WhatsApp)

Há um aviso visível no topo da busca, mas um aviso não substitui consentimento.
**Antes de divulgar o link amplamente**, escolha um caminho:

1. **Avisar o grupo** e obter o de acordo de quem está listado; ou
2. **Publicar a versão anonimizada** — nomes viram "João C." e o portfólio sai:
   ```bash
   npm run build:anon
   ```

O `vercel.json` já envia `X-Robots-Tag: noindex, nofollow`, então o site não é
indexado por buscadores. Isso reduz a exposição, mas **não** torna o link privado.

---

## Rodar local

```bash
npm run dev     # http://localhost:5173
```

Não há dependências — só Node.

## Reconstruir

```bash
npm run build        # nomes reais
npm run build:anon   # nomes anonimizados
```

O build monta `public/index.html` juntando:

| Entrada | O que é |
|---|---|
| `src/template.html` | markup, estilos e toda a lógica |
| `src/crew.json` | os 109 cadastros já normalizados |
| `src/assets/fonts.json` | Schibsted Grotesk e Spline Sans Mono em base64 |
| `src/assets/frames.json` | frames de portfólio do perfil de exemplo |

Tudo é embarcado no HTML: **sem CDN, sem requisição externa, funciona offline.**

`src/parse-csv.js` é o script que gerou o `crew.json` a partir da planilha
original — normaliza função, cidade e equipamento. Só é necessário se a planilha
mudar.

## Estrutura

```
docs/
  apresentacao.html  o pitch (18 slides 16:9) — fora de public/, não vai para o ar
public/
  index.html        a plataforma
  identidade.html   o manual de identidade visual
src/
  template.html     fonte do index (com marcadores /*__…__*/)
  crew.json         dados dos cadastros
  build.js          monta o public/index.html
  parse-csv.js      planilha → crew.json
  assets/           fontes e imagens em base64
```

## O que tem dentro

- **Homepage** — a apresentação pública, antes do login: o problema, os quatro
  passos, o pagamento garantido, os dois lados (quem contrata / quem é freela),
  os planos. Os números do topo e a faixa de disponibilidade saem dos dados reais.
- **Início** — praças (cidades) com quantos estão na escuta hoje
- **Montar equipe** — escala inteira de um job com custo somando em tempo real
- **Passar o carro** — chamada de última hora só para quem está livre na data,
  disputada: o primeiro que aceitar leva e preenche a vaga na escala
- **Propostas** — a outra ponta: a consulta chega aqui e o freela responde
  *aceito*, *recuso* (com motivo) ou *contraproponho*. Aceitar cria o job na
  agenda, trava a data e, se for com garantia, põe o valor em custódia
- **Minha agenda** — jobs, diárias e o que há a receber; a disponibilidade sai daqui
- **Cadastro** — cinco etapas com um medidor de perfil completo ao vivo, o peso
  de cada campo à mostra e o selo de verificado explicado. Tem um botão
  *"ver o cadastro vazio"* que zera tudo para você acompanhar a subida de 0 a 100%
- **Perfil da produtora** — fatos de operação de quem contrata, o que já produziu
  e o seu histórico com ela; aberto pelo nome do cliente em qualquer tela
- **Minha produtora** — a conta de quem contrata (login pela Microsoft)
- **Meu perfil** — tabela de preços por função e as regras que mudam o valor
- **Brechó** — compra e venda de equipamento com ficha de conservação por
  categoria, fotos exigidas e compra garantida com taxa de 5%
- **Aprender** — cursos de parceiros, clube de desconto e encontro do mês

## O ciclo fechado

Um a um:

```
produtora busca → consulta com data, escopo e valor
      → proposta na caixa do freela
      → aceito / recuso com motivo / contraproponho
      → job na agenda, data travada, valor em custódia
      → entrega → liberação em D+1
```

Um para muitos — a chamada de última hora:

```
vaga aberta na escala → passar o carro só para quem está livre na data
      → a mesma proposta cai na caixa de todos ao mesmo tempo
      → o primeiro que aceitar leva; os outros são avisados na hora
      → o vencedor preenche a vaga na escala
```

A corrida é a parte que importa: numa chamada de última hora ninguém responde
para uma vaga que já fechou. Quem perdeu vê *"fulano aceitou antes de você"* em
vez de silêncio, e é isso que justifica a chamada ir só para quem está na escuta.
Chamada não aceita contraproposta — o valor é o que está no anúncio.

Nada disso passa por chat. A tese do produto é que a conversa de três dias é o
custo que se quer eliminar — por isso a resposta é um botão, e a discordância
sobre preço é um campo numérico, não um argumento.

Duas coisas que a caixa faz antes de você responder: compara o valor com a sua
tabela (*"R$ 200 abaixo da sua diária"*) e avisa se a data bate com job que você
já tem. Contraproposta até 25% acima do orçamento passa; acima disso o
contratante volta atrás — a regra está no código, não é sorteio.

## Brechó de equipamento

A venda de equipamento acontece hoje em grupo de WhatsApp, sem ficha, sem
histórico do vendedor e sem garantia nenhuma. O brechó ataca exatamente essas
três coisas.

**Ficha obrigatória por categoria.** Cada tipo de equipamento pergunta o que o
comprador perguntaria se pudesse:

| Categoria | O que a ficha exige |
|---|---|
| Câmera | contagem de cliques, sensor, corpo, borrachas, baterias, assistência |
| Lente | **fungo**, elemento frontal, elemento traseiro, névoa interna, anel de foco, lâminas do diafragma, baioneta, autofoco |
| Drone | horas de voo, baterias, ciclos, gimbal, se já caiu, hélices |
| Áudio, luz, estabilizador, computador | horas de uso, ciclos e saúde de bateria, motores, LED, tela, teclado |

Cada resposta vira verde, amarelo ou rosa na página. **Defeito declarado não é
defeito escondido** — o oposto do que acontece no grupo, e é isso que a cor
comunica.

**Fotos que revelam o que se esconde.** A plataforma pede fotos específicas por
categoria — *tela mostrando a contagem de cliques*, *elemento frontal contra a
luz*, *tela do app com horas e ciclos*. Quem não envia fica marcado como
`3/4 fotos` na lista.

**O vendedor é o perfil.** Não é um número de telefone: é a mesma conta que ele
usa para trabalhar, com jobs concluídos, tempo de resposta e agenda em dia. Quem
some depois da venda some do resto da plataforma junto.

### Avaliador de preço — só do vendedor

O vendedor não deveria precisar pesquisar quanto cobrar. A mesma ficha que ele
preenche para o comprador alimenta um avaliador que devolve a **faixa saudável** e
mostra de onde saiu cada centavo:

```
preço de tabela (novo)
  × depreciação por categoria e idade      camera −32% no 1º ano, −9%/ano depois
                                           lente −22% / −6%   drone −32% / −11%
  ± penalidades da ficha                   96.000 cliques −9%   fungo presente −28%
                                           sensor marcado −14%  já caiu −18%
                                           3 baterias +2%
= sugerido, com faixa de ±7%
```

Um **catálogo de ~50 modelos** comuns no audiovisual reconhece o que a pessoa
digitou (“Sony A7 IV corpo” → tabela R$ 16.500) e já ajusta a categoria — assim
ela não precisa nem saber o preço de novo.

Depois de escolher o preço, uma leitura de liquidez: *abaixo da faixa sai em
poucos dias · dentro da faixa fecha em duas a três semanas · acima demora mais de
um mês · fora da faixa não vende.*

**Isso não aparece para o comprador.** Se aparecesse, viraria arma de barganha —
e o vendedor pararia de preencher a ficha com honestidade, que é justamente o
ativo do brechó.

No protótipo os pesos são fixos e estão no código, explicados linha a linha na
própria tela. No produto real eles se calibram contra as vendas que fecharem pela
plataforma: cada venda melhora a avaliação, a avaliação atrai mais anúncio.

### A taxa

5% sobre a venda, **paga pelo vendedor**, e só existe na **compra garantida**:
o valor fica retido, o comprador tem três dias depois de receber para conferir
contra a ficha, e o dinheiro só é liberado depois disso. Anúncio sem garantia não
paga taxa e também não tem retenção — combina e recebe direto, como no grupo.

Essa separação é deliberada. Uma taxa sobre um ticket alto, num mercado
onde a alternativa é gratuita, vaza para fora da plataforma se não vier
acompanhada de algo que o vendedor não consegue oferecer sozinho. O que ele não
consegue oferecer sozinho é a custódia. O free tier mantém o inventário dentro; a
garantia converte o que vale a pena converter.

## A produtora também presta contas

A plataforma era assimétrica: o freela era perfilado, medido e verificado; quem
contrata era uma string num card. O freela aceitava um dia de trabalho de um
desconhecido — e é exatamente aí que mora o medo que a custódia tenta resolver.

Agora quem contrata tem conta e página pública, com as **mesmas quatro categorias
de fato** que já valiam para o freela — comportamento de operação, nunca nota:

| Fato | Por que este e não outro |
|---|---|
| **Pagou sem atraso** (n/total) | atraso só é possível fora da garantia — em custódia a liberação é automática |
| **Pagamento garantido** (n/total) | é o único fato que torna o histórico dispensável |
| **Confirma em** | mediana entre a consulta e o aceite; diz se a data vai ficar presa por uma semana |
| **Cancelou** (e quantos em menos de 72h) | cancelar em cima da hora é o prejuízo real do freela |

Mais: o que a produtora já produziu **com gente daqui** (montado a partir dos
trabalhos publicados pelos freelas que a creditam — ela não escolhe o que
aparece), as funções que costuma contratar, e o seu histórico pessoal com ela.

Duas decisões:

- **O selo de garantia é derivado, não declarado.** Só aparece para quem fecha
  com custódia em 70% ou mais dos jobs. Conta nova, sem histórico, mostra apenas
  *"diz que vai fechar com garantia"* — declaração é declaração.
- **Sem histórico não é acusação.** Uma conta nova recebe uma leitura explícita:
  *"não quer dizer que seja ruim, quer dizer que você não tem como saber — é
  exatamente o caso de fechar com pagamento garantido"*. O produto empurra para a
  solução em vez de bloquear quem está chegando.

A leitura resumida aparece como **tarja dentro do card da proposta**, no ponto
exato em que o freela decide, e o nome do contratante virou link em toda a
plataforma: proposta, agenda e a lista de clientes do portfólio.

### Conta de produtora

O login pela Microsoft entra como produtora e a navegação muda: some Propostas,
Minha agenda e Meu perfil (são do freela), entra **Minha produtora**. Montar
equipe e Passar o carro continuam nos dois lados, e a chamada já sai preenchida
com o nome da produtora.

O editor tem medidor próprio: nome e tipo, praça, logo, quem é, site, CNPJ e a
decisão de fechar sempre com garantia. **Jobs, atrasos e cancelamentos não são
editáveis** — se dessem para editar, não valeriam nada.

## O perfil é o portfólio

O perfil era uma ficha técnica: câmera, lentes, gimbal, sim/não. Agora é a página
que o freela usa para se vender — e que ele pode mandar para quem nem está na
plataforma.

- **Capa** montada a partir do primeiro trabalho publicado. Quem ainda não
  publicou nada recebe um degradê próprio, derivado do id — decorativo, nunca
  conteúdo inventado no nome de alguém.
- **Foto de perfil** com upload de verdade: o arquivo é lido no navegador,
  redimensionado para 420px num canvas e guardado como data-URI. Aparece no
  perfil, na busca e no topo.
- **Trabalhos em destaque** com imagem, título, cliente, **a função que a pessoa
  exerceu naquele job**, tipo, ano, descrição e link. A função fica em cima da
  imagem, porque é ela que diz que ele foi o colorista e não o cinegrafista.
- **Lightbox** com a imagem grande e a ficha completa.
- **Já trabalhou com** — a lista se monta sozinha a partir dos jobs fechados na
  plataforma depois da data; à mão só entra o que veio de antes.
- **Compartilhar** devolve um link de página pública (`carrodofreela.com.br/@handle`).
- Quem não publicou trabalho aqui continua com o **link do portfólio externo**
  que informou no cadastro, em destaque.

O editor fica na etapa 06 do cadastro. As imagens de exemplo são frames reais de
trabalhos do perfil de demonstração; nenhum outro cadastrado recebe trabalho
atribuído.

## Perfil completo e o selo

A busca já mostrava *"perfil completo: 74%"* e usava isso para liberar o selo de
verificado — mas não existia tela nenhuma para completar. A mecânica estava no ar.

Agora o peso de cada campo é o quanto ele muda a busca, e está à mostra:

| Campo | Peso | Por quê |
|---|---|---|
| Tabela de diária | 17 | sem ela a consulta chega sem valor |
| Funções que você faz | 16 | é a porta de entrada de toda busca |
| Câmera e lentes | 12 | metade das buscas começa por equipamento |
| Nome e praça | 10 | equipe se contrata por proximidade |
| Três trabalhos em destaque | 8 | é o que faz alguém parar na página |
| WhatsApp | 7 | é por onde a chamada chega |
| Foto de perfil | 6 | quem contrata está escolhendo pessoa |
| Nichos, deslocamento, regras, link, recebimento, clientes | 3–5 cada | filtros e desempate |

Selo de **verificado** = perfil ≥ 85% **e** 6 jobs concluídos. Grátis, e nenhum
plano vende — o Premium é ferramenta, nunca credibilidade.

Editar o cadastro reescreve o registro na busca em tempo real: funções, tags de
equipamento, praça, `principal`, tabela e o próprio selo. Dá para zerar tudo,
preencher de novo e ver a pessoa reaparecer na busca.

## Pagamento garantido (custódia)

O valor combinado fica retido na plataforma quando a data é confirmada e é
liberado sozinho no dia seguinte à entrega. Está implementado ponta a ponta no
protótipo: no modal de consulta (com o depósito calculado), na agenda do freela
(KPI *em custódia*, painel de liberação e trilha de quatro etapas por job), na
busca (selo e filtro), no perfil e no custo da escala em **Montar equipe**.

Regras que o código assume:

| | |
|---|---|
| **Taxa** | 6% sobre o valor, **paga por quem contrata**. Se saísse da diária do freela, todo mundo voltaria pro acerto direto no dia seguinte. |
| **Liberação** | D+1 da entrega, automática. Job com garantia nunca entra na conta de *a receber*. |
| **Cancelou com +7 dias** | Devolução integral. |
| **7 a 3 dias** | Metade fica com o freela. |
| **Menos de 72h** | O valor fica com o freela — ele já recusou outro job naquela data. |
| **Freela cancela** | Devolução integral, a data volta para a busca, e o cancelamento fica registrado no perfil como fato de operação. |

Usar é opcional dos dois lados: o freela liga ou desliga em **Meu perfil**, e pode
exigir garantia em todo job; quem contrata pode desligar no próprio modal. Acerto
direto continua existindo e continua de graça — é o contraste entre as duas
colunas da agenda que faz o argumento.

## Decisões de produto embutidas no código

- **Ninguém compra posição na busca.** A ordenação é disponibilidade → agenda em dia.
- **Sem estrelas e sem top 10.** A reputação são quatro fatos de operação, não uma
  nota sobre o talento de alguém. Ranking de popularidade concentraria os jobs em
  dez pessoas e mataria o dado das outras noventa e nove.
- **Verificado é grátis e conquistado** (6 jobs + perfil 85%). O Premium vende
  ferramenta, nunca credibilidade.
- **Ocupado é cinza, não vermelho.** Estar trabalhando não é erro.
- **Preço de quem não publicou tabela** aparece como *faixa de referência da praça*
  — média de mercado por função, nunca atribuída a um profissional específico.
- **A taxa da garantia é de quem contrata.** Cobrar do freela transformaria a
  plataforma em imposto sobre o trabalho dele — e o combinado voltaria pro PIX.

## Licenças

Schibsted Grotesk e Spline Sans Mono: SIL Open Font License.
