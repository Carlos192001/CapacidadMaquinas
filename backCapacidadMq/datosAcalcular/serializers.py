from rest_framework import serializers
from datosAcalcular.models import datosAcalcular

class datosAcalcularSerializer(serializers.ModelSerializer):
    class Meta:
        model = datosAcalcular
        fields = '__all__'