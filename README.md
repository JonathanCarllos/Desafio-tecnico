📖 Sobre o Projeto

Esta API implementa um sistema simples de gerenciamento financeiro com:

👤 Pessoas

🏷️ Categorias

💰 Transações

O foco principal do projeto é demonstrar:

Organização em camadas

Aplicação de boas práticas

Clareza arquitetural

Código limpo e manutenível

🏗️ Arquitetura da Aplicação

A solução foi estruturada utilizando Arquitetura em Camadas:

📦 Controllers
   ↓
📦 Services
   ↓
📦 Repositories
   ↓
🗄️ Database

🔹 Separação de Responsabilidades
🎯 Controllers

Responsáveis pelos endpoints HTTP

Tratam requisições e retornos

Não contêm regra de negócio

🧠 Services

Contêm regras de negócio

Orquestram chamadas aos repositories

Realizam conversão entre Model e DTO

💾 Repositories

Responsáveis pelo acesso ao banco

Executam operações CRUD

Utilizam Entity Framework Core

🧱 Models

Representam as entidades do banco

Definem relacionamentos

Aplicam validações com DataAnnotations

🔄 DTOs (Data Transfer Objects)

Controlam dados expostos pela API

Evitam exposição direta das entidades

Melhoram segurança e desacoplamento

📊 Domínio da Aplicação
👤 Pessoa
Campo	Tipo
Id	int
Nome	string (máx. 200)
Idade	int
🏷️ Categoria
Campo	Tipo
Id	int
Nome	string
💰 Transação
Campo	Tipo
Id	int
Descrição	string
Valor	decimal
PessoaId	int (FK)
CategoriaId	int (FK)
🔗 Regras de Negócio

✔️ Exclusão em cascata:
Ao remover uma Pessoa, todas as suas Transações são removidas.

✔️ Validações aplicadas via DataAnnotations e camada de Service.

✔️ Separação clara entre regra de negócio e persistência.

📡 Endpoints
👤 Pessoa
GET    /api/pessoa
GET    /api/pessoa/{id}
POST   /api/pessoa
PUT    /api/pessoa/{id}
DELETE /api/pessoa/{id}

🏷️ Categoria
GET    /api/categoria
POST   /api/categoria
PUT    /api/categoria/{id}
DELETE /api/categoria/{id}

💰 Transação
GET    /api/transacao
POST   /api/transacao
PUT    /api/transacao/{id}
DELETE /api/transacao/{id}

🛠️ Tecnologias Utilizadas

✅ .NET 8

✅ ASP.NET Core Web API

✅ Entity Framework Core

✅ SQL Server

✅ Swagger / OpenAPI

✅ Injeção de Dependência

⚙️ Como Executar
1️⃣ Clonar o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

2️⃣ Configurar appsettings.json
"ConnectionStrings": {
  "DefaultConnection": "Server=SEU_SERVIDOR;Database=SEU_BANCO;Trusted_Connection=True;"
}

3️⃣ Aplicar migrations
dotnet ef database update

4️⃣ Executar
dotnet run


Acessar Swagger:

https://localhost:xxxx/swagger

🧠 Decisões Técnicas

Arquitetura em camadas para garantir organização e escalabilidade

Uso de DTO para desacoplamento da camada de domínio

Repository Pattern para abstração de acesso a dados

Async/Await em todas as operações

Código preparado para futura implementação de autenticação JWT

📈 Possíveis Evoluções

🔹 Implementação de testes unitários (xUnit + Moq)

🔹 Autenticação JWT

🔹 FluentValidation

🔹 Log estruturado com Serilog

🔹 Padronização de respostas com Result Pattern

<div align="center">
👨‍💻 Autor

Jonathan Carlos Moura da Silva
Desenvolvedor .NET

</div>
