from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), nullable=False)
    email = db.Column(db.String(500), unique=True, nullable=False)
    password = db.Column(db.String(500), nullable=False)
    creation_date = db.Column(db.String(500), nullable=False)


    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(500), nullable=False, unique=True)
    description = db.Column(db.String(500))
    birth_date = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    user = db.relationship('User')


    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "user_id": self.user_id,
            "id": self.id,
            "username": self.username,
            "description": self.description,
            "birth_date": self.birth_date,
            # do not serialize the password, its a security breach
        }
    

class Genres(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    image = db.Column(db.String(50000))


    def __repr__(self):
        return f'<Genre {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image": self.image,
        }


class Videogames(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500), nullable=False)
    image = db.Column(db.String(500000), nullable=False)
    api_id = db.Column(db.Integer)

    def __repr__(self):
        return f'<Videogame {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "image": self.image,
            "api_id": self.api_id
        }
    

class FavoritesVideogames(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    videogame_id = db.Column(db.Integer, db.ForeignKey(Videogames.id), nullable=False)
    user = db.relationship('User')
    videogame = db.relationship('Videogames')


    def __repr__(self):
        return f'<Favorite {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "videogame_id": self.videogame_id,
        } 
 

class FavoritesGenres(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    genre_id = db.Column(db.Integer, db.ForeignKey(Genres.id), nullable=False)
    user = db.relationship('User')
    genre = db.relationship('Genres')


    def __repr__(self):
        return f'<Favorite {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "genre_id": self.videogame_id,
        }   


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    like = db.Column(db.Integer)
    image = image = db.Column(db.String(50000))
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    user = db.relationship('User')


    def __repr__(self):
        return f'<Post {self.text}>'

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "like": self.like,
            "image": self.image,
            "user_id": self.user_id,
            "comment_id": self.comment_id,
        }
    

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    user = db.relationship('User')
    post_id = db.Column(db.Integer, db.ForeignKey(Post.id))
    



    def __repr__(self):
        return f'<Comment {self.text}>'

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "user_id": self.user_id,
        } 