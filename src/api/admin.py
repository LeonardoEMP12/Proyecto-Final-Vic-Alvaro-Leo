  
import os
from flask_admin import Admin
from .models import db, User, Videogames, FavoritesVideogames, Developers, Genres, FavoritesGenres, Platforms, Tags, Comments, Post, Profile
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    class userAdmin(ModelView):
        column_display_pk = True
        list_display = ("id", "name", "text")
    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(userAdmin(User, db.session))
    admin.add_view(userAdmin(Profile, db.session))
    admin.add_view(userAdmin(Videogames, db.session))
    admin.add_view(userAdmin(FavoritesVideogames, db.session))
    admin.add_view(userAdmin(Developers, db.session))
    admin.add_view(userAdmin(Genres, db.session))
    admin.add_view(userAdmin(FavoritesGenres, db.session))
    admin.add_view(userAdmin(Platforms, db.session))
    admin.add_view(userAdmin(Tags, db.session))
    admin.add_view(userAdmin(Comments, db.session))
    admin.add_view(userAdmin(Post, db.session))
    
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))