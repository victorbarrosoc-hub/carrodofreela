# Carro do Freela

Protótipo de conceito: **agenda e contratação de freelas do audiovisual**.
Quem contrata escolhe a praça, vê quem está com o dia livre e monta a escala.
Quem é freela mantém a própria agenda — e a disponibilidade pública sai disso sozinha.

O nome nasceu no grupo, não numa agência: *"olha o carro do freela passando"*.

---

## ⚠️ Antes de tornar o link público — leia

Este protótipo contém **dados profissionais reais de 109 pessoas**, informados por
elas próprias num cadastro de freelas (nome, cidade, função, equipamento, portfólio).
Telefones **não** estão incluídos.

Três coisas são **simuladas** e aparecem atribuídas a pessoas reais:

- a **agenda** (quem está livre em cada data)
- a **reputação de operação** (agenda em dia, tempo de resposta, jobs concluídos)
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

- **Início** — praças (cidades) com quantos estão na escuta hoje
- **Montar equipe** — escala inteira de um job com custo somando em tempo real
- **Passar o carro** — chamada de última hora só para quem está livre na data
- **Minha agenda** — jobs, diárias e o que há a receber; a disponibilidade sai daqui
- **Meu perfil** — tabela de preços por função e as regras que mudam o valor
- **Aprender** — cursos de parceiros, clube de desconto e encontro do mês

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

## Licenças

Schibsted Grotesk e Spline Sans Mono: SIL Open Font License.
