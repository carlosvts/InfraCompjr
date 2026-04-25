# Infraestrutura DevOps — Projeto CompJR

Trainee: Carlos Vinicius Teixeira de Souza  

Link de apresentação: TODO  

---

## Sobre o Projeto

Este projeto tem como objetivo demonstrar, na prática, a construção de uma pipeline de DevOps moderna, incluindo:

- Testes automatizados com Jest
- Containerização com Docker
- Orquestração com Docker Compose
- Execução local simulando CI
- Análise de qualidade com SonarQube
- Exposição de relatórios via NGINX
- Automação com script bash

O foco principal não foi apenas fazer funcionar, mas entender como as ferramentas se integram e resolver problemas reais de infraestrutura.

---

## Tecnologias Utilizadas

- Node.js  
- Jest + Supertest  
- Docker  
- Docker Compose  
- SonarQube  
- NGINX  
- Bash (run.sh)  

---

## Estrutura do Projeto

.
├── .github/workflows         // Pipeline CI/CD (GitHub Actions)

├── docker-compose.yml        // Orquestração dos containers e profiles (dev, prod, ci, report)

├── Dockerfile                // Build da imagem Node (multi-stage: deps + runner)

├── jest.config.js            // Configuração dos testes (ambientes, setup, reporters)

├── .env-example              // Exemplo de variáveis de ambiente necessárias

├── nginx.conf                // Configuração do NGINX para servir relatório de testes

├── package.json              // Dependências e scripts do projeto

├── package-lock.json         // Lock de dependências (instalação determinística)

├── problemas_encontrados.MD  // Documentação dos desafios e aprendizados do projeto

├── README-jest.md            // Readme original do projeto Node com testes unitários

├── README.md                 // Documentação principal do projeto (infraestrutura DevOps)

├── run.sh                    // Script de automação para executar os perfis do docker-compose

├── sonar-project.properties  // Configuração do SonarQube (análise de qualidade)

└── src                       // Código-fonte da aplicação e testes

---

## Como Rodar o Projeto

Pré-requisitos:

- Docker instalado  
- Docker Compose instalado  

Com apenas Docker instalado, qualquer pessoa consegue rodar todo o ambiente do projeto.
Não é necessário instalar Node, Jest ou SonarQube localmente — tudo já está encapsulado nos containers.

Isso garante previsibilidade total e elimina o clássico problema de “na minha máquina funciona”.

---

Executar testes (modo desenvolvimento):

`./run.sh test`

---

Executar testes (modo produção):

`./run.sh test:prod`

---

Gerar e visualizar relatório:

`./run.sh report`

Acesse no navegador:

`http://localhost:8080`

---

Simular pipeline CI local (com SonarQube):

`./run.sh ci`

Após subir:

`http://localhost:9000`

---

Build das imagens:

`./run.sh build`

---

Limpar containers e volumes:

`./run.sh clean`

---

## Observações Importantes

- O SonarQube pode levar até alguns minutos para iniciar completamente  
- É necessário gerar um token de acesso no SonarQube para o scanner funcionar  
- O projeto utiliza variáveis via arquivo .env para segurança  

---

## Problemas e Aprendizados

Todos os desafios enfrentados, incluindo:

- Problemas com mock de API  
- Dependências inconsistentes  
- Integração com SonarQube  
- Persistência com Docker  
- Pipeline CI/CD  

Estão documentados em:

`problemas_encontrados.MD`

---

## Créditos

Este projeto utiliza como base a aplicação:

https://github.com/awaragi/jest-supertest-starter  

Responsável por fornecer uma API Node.js com testes já estruturados, utilizada como base para a implementação da infraestrutura.
