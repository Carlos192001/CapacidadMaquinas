from django.db import models
from django.utils import timezone

# Create your models here.
class Maquina (models.Model):
    numDepartamento = models.IntegerField('numDepartamento')
    codInternoMq = models.CharField('codInternoMq', max_length=255)
    nombre = models.CharField('nombre', max_length=255)
    codInternoProceso = models.CharField('codInternoProceso', max_length=255)
    funcionMaquina = models.CharField('funcionMaquina', max_length=255)
    planta = models.CharField('planta', max_length=255)
    estatus = models.BooleanField('estatus')
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)   

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)