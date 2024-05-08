from django.db import models
from django.utils import timezone
# Create your models here.

class OcupacionMq(models.Model):
    codInternoMq = models.CharField('codInternoMq', max_length=255)
    numParte = models.CharField('numParte', max_length=255)
    estatus = models.BooleanField('estatus')
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)    

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)