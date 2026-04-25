# 🧠 Problemas Enfrentados e Soluções — Projeto DevOps Compjunior

Trainee: Carlos Vinícius Teixeira de Souza

Este documento descreve os principais desafios enfrentados durante o desenvolvimento do projeto, as soluções adotadas e os aprendizados adquiridos.

---

# 🚧 1. Problemas com Mock de API (Nock)

## ❌ Problema

O (jest-supertest-server)[https://github.com/awaragi/jest-supertest-starter], utiliza uma API que em alguns momentos estava fora do ar, mesmo com as configurações ideais

Inicialmente, os testes apresentavam comportamento inconsistente:

- Interceptors do Nock não eram limpos entre testes
- Respostas acumulavam entre execuções
- Testes não eram determinísticos

## 🔍 Causa

- Ausência de limpeza dos interceptors
- Uso incorreto de persistência
- Falta de controle no ciclo de vida dos mocks
- Inconsistência no próprio status da API

## ✅ Solução

- Limpeza dos interceptors antes e depois de cada teste
- Recriação dos mocks a cada execução
- Uso de persistência apenas quando necessário

## Conclusão

Testes automatizados precisam ser determinísticos.  
Mocks mal gerenciados tornam os testes inconsistentes e pouco confiáveis.

---

# 📦 2. Problemas com Dependências (Node / npm)

## ❌ Problema

- Diferenças de ambiente entre máquinas
- node_modules inconsistentes
- Builds quebrando sem motivo aparente

## 🔍 Causa

- Uso de instalação não determinística
- Dependência do ambiente local

## ✅ Solução

- Uso de instalação determinística (npm ci)
- Containerização completa com Docker

## Conclusão

A reprodutibilidade do ambiente é essencial.  
Docker elimina inconsistências entre ambientes.

---

# 🐳 3. Problemas com Docker e Docker Compose

## ❌ Problemas

- Erro de volume não definido
- Falta de persistência de dados
- Complexidade na gestão de múltiplos serviços

## 🔍 Causa

- Volume não declarado corretamente
- Falta de entendimento inicial sobre volumes nomeados

## ✅ Solução

- Declaração explícita de volumes no docker-compose
- Uso de profiles para modularizar serviços

## Conclusão

Containers são efêmeros por padrão.  
Persistência precisa ser configurada explicitamente.

---

# 🔐 4. Problemas com Variáveis de Ambiente

## ❌ Problema

- Credenciais expostas diretamente no docker-compose

## 🔍 Causa

- Configuração acoplada ao código

## ✅ Solução

- Uso de arquivo .env
- Externalização das variáveis sensíveis

## Conclusão

Separar configuração de código é essencial para segurança e portabilidade.

---

# 📊 5. Problemas com SonarQube

## ❌ Problemas enfrentados

- Uso de versão incorreta
- Erro de upgrade de banco
- Scanner executando antes do serviço estar pronto
- Erro de autenticação
- Projeto não aparecia
- Perda de dados ao reiniciar containers
- Alto consumo de memória

## 🔍 Causas

- Versão incompatível
- Falta de persistência
- Falta de controle de readiness
- Uso incorreto de autenticação

## ✅ Soluções

- Uso de versão estável (community)
- Persistência via volume no banco
- Implementação de espera ativa para o serviço ficar pronto
- Uso de autenticação via token
- Correção da execução do scanner

## Conclusão

Subir um container não significa que o serviço está pronto.  
Integração entre serviços exige controle de tempo, estado e autenticação.

---

# ⚙️ 6. Problemas com CI/CD

## ❌ Problema

- Necessidade de garantir confiabilidade no pipeline
- Risco de deploy com falhas

## 🔍 Causa

- Falta de separação clara entre etapas

## ✅ Solução

- Pipeline dividido em etapas independentes
- Execução condicional baseada em sucesso

## Conclusão

Pipelines devem ser modulares e confiáveis.  
Cada etapa deve validar o sistema antes de avançar.

---

# 🧪 7. Problemas com Execução Local

## ❌ Problema

- Containers encerrando prematuramente
- Dificuldade em manter serviços ativos

## 🔍 Causa

- Script de execução com comportamento inadequado

## ✅ Solução

- Ajuste do script para manter serviços necessários ativos
- Separação entre execução de testes e serviços persistentes

## Conclusão

Nem todos os serviços devem ser efêmeros.  
Alguns precisam permanecer ativos para análise e debug.

---

# 🚀 Possíveis Melhorias

- Orquestração com Kubernetes

---

# 🧠 Conclusão

Este projeto evidenciou desafios reais de DevOps:

- Gerenciamento de dependências
- Reprodutibilidade de ambiente
- Integração entre serviços
- Controle de estado e persistência
- Automação de pipelines

Mais do que aprender ferramentas, o foco foi compreender como e por que elas funcionam em conjunto.