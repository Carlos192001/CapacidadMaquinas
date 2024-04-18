from rest_framework import serializers
from parte.models import Parte

class ParteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parte
        fields = '__all__'