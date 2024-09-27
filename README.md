# Proyecto Django con Django REST Framework

Este proyecto es una API desarrollada con **Django** y **Django REST Framework** (DRF).

## Tecnologías

- **Django**: Framework web en Python.
- **Django REST Framework (DRF)**: Extensión para construir APIs REST con Django.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos en tu máquina local:

- Python 3.8+
- pip (gestor de paquetes de Python)
- Git (para clonar y versionar el proyecto)

## Instalación y configuración del proyecto en local

Sigue los siguientes pasos para configurar y ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio

Clona este repositorio en tu máquina local utilizando el comando `git clone`:

```bash
git clone https://github.com/Jhonii10/django-crud.git
cd django-crud/backend
```

### 2. Crear un entorno virtual y activarlo

Crea y activa un entorno virtual para aislar las dependencias del proyecto:

```bash
py -m venv venv
venv\Scripts\activate

```

### 3. Instalar dependencias

Instala las dependencias del proyecto desde el archivo requirements.txt:

```bash
pip install -r requirements.txt

```

### 4. Aplicar migraciones

Aplica las migraciones de la base de datos para crear las tablas necesarias en SQLite:

```bash
py manage.py migrate

```

### 5. Crear un superusuario

Crea un superusuario para acceder al panel de administración de Django:

```bash
py manage.py createsuperuser

```

### 6. Ejecutar el servidor local

Ejecuta el servidor de desarrollo de Django:

```bash
py manage.py runserver

```

La aplicación estará disponible en [http://127.0.0.1:8000/api/v1/tasks/](http://127.0.0.1:8000/api/v1/tasks/)
