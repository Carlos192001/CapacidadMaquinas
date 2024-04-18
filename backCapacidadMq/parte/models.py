from django.db import models
from django.utils import timezone

# Create your models here.

class Parte(models.Model):
    numParte = models.CharField('numParte', max_length=255)
    descripcion = models.CharField('descripcion', max_length=255)
    tipo = models.CharField('tipo', max_length=255)
    idCliente = models.IntegerField('idCliente')
    funcionMaquina = models.CharField('funcionMaquina', max_length=255)
    estatus = models.BooleanField('estatus')
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)   

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)