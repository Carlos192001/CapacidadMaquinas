from django.db import models
from django.utils import timezone
# Create your models here.

class Cliente(models.Model):
    nombre = models.CharField('nombre', max_length=100)
    estatus = models.BooleanField('estatus')
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)    

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)
