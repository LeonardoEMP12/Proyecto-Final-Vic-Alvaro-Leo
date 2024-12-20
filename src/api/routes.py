"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Genres
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt 
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


api = Blueprint('api', __name__)
bcrypt = Bcrypt() 

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


# Endpoint Get categorias
@api.route('/genres', methods=['GET'])
def get_genres():

    # Creamos las variables para los personajes de la tabla Personajes
    genre=Genres.query.all()
    all_genres = [genres.serialize() for genres in genre]

    # Retornamos todos los personajes de la tabla Personajes
    return jsonify(all_genres), 200
