from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from cliente.models import Cliente
from cliente.serializers import ClienteSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.http import HttpResponseNotFound

# Create your views here.
#Metodo para obtener todas los departamento y añadir o crear nuevos depto
@csrf_exempt
def cliente_list(request):
    if request.method == 'GET':
        clientes = Cliente.objects.all()
        serializer = ClienteSerializer(clientes, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ClienteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
#metodos para editar y elimar un depto mediante su 'id'
@csrf_exempt
def cliente_detalle(request, id):
    try:
        clienteID = Cliente.objects.get(id=id)
    except Cliente.DoesNotExist:
        return HttpResponseNotFound("Cliente no encontrado")

    if request.method == 'GET':
        serializer = ClienteSerializer(clienteID)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ClienteSerializer(clienteID, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        clienteID.delete()
        return JsonResponse({"message": "Cliente eliminado"}, status=204)