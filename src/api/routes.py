"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from datetime import datetime
from api.models import db, User, Profile, Genres, FavoritesGenres, Platforms, Tags, Developers, Videogames
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt 
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta
from flask_mail import Mail, Message


api = Blueprint('api', __name__)
bcrypt = Bcrypt() 
mail = Mail()


# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# Endpoint de registro de Usuario
@api.route('/signup', methods=['POST'])
def handle_register():
    request_body = request.json # Recogemos los datos del body mandado  
    name = request_body.get('name') # Recogemos el campo name del request_body
    email = request_body.get('email') # Recogemos el campo email del request_body
    password = request_body.get('password') # Recogemos el campo password del request_body
    confirm_password = request_body.get('confirm_password')# Recogemos el campo repita contraseña del request_body
    creation_date = request_body.get('creation_date') # Recogemos el campo creation_date del request_body

    if password != confirm_password: # Validamos si las contraseñas coinciden
        return jsonify({"message": "Las contraseñas no coinciden"}), 400
    
    if not name or not password or not email or not creation_date: # Validamos si existen los campos email, username y password
        return jsonify({"message": "Todos los campos deben estar completos"}), 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8') # Encriptamos la contraseña
    
    user = User.query.filter_by(name = name, email = email).first() # Buscamos dentro de la tabla user si hay ya un usuario que contenga los mismos datos

    if user: # Validamos si existe ese usuario dentro de la base de datos
        return jsonify({"message": "Ese usuario ya existe"}), 400
    
    usuario_add = User(name = name, email = email, password = hashed_password, creation_date = creation_date) # Indicamos la inserccion que deseamos hacer en la base de datos

    db.session.add(usuario_add) # Realizamos la insercion
    db.session.commit() # Actualizamos la base de datos

     # Retornamos los datos añadidos
    usuario_add_serialize = usuario_add.serialize()
    return jsonify({"message":usuario_add_serialize}), 200


#Endpoint login de usuario
@api.route('/login', methods=['POST'])
def handle_login(): 
    request_body = request.json # Recogemos los datos del body mandado    
    password = request_body.get('password') # Recogemos el campo password del request_body
    email = request_body.get('email') # Recogemos el campo username del request_body

    if not email or not password: # Validamos si existen los campos username y password
        return jsonify({"message": "Todos los campos deben estar completos"}), 400
    
    user = User.query.filter_by(email = email).first() # Buscamos dentro de la tabla user si hay ya un usuario que contenga los mismos datos
    is_valid = bcrypt.check_password_hash(user.password, password)

    if not user or is_valid == False: # Validamos si existe ese usuario dentro de la base de datos
        return jsonify({"message": "Correo o contraseña erroneos"}), 400
    
    user_serialize = user.serialize()

    token = create_access_token(identity = user.id) # Creamos el token del usuario
    return jsonify({"token": token,
                    "user":user_serialize}), 200


# Endpoint Get categorias
@api.route('/genres', methods=['GET'])
def get_genres():

    # Creamos las variables para los generos de la tabla Genres
    genre=Genres.query.all()
    all_genres = [genres.serialize() for genres in genre]

    # Retornamos todos los generos de la tabla Genres
    return jsonify(all_genres), 200


# Endpoint añadir categoria a favoritas
@api.route('/register-genres', methods=['POST'])
def register_genres():

    request_body = request.json # Recogemos los datos del body mandado  
    user_id = request_body.get('user_id') # Recogemos el user_id del request_body
    genre_id = request_body.get('genre_id') # Recogemos el genre_id del request_body

    if not user_id or not genre_id:
        return jsonify({"message": "No se ha podido añadir a favoritos"}), 400
    
    genres = FavoritesGenres.query.filter_by(user_id = user_id, genre_id = genre_id).first()

    if genres:
        return jsonify({"message": "Ya está en favoritos"}), 400
    
    genres_add = FavoritesGenres(user_id = user_id, genre_id = genre_id)

    db.session.add(genres_add) # Realizamos la insercion
    db.session.commit() # Actualizamos la base de datos

    return jsonify({"message": "Se ha añadido a favoritos"}), 200


#Endpoint eliminar categoria de favoritas
@api.route('/remove-genres', methods=['DELETE'])
def remove_genres():
    request_body = request.json  # Recogemos los datos del body enviado
    user_id = request_body.get('user_id')  # Recogemos el user_id del request_body
    genre_id = request_body.get('genre_id')  # Recogemos el genre_id del request_body

    if not user_id or not genre_id:
        return jsonify({"message": "No se ha podido eliminar de favoritos"}), 400

    genres = FavoritesGenres.query.filter_by(user_id=user_id, genre_id=genre_id).first()

    if not genres:
        return jsonify({"message": "El género no está en favoritos"}), 404

    db.session.delete(genres)  # Eliminamos el registro
    db.session.commit()  # Actualizamos la base de datos

    return jsonify({"message": "Se ha eliminado de favoritos"}), 200

#-------------------------------ENDPOINTS PROFILES-------------------------------#
#Get de perfil por ID
@api.route('/profiles/<int:profile_id>', methods=['GET'])
def get_profile_by_id(profile_id):
    try:
        # Realizamos una consulta que incluye la relación con la tabla User
        profile = db.session.query(Profile, User).join(User, User.id == Profile.user_id).filter(Profile.id == profile_id).first()

        if not profile:
            return jsonify({"message": "Perfil no encontrado"}), 404

        # Serializamos los resultados para incluir los datos del usuario y el perfil
        profile_serialized = {
            "profile_id": profile[0].id,
            "username": profile[0].username,
            "description": profile[0].description,
            "birth_date": profile[0].birth_date,
            "user": {
                "id": profile[1].id,
                "name": profile[1].name,
                "email": profile[1].email,
                "creation_date": profile[1].creation_date
            }
        }
        return jsonify(profile_serialized), 200
    except Exception as e:
        return jsonify({"message": "Error al obtener el perfil", "error": str(e)}), 500



#Editar nombre de usuario
@api.route('/profiles/username', methods=['PUT'])
def edit_username():
    request_body = request.json  # Recogemos los datos del body
    profile_id = request_body.get('profile_id')  # ID del perfil a actualizar
    new_username = request_body.get('username')  # Nuevo username

    if not profile_id or not new_username:
        return jsonify({"message": "Datos incompletos"}), 400

    # Verificamos si el nuevo username ya está en uso por otro usuario
    existing_profile = Profile.query.filter_by(username=new_username).first()
    if existing_profile and existing_profile.id != profile_id:
        return jsonify({"message": "El username ya está en uso"}), 409  # Código 409: Conflicto

    profile = Profile.query.get(profile_id)  # Buscamos el perfil por ID
    if not profile:
        return jsonify({"message": "Perfil no encontrado"}), 404

    profile.username = new_username  # Actualizamos el username
    db.session.commit()  # Guardamos los cambios

    return jsonify({"message": "Username actualizado correctamente"}), 200


#Editar descripcion
@api.route('/profiles/description', methods=['PUT'])
def edit_description():
    request_body = request.json  # Recogemos los datos del body
    profile_id = request_body.get('profile_id')  # ID del perfil a actualizar
    new_description = request_body.get('description')  # Nueva descripción

    if not profile_id or not new_description:
        return jsonify({"message": "Datos incompletos"}), 400

    profile = Profile.query.get(profile_id)  # Buscamos el perfil por ID
    if not profile:
        return jsonify({"message": "Perfil no encontrado"}), 404

    profile.description = new_description  # Actualizamos la descripción
    db.session.commit()  # Guardamos los cambios

    return jsonify({"message": "Descripción actualizada correctamente"}), 200


#Editar fecha de nacimiento
@api.route('/profiles/birth_date', methods=['PUT'])
def edit_birth_date():
    request_body = request.json  # Recogemos los datos del body
    profile_id = request_body.get('profile_id')  # ID del perfil a actualizar
    new_birth_date = request_body.get('birth_date')  # Nueva fecha de nacimiento

    if not profile_id or not new_birth_date:
        return jsonify({"message": "Datos incompletos"}), 400

    try:
        parsed_birth_date = datetime.strptime(new_birth_date, '%Y-%m-%d').date()  # Convertimos a formato de fecha
    except ValueError:
        return jsonify({"message": "Formato de fecha inválido. Usa 'YYYY-MM-DD'"}), 400

    profile = Profile.query.get(profile_id)  # Buscamos el perfil por ID
    if not profile:
        return jsonify({"message": "Perfil no encontrado"}), 404

    profile.birth_date = parsed_birth_date  # Actualizamos la fecha de nacimiento
    db.session.commit()  # Guardamos los cambios

    return jsonify({"message": "Fecha de nacimiento actualizada correctamente"}), 200

#-------------------------------ENDPOINTS PROFILES-------------------------------#

#Get de todos los perfiles
@api.route('/profiles', methods=['GET'])
def get_all_profiles():
    try:
        # Realizamos una consulta que incluye la relación con la tabla User
        profiles = db.session.query(Profile, User).join(User, User.id == Profile.user_id).all()

        # Serializamos los resultados para incluir los datos del usuario y el perfil
        for profile in profiles:
            profiles_serialized = [
                
                {
                    "profile_id": profile[0].id,
                    "username": profile[0].username,
                    "description": profile[0].description,
                    "birth_date": profile[0].birth_date,
                    "user": {
                        "id": profile[1].id,
                        "name": profile[1].name,
                        "email": profile[1].email,
                        "creation_date": profile[1].creation_date
                    }
                }
                
            ]
        return jsonify(profiles_serialized), 200
    except Exception as e:
        return jsonify({"message": "Error al obtener los perfiles", "error": str(e)}), 500



#Get de perfil por ID
@api.route('/profiles/<int:profile_id>', methods=['GET'])
def get_profile_by_id(profile_id):
    try:
        # Realizamos una consulta que incluye la relación con la tabla User
        profile = db.session.query(Profile, User).join(User, User.id == Profile.user_id).filter(Profile.id == profile_id).first()

        if not profile:
            return jsonify({"message": "Perfil no encontrado"}), 404

        # Serializamos los resultados para incluir los datos del usuario y el perfil
        profile_serialized = [
        
            {
                "profile_id": profile[0].id,
                "username": profile[0].username,
                "description": profile[0].description,
                "birth_date": profile[0].birth_date,
                "user": {
                    "id": profile[1].id,
                    "name": profile[1].name,
                    "email": profile[1].email,
                    "creation_date": profile[1].creation_date
                }
            }
            
        ]
        return jsonify(profile_serialized), 200
    except Exception as e:
        return jsonify({"message": "Error al obtener el perfil", "error": str(e)}), 500



#Editar nombre de usuario
@api.route('/profiles/username', methods=['PUT'])
def edit_username():
    request_body = request.json  # Recogemos los datos del body
    profile_id = request_body.get('profile_id')  # ID del perfil a actualizar
    new_username = request_body.get('username')  # Nuevo username

    if not profile_id or not new_username:
        return jsonify({"message": "Datos incompletos"}), 400

    # Verificamos si el nuevo username ya está en uso por otro usuario
    existing_profile = Profile.query.filter_by(username=new_username).first()
    if existing_profile and existing_profile.id != profile_id:
        return jsonify({"message": "El username ya está en uso"}), 409  # Código 409: Conflicto

    profile = Profile.query.get(profile_id)  # Buscamos el perfil por ID
    if not profile:
        return jsonify({"message": "Perfil no encontrado"}), 404

    profile.username = new_username  # Actualizamos el username
    db.session.commit()  # Guardamos los cambios

    return jsonify({"message": "Username actualizado correctamente"}), 200


#Editar descripcion
@api.route('/profiles/description', methods=['PUT'])
def edit_description():
    request_body = request.json  # Recogemos los datos del body
    profile_id = request_body.get('profile_id')  # ID del perfil a actualizar
    new_description = request_body.get('description')  # Nueva descripción

    if not profile_id or not new_description:
        return jsonify({"message": "Datos incompletos"}), 400

    profile = Profile.query.get(profile_id)  # Buscamos el perfil por ID
    if not profile:
        return jsonify({"message": "Perfil no encontrado"}), 404

    profile.description = new_description  # Actualizamos la descripción
    db.session.commit()  # Guardamos los cambios

    return jsonify({"message": "Descripción actualizada correctamente"}), 200


#Editar fecha de nacimiento
@api.route('/profiles/birth_date', methods=['PUT'])
def edit_birth_date():
    request_body = request.json  # Recogemos los datos del body
    profile_id = request_body.get('profile_id')  # ID del perfil a actualizar
    new_birth_date = request_body.get('birth_date')  # Nueva fecha de nacimiento

    if not profile_id or not new_birth_date:
        return jsonify({"message": "Datos incompletos"}), 400

    try:
        parsed_birth_date = datetime.strptime(new_birth_date, '%Y-%m-%d').date()  # Convertimos a formato de fecha
    except ValueError:
        return jsonify({"message": "Formato de fecha inválido. Usa 'YYYY-MM-DD'"}), 400

    profile = Profile.query.get(profile_id)  # Buscamos el perfil por ID
    if not profile:
        return jsonify({"message": "Perfil no encontrado"}), 404

    profile.birth_date = parsed_birth_date  # Actualizamos la fecha de nacimiento
    db.session.commit()  # Guardamos los cambios

    return jsonify({"message": "Fecha de nacimiento actualizada correctamente"}), 200

# Endpoint de envio de correo de reset de password
@api.route('/forgot-password', methods=['POST'])
def forgot_password():

    email = request.json.get('email') # Recogemos el email del usuario
    user = User.query.filter_by(email = email).first() # Buscamos el usuario con ese email

    if not user: # Validamos si existe ese usuario o no
        return jsonify({"message":"Correo no existente"}), 404 
    
    token=create_access_token(identity = user.email) # Si existe creamos el token

    #Creamos un template de como será el correo enviado
    template_html = f""" 
    <html>
        <body>
            <h1>Resetea tu contraseña</h1>
            <p>Haz click en el siguente enlace para resetear tu contraseña</p>
            <a href="http://localhost:3000/resetPassword?token={token}">Resetea tu contraseña</a>
        </body>
    </html>
    """

    # Establecemos el asunto, quien lo envia, destinatario y el cuerpo del correo
    msg=Message(
        "Peticion de reseteo de contraseña",
        sender="noreply@exapmle.com",
        recipients=[user.email],
        html=template_html
    )

    mail.send(msg) # Mandamos el correo de reset de password
    return jsonify({"msg":"Email de reseteo enviado",
                    "token": token}), 200


# Endpoint de cambio de contraseña
@api.route('/reset-password', methods=['POST'])
@jwt_required()
def reset_password():
    user_mail = get_jwt_identity() # Recogemos el token del usuario que ha solicitado el cambio de contraseña
    password = request.json.get('password') # Recogemos la nueva contraseña 
    user = User.query.filter_by(email=user_mail).first() # Encontramos al usuario mediante el token

    # Comprobamos si existe el usuario
    if not user:
        return jsonify({"message":"No se encuentra el usuario"}), 404

    # Si existe hacemos la peticion de que se actualice el campo password de ese usuario con la nueva contraseña
    user.password = bcrypt.generate_password_hash(password).decode('utf-8')
    db.session.commit()

    return jsonify({"message":"La contraseña ha sido actualizada"}), 200


# Endpoint Get platforms
@api.route('/platforms', methods=['GET'])
def get_platforms():

    # Creamos las variables para los platforms de la tabla Platforms
    platforms=Platforms.query.all()
    all_platforms = [platforms.serialize() for platforms in platforms]

    # Retornamos todos los platforms de la tabla Platforms
    return jsonify(all_platforms), 200


# Endpoint Get get_tags
@api.route('/tags', methods=['GET'])
def get_tags():

    # Creamos las variables para los tags de la tabla Tags
    tags=Tags.query.all()
    all_tags = [tags.serialize() for tags in tags]

    # Retornamos todos los tags de la tabla Tags
    return jsonify(all_tags), 200


# Endpoint Get developers
@api.route('/developers', methods=['GET'])
def get_developers():

    # Creamos las variables para los developers de la tabla Developers
    developers=Developers.query.all()
    all_developers = [developers.serialize() for developers in developers]

    # Retornamos todos los developers de la tabla Developers
    return jsonify(all_developers), 200


# Endpoint Get videogame
@api.route('/videogame', methods=['GET'])
def get_videogame():

    # Creamos las variables para los videogame de la tabla Videogames
    videogame=Videogames.query.all()
    all_videogame = [videogame.serialize() for videogame in videogame]

    # Retornamos todos los videogame de la tabla Videogames
    return jsonify(all_videogame), 200