from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from ocupacionMq.models import OcupacionMq
from ocupacionMq.serializers import ocupacionMqSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.http import HttpResponseNotFound, HttpResponseNotAllowed
from django.db import connections
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

@csrf_exempt
def datosEncabezado(request,funcion,codMaquina):
    if request.method == 'GET':
        db_connection = 'default'
        # Realizar la consulta en la base de datos especificada
        db_cursor = connections[db_connection].cursor()
        db_cursor.execute("""
            SELECT ocupacionMq_ocupacionmq.*, maquina_maquina.nombre, parte_parte.descripcion, resultadoCalculo_resultadocalculo.proyectadoOcupAnual
            FROM ocupacionMq_ocupacionmq
            INNER JOIN maquina_maquina ON ocupacionMq_ocupacionmq.codInternoMq = maquina_maquina.codInternoMq
            INNER JOIN parte_parte ON ocupacionMq_ocupacionmq.numParte = parte_parte.numParte
            INNER JOIN datosAcalcular_datosacalcular ON ocupacionMq_ocupacionmq.id = datosAcalcular_datosacalcular.idOcupacionMq
            INNER JOIN resultadoCalculo_resultadocalculo ON datosAcalcular_datosacalcular.id = resultadoCalculo_resultadocalculo.idDatosAcalcular
            WHERE ocupacionMq_ocupacionmq.funcion = %s AND ocupacionMq_ocupacionmq.estatus = 1 AND ocupacionMq_ocupacionmq.codInternoMq = %s
            ORDER BY id DESC;
        """, [funcion, codMaquina])    

        # Obtener los resultados como un diccionario
        resultados_db = dictfetchall(db_cursor)

        # Devolver los resultados como una respuesta JSON
        return JsonResponse(resultados_db, safe=False)

# Función auxiliar para obtener los resultados como un diccionario
def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]

#esta consulta trae los datos de las troqueladoras (lo que se tiene en el excel)
@csrf_exempt
def datosTroqueladoras(request):
    if request.method == 'GET':
        db_connection = 'default'
        # Realizar la consulta en la base de datos especificada
        db_cursor = connections[db_connection].cursor()
        db_cursor.execute("""
            SELECT ocupacionMq_ocupacionmq.*, 
                maquina_maquina.nombre, 
                parte_parte.descripcion, 
	            resultadoCalculo_resultadocalculo.proyectadoOcupAnual,
	            datosAcalcular_datosacalcular.requeriAnualAutilizar,
	            datosAcalcular_datosacalcular.golpesXminutos,
	            datosAcalcular_datosacalcular.pzaRequeridas,
	            datosAcalcular_datosacalcular.semanasAlaborar,
	            datosAcalcular_datosacalcular.diasAlaborarSemana,
	            datosAcalcular_datosacalcular.horasDelTurno,
	            datosAcalcular_datosacalcular.turnosAlDia,
	            datosAcalcular_datosacalcular.tiempoSetUp,
	            datosAcalcular_datosacalcular.cambioHerramental,
	            datosAcalcular_datosacalcular.numDeCambiosHerra,
	            datosAcalcular_datosacalcular.paradasProgramadas,
	            datosAcalcular_datosacalcular.demorasInevitables,
	            datosAcalcular_datosacalcular.cavidades,
	            datosAcalcular_datosacalcular.turnoInicial,
	            datosAcalcular_datosacalcular.turnoConsecutivo,
	            datosAcalcular_datosacalcular.observaciones,

	            resultadoCalculo_resultadocalculo.horaSemanaTurno,
	            resultadoCalculo_resultadocalculo.requerimientoDiario,
	            resultadoCalculo_resultadocalculo.timeCicloXgolpe,
	            resultadoCalculo_resultadocalculo.hrsEfectivasXturno,
	            resultadoCalculo_resultadocalculo.pzaTeoricasXprimerTurno,
	            resultadoCalculo_resultadocalculo.pzaTeoricasXsegundoTurno,
	            resultadoCalculo_resultadocalculo.numTurnosRequeridos,
	            resultadoCalculo_resultadocalculo.pzaProdEnTurnos,
	            resultadoCalculo_resultadocalculo.requerimientoSem,
	            datosAcalcular_datosacalcular.scrapLiberado
       
            FROM ocupacionMq_ocupacionmq
            INNER JOIN maquina_maquina ON ocupacionMq_ocupacionmq.codInternoMq = maquina_maquina.codInternoMq
            INNER JOIN parte_parte ON ocupacionMq_ocupacionmq.numParte = parte_parte.numParte
            INNER JOIN datosAcalcular_datosacalcular ON ocupacionMq_ocupacionmq.id = datosAcalcular_datosacalcular.idOcupacionMq
            INNER JOIN resultadoCalculo_resultadocalculo ON datosAcalcular_datosacalcular.id = resultadoCalculo_resultadocalculo.idDatosAcalcular
            WHERE ocupacionMq_ocupacionmq.funcion = 'TROQUELAR' AND ocupacionMq_ocupacionmq.estatus = 1;
            """)    

        # Obtener los resultados como un diccionario
        resultados_db = dictfetchall(db_cursor)

        # Devolver los resultados como una respuesta JSON
        return JsonResponse(resultados_db, safe=False)

# Función auxiliar para obtener los resultados como un diccionario
def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]
