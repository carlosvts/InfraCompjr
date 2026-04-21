# ── Dependências 
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ── Imagem
FROM node:24-alpine AS runner
WORKDIR /app

# Metadados
LABEL maintainer="jest-supertest-starter"
LABEL description="API test suite with Jest + Supertest | Infraestrutura CompJR"

# Copia dependências já instaladas do stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copia o código fonte
COPY . .

# Cria diretório de relatórios
RUN mkdir -p out/report

# Variáveis de ambiente padrão (docker compose sobscreve elas, ci tambem)
ENV NODE_ENV=production
ENV TARGET=prod

EXPOSE 3000

# Comando padrão: roda os testes e mantém o container vivo para debug
CMD ["npm", "start"]