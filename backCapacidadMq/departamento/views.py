from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from departamento.models import Departamento
from departamento.serializers import DepartamentoSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.http import HttpResponseNotFound

# Create your views here.
#Metodo para obtener todas los departamento y añadir o crear nuevos depto
@csrf_exempt
def depto_list(request):
    if request.method == 'GET':
        departamentos = Departamento.objects.all()
        serializer = DepartamentoSerializer(departamentos, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = DepartamentoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
#metodos para editar y elimar un depto mediante su 'id'
@csrf_exempt
def depto_detalle(request, id):
    try:
        deptoID = Departamento.objects.get(id=id)
    except Departamento.DoesNotExist:
        return HttpResponseNotFound("Depto no encontrado")

    if request.method == 'GET':
        serializer = DepartamentoSerializer(deptoID)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = DepartamentoSerializer(deptoID, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        deptoID.delete()
        return JsonResponse({"message": "Depto eliminado"}, status=204)