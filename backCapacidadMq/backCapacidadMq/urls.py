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
from maquina import views as maquina_views
from usuario import views as usuarios_views
from ocupacionMq import views as ocupacionMq_views
from datosAcalcular import views as datosAcalcular_views
from resultadoCalculo import views as reultadoCalculo_views

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
    path('partes-filtrar-funcion/<str:funcion>/', parte_views.filtrarFuncion, name='partes-filtrar-funcion'),
    path('partes/filtrar-numparte/<str:numparte>/', parte_views.filtrarnumParte, name='partes-filtrar-numparte'),

    #endpoints para los clientes
    path('clientes/', cliente_views.cliente_list),
    path('clientes/<int:id>/', cliente_views.cliente_detalle),

    #endpoints para las maquinas
    path('maquinas/', maquina_views.maquina_list),
    path('maquinas/<int:id>/',maquina_views.maquina_detalle),
    path('maquinas-filtrar-funcion/<str:funcion>/',maquina_views.filtrarFuncion, name='maquinas-filtrar-funcion'),

    #endpoints para los usuarios
    path('users/', usuarios_views.usuario_list),
    path('users/<int:id>/', usuarios_views.usuario_detalle),
    path('tocken/',usuarios_views.autenticar_user),
    path('descifrar/<str:token>', usuarios_views.descifrar_token),

    #endpoints para el encabezado OcupacionMq
    path('ocupacionMq/',ocupacionMq_views.ocupMq_list),
    path('ocupacionMq/<int:id>/',ocupacionMq_views.ocupMq_detalle),
    path('ocupacionMq/encabezado/<str:funcion>',ocupacionMq_views.datosEncabezado),
    path('ocupacionMq/troqueladoras/',ocupacionMq_views.datosTroqueladoras),

    #endpoints para los datos que se usaran para los calculos 
    path('datosAcalcular/', datosAcalcular_views.datos_list),
    path('datosAcalcular/<int:id>/', datosAcalcular_views.datos_detalle),
    path('tu_nueva_vista/', datosAcalcular_views.tu_nueva_vista),

    #endpoints para los datos que contendran los resultados de los calculos
    path('resultadoCalculo/',reultadoCalculo_views.resultado_list),
    path('resultadoCalculo/<int:id>/',reultadoCalculo_views.resultado_detalle)

]
