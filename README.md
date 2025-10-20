Mortyverse

Aplicação Angular SPA inspirada no universo de Rick and Morty, com recursos de exploração, busca, filtros, paginação e modais.
O projeto possui suporte opcional a Server-Side Rendering (SSR) via Express, melhorando o SEO e o tempo de carregamento inicial.

Você pode visualizar o projeto online em: https://lucas01012.github.io/mortyverse/

## Tecnologias principais

| Tecnologia            | Versão     | Descrição                                 |
|-----------------------|------------|-------------------------------------------|
| Angular               | 20.3.6     | Framework principal                       |
| Angular CLI           | 20.3.6     | Ferramentas de build e desenvolvimento    |
| Jest                  | 29.7.0     | Test runner e assertions                  |
| jest-preset-angular   | 14.1.0     | Integração entre Angular e Jest           |
| TypeScript            | ~5.9.2     | Superset de JavaScript                    |
| Express               | 5.1.0      | Servidor SSR                              |
| Node.js               | v20.19.0+  | Ambiente de execução (recomendado)        |

## Índice

- Visão geral
- Requisitos
- Instalação
- Execução (desenvolvimento)
- Build (produção)
- Server-Side Rendering (SSR)
- Testes (Jest)
- Scripts importantes
- Estrutura do projeto
- Debug e solução de problemas
- Erros comuns e compatibilidade de versões
- Contribuição

## Visão geral

O Mortyverse é uma SPA (Single Page Application) desenvolvida em Angular 20, que permite explorar personagens do universo Rick and Morty com filtros dinâmicos, paginação e integração com API externa.
O projeto também inclui SSR para otimizar desempenho e SEO.

## Requisitos

- Node.js v20.19.0 ou superior
- npm v10.8.0 ou superior
- Git

## Instalação

Clone o repositório:

```sh
git clone https://github.com/Lucas01012/mortyverse.git
cd mortyverse
```

Instale as dependências:

```sh
npm install
```

## Execução (desenvolvimento)

Inicie o servidor de desenvolvimento com live reload:

```sh
npm start
# ou
ng serve
```

Abra o navegador em http://localhost:4200

## Build (produção)

Gere um build otimizado para produção:

```sh
npm run build
# ou
ng build
```

Os artefatos gerados estarão disponíveis em:

```
dist/
```

## Server-Side Rendering (SSR)

Para gerar e executar a versão SSR localmente:

```sh
npm run build
npm run serve:ssr:mortyverse
```

O comando `serve:ssr:mortyverse` executa o bundle SSR via Express.

## Testes (Jest)

O projeto utiliza Jest como test runner, configurado por `jest.config.js` e `setup-jest.ts`.

Executar testes unitários:

```sh
npm test
```

Executar em modo watch:

```sh
npm run test:watch
```

Gerar relatório de cobertura:

```sh
npm run test:coverage
```

Modo CI (coverage + limites de workers):

```sh
npm run test:ci
```

## Scripts importantes

Os scripts disponíveis em `package.json`:

| Script                        | Descrição                              |
|-------------------------------|----------------------------------------|
| npm start / ng serve          | Inicia o servidor de desenvolvimento   |
| npm run build / ng build      | Build de produção                      |
| npm run watch                 | Build contínuo                         |
| npm test                      | Executa Jest                           |
| npm run test:coverage         | Gera relatório de cobertura            |
| npm run serve:ssr:mortyverse  | Executa o bundle SSR via Node          |

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

## Debug e solução de problemas

### Dependências e TypeScript

Se ocorrerem erros de build:

```sh
npm ci
```

Isso garante uma instalação limpa e determinística.

### Testes (Jest)

Verifique se `setup-jest.ts` está presente e referenciado em `jest.config.js` (campo `setupFilesAfterEnv`).

Confirme que `@types/jest` está instalado nas `devDependencies`.

### SSR

Se ocorrerem erros em runtime no servidor SSR:

- Confirme que a versão do Node usada para execução é compatível (recomenda-se v20.19.0+).
- Diferenças de runtime podem causar falhas em APIs do Node/V8.

## Erros comuns e compatibilidade de versões

### Node.js incompatível

**Erro:**

```
The Angular CLI requires a minimum Node.js version of v20.19 or v22.12.
```

**Causa:**
Versão antiga do Node.js (ex: v18) sendo usada com o Angular 20+.

**Solução:**

#### Windows:

Baixe e instale o Node.js mais recente (LTS recomendado) em:
https://nodejs.org/

Após a instalação, reinicie o terminal ou o VS Code.

Verifique a versão:

```sh
node -v
npm -v
```

Deve exibir algo como:

```
v20.19.0
10.8.0
```

#### Linux (Ubuntu):

```sh
nvm install 20
nvm use 20
```

Recomenda-se Node v20.19.0 (LTS) ou superior.

### npm desatualizado

**Erro:**

```
npm ERR! code EBADENGINE
```

ou falhas de instalação relacionadas a dependências Angular.

**Solução (Windows e Linux):**

```sh
npm install -g npm@latest
```

Verifique a versão:

```sh
npm -v
```

Recomendado: npm >= 10.8.0

### Conflito de cache ou dependências corrompidas

**Erro:**

```
Cannot find module '@angular/core'
```

ou

```
TypeScript compilation failed
```

**Solução (Windows e Linux):**
Remova módulos existentes e reinstale:

```sh
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

No PowerShell (Windows), use:

```powershell
rmdir -r -fo node_modules
del package-lock.json
npm cache clean --force
npm install
```

Isso garante uma reinstalação limpa e determinística.