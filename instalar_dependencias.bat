@echo off
echo Instalando Django y otras dependencias...
pip install django
pip install mssql-django==1.4
pip install django-cors-headers
pip install PyJWT
pip install djangorestframework
echo Instalación completada.
pause
