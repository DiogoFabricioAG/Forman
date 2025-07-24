# 🧠 Forman — Convertidor de Texto con IA

**Forman** es una aplicación web que permite convertir texto a distintos formatos utilizando un modelo de lenguaje IA (Deepseek r1 8b en Ollama), integrada con pagos mediante Stripe para desbloquear funciones premium. Desarrollada con Vue.js en el frontend y Express.js en el backend.

---

## 🚀 Tecnologías Usadas

* 🖼️ **Frontend**: Vue.js + Vite + Pinia (opcional)
* 🔧 **Backend**: Node.js + Express.js
* 🧠 **IA**: Ollama con modelo Deepseek r1 8b
* 💳 **Pagos**: Stripe
* 🧾 **Base de Datos**: NoSQL (MongoDB o equivalente)
* 🌐 **Despliegue**: Netlify (frontend) + Render/Railway (backend)
* 🛠️ **Control de versiones**: Git + GitHub

---

## 📂 Estructura del Proyecto

```
tu-proyecto/
├── client/         # Vue frontend
├── server/         # Express backend
├── ollama/         # Config/modelos Deepseek (opcional)
├── .env            # Variables de entorno local
├── netlify.toml    # Configuración de Netlify
└── README.md
```

---

## ⚙️ Instalación y Uso Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/forman.git
cd forman
```

### 2. Configurar el backend

```bash
cd server
npm install
cp .env.example .env   # Configura tus variables (Ollama, Stripe, DB)
npm run dev
```

### 3. Configurar el frontend

```bash
cd ../client
npm install
npm run dev
```

---

## 🧪 Variables de Entorno

### Backend (`server/.env`)

```
PORT=5000
MONGODB_URI=mongodb+srv://...
STRIPE_SECRET_KEY=sk_test_...
OLLAMA_BASE_URL=http://localhost:11434
```

### Frontend (`client/.env`)

```
VITE_API_URL=http://localhost:5000
```

---

## 📡 Endpoints Principales

* `POST /api/convert`: Enviar texto y obtener conversión (IA)
* `POST /api/payment/session`: Crear sesión de pago (Stripe)
* `GET /api/user/history`: Obtener historial de conversiones

---

## ☁️ Despliegue

### Frontend (Netlify)

1. Crear un nuevo sitio en [Netlify](https://netlify.com/)
2. Enlazar con la carpeta `/client`
3. Configurar variables de entorno desde Netlify Dashboard

### Backend (Render o Railway)

1. Subir `/server` como nuevo servicio
2. Configurar variables de entorno
3. Conectar a MongoDB Atlas o similar

---

## ✨ Funcionalidades

* Conversión de texto inteligente usando IA local
* Historial de conversiones por usuario
* Plan gratuito y plan premium (Stripe)
* Interfaz moderna y responsiva (Vue + Tailwind opcional)

---

## 🧠 Modelo IA: Deepseek r1 8B

Utiliza el modelo `deepseek-coder:8b-instruct` de Ollama para realizar conversiones personalizadas. Corre localmente con:

```bash
ollama run deepseek-coder:8b-instruct
```

---

## 🧾 Licencia

MIT © 2025 — Creado por [Tu Nombre](https://github.com/tu-usuario)
