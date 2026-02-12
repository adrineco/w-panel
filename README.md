# W-Panel

Sistema completo de autenticação e gerenciamento desenvolvido com React + Nest.js em TypeScript.

## 🚀 Tecnologias

### Backend
- **Nest.js** - Framework Node.js
- **TypeScript** - Superset JavaScript
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Redis** - Cache e sessões
- **Minio S3** - Armazenamento de arquivos
- **Socket.io** - Comunicação em tempo real
- **Swagger** - Documentação da API
- **JWT** - Autenticação via tokens
- **Nodemailer** - Envio de emails

### Frontend
- **React** - Biblioteca UI
- **Vite** - Build tool
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Framework CSS
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Socket.io Client** - WebSocket client
- **Lucide React** - Ícones

## 🎨 Paleta de Cores

- **Primary (Teal)**: `hsl(174, 55%, 45%)` - Botões, links e destaques
- **Background (Dark Blue)**: `hsl(200, 20%, 10%)` - Fundo principal
- **Card**: `hsl(200, 20%, 13%)` - Superfícies elevadas
- **Sidebar**: `hsl(200, 28%, 7%)` - Barra lateral
- **Muted**: `hsl(200, 14%, 16%)` - Elementos secundários
- **Destructive (Red)**: `hsl(0, 62%, 45%)` - Ações destrutivas
- **Success (Green)**: `hsl(152, 55%, 45%)` - Sucesso
- **Warning (Amber)**: `hsl(38, 85%, 50%)` - Avisos
- **Info (Blue)**: `hsl(200, 70%, 52%)` - Informações

## 📋 Funcionalidades

### Autenticação
- ✅ Login com email e senha
- ✅ Registro de novos usuários
- ✅ Recuperação de senha por email
- ✅ Redefinição de senha com token
- ✅ Proteção de rotas com JWT
- ✅ Contexto de autenticação global

### Interface
- ✅ Layout de 2 colunas nas páginas de autenticação
- ✅ Header fixo com logo e menu dropdown do usuário
- ✅ Sidebar colapsável com indicador de link ativo
- ✅ Design responsivo e moderno
- ✅ Tema escuro com cores personalizadas

## 🛠️ Instalação

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- npm ou yarn

### 1. Clone o repositório
```bash
git clone https://github.com/adrineco/w-panel.git
cd w-panel
```

### 2. Inicie a infraestrutura (PostgreSQL, Redis, Minio)
```bash
docker-compose up -d
```

### 3. Configure o Backend
```bash
cd backend
npm install
cp .env.example .env
# Edite o .env com suas configurações
npm run start:dev
```

O backend estará rodando em `http://localhost:3000`
Documentação Swagger: `http://localhost:3000/api/docs`

### 4. Configure o Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
w-panel/
├── backend/                 # Aplicação Nest.js
│   ├── src/
│   │   ├── auth/           # Módulo de autenticação
│   │   ├── users/          # Módulo de usuários
│   │   ├── mail/           # Serviço de email
│   │   └── main.ts         # Entry point
│   ├── .env.example
│   └── package.json
├── frontend/               # Aplicação React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   │   ├── layout/     # Header, Sidebar, Layout
│   │   │   └── ui/         # Button, Input, Card
│   │   ├── contexts/       # Contexto de autenticação
│   │   ├── lib/            # API e utilitários
│   │   └── pages/          # Páginas da aplicação
│   │       ├── auth/       # Login, Register, ForgotPassword
│   │       └── dashboard/  # Dashboard
│   ├── .env.example
│   └── package.json
├── docker-compose.yml      # Infraestrutura
└── README.md
```

## 🔐 Variáveis de Ambiente

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=wpanel

JWT_SECRET=your-secret-key

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-password

REDIS_HOST=localhost
REDIS_PORT=6379

MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin

FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

## 🧪 Testes

### Backend
```bash
cd backend
npm run test
```

### Frontend
```bash
cd frontend
npm run test
```

## 📦 Build para Produção

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
# Os arquivos estarão em frontend/dist
```

## 🌐 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `POST /api/auth/forgot-password` - Recuperar senha
- `POST /api/auth/reset-password` - Redefinir senha

### Usuários
- `GET /api/users/me` - Dados do usuário autenticado
- `GET /api/users/:id` - Dados de um usuário

Documentação completa: `http://localhost:3000/api/docs`

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.
