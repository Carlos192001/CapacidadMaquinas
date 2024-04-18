from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from planta.models import Planta
from planta.serializers import PlantaSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.http import HttpResponseNotAllowed, HttpResponseNotFound

# Create your views here.  
#Metodo para obtener todas las plantas y añadir o crear nuevas plantas
@csrf_exempt
def planta_list(request):
    if request.method == 'GET':
        plantas = Planta.objects.all()
        serializer = PlantaSerializer(plantas, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PlantaSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
#metodos para editar y elimar una planta mediante su 'id'
@csrf_exempt
def planta_detalle(request, id):
    try:
        plantaID = Planta.objects.get(id=id)
    except Planta.DoesNotExist:
        return HttpResponseNotFound("Planta no encontrada")

    if request.method == 'GET':
        serializer = PlantaSerializer(plantaID)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PlantaSerializer(plantaID, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        plantaID.delete()
        return JsonResponse({"message": "Planta eliminada"}, status=204)