# 🔐 App de Criptografía - Frontend & Backend

Una aplicación web completa para cifrado y descifrado de mensajes utilizando el estándar AES-256-GCM, construida con React + Vite en el frontend y Node.js + Express en el backend.

## 🚀 Características

### Backend

- **Generación de claves** AES-256 seguras
- **Cifrado** de textos usando AES-256-GCM
- **Descifrado** de textos cifrados
- **API RESTful** con documentación completa
- **Seguridad** con IV (Initialization Vector) y Auth Tag
- **Manejo de errores** robusto
- **Logging** con Morgan
- **CORS** configurado

### Frontend

- **Interfaz moderna** con Tailwind CSS
- **Cifrado/descifrado** en tiempo real
- **Generación de claves** seguras
- **Visualización** de resultados
- **Manejo de estados** con React Hooks
- **Alertas** con SweetAlert2
- **Diseño responsive**

## 🛠️ Tecnologías Utilizadas

### Backend

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **Crypto** - Módulo nativo para criptografía
- **CORS** - Middleware para Cross-Origin Resource Sharing
- **Morgan** - Logger de peticiones HTTP
- **Dotenv** - Manejo de variables de entorno

### Frontend

- **React 19** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de build y desarrollo
- **Tailwind CSS** - Framework de CSS utility-first
- **Axios** - Cliente HTTP
- **SweetAlert2** - Alertas y modales
- **ESLint** - Linter para código JavaScript

## 📦 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Backend

1. **Navegar al directorio del backend:**

   ```bash
   cd backend
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crear archivo `.env` en la raíz del backend:

   ```env
   PORT=3000
   API_RAIZ=/api/v1
   ```

4. **Ejecutar en desarrollo:**

   ```bash
   npm run dev
   ```

5. **Ejecutar en producción:**
   ```bash
   npm start
   ```

### Frontend

1. **Navegar al directorio del frontend:**

   ```bash
   cd frontend
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo:**

   ```bash
   npm run dev
   ```

4. **Construir para producción:**

   ```bash
   npm run build
   ```

5. **Previsualizar build:**
   ```bash
   npm run preview
   ```

## 🔌 API Endpoints

### Base URL: `http://localhost:3000/api/v1`

### Endpoints disponibles:

#### 1. **Generar Clave**

- **POST** `/generar-clave`
- **Descripción:** Genera una clave AES-256 segura de 32 bytes
- **Respuesta:**
  ```json
  {
    "success": true,
    "message": "Key creada de manera exitosa ✅",
    "keyBase64": "base64encodedkey...",
    "longitud": 32
  }
  ```

#### 2. **Cifrar Texto**

- **POST** `/encriptar`
- **Body:**
  ```json
  {
    "texto": "Texto a cifrar",
    "keyBase64": "clave_en_base64"
  }
  ```
- **Respuesta:**
  ```json
  {
    "encrypted": "texto_cifrado_hex",
    "iv": "iv_en_hex",
    "authTag": "auth_tag_en_hex"
  }
  ```

#### 3. **Descifrar Texto**

- **POST** `/desencriptar`
- **Body:**
  ```json
  {
    "textoEncriptado": "texto_cifrado_hex",
    "iv": "iv_en_hex",
    "authTag": "auth_tag_en_hex",
    "keyBase64": "clave_en_base64"
  }
  ```
- **Respuesta:**
  ```json
  {
    "textoDesencriptado": "Texto original"
  }
  ```

## 🎯 Uso de la Aplicación

### Flujo de trabajo:

1. **Generar Clave:**

   - Haz clic en "Generar Clave" para crear una clave segura
   - La clave se muestra en formato Base64
   - Usa el botón "Mostrar/Ocultar" para ver la clave completa

2. **Cifrar Texto:**

   - Escribe el texto que deseas cifrar en el área de texto
   - Asegúrate de tener una clave generada
   - Haz clic en "Cifrar Texto"
   - El texto cifrado, IV y Auth Tag se generarán automáticamente

3. **Descifrar Texto:**

   - Pega el texto cifrado en el área correspondiente
   - Ingresa la clave utilizada para cifrar
   - Haz clic en "Descifrar Texto"
   - El texto original se mostrará en una alerta

4. **Limpiar:**
   - Usa "Limpiar Todo" para reiniciar el formulario

## 🔒 Seguridad

- **AES-256-GCM:** Algoritmo de cifrado autenticado
- **IV Aleatorio:** Se genera un nuevo IV por cada cifrado
- **Auth Tag:** Verificación de integridad y autenticidad
- **Claves de 32 bytes:** Cumple con el estándar AES-256
- **Manejo seguro:** Las claves se manejan en memoria temporal

## 📁 Estructura del Proyecto

```
/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── criptografia.controller.js
│   │   └── routes/
│   │       └── criptografia.routes.js
│   ├── util/
│   │   ├── caracteres.js
│   │   └── generarClave.js
│   ├── index.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── service/
    │   │   └── crypto.service.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

## 🚨 Notas Importantes

1. **Seguridad de Claves:** Las claves deben almacenarse de forma segura y no compartirse
2. **IV y Auth Tag:** Son necesarios para el descifrado y deben guardarse junto con el texto cifrado
3. **Entorno de Producción:** Configurar CORS adecuadamente para el dominio de producción
4. **Backup:** Realiza backup de las claves importantes

## 🐛 Solución de Problemas

### Error: "Clave debe tener 32 bytes"

- Verifica que la clave esté en formato Base64 correcto
- Asegúrate de usar una clave generada por la aplicación

### Error: "Campos obligatorios"

- Todos los campos marcados como requeridos deben estar completos

### Error de CORS

- Verifica que el backend esté ejecutándose en el puerto correcto
- Revisa la configuración de CORS en el backend

## 👥 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Grupo de trabajo

**Alejandra Alaniz**--
**Carlos E. Rodríguez**--
**Thomas Luque Salgado**--
**Alan Gabriel Pretel**--

---

**⚠️ Advertencia:** Esta aplicación está diseñada para fines educativos y de demostración. Para uso en producción, considera implementar medidas de seguridad adicionales y auditorías de seguridad.
