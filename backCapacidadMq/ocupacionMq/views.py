from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from ocupacionMq.models import OcupacionMq
from ocupacionMq.serializers import ocupacionMqSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.http import HttpResponseNotFound, HttpResponseNotAllowed
# Create your views here.

@csrf_exempt
def ocupMq_list(request):
    if request.method == 'GET':
        registros = OcupacionMq.objects.all()
        serializer = ocupacionMqSerializer(registros, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ocupacionMqSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
#metodos para editar y elimar un depto mediante su 'id'
@csrf_exempt
def ocupMq_detalle(request, id):
    try:
        ocupacionMqsID = OcupacionMq.objects.get(id=id)
    except OcupacionMq.DoesNotExist:
        return HttpResponseNotFound("Registro no encontrada")

    if request.method == 'GET':
        serializer = ocupacionMqSerializer(ocupacionMqsID)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ocupacionMqSerializer(ocupacionMqsID, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        ocupacionMqsID.delete()
        return JsonResponse({"message": "Registro eliminada"}, status=204)
    

@csrf_exempt
def filtrarEstatus(request):
    if request.method == 'GET':
        ocupacionMqs = OcupacionMq.objects.filter(estatus=True)
        serializer = ocupacionMqSerializer(ocupacionMqs, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])
def method_not_allowed(request, *args, ** kwargs):
    return HttpResponseNotAllowed(['GET', 'POST', 'PUT', 'DELETE'])