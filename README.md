# EduAndMorty

Este projeto foi gerado usando [Angular CLI](https://github.com/angular/angular-cli) versão 20.2.1.

# Visão Geral

Aplicação para consulta, visualização e cadastro de personagens favoritos do seriado Rick & Morty, consumindo a API pública [rickandmortyapi.com](https://rickandmortyapi.com/documentation) via REST.

- Deploy de produção: https://edu-and-morty.vercel.app

# Principais Funcionalidades

- Busca por nome de personagem com RxJS (`debounceTime` e `distinctUntilChanged`) e filtro no servidor.
- Listagem com informações mínimas (nome, gênero e imagem) de cada personagem.
- Favoritar e desfavoritar personagens, com persistência local e contador dinâmico no topo.
- Visualização da lista de favoritos com opção de remoção.
- Paginação usando Angular Material `MatPaginator` (server-side, 20 itens por página).
- Internacionalização (pt-BR e en) com `@ngx-translate` e seletor de idioma na navbar.
- Extra: página de detalhes do personagem com episódios em que aparece.

# Requisitos Atendidos

- Seguir o protótipo indicado (layout responsivo, tipografia e estrutura de navegação).
- Buscar um personagem pelo nome (consulta à API com o filtro `name`).
- Exibir informações mínimas (nome, gênero e foto) dos personagens retornados.
- Registrar o personagem na lista de favoritos utilizando estado global (NGXS).
- Contador no topo da página atualizado dinamicamente em tempo real (navbar integrada ao estado `FavoritesState`).
- Visualizar a lista de personagens favoritos.
- Remover o personagem da lista de favoritos.
- Listagem com paginação (`MatPaginator`) realizando novas chamadas à API a cada página.

# Diferenciais Implementados

- Busca por nome com RxJS: `debounceTime(300)` e `distinctUntilChanged()` no componente `src/app/shared/components/text-search-form/text-search-form.ts`, evitando requisições desnecessárias.
- Filtro no servidor: a busca é feita pela API em `src/app/core/services/rick-and-morty-api.service.ts` (sem filtrar no front-end).
- Internacionalização com `@ngx-translate`: arquivos em `public/i18n/en.json` e `public/i18n/pt-br.json`, configuração em `src/app/app.config.ts` e seletor de idioma na navbar.
- Fonte personalizada do protótipo: Google Fonts Creepster e Poppins adicionadas em `src/index.html`.
- Otimização do uso de diretivas estruturais: diretivas utilitárias como `LoaderDirective` (`*appIfLoading`) e `EmptyDirective` para simplificar templates.
- Carregamento lento (lazy loading) de páginas: rotas com `loadChildren`/`loadComponent` em `src/app/pages/pages.routes.ts`.
- Layout responsivo: `MatGridList` + `BreakpointService` e utilitários de CSS (Tailwind) para diferentes tamanhos de tela.
- Deploy realizado com sucesso (Vercel): https://edu-and-morty.vercel.app

# Extra: Detalhes do Personagem

- Rota: `'/characters/:id'`.
- Componente: `CharacterDetailsComponent` (`src/app/pages/characters/character-details/character-details.ts`).
- Ao abrir, busca o personagem por ID e carrega a lista de episódios em que aparece (chamada em lote para múltiplos episódios).
- A tela exibe dados do personagem e seus episódios com i18n e feedback de carregamento/estado vazio.

# Arquitetura e Decisões Técnicas

- Angular 16+ com Standalone Components (Angular 20), `@angular/material`, RxJS e TypeScript.
- Estado global com NGXS: `CharactersState` e `FavoritesState` em `src/app/core/state/...`.
- Persistência de favoritos com `@ngxs/storage-plugin` (LocalStorage) configurada em `src/app/app.config.ts`.
- Serviços de API centralizados em `src/app/core/services/rick-and-morty-api.service.ts`, usando `HttpClient` e `HttpParams`.
- Rotas com lazy loading em `src/app/pages/pages.routes.ts` e módulo de characters com rotas filhas.
- Internacionalização com `@ngx-translate` configurada em `app.config.ts` e uso de `TranslatePipe` nos templates.
- Diretivas utilitárias para carregamento e estado vazio, melhorando a legibilidade dos templates.

# Como Rodar Localmente

Instalação

```bash
npm install
```

Servidor de desenvolvimento

```bash
ng serve
```

Acesse em http://localhost:4200/.

Build de produção

```bash
npm run build
```

Os artefatos serão gerados em `dist/`.

Lint e formatação

```bash
npm run lint
```

# API Utilizada

- Base URL: `https://rickandmortyapi.com/api`.
- Endpoints principais:
  - `GET /character` com filtros `name` e `page`.
  - `GET /character/:id` e `GET /character/:id1,:id2,...`.
  - `GET /episode` e `GET /episode/:id1,:id2,...` (para detalhes).
- Abordagem REST com `HttpClient` e construção de `HttpParams` no serviço `RickAndMortyApiService`.

# Internacionalização

- Idiomas: pt-BR (padrão) e en.
- Arquivos de tradução em `public/i18n/`.
- Troca de idioma via menu da navbar (`src/app/core/components/navbar/`).

# Stack Técnica

- Angular 20, TypeScript, RxJS 7.8.
- NGXS (devtools, logger, router e storage plugins).
- Angular Material.
- @ngx-translate (core e http-loader).
- Tailwind CSS v4.

# Deploy

- Produção: https://edu-and-morty.vercel.app
