from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from datosAcalcular.models import datosAcalcular
from datosAcalcular.serializers import datosAcalcularSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.http import HttpResponseNotFound

# Create your views here.
@csrf_exempt
def datos_list(request):
    if request.method == 'GET':
        datosCalcular = datosAcalcular.objects.all()
        serializer = datosAcalcularSerializer(datosCalcular, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = datosAcalcularSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
#metodos para editar y elimar un depto mediante su 'id'
@csrf_exempt
def datos_detalle(request, id):
    try:
        datoCalcularID = datosAcalcular.objects.get(id=id)
    except datosAcalcular.DoesNotExist:
        return HttpResponseNotFound("Depto no encontrado")

    if request.method == 'GET':
        serializer = datosAcalcularSerializer(datoCalcularID)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = datosAcalcularSerializer(datoCalcularID, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        datoCalcularID.delete()
        return JsonResponse({"message": "Depto eliminado"}, status=204)