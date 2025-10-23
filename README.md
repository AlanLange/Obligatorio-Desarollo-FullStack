# 💈 Barbería Fullstack API

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-secure-blue?logo=jsonwebtokens)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-Academic-lightgrey)

**Obligatorio 1 — Desarrollo Fullstack (ORT Uruguay, 2025)**  
Autores: **Alan Langelan** y **Gastón Jaurena**

---

## 🧾 Descripción

API RESTful desarrollada con **Node.js**, **Express** y **MongoDB**, que gestiona usuarios, planes (*Plus/Premium*), barberías, servicios y categorías.  
Incluye **autenticación JWT**, **validaciones Joi**, **encriptación Bcrypt**, y manejo centralizado de errores.  
Cumple con los **principios OWASP**: validación, autenticación segura, sanitización, rate-limiting y control de acceso.

---

## ⚙️ Tecnologías principales
Node.js · Express · MongoDB (Mongoose) · JWT · Joi · Bcrypt · CORS · Rate Limit

---

## 🚀 Endpoints principales (`/v1`)

### Públicas
- `POST /auth/register` → Registro  
- `POST /auth/login` → Login (devuelve JWT)

### Protegidas (requieren token)
- `PATCH /cliente/plan` → Cambiar plan Plus → Premium  
- `GET/POST /barberia` → Obtener o crear barbería  
- `GET/POST /categorias` → Listar o crear categorías  
- `GET/POST/PATCH/DELETE /servicios` → CRUD de servicios *(10 máx. para Plus, ilimitado para Premium)*

---

## 🧩 Reglas de negocio
- **Plan Plus** → máximo 10 servicios  
- **Plan Premium** → ilimitado  
- Cambio de plan solo **Plus → Premium**

---

## 🧪 Tests y Deploy
- Documentación y tests automáticos en **Postman**  
- Variables:
  - `dev_base_url = http://localhost:3000/v1`
  - `prod_base_url = https://barberia-fullstack.vercel.app/v1`

---

## 🔐 Ejemplo de archivo `.env`

```env
SECRET=TuClaveSecretaJWT
MONGO_URI=TuConexionMongoAtlas
MONGO_URI_DEV=mongodb://localhost:27017/BarberiaDB
NODE_ENV=development   # o production
PORT=3000
