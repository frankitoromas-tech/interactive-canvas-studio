# 💝 Carta para Luyuromo - San Valentín

Proyecto React interactivo de San Valentín con botones que se mueven y crecen.

## 📋 PASO A PASO PARA DESPLEGAR EN NETLIFY

### OPCIÓN 1: La más fácil (Sin instalar nada) - GitHub + Netlify

#### Paso 1: Sube el proyecto a GitHub
1. Ve a [https://github.com](https://github.com) y crea una cuenta si no tienes
2. Click en el botón **"+" arriba a la derecha** → **"New repository"**
3. Nombre del repositorio: `carta-san-valentin` (o el que quieras)
4. Selecciona **"Public"**
5. NO marques "Add a README file" (ya lo tenemos)
6. Click en **"Create repository"**

#### Paso 2: Sube los archivos
En la página del repositorio vacío que acabas de crear:

1. Click en **"uploading an existing file"** (link azul en el texto)
2. Arrastra TODA la carpeta `proyecto-react` (o todos los archivos de adentro)
3. En el mensaje de commit escribe: "Primera versión"
4. Click en **"Commit changes"**

#### Paso 3: Conecta con Netlify
1. Ve a [https://www.netlify.com](https://www.netlify.com)
2. Click en **"Sign up"** y regístrate con tu cuenta de GitHub
3. Click en **"Add new site"** → **"Import an existing project"**
4. Click en **"Deploy with GitHub"**
5. Selecciona el repositorio `carta-san-valentin` que acabas de crear
6. Netlify detectará automáticamente que es un proyecto React
7. Configuración automática:
   - Build command: `npm run build`
   - Publish directory: `build`
8. Click en **"Deploy site"**

#### Paso 4: ¡Listo!
- El despliegue tomará 2-3 minutos
- Una vez terminado, tendrás tu URL: `https://tu-sitio.netlify.app`
- Puedes cambiar el nombre en **Site settings** → **"Change site name"**

---

### OPCIÓN 2: Desde tu computadora (Requiere Node.js)

#### Requisitos previos
1. Instala Node.js:
   - Windows/Mac: [https://nodejs.org](https://nodejs.org) (descarga la versión LTS)
   - Linux: `sudo apt install nodejs npm`

#### Paso 1: Instala las dependencias
Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará React y todas las dependencias necesarias (tomará 1-2 minutos).

#### Paso 2: Prueba el proyecto localmente
```bash
npm start
```

Se abrirá automáticamente en tu navegador en `http://localhost:3000`

#### Paso 3: Crea la versión de producción
```bash
npm run build
```

Esto creará una carpeta `build/` con todos los archivos optimizados.

#### Paso 4: Sube a Netlify
**Opción A - Arrastrar y soltar:**
1. Ve a [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra la carpeta `build/` completa
3. ¡Listo! Ya tienes tu sitio en línea

**Opción B - Netlify CLI:**
```bash
# Instala Netlify CLI
npm install -g netlify-cli

# Inicia sesión
netlify login

# Despliega
netlify deploy --prod
```

---

## 🎨 PERSONALIZACIÓN

### Cambiar el nombre
Abre `src/App.jsx` y busca:
```javascript
<h1 className="main-title">Luyuromo,</h1>
```

### Cambiar mensajes románticos
En `src/App.jsx`, busca el array `loveMessages` (línea ~19):
```javascript
const loveMessages = [
  "Tus mensajes aquí",
  "Otro mensaje bonito",
  // Agrega más...
];
```

### Cambiar colores de fondo
Busca `linear-gradient` en el código:
```javascript
background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
```

Prueba otros gradientes en: [https://uigradients.com](https://uigradients.com)

---

## 🔧 COMANDOS ÚTILES

```bash
npm start          # Ejecuta en modo desarrollo
npm run build      # Crea versión de producción
npm test           # Ejecuta tests
```

---

## 📱 ACTUALIZAR EL SITIO

### Si usaste GitHub + Netlify:
1. Haz los cambios en tu código local
2. Sube los cambios a GitHub (Git push)
3. Netlify se actualiza automáticamente

### Si usaste arrastrar y soltar:
1. Haz los cambios
2. Ejecuta `npm run build`
3. Arrastra la nueva carpeta `build/` a Netlify

---

## ❓ PROBLEMAS COMUNES

### "npm: command not found"
→ Instala Node.js desde [nodejs.org](https://nodejs.org)

### "Module not found"
→ Ejecuta `npm install`

### El sitio se ve mal en Netlify
→ Asegúrate de subir la carpeta `build/`, no el proyecto completo

### No se actualizan los cambios
→ Limpia la caché: `npm run build` y vuelve a desplegar

---

## 💡 TIPS

- Usa Git para llevar un historial de cambios
- Prueba siempre con `npm start` antes de hacer build
- El nombre del sitio en Netlify se puede cambiar gratis
- Netlify te da HTTPS automático

---

¿Dudas? Revisa:
- Documentación de React: [https://react.dev](https://react.dev)
- Documentación de Netlify: [https://docs.netlify.com](https://docs.netlify.com)
