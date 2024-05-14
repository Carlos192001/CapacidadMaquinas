from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from parte.models import Parte
from parte.serializers import ParteSerializer
from django.http import HttpResponseNotAllowed, JsonResponse
from rest_framework.parsers import JSONParser
from django.http import HttpResponseNotFound

# Create your views here.
#Metodo para obtener todas las partes y añadir o crear nuevas partes
@csrf_exempt
def parte_list(request):
    if request.method == 'GET':
        partes = Parte.objects.all()
        serializer = ParteSerializer(partes, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ParteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
#metodos para editar y elimar una parte mediante su 'id'
@csrf_exempt
def parte_detalle(request, id):
    try:
        parteID = Parte.objects.get(id=id)
    except Parte.DoesNotExist:
        return HttpResponseNotFound("Parte no encontrado")

    if request.method == 'GET':
        serializer = ParteSerializer(parteID)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ParteSerializer(parteID, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        parteID.delete()
        return JsonResponse({"message": "Parte eliminado"}, status=204)
    
@csrf_exempt
def filtrarFuncion(request, funcion):
    if request.method == 'GET':
        partes = Parte.objects.filter(funcionMaquina=funcion, estatus=True)
        serializer = ParteSerializer(partes, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])
def method_not_allowed(request, *args, ** kwargs):
    return HttpResponseNotAllowed(['GET', 'POST', 'PUT', 'DELETE'])

@csrf_exempt
def filtrarnumParte(request, numparte):
    if request.method == 'GET':
        partes = Parte.objects.filter(numParte=numparte, estatus=True)
        serializer = ParteSerializer(partes, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])
def method_not_allowed(request, *args, ** kwargs):
    return HttpResponseNotAllowed(['GET', 'POST', 'PUT', 'DELETE'])

@csrf_exempt
def filtrarCodMaquina(request, codMaquina):
    if request.method == 'GET':
        partes = Parte.objects.filter(codMaqRealiza=codMaquina, estatus=True)
        serializer = ParteSerializer(partes, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])
def method_not_allowed(request, *args, ** kwargs):
    return HttpResponseNotAllowed(['GET', 'POST', 'PUT', 'DELETE'])