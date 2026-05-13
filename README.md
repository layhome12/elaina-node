# ✨ ElainaNode

Modern lightweight backend framework powered by Node.js, Express, Knex, and TypeScript.  
Built for speed, scalability, and clean modular architecture.

---

## 📦 Tech Stack

- Node.js
- Express.js
- Knex.js
- MySQL / PostgreSQL
- TypeScript
- JWT Authentication
- Zod Validation
- Express Rate Limit
- CORS
- Morgan Logger

---

## ⚡ Features

- 🔐 JWT Authentication
- 📊 Pagination Support
- ⚡ Lightweight & Fast
- 🧱 Modular Architecture
- 🚀 REST API Ready
- 🛡️ Rate Limiting
- ✅ Request Validation with Zod
- 🔄 Clean Service Pattern
- 📁 Scalable Folder Structure

---

## 📁 Project Structure

```bash
src/
│
├── app/
│   ├── controllers/
│   ├── middlewares/
│   ├── requests/
│   └── services/
│
├── command/
├── common/
├── config/
├── database/
├── routes/
├── types/
│
└── main.ts
```

---

## 🚀 Installation

```bash
npm install
```

Run migration:

```bash
npm run migration:run
```

Run seeder:

```bash
npm run seeder:run
```

---

## ▶️ Run Project

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm run prod
```

---

## 📊 Pagination Example

### Request

```http
GET /api/users?page=1&limit=10
```

### Response

```json
{
  "items": [],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

---

## 🛡️ Philosophy

ElainaNode focuses on:

- Performance
- Simplicity
- Scalability
- Developer Experience

Minimal overhead, maximum flexibility.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Crafted with ❤️ using TypeScript & Node.js