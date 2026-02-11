📌 Objetivo

Desenvolver uma API RESTful utilizando ASP.NET Core, aplicando boas práticas de arquitetura, organização em camadas e princípios de desenvolvimento como:

Separação de Responsabilidades (SRP)

Inversão de Dependência (DIP)

Clean Code

Arquitetura em Camadas

Uso de DTO para desacoplamento

🏗️ Arquitetura da Solução

A aplicação foi estruturada seguindo o padrão:

Controller → Service → Repository → Database


Essa organização permite:

Maior testabilidade

Facilidade de manutenção

Baixo acoplamento

Melhor organização da regra de negócio

🔹 Estrutura de Camadas
📌 Controllers

Responsáveis por:

Expor os endpoints HTTP

Receber e validar requisições

Retornar respostas padronizadas (Status Code)

Não possuem regra de negócio.

📌 Services

Responsáveis por:

Implementar regras de negócio

Orquestrar chamadas ao repository

Conversão entre Model e DTO

Aplicar validações de domínio

📌 Repositories

Responsáveis por:

Acesso ao banco de dados

Operações CRUD

Comunicação com o Entity Framework Core

Não possuem regra de negócio.

📌 Models (Entidades)

Representam:

Estrutura das tabelas no banco

Relacionamentos entre entidades

Utilizam DataAnnotations para validação básica.

📌 DTOs (Data Transfer Objects)

Utilizados para:

Controlar os dados enviados e recebidos pela API

Evitar exposição direta das entidades

Melhorar segurança e desacoplamento

🧱 Domínio da Aplicação

A API implementa um sistema de gerenciamento financeiro simplificado contendo:

👤 Pessoa

Id (gerado automaticamente)

Nome (máx. 200 caracteres)

Idade

🏷️ Categoria

Id

Nome

💰 Transação

Id

Descrição

Valor

PessoaId (FK)

CategoriaId (FK)

🔗 Regras de Negócio Implementadas

Ao excluir uma Pessoa, todas as suas Transações são removidas (integridade referencial).

Validações aplicadas via DataAnnotations e camada de serviço.

Separação clara entre regra de negócio e acesso a dados.

🛠️ Tecnologias Utilizadas

.NET 8

ASP.NET Core Web API

Entity Framework Core

SQL Server

Swagger (OpenAPI)

Injeção de Dependência nativa do .NET

📡 Endpoints Disponíveis
👤 Pessoa

GET /api/pessoa

GET /api/pessoa/{id}

POST /api/pessoa

PUT /api/pessoa/{id}

DELETE /api/pessoa/{id}

🏷️ Categoria

GET /api/categoria

POST /api/categoria

PUT /api/categoria/{id}

DELETE /api/categoria/{id}

💰 Transação

GET /api/transacao

POST /api/transacao

PUT /api/transacao/{id}

DELETE /api/transacao/{id}

🔐 Boas Práticas Aplicadas

✔️ Arquitetura em camadas
✔️ Princípios SOLID
✔️ DTO para desacoplamento
✔️ Async/Await em todas as operações
✔️ Tratamento adequado de Status Codes
✔️ Código organizado e legível
✔️ Separação entre regra de negócio e persistência

▶️ Como Executar o Projeto
1️⃣ Clonar o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

2️⃣ Configurar a Connection String

No appsettings.json:

"ConnectionStrings": {
  "DefaultConnection": "Server=SEU_SERVIDOR;Database=SEU_BANCO;Trusted_Connection=True;"
}

3️⃣ Aplicar Migrations
dotnet ef database update

4️⃣ Executar a aplicação
dotnet run


Acessar Swagger:

https://localhost:xxxx/swagger

🧠 Decisões Técnicas

Foi adotado o padrão Repository para desacoplar o acesso ao banco.

A camada Service centraliza as regras de negócio.

DTOs foram utilizados para evitar exposição direta das entidades.

Estrutura preparada para futura implementação de autenticação JWT.

Projeto organizado para facilitar testes unitários.

📈 Pontos de Evolução

Implementação de testes unitários (xUnit + Moq)

Implementação de autenticação JWT

Implementação de validações com FluentValidation

Implementação de padrão Result para respostas padronizadas

Log estruturado com Serilog
