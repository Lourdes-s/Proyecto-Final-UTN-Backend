# 📱 Proyecto de Mensajería - Estilo WhatsApp Web

## 📌 Descripción

Este proyecto es una aplicación de mensajería inspirada en **WhatsApp Web**, desarrollada como trabajo final de la diplomattura fullStack de la UTN (Universidad Tecnológica Nacional). Es una continuación del proyecto frontend anterior, al cual se le incorporó toda la lógica de backend y funcionalidades completas de autenticación y manejo de usuarios.

### Funcionalidades implementadas:
- Registro de usuario (`register`)
- Inicio de sesión (`login`)
- Recuperación de contraseña (`forgot password` y `recovery password`)
- Edición de perfil
- Chats entre usuarios
- Agregar contactos
- Carga progresiva de mensajes con scroll infinito
- Validación de rutas protegidas en frontend
- Página personalizada de error 404 cuando se accede a un chat sin tener agregado al usuario
- Diseño responsive inspirado en WhatsApp Web

### Usuario de prueba
Podés probar la aplicación con el siguiente usuario:

- **Email:** `lourdes.tests@gmail.com`  
- **Contraseña:** `Mensajeria123`

🔗 [Ir a la app](https://proyecto-final-utn-frontend.vercel.app/login)

---

## 🧩 Tecnologías y librerías utilizadas

### Frontend
- **React**
- **Vite**
- **CSS puro** (diseño personalizado)
- Loader animado: [Codepen Loader](https://codepen.io/aryabardhan/pen/qBwVgRV)

### Backend
- **Node.js**
- **Express**
- **MySQL2** – Conexión a base de datos SQL
- **bcrypt** – Encriptación de contraseñas
- **jsonwebtoken** – Autenticación con tokens JWT
- **dotenv** – Variables de entorno
- **nodemailer** – Envío de mails para recuperación de contraseña
- **cors** – Manejo de CORS

---

## ✍️ Autora
**Lourdes Santillan**
