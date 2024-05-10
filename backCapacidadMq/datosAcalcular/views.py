from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from datosAcalcular.models import datosAcalcular
from datosAcalcular.serializers import datosAcalcularSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.http import HttpResponseNotFound
from django.db import connections

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
    

@csrf_exempt
def tu_nueva_vista(request):
    if request.method == 'GET':
        db_connection = 'default'
        # Realizar la consulta en la base de datos especificada
        db_cursor = connections[db_connection].cursor()
        db_cursor.execute("""
            SELECT
                CASE WHEN idOcupacionMq <> 0 THEN idOcupacionMq END AS idOcupacionMq,
                CASE WHEN requeriAnualAutilizar <> 0 THEN requeriAnualAutilizar END AS requeriAnualAutilizar,
                CASE WHEN golpesXminutos <> 0 THEN golpesXminutos END AS golpesXminutos,
                CASE WHEN pzaRequeridas <> 0 THEN pzaRequeridas END AS pzaRequeridas,
                CASE WHEN semanasAlaborar <> 0 THEN semanasAlaborar END AS semanasAlaborar,
                CASE WHEN diasAlaborarSemana <> 0 THEN diasAlaborarSemana END AS diasAlaborarSemana,
                CASE WHEN horasDelTurno <> 0 THEN horasDelTurno END AS horasDelTurno,
                CASE WHEN turnosAlDia <> 0 THEN turnosAlDia END AS turnosAlDia,
                CASE WHEN tiempoSetUp <> 0 THEN tiempoSetUp END AS tiempoSetUp,
                CASE WHEN cambioHerramental <> 0 THEN cambioHerramental END AS cambioHerramental,
                CASE WHEN numDeCambiosHerra <> 0 THEN numDeCambiosHerra END AS numDeCambiosHerra,
                CASE WHEN paradasProgramadas <> 0 THEN paradasProgramadas END AS paradasProgramadas,
                CASE WHEN demorasInevitables <> 0 THEN demorasInevitables END AS demorasInevitables,
                CASE WHEN cavidades <> 0 THEN cavidades END AS cavidades,
                CASE WHEN turnoInicial <> 0 THEN turnoInicial END AS turnoInicial,
                CASE WHEN turnoConsecutivo <> 0 THEN turnoConsecutivo END AS turnoConsecutivo,
                CASE WHEN scrapLiberado <> 0 THEN scrapLiberado END AS scrapLiberado,
                CASE WHEN cortesXminuto <> 0 THEN cortesXminuto END AS cortesXminuto,
                CASE WHEN tiempoCicloXpza <> 0 THEN tiempoCicloXpza END AS tiempoCicloXpza,
                CASE WHEN longTrabajoBanda <> 0 THEN longTrabajoBanda END AS longTrabajoBanda,
                CASE WHEN longTotalBanda <> 0 THEN longTotalBanda END AS longTotalBanda,
                CASE WHEN longEfectivoBanda <> 0 THEN longEfectivoBanda END AS longEfectivoBanda,
                CASE WHEN velocidadBanda <> 0 THEN velocidadBanda END AS velocidadBanda,
                CASE WHEN longDePza <> 0 THEN longDePza END AS longDePza,
                CASE WHEN espacioEntrePza <> 0 THEN espacioEntrePza END AS espacioEntrePza,
                CASE WHEN numLadosAfluxear <> 0 THEN numLadosAfluxear END AS numLadosAfluxear,
                CASE WHEN cantidadDummys <> 0 THEN cantidadDummys END AS cantidadDummys,
                CASE WHEN longitudDummy <> 0 THEN longitudDummy END AS longitudDummy,
                CASE WHEN longitudEntreDummys <> 0 THEN longitudEntreDummys END AS longitudEntreDummys,
                CASE WHEN longitudJig <> 0 THEN longitudJig END AS longitudJig,
                CASE WHEN longitudEntreJigs <> 0 THEN longitudEntreJigs END AS longitudEntreJigs,
                CASE WHEN filasDummysSimultaneas <> 0 THEN filasDummysSimultaneas END AS filasDummysSimultaneas,
                CASE WHEN filasJigsSimultaneas <> 0 THEN filasJigsSimultaneas END AS filasJigsSimultaneas,
                CASE WHEN numCambiosReceta <> 0 THEN numCambiosReceta END AS numCambiosReceta,
                observaciones,
                estatus
            FROM
                datosAcalcular_datosacalcular
            WHERE
                id = 3;
        """)

        # Obtener los resultados como un diccionario
        resultados_db = dictfetchall(db_cursor)

        # Devolver los resultados como una respuesta JSON
        return JsonResponse(resultados_db, safe=False)

# Función auxiliar para obtener los resultados como un diccionario
def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]
