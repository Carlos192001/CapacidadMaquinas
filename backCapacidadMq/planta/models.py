from django.db import models
from django.utils import timezone

# Create your models here.

class Planta(models.Model):
    planta = models.CharField('planta', max_length=255)
    base = models.CharField('base', max_length=255)
    estatus = models.BooleanField('estatus')
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)     

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)
