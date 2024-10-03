# API de tareas con Django y Django REST Framework

API basica para gestionar tareas, creada con Django y Django REST Framework. La API permite crear, leer, actualizar y eliminar tareas mediante peticiones HTTP.

## Requisitos

* Python 3.2x

## Instalacion, Configuracion de Django y DFR

1. Cree una carpeta llamada backend y ingrese a ella

2. Dentro de la carpeta **backend** cree un entorno virtual.

```bash
python -m venv venv
source venv/bin/activate # Mac o linux
venv\Scripts\activate  # para Windows
```

3. Instala Django y DRF

```bash
pip install django djangorestframework
```

4. Crear un nuevo proyecto Django

```bash
django-admin startproject django_crud .
```

deberia ver algo similar a esto.

```plaintext
backend/
    manage.py
    django_crud/
        __init__.py
        settings.py
        urls.py
        asgi.py
        wsgi.py
```

5. Inicie el servidor de desarrollo

```bash
python manage.py runserver
```

Debera ver la siguiente salida en la terminal

```plaintext
    Performing system checks...

    System check identified no issues (0 silenced).

    You have unapplied migrations; your app may not work properly until they are applied.
    Run 'python manage.py migrate' to apply them.

    October 02, 2024 - 15:50:53
    Django version 5.1, using settings 'mysite.settings'
    Starting development server at http://127.0.0.1:8000/
    Quit the server with CONTROL-C.
```

6. Hagamos las migraciones a nuestra base de datos de desarrollo sqlite 

```bash
python manage.py migrate
```

7. Creando la Api de tareas

```bash
python manage.py startapp tasks
```

esto crear un directorio

```plaintext
tasks/
    __init__.py
    admin.py
    apps.py
    migrations/
        __init__.py
    models.py
    tests.py
    views.py
```

Esta estructura de directorio albergará la api de tareas.

8. creando el modelo de tareas

Dentro de tasks, abre el archivo models.py y define el modelo Task:

```bash
from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.title
```

Agrega la app a settings.py:

```bash
INSTALLED_APPS = [
    ...,
    'tasks',
]
```

Luego, realiza las migraciones:

```bash
python manage.py makemigrations   
```

Deberías ver algo similar a lo siguiente:

```plaintext
Migrations for 'tasks':
  tasks/migrations/0001_initial.py
    + Create model Task
```

ahora volvamos a ejecutar

```bash
python manage.py migrate  
```

esto aplicara los cambio en la base de datos

9. Administrador de django

Creando un usuario administrador

Primero, tendremos que crear un usuario que pueda iniciar sesión en el sitio de administración.

```bash
python manage.py createsuperuser
```

```plaintext
    Username: admin
    Email address: admin@example.com
    Password: **********
    Password (again): *********
    Superuser created successfully.   
```

inicie el servidor de desarrollo

```bash
python manage.py runserver
```

ahora visita, [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/) e ingresa al sitio de administracion.

* Hacer que la aplicación de tareas sea modificable en el administrador

dentro de tasks/admin.py edite:

```bash
from django.contrib import admin

from .models import Task

admin.site.register(Task)
```

ahora task debera mostrarse en sitio de administracion.

10. Serializadores de DFR

Dentro de tasks crea un archivo llamado serializer.py y editalo:

```bash
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
```

11. vistas de DFR

dentro de views.py editelo:

```bash
from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Task

    # Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
```

12. urls de DFR

Dentro de tasks crea un archivo llamado urls.py y editalo:

```bash
from django.urls import include, path
from rest_framework import routers  
from tasks import views

router = routers.DefaultRouter()
router.register(r"tasks", views.TaskView, "tasks")

urlpatterns = [
        path("api/v1/", include(router.urls)),
]
```

13. incluir las rutas de tareas en el archivo principal del proyecto django_crud/urls.py.

```bash
from django.contrib import admin
from django.urls import path , include

urlpatterns = [
     ...,
    path('', include('tasks.urls'))
]
```

14. incluir DFR en setting.py

```bash
INSTALLED_APPS = [
    ...,
    'rest_framework',
]
```

Inicia el servidor de desarrollo:

```bash
python manage.py runserver
```

Ahora puedes probar Su API accediendo a [http://127.0.0.1:8000/api/v1/tasks](http://127.0.0.1:8000/api/v1/tasks)

Uso de api

* GET /api/v1/tasks/ - Listar todas las tareas
* POST /api/v1/tasks/ - Crear una nueva tarea
* GET /api/v1/tasks/{id}/ - Obtener una tarea específica
* PUT /api/v1/tasks/{id}/ - Actualizar una tarea existente
* DELETE /api/v1/tasks/{id}/ - Eliminar una tarea
