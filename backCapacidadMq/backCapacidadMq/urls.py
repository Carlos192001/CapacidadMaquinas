"""
URL configuration for backCapacidadMq project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from planta import views as planta_views
from departamento import views as departamento_views
from parte import views as parte_views
from cliente import views as cliente_views

urlpatterns = [
    path('admin/', admin.site.urls),

    #edpoints para las plantas
    path('plantas/', planta_views.planta_list),
    path('plantas/<int:id>/', planta_views.planta_detalle),

    #edpoints para los departamentos
    path('deptos/', departamento_views.depto_list),
    path('deptos/<int:id>/', departamento_views.depto_detalle),

    #endpoints para las partes
    path('partes/', parte_views.parte_list),
    path('partes/<int:id>/', parte_views.parte_detalle),

    #endpoints para los clientes
    path('clientes/', cliente_views.cliente_list),
    path('clientes/<int:id>/', cliente_views.cliente_detalle),
]
