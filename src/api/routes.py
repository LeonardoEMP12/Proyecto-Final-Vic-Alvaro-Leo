"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from datetime import datetime
from api.models import db, User, Profile, Genres, FavoritesGenres, Videogames, Post, Comments, Profile, FavoritesVideogames
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt 
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta
from flask_mail import Mail, Message
import random


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

    # Datos del perfil
    username = random.randint(0, 1000000000000000000000000000000000000000000000000000000000000)
    description = "pon aqui la descripcion de tu perfil"  # Recogemos la descripción del perfil

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

    # Ahora creamos el perfil asociado al usuario recién creado
    profile_add = Profile(username = username, description=description, user_id=usuario_add.id)
    db.session.add(profile_add)  # Añadimos el perfil a la base de datos
    db.session.commit()  # Confirmamos la transacción para guardar el perfil

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
    return jsonify({"message":all_genres}), 200


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
# -------------------------------ENDPOINTS PERFIL------------------------------- #

# Endpoint para actualizar el username del perfil
@api.route('/profile/<int:profile_id>/username', methods=['PUT'])
def update_username(profile_id):
    data = request.json
    profile = Profile.query.get(profile_id)

    if not profile:
        return jsonify({"error": "Perfil no encontrado"}), 404

    if 'username' not in data:
        return jsonify({"error": "El campo 'username' es obligatorio"}), 400

    profile.username = data['username']

    try:
        db.session.commit()
        return jsonify(profile.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al actualizar el username", "details": str(e)}), 500


# Endpoint para actualizar la description del perfil
@api.route('/profile/<int:profile_id>/description', methods=['PUT'])
def update_description(profile_id):
    data = request.json
    profile = Profile.query.get(profile_id)

    if not profile:
        return jsonify({"error": "Perfil no encontrado"}), 404

    if 'description' not in data:
        return jsonify({"error": "El campo 'description' es obligatorio"}), 400

    profile.description = data['description']

    try:
        db.session.commit()
        return jsonify(profile.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al actualizar la descripción", "details": str(e)}), 500


# Endpoint para actualizar el birth_date del perfil
@api.route('/profile/<int:profile_id>/birth_date', methods=['PUT'])
def update_birth_date(profile_id):
    data = request.json
    profile = Profile.query.get(profile_id)

    if not profile:
        return jsonify({"error": "Perfil no encontrado"}), 404

    if 'birth_date' not in data:
        return jsonify({"error": "El campo 'birth_date' es obligatorio"}), 400

    profile.birth_date = data['birth_date']  # Almacena directamente como string

    try:
        db.session.commit()
        return jsonify(profile.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al actualizar la fecha de nacimiento", "details": str(e)}), 500



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
            <a href="https://congenial-train-wr97pxj7gvvph6j9-3000.app.github.dev/newpassword?token={token}">Resetea tu contraseña</a>
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


# Endpoint Get videogame
@api.route('/videogame', methods=['GET'])
def get_videogame():

    # Creamos las variables para los videogame de la tabla Videogames
    videogames=Videogames.query.all()
    all_videogame = [videogame.serialize() for videogame in videogames]

    # Retornamos todos los videogame de la tabla Videogames
    return jsonify({"message":all_videogame}), 200


# -------------------------------ENDPOINTS PUBLICACIONES------------------------------- #

# Crear un post
@api.route('/create-posts', methods=['POST'])
def create_post():
    # Obtenemos los datos de la solicitud (en formato JSON)
    request_body = request.get_json()
    image = request_body.get('image') # Recogemos el campo text del request_body
    text = request_body.get('text') # Recogemos el campo text del request_body
    user_id = request_body.get('user_id') # Recogemos el campo user_id del request_body
    like = request_body.get('like') # Recogemos el campo like del request_body

    # Validamos que los datos necesarios estén presentes
    if not text or not user_id:
        return jsonify({"message": "Rellena todos los datos"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "el usuario no existe"}), 400

    # Creamos un nuevo objeto Post con los datos recibidos
    new_post = Post(text = text, like = like, user_id = user_id, image = image)
    
    # Guardamos el nuevo post en la base de datos
    db.session.add(new_post)
    db.session.commit()

    # Retornamos la respuesta con los datos de la nueva publicación
    return jsonify({"message" : "Post creado"}), 200

# Crear un comentario
@api.route('/create-comment', methods=['POST'])
def create_comment():
    request_body = request.get_json()
    text = request_body.get('text') # Recogemos el campo text del request_body
    post_id = request_body.get('post_id') # Recogemos el campo post_id del request_body
    user_id = request_body.get('user_id') # Recogemos el campo user_id del request_body

    if not text or not user_id or not post_id:
        return jsonify({"message": "Rellena todos los datos"}), 400
    
    user = User.query.get(user_id) # Buscamos dentro de la tabla user si hay ya un usuario que contenga los mismos datos
    post = Post.query.get(post_id) # Buscamos dentro de la tabla user si hay ya un usuario que contenga los mismos datos

    if not user:
        return jsonify({"message": "el usuario no existe"}), 400
    
    if not post:
        return jsonify({"message": "el post no existe"}), 400

    # Creamos un nuevo objeto Post con los datos recibidos
    new_comment = Comments(text = text, post_id = post_id, user_id = user_id)
    
    # Guardamos el nuevo post en la base de datos
    db.session.add(new_comment)
    db.session.commit()

    # Retornamos la respuesta con los datos de la nueva publicación
    return jsonify({"message" : "Post creado"}), 200

# Get de los post
@api.route('/posts', methods=['GET'])
def get_all_posts():

    posts = Post.query.all() # Obtenemos todos los datos de la tabla de Post
    all_posts = [] # Creamos un array para almacenar los datos de los posts

    for post in posts:
        post_user = User.query.get(post.user_id) # Obtenemos los datos del usuario que creó la publicación
        post_profile = Profile.query.filter_by(user_id=post.user_id).first()  # Obtenemos el perfil del usuario

        comments = Comments.query.filter_by( post_id = post.id).all() # Obtener los comentarios asociados a la publicación

        comments_data = [] # Serializar los datos de los comentarios
        for comment in comments:
            comment_user = User.query.get(comment.user_id) # Obtener el usuario que hizo el comentario
            comment_profile = Profile.query.filter_by(user_id=comment.user_id).first()  # Obtener el perfil del comentario

            
            # Agregar el comentario con los datos del usuario
            comments_data.append({
                "comment_text": comment.text,
                "comment_user": comment_user.serialize() if comment_user else None,
                "username": comment_profile.username if comment_profile else None  # Usamos el username del perfil
            })
        
        # Serializar los datos de la publicación
        post_data = {
            "post_text": post.text,
            "post_image": post.image,
            "post_user": {
                "id": post_user.id,
                "username": post_profile.username if post_profile else None  # Usamos el username del perfil
            },  # Datos del usuario que hizo la publicación
            "comments": comments_data  # Lista de comentarios con los usuarios
        }
        # Agregar la publicación con los datos completos a la lista
        all_posts.append(post_data)

    return jsonify({"message" : all_posts}), 200


# Delete de publicaciones
@api.route('/delete-posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get(post_id) # Buscamos el post segun su Id

    if not post: # Si no existe devolvemos error
        return jsonify({"message" : "post no encontrado"}), 400
    
    comments = Comments.query.filter_by(post_id = post_id).all() # Recorremos todos los comentarios que tiene el post y los eliminamos
    for comment in comments:
        db.session.delete(comment)

    db.session.delete(post) # Eliminamos el post
    db.session.commit()

    return jsonify({"message" : "Se ha borrado el post"}), 200


# Delete de comentarios
@api.route('/delete-comment/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id): 
    comment = Comments.query.get(comment_id) # Buscamos el comentario segun su Id

    if not comment: # Si no existe devolvemos error
        return jsonify({"message" : "comentario no encontrado"}), 400

    db.session.delete(comment) # Eliminamos el comentario
    db.session.commit()

    return jsonify({"message" : "Se ha borrado el comentario"}), 200


# Editar post
@api.route('/update-post/<int:post_id>', methods=['POST'])
def update_post(post_id):
    request_body = request.get_json()
    text = request_body.get('text') # Recogemos el campo text del request_body
    like = request_body.get('like') # Recogemos el campo like del request_body
    
    post = Post.query.get(post_id) # Buscamos el post segun su Id

    if not post: # Si no existe devolvemos error
        return jsonify({"message" : "post no encontrado"}), 400

    if text: # Si el body trae un texto reemplazamos el original
        post.text = text

    if like: # Si el body trae un numero de likes reemplazamos el original
        post.like = like

    db.session.commit() # Actualizamos la base de datos

    return jsonify({"message" : "Se ha editado el post"}), 200


# Editar comentario
@api.route('/update-comment/<int:comment_id>', methods=['POST'])
def update_comment(comment_id):
    request_body = request.get_json()
    text = request_body.get('text') # Recogemos el campo text del request_body
    
    comment = Comments.query.get(comment_id) # Buscamos el comentario segun su Id

    if not comment: # Si no existe devolvemos error
        return jsonify({"message" : "comentario no encontrado"}), 400

    if text: # Si el body trae un texto reemplazamos el original
        comment.text = text


    db.session.commit() # Actualizamos la base de datos

    return jsonify({"message" : "Se ha editado el comentario"}), 200


# Endpoint añadir Videojuegos a favoritos
@api.route('/register-games', methods=['POST'])
def register_games():

    request_body = request.json # Recogemos los datos del body mandado  
    user_id = request_body.get('user_id') # Recogemos el user_id del request_body
    videogame_id = request_body.get('videogame_id') # Recogemos el videogame_id del request_body

    if not user_id or not videogame_id:
        return jsonify({"message": "No se ha podido añadir a favoritos"}), 400
    
    videogames = FavoritesVideogames.query.filter_by(user_id = user_id, videogame_id = videogame_id).first()

    if videogames:
        return jsonify({"message": "Ya está en favoritos"}), 400
    
    videogames__add = FavoritesVideogames(user_id = user_id, videogame_id = videogame_id)

    db.session.add(videogames__add) # Realizamos la insercion
    db.session.commit() # Actualizamos la base de datos

    return jsonify({"message": "Se ha añadido a favoritos"}), 200

























# ------------------------------- ENDPOINTS INSERCCIONES A LA BASE DE DATOS ------------------------------- #


# Insertar Generos
@api.route('/insertar-generos', methods=['POST'])
def insert_genres():
    datos = request.json # Recogemos los datos del body mandado  

    if not datos:
        return jsonify({"message":"Faltan datos"}), 400
    
    registros = [] # Creamos un array que recogera todos los datos de la request

    for registro in datos:
        if 'name' not in registro or 'description' not in registro or 'image' not in registro:
            return jsonify({"error": "Cada registro debe tener 'name', 'image' y 'description'"}), 400
         
        nuevo_registro = Genres(name=registro['name'], description=registro['description'], image=registro['image'])
        registros.append(nuevo_registro)
        
    db.session.add_all(registros)
    db.session.commit()

    return jsonify({"message": "Se han añadido todos los registros"}), 200


# Insertar Videojuegos
@api.route('/insertar-videogames', methods=['POST'])
def insert_videogames():
    datos = request.json # Recogemos los datos del body mandado  

    if not datos:
        return jsonify({"message":"Faltan datos"}), 400
    
    registros = [] # Creamos un array que recogera todos los datos de la request

    for registro in datos:
        if 'title' not in registro or 'image' not in registro:
            return jsonify({"error": "Cada registro debe tener 'title'"}), 400
         
        nuevo_registro = Videogames(title=registro['title'], image=registro['image'])
        registros.append(nuevo_registro)
        
    db.session.add_all(registros)
    db.session.commit()

    return jsonify({"message": "Se han añadido todos los registros"}), 200