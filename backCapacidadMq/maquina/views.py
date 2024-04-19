from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from maquina.models import Maquina
from maquina.serializers import MaquinaSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.http import HttpResponseNotFound

# Create your views here.

@csrf_exempt
def maquina_list(request):
    if request.method == 'GET':
        maquinas = Maquina.objects.all()
        serializer = MaquinaSerializer(maquinas, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MaquinaSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
#metodos para editar y elimar un depto mediante su 'id'
@csrf_exempt
def maquina_detalle(request, id):
    try:
        maquinaID = Maquina.objects.get(id=id)
    except Maquina.DoesNotExist:
        return HttpResponseNotFound("Maquina no encontrada")

    if request.method == 'GET':
        serializer = MaquinaSerializer(maquinaID)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = MaquinaSerializer(maquinaID, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        maquinaID.delete()
        return JsonResponse({"message": "Maquina eliminada"}, status=204)