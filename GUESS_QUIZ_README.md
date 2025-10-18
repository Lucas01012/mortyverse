# Quiz de Adivinhação - Mortyverse

## 📋 Descrição

O Quiz de Adivinhação é uma nova funcionalidade interativa da aplicação Mortyverse que desafia o conhecimento dos usuários sobre os personagens de Rick and Morty.

## ✨ Funcionalidades

### 🎯 Mecânica do Jogo

- **10 questões aleatórias** por partida
- **Imagem borrada** do personagem para aumentar o desafio
- **4 opções de resposta** por questão (apenas 1 correta)
- **Pistas visuais**: Status, Espécie, Gênero, Tipo e Origem do personagem
- **Sistema de pontuação**: 1 ponto por resposta correta
- **Feedback imediato**: Indica se a resposta está correta ou incorreta
- **Efeito de revelação**: A imagem é revelada após a resposta

### 🎨 Interface

#### Durante o Quiz
- Barra de progresso visual
- Contador de pontuação em tempo real
- Indicador de questão atual (ex: 3/10)
- Card com imagem borrada e pistas
- Botões de opções com feedback visual (verde para correto, vermelho para incorreto)
- Animações suaves de transição entre questões

#### Tela de Resultado
- **Pontuação final** com porcentagem de acertos
- **Gráfico circular animado** mostrando o desempenho
- **Mensagem personalizada** baseada na performance:
  - 100%: "Perfeito! Você é um mestre do Mortyverse! 🏆"
  - 80-99%: "Excelente! Você conhece muito bem o universo! 🌟"
  - 60-79%: "Muito bem! Você está no caminho certo! 👍"
  - 40-59%: "Bom trabalho! Continue assistindo a série! 📺"
  - 0-39%: "Precisa assistir mais Rick and Morty! 🚀"
- **Resumo detalhado** de todas as questões com:
  - Imagem do personagem correto
  - Resposta correta
  - Resposta selecionada (se incorreta)
  - Indicador visual (✓ ou ✗)

## 🛠️ Estrutura Técnica

### Componentes Criados

```
src/app/features/quiz/
├── pages/
│   ├── guess-quiz-page.component.ts         # Página principal do quiz
│   ├── guess-quiz-page.component.html
│   └── guess-quiz-page.component.scss
└── components/
    ├── question-card/                        # Card de questão individual
    │   ├── question-card.component.ts
    │   ├── question-card.component.html
    │   └── question-card.component.scss
    └── guess-quiz-result/                    # Tela de resultado
        ├── guess-quiz-result.component.ts
        ├── guess-quiz-result.component.html
        └── guess-quiz-result.component.scss
```

### Tipos e Interfaces

```typescript
export interface QuizQuestion {
  character: Character;           // Personagem correto
  options: Character[];           // 4 opções (incluindo a correta)
  answered: boolean;              // Se foi respondida
  selectedAnswer?: Character;     // Resposta selecionada
  isCorrect?: boolean;           // Se acertou
}
```

### Lógica de Geração de Questões

1. **Seleção aleatória** de personagens da API (total: 826 personagens)
2. **Evita duplicatas** usando um Set de IDs já utilizados
3. **Gera 3 opções incorretas** para cada questão
4. **Embaralha as opções** para posições aleatórias
5. **Validação** para garantir questões completas

### Configuração

```typescript
private readonly TOTAL_QUESTIONS = 10;              // Total de questões
private readonly OPTIONS_PER_QUESTION = 4;          // Opções por questão
private readonly MAX_CHARACTERS_IN_API = 826;       // Total na API
```

## 🎨 Estilização

### Efeitos Especiais

- **Blur na imagem**: `filter: blur(15px)` - Oculta o personagem
- **Revelação suave**: Transição de 0.5s ao desblurrar
- **Animações**:
  - `slideIn`: Entrada do card de questão
  - `pulse`: Resposta correta
  - `shake`: Resposta incorreta
  - `fadeIn`: Feedback de resposta
  - `bounce`: Emoji de resultado

### Cores

- **Correto**: Verde (`var(--primary-green)`)
- **Incorreto**: Vermelho (`#ff3b30`)
- **Neutro**: Tons de cinza do tema

## 🚀 Como Acessar

1. No menu de navegação, clique em **"Quiz Adivinhação"** 🎯
2. Ou acesse diretamente: `/guess-quiz`

## 📱 Responsividade

- **Desktop**: Layout otimizado com 2 colunas de opções
- **Mobile**: Layout em coluna única, adaptado para toque
- **Tablet**: Ajuste automático baseado na largura da tela

## 🔄 Fluxo de Uso

1. **Início**: Quiz carrega 10 questões aleatórias
2. **Questão**: Usuário vê imagem borrada e pistas
3. **Resposta**: Clica em uma das 4 opções
4. **Feedback**: Vê se acertou (verde) ou errou (vermelho)
5. **Transição**: Após 1.5s, próxima questão aparece
6. **Resultado**: Ao final, tela com pontuação e resumo
7. **Retry**: Pode jogar novamente clicando em "Jogar Novamente"

## 🎯 Melhorias Futuras Possíveis

- [ ] Diferentes níveis de dificuldade
- [ ] Timer por questão
- [ ] Ranking de pontuações
- [ ] Compartilhar resultado nas redes sociais
- [ ] Modo multiplayer
- [ ] Categorias específicas (apenas humanos, aliens, etc.)
- [ ] Dicas extras (gastar pontos para revelar parcialmente)

## 🐛 Tratamento de Erros

- Validação de questões completas antes de iniciar
- Máximo de tentativas para buscar personagens
- Mensagens de erro amigáveis
- Botão "Tentar Novamente" em caso de falha

---

**Desenvolvido com ❤️ para a comunidade Rick and Morty**
