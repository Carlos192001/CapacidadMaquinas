from django.db import models
from django.utils import timezone
# Create your models here.

class Usuario(models.Model):
    nombre = models.CharField('nombre', max_length=255)
    apellido = models.CharField('apellido', max_length=50)
    user = models.CharField('user', max_length=255)
    password = models.CharField('password', max_length=255)
    departamento = models.CharField('departamento', max_length=255)
    estatus = models.BooleanField('estatus')
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)    

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)