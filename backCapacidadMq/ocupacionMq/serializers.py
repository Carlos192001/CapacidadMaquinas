from rest_framework import serializers
from .models import OcupacionMq

class ocupacionMqSerializer(serializers.ModelSerializer):
    class Meta:
        model = OcupacionMq
        fields = '__all__'