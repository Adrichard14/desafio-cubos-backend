# Configuração do Banco de Dados PostgreSQL

Este guia explica como rodar um banco de dados PostgreSQL utilizando **Docker** e aplicar as **migrations** do Prisma.

## Iniciando o banco de dados

Antes de começar, certifique-se de ter **Docker** e **Docker Compose** instalados.

Execute o seguinte comando para iniciar o container do PostgreSQL:

```bash
docker-compose up -d

Aplique todas as migrations existentes no banco de dados:
```bash
npx prisma migrate deploy