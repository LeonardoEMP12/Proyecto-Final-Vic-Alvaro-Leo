from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), unique=True, nullable=False)
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
    username = db.Column(db.String(500), unique=True, nullable=False)
    description = db.Column(db.String(500), unique=True, nullable=False)
    birth_date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    user = db.relationship('User')


    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "description": self.description,
            "birth_date": self.birth_date,
            # do not serialize the password, its a security breach
        }


class Videogames(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500), nullable=False)
    image = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)


    def __repr__(self):
        return f'<Videogame {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "image": self.image,
            "rating": self.rating,
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


class Developers(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(500), nullable=False)
    videogame_id = db.Column(db.Integer, db.ForeignKey(Videogames.id), nullable=False)
    videogame = db.relationship('Videogames')


    def __repr__(self):
        return f'<Developer {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "videogame_id": self.videogame_id,
        } 


class Genres(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), nullable=False)
    pegi = db.Column(db.String(500), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    videogame_id = db.Column(db.Integer, db.ForeignKey(Videogames.id))
    videogame = db.relationship('Videogames')



    def __repr__(self):
        return f'<Genre {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "pegi": self.pegi,
            "description": self.description,
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


class Platforms(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(500), nullable=False)
    videogame_id = db.Column(db.Integer, db.ForeignKey(Videogames.id), nullable=False)
    videogame = db.relationship('Videogames')


    def __repr__(self):
        return f'<Platform {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "videogame_id": self.videogame_id,
        }         


class Tags(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500), nullable=False)
    videogame_id = db.Column(db.Integer, db.ForeignKey(Videogames.id), nullable=False)
    videogame = db.relationship('Videogames')


    def __repr__(self):
        return f'<Tag {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "videogame_id": self.videogame_id,
        } 


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    user = db.relationship('User')


    def __repr__(self):
        return f'<Comment {self.text}>'

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "user_id": self.user_id,
        }  


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    like = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey(Comments.id), nullable=False)
    user = db.relationship('User')
    comment = db.relationship('Comments')


    def __repr__(self):
        return f'<Post {self.text}>'

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "like": self.like,
            "user_id": self.user_id,
            "comment_id": self.comment_id,
        }