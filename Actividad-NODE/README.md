# 🛒 Actividad-NODE — API REST + Tienda Virtual

Proyecto desarrollado en el SENA como parte del proceso formativo en **Análisis y Desarrollo de Software (ADSO)**.

Consiste en una **API REST** construida con Node.js y Express, conectada a una base de datos SQLite, y un **frontend en React + Vite** que funciona como tienda virtual.

---

## 📁 Estructura del proyecto

```
Actividad-NODE/
│
├── index.js                  # Punto de entrada del servidor
├── database.db               # Base de datos SQLite
│
├── db/
│   └── db.js                 # Conexión a SQLite y creación de tablas
│
├── middlewares/
│   └── auth.js               # Middleware de autenticación centralizado
│
├── models/                   # Capa de acceso a datos (consultas SQL)
│   ├── usuariosModel.js
│   ├── productosModel.js
│   ├── pedidosModel.js
│   └── ventasModel.js
│
├── controllers/              # Lógica de negocio y validaciones
│   ├── usuariosController.js
│   ├── productosController.js
│   ├── pedidosController.js
│   └── ventasController.js
│
├── Usuarios/
│   └── UsuariosRutas.js      # Rutas del módulo usuarios
├── Productos/
│   └── ProductosRutas.js     # Rutas del módulo productos
├── Pedidos/
│   └── PedidosRutas.js       # Rutas del módulo pedidos
├── Ventas/
│   └── VentasRutas.js        # Rutas del módulo ventas
│
└── frontend/
    └── frontend-tienda/      # Aplicación React + Vite (tienda virtual)
```

---

## ⚙️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución del backend |
| Express | Framework para la API REST |
| SQLite3 | Base de datos local |
| CORS | Comunicación entre frontend y backend |
| React | Librería para el frontend |
| Vite | Empaquetador del frontend |
| Tailwind CSS | Estilos del frontend |

---

## 🚀 Cómo ejecutar el proyecto

### 1. Instalar dependencias del backend

Estando en la carpeta raíz `Actividad-NODE`:

```bash
npm install
```

### 2. Iniciar el servidor backend

```bash
node index.js
```

El servidor queda corriendo en: `http://localhost:3000`

Si todo está bien, verás esto en la terminal:

```
Base de datos SQLite conectada correctamente
Tabla usuarios lista
Tabla productos lista
Tabla pedidos lista
Tabla ventas lista
Server esta arriba 3000
```

### 3. Iniciar el frontend (en otra terminal)

```bash
cd frontend/frontend-tienda
npm install
npm run dev
```

El frontend queda disponible en: `http://localhost:5173`

---

## 🔐 Autenticación

Todas las rutas de la API están protegidas por un middleware de autenticación. Se debe enviar el siguiente header en cada petición:

```
password: sena2025
```

Si no se envía o es incorrecto, la API responde con:

```json
{ "error": "Incorrect password, or password not sent" }
```

---

## 📌 Endpoints disponibles

Todos los módulos siguen el mismo patrón REST:

### Usuarios — `/usuarios`

| Método | Ruta | Descripción |
|---|---|---|
| GET | /usuarios | Retorna todos los usuarios |
| GET | /usuarios/:id | Busca un usuario por ID |
| POST | /usuarios | Crea un nuevo usuario |
| PUT | /usuarios/:id | Actualiza un usuario |
| DELETE | /usuarios/:id | Elimina un usuario |

**Ejemplo body POST/PUT:**
```json
{
  "nombre": "Juan",
  "apellido": "Perez",
  "email": "juan@mail.com",
  "telefono": "3001234567"
}
```

---

### Productos — `/productos`

| Método | Ruta | Descripción |
|---|---|---|
| GET | /productos | Retorna todos los productos |
| GET | /productos/:id | Busca un producto por ID |
| POST | /productos | Crea un nuevo producto |
| PUT | /productos/:id | Actualiza un producto |
| DELETE | /productos/:id | Elimina un producto |

**Ejemplo body POST/PUT:**
```json
{
  "nombre": "Gorra",
  "categoria": "Accesorios",
  "precio": 25000,
  "stock": 15
}
```

---

### Pedidos — `/pedidos`

| Método | Ruta | Descripción |
|---|---|---|
| GET | /pedidos | Retorna todos los pedidos |
| GET | /pedidos/:id | Busca un pedido por ID |
| POST | /pedidos | Crea un nuevo pedido |
| PUT | /pedidos/:id | Actualiza un pedido |
| DELETE | /pedidos/:id | Elimina un pedido |

**Ejemplo body POST/PUT:**
```json
{
  "usuarioId": 1,
  "productoId": 2,
  "cantidad": 3,
  "total": 75000
}
```

---

### Ventas — `/ventas`

| Método | Ruta | Descripción |
|---|---|---|
| GET | /ventas | Retorna todas las ventas |
| GET | /ventas/:id | Busca una venta por ID |
| POST | /ventas | Crea una nueva venta |
| PUT | /ventas/:id | Actualiza una venta |
| DELETE | /ventas/:id | Elimina una venta |

**Ejemplo body POST/PUT:**
```json
{
  "usuarioId": 1,
  "fecha": "2025-03-01",
  "total": 60000,
  "metodoPago": "tarjeta",
  "estado": "completada"
}
```

Valores permitidos:
- `metodoPago`: `efectivo`, `tarjeta`, `transferencia`
- `estado`: `completada`, `pendiente`, `cancelada`

---

## 🗄️ Base de datos

Las tablas se crean automáticamente al iniciar el servidor. El esquema es el siguiente:

```sql
-- Usuarios
CREATE TABLE usuarios (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre   TEXT NOT NULL,
  apellido TEXT NOT NULL,
  email    TEXT NOT NULL UNIQUE,
  telefono TEXT
);

-- Productos
CREATE TABLE productos (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre    TEXT NOT NULL,
  categoria TEXT NOT NULL,
  precio    REAL NOT NULL CHECK(precio > 0),
  stock     INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0)
);

-- Pedidos
CREATE TABLE pedidos (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  usuarioId  INTEGER NOT NULL,
  productoId INTEGER NOT NULL,
  cantidad   INTEGER NOT NULL CHECK(cantidad > 0),
  total      REAL NOT NULL CHECK(total > 0),
  FOREIGN KEY (usuarioId)  REFERENCES usuarios(id),
  FOREIGN KEY (productoId) REFERENCES productos(id)
);

-- Ventas
CREATE TABLE ventas (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  usuarioId  INTEGER NOT NULL,
  fecha      TEXT NOT NULL,
  total      REAL NOT NULL CHECK(total > 0),
  metodoPago TEXT NOT NULL,
  estado     TEXT NOT NULL DEFAULT 'pendiente',
  FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
);
```

---

## 🏗️ Arquitectura del proyecto

El proyecto aplica una separación en **3 capas** por módulo:

```
Rutas  →  Controladores  →  Modelos  →  Base de datos
```

- **Rutas:** solo definen las URLs y qué controlador atiende cada una
- **Controladores:** contienen las validaciones y la lógica de negocio
- **Modelos:** se encargan únicamente de las consultas SQL

Esto hace el código más organizado, fácil de mantener y de escalar.

---

## 👨‍💻 Autor

Proyecto desarrollado por un aprendiz del SENA — Ficha ADSO  
Segundo trimestre — Desarrollo de Software