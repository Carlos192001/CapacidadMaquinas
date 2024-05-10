from rest_framework import serializers
from resultadoCalculo.models import resultadoCalculo

class resultadoCalculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = resultadoCalculo
        fields = '__all__'