from django.db import models
from django.utils import timezone

# Create your models here.

class Departamento(models.Model):
    numero = models.IntegerField('numero')
    nombre = models.CharField('numero', max_length=255)
    encargado = models.CharField('encargado', max_length=255)
    tipo = models.CharField('tipo', max_length=255)
    estatus = models.BooleanField('estatus')
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)    

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)