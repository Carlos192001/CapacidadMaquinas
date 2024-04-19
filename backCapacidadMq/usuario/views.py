from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from usuario.models import Usuario
from usuario.serializers import UsuarioSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.http import HttpResponseNotFound

#para generar el tocken
import jwt
import secrets

# Create your views here.

@csrf_exempt
def usuario_list(request):
    if request.method == 'GET':
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(usuarios, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UsuarioSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
#metodos para editar y elimar un depto mediante su 'id'
@csrf_exempt
def usuario_detalle(request, id):
    try:
        usuarioID = Usuario.objects.get(id=id)
    except Usuario.DoesNotExist:
        return HttpResponseNotFound("Maquina no encontrada")

    if request.method == 'GET':
        serializer = UsuarioSerializer(usuarioID)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UsuarioSerializer(usuarioID, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        usuarioID.delete()
        return JsonResponse({"message": "Maquina eliminada"}, status=204)
    
# Clave secreta para firmar el token y validad los datos del usuario
SECRET_KEY = secrets.token_hex(32)

@csrf_exempt
def autenticar_user(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user = data.get('user') 
        password = data.get('password')  

        if user  and password:
            try:
                usuario_encontrado = Usuario.objects.get(user=user, password=password)
                if usuario_encontrado:
                    # Generar un token JWT que incluya datos del usuario
                    payload = {
                        'usuario_id': usuario_encontrado.id,
                        'nombre': usuario_encontrado.nombre,
                        'apellido': usuario_encontrado.apellido,
                        'departamento': usuario_encontrado.departamento,
                        'estatus': usuario_encontrado.estatus
                        # Puedes incluir más datos del usuario aquí si lo deseas
                    }
                    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
                    return JsonResponse({"message": "Usuario autenticado", "token": token}, status=200)
                else:
                    return JsonResponse({"message": "Credenciales inválidas"}, status=401)
            except Usuario.DoesNotExist:
                return JsonResponse({"message": "Credenciales inválidas"}, status=401)
        else:
            return JsonResponse({"message": "Datos de usuario y contraseña requeridos"}, status=400)
    else:
        return JsonResponse({"message": "Método no permitido"}, status=405)
    
#descifra el tocken 
SECRET_KEY = secrets.token_hex(32)
@csrf_exempt
def descifrar_token(request,token):
    if request.method == 'GET':
        #token = request.GET.get('token')
        if token:
            # Eliminar cualquier espacio en blanco al principio o al final del token
            token = token.strip()
            try:
                decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
                usuario_id = decoded_token.get('usuario_id')
                nombre = decoded_token.get('nombre')
                apellido = decoded_token.get('apellido')
                departamento = decoded_token.get('departamento')
                estatus = decoded_token.get('estatus')
                # Haz algo con los datos del usuario
                return JsonResponse({"usuario_id": usuario_id, 
                                     "nombre": nombre,
                                     "apellido": apellido,
                                     "departamento": departamento, 
                                     "estatus": estatus
                                     }, status=200)
            except jwt.ExpiredSignatureError:
                return JsonResponse({"message": "Token expirado"}, status=401)
            except jwt.InvalidTokenError:
                return JsonResponse({"message": "Token inválido"}, status=401)
        else:
            return JsonResponse({"message": "Token no proporcionado"}, status=400)
    else:
        return JsonResponse({"message": "Método no permitido"}, status=405)
