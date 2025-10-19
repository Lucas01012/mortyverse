
# Mortyverse

Aplicação Angular SPA inspirada no universo de Rick and Morty, com recursos de exploração, busca, filtros, paginação e modais.  
O projeto possui suporte opcional a Server-Side Rendering (SSR) via Express, melhorando o SEO e o tempo de carregamento inicial.

Você pode visualizar o projeto online em: [https://lucas01012.github.io/mortyverse/](https://lucas01012.github.io/mortyverse/)

---

## Tecnologias principais

| Tecnologia             | Versão         | Descrição                              |
|------------------------|---------------|----------------------------------------|
| **Angular**            | 20.3.x        | Framework principal                    |
| **Angular CLI**        | 20.3.6        | Ferramentas de build e desenvolvimento |
| **Jest**               | 29.7.0        | Test runner e assertions               |
| **jest-preset-angular**| 14.1.0        | Integração entre Angular e Jest        |
| **TypeScript**         | ~5.9.2        | Superset de JavaScript                 |
| **Express**            | 5.1.0         | Servidor SSR                           |
| **Node.js**            | v18+ (recomendado) | Ambiente de execução              |

---

## Índice

1. [Visão geral](#visão-geral)  
2. [Requisitos](#requisitos)  
3. [Instalação](#instalação)  
4. [Execução (desenvolvimento)](#execução-desenvolvimento)  
5. [Build (produção)](#build-produção)  
6. [Server-Side Rendering (SSR)](#server-side-rendering-ssr)  
7. [Testes (Jest)](#testes-jest)  
8. [Scripts importantes](#scripts-importantes)  
9. [Estrutura do projeto](#estrutura-do-projeto)  
10. [Debug e solução de problemas](#debug-e-solução-de-problemas)  
11. [Contribuição](#contribuição)

---

## Visão geral

O **Mortyverse** é uma SPA (Single Page Application) desenvolvida em Angular 20, que permite explorar personagens do universo Rick and Morty com filtros dinâmicos, paginação e integração com API externa.  
O projeto também inclui SSR para otimizar desempenho e SEO.

---

## Requisitos

- **Node.js** v18 ou superior  
- **npm** v9 ou superior  
- **Git**

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/Lucas01012/mortyverse.git
cd mortyverse
```

Instale as dependências:

```bash
npm install
```

---

## Execução (desenvolvimento)

Inicie o servidor de desenvolvimento com live reload:

```bash
npm start
# ou
ng serve
```

Abra o navegador em http://localhost:4200

---

## Build (produção)

Gere um build otimizado para produção:

```bash
npm run build
# ou
ng build
```

Os artefatos gerados estarão disponíveis em:

```
dist/
```

---

## Server-Side Rendering (SSR)

Para gerar e executar a versão SSR localmente:

```bash
npm run build
npm run serve:ssr:mortyverse
```

O comando serve:ssr:mortyverse executa o bundle SSR via Express.

---

## Testes (Jest)

O projeto utiliza Jest como test runner, configurado por jest.config.js e setup-jest.ts.

Executar testes unitários:
```bash
npm test
```

Executar em modo watch:
```bash
npm run test:watch
```

Gerar relatório de cobertura:
```bash
npm run test:coverage
```

Modo CI (coverage + limites de workers):
```bash
npm run test:ci
```

---

## Scripts importantes

Os scripts disponíveis em package.json:

| Script                        | Descrição                                 |
|-------------------------------|-------------------------------------------|
| npm start / ng serve          | Inicia o servidor de desenvolvimento      |
| npm run build / ng build      | Build de produção                         |
| npm run watch                 | Build contínuo                            |
| npm test                      | Executa Jest                              |
| npm run test:coverage         | Gera relatório de cobertura               |
| npm run serve:ssr:mortyverse  | Executa o bundle SSR via Node             |

---

## Estrutura do projeto

```
mortyverse/
├── public/
├── src/
│   ├── app/
│   │   ├── core/        # modelos, serviços e estado global
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── state/
│   │   ├── features/    # páginas e componentes específicos
│   │   │   ├── character-explorer/
│   │   │   ├── my-lists/
│   │   │   └── quiz/
│   │   └── shared/      # componentes reutilizáveis, pipes, directives, modais
│   │       ├── components/
│   │       ├── directives/
│   │       └── pipes/
│   ├── assets/
│   ├── main.ts
│   ├── main.server.ts
│   └── server.ts
├── angular.json
├── package.json
├── jest.config.js
└── setup-jest.ts
```

---

## Debug e solução de problemas

### Dependências e TypeScript
Se ocorrerem erros de build:
```bash
npm ci
```
Isso garante uma instalação limpa e determinística.

### Testes (Jest)
- Verifique se setup-jest.ts está presente e referenciado em jest.config.js (campo setupFilesAfterEnv).
- Confirme que @types/jest está instalado nas devDependencies.

### SSR
Se ocorrerem erros em runtime no servidor SSR:
- Confirme que a versão do Node usada para execução é compatível (recomenda-se v18+).
- Diferenças de runtime podem causar falhas em APIs do Node/V8.

---

## Contribuição

Contribuições são bem-vindas!
Abra uma issue ou envie um pull request descrevendo claramente a alteração proposta.
Antes de enviar, execute os testes e siga o padrão de commits convencionais (feat:, fix:, chore: etc).