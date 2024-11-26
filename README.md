# PlantApi Backend

Este es el backend del proyecto PlantApi, construido con Node.js, Express y MongoDB.

## Instalación

Para comenzar con el proyecto, sigue estos pasos:

1. **Clona el repositorio:**
    ```sh
    git clone https://github.com/tu-usuario/plantapi-backend.git
    cd plantapi-backend
    ```

2. **Instala las dependencias:**
    ```sh
    npm install
    ```

3. **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
    ```env
    PORT=3000
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    ```

4. **Inicia el servidor:**
    ```sh
    npm start
    ```

## Endpoints

- **GET /plantas**: Obtener todas las plantas
- **POST /plantas**: Crear una nueva planta
- **GET /cuidados**: Obtener todos los cuidados
- **POST /cuidados**: Crear un nuevo cuidado
- **POST /user/register**: Registrar un nuevo usuario
- **POST /user/login**: Iniciar sesión

Asegúrate de que el frontend esté configurado para comunicarse con este backend en `http://localhost:3000`.