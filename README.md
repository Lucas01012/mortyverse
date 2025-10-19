Mortyverse
Este repositório contém o Mortyverse, uma aplicação Angular para explorar personagens do universo Rick and Morty. Este README fornece um guia técnico completo em português com instruções de instalação, execução, build, SSR, testes e resolução de problemas.

Versões principais (conforme package.json)

Angular: 20.3.x (@angular/core@^20.3.0, @angular/cli@^20.3.6)
Angular CLI: 20.3.6
Jest: 30.2.0
jest-preset-angular: 15.0.3
TypeScript: ~5.9.2
Express (SSR): 5.1.0
Node.js: recomendado v18+
Índice

Visão geral
Requisitos
Instalação
Execução (desenvolvimento)
Build (produção)
Server-Side Rendering (SSR)
Testes (Jest)
Scripts importantes
Estrutura do projeto
Debug e solução de problemas
Contribuição
Visão geral
Mortyverse é uma aplicação SPA construída com Angular que oferece recursos de busca, filtros, paginação e visualização em modais. O projeto também possui suporte básico a SSR para melhorar SEO e tempo de carregamento inicial.

Requisitos
Node.js v18 ou superior (recomendado)
npm v9 ou superior (recomendado)
Git
Instalação
Clone o repositório:
git clone https://github.com/Lucas01012/mortyverse.git
cd mortyverse
Instale dependências:
npm install
Execução (desenvolvimento)
Inicie o servidor de desenvolvimento com live reload:

npm start
# ou
ng serve
Abra http://localhost:4200 no navegador.

Build (produção)
Gere um build de produção:

npm run build
# ou
ng build
Os artefatos serão gerados em dist/.

Server-Side Rendering (SSR)
Para executar a versão SSR localmente:

npm run build
npm run serve:ssr:mortyverse
O comando serve:ssr:mortyverse executa o bundle SSR via Node (Express). Certifique-se de usar a mesma versão do Node para build e execução para evitar incompatibilidades.

Testes
O projeto utiliza Jest como test runner, configurado por jest.config.js e setup-jest.ts.

Executar testes unitários:
npm test
Executar em modo watch:
npm run test:watch
Gerar relatório de cobertura:
npm run test:coverage
Modo CI (coverage + limites de workers):
npm run test:ci
Observações sobre testes

jest-preset-angular@15.0.3 é usado para compatibilizar Angular e Jest.
setup-jest.ts configura zone.js e polyfills necessários para o ambiente de teste.
Cobertura e thresholds são definidos em jest.config.js.
Scripts importantes
Os scripts disponíveis em package.json:

npm start / ng serve — servidor de desenvolvimento
npm run build / ng build — build de produção
npm run watch — build em modo watch para desenvolvimento
npm test — executa Jest
npm run test:coverage — executa Jest e gera cobertura
npm run serve:ssr:mortyverse — serve bundle SSR (após build)
Estrutura do projeto
Resumo da organização principal:

mortyverse/
  src/
    app/
      core/        # modelos, serviços e estado global
      features/    # páginas e componentes específicos (character-explorer, my-lists, quiz)
      shared/      # componentes reutilizáveis (pagination, modals, pipes, directives)
    assets/
    main.ts
    main.server.ts
    server.ts
  angular.json
  package.json
  jest.config.js
  setup-jest.ts
Debug e solução de problemas
Dependências e TypeScript

Se ocorrerem erros de compilação, verifique a versão do typescript (~5.9.2) e execute npm ci para instalações determinísticas.
Testes (Jest)

Verifique se setup-jest.ts está presente e referenciado em jest.config.js (campo setupFilesAfterEnv).
Confirme que @types/jest está instalado nas devDependencies.
SSR

Se ocorrerem erros em runtime no servidor SSR, confirme que a versão do Node usada para execução é compatível (recomenda-se v18+). Diferenças de runtime podem causar falhas em APIs do Node/V8.
