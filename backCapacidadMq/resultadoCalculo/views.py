from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from resultadoCalculo.models import resultadoCalculo
from resultadoCalculo.serializers import resultadoCalculoSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.http import HttpResponseNotFound
from django.db import connections

# Create your views here.
@csrf_exempt
def resultado_list(request):
    if request.method == 'GET':
        resultadoscalculos = resultadoCalculo.objects.all()
        serializer = resultadoCalculoSerializer(resultadoscalculos, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = resultadoCalculoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

#metodos para editar y elimar un  mediante su 'id'
@csrf_exempt
def resultado_detalle(request, id):
    try:
        resultadoCalculoID = resultadoCalculo.objects.get(id=id)
    except resultadoCalculo.DoesNotExist:
        return HttpResponseNotFound("Dato no encontrado")

    if request.method == 'GET':
        serializer = resultadoCalculoSerializer(resultadoCalculoID)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = resultadoCalculoSerializer(resultadoCalculoID, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        resultadoCalculoID.delete()
        return JsonResponse({"message": "eliminado"}, status=204)