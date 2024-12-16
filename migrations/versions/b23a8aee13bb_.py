"""empty message

Revision ID: b23a8aee13bb
Revises: 082728e64b00
Create Date: 2024-12-16 18:09:27.296581

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b23a8aee13bb'
down_revision = '082728e64b00'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('videogames',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=500), nullable=False),
    sa.Column('image', sa.String(length=500), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(length=500), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('developers',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=500), nullable=False),
    sa.Column('videogame_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['videogame_id'], ['videogames.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorites_videogames',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('videogame_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['videogame_id'], ['videogames.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=500), nullable=False),
    sa.Column('pegi', sa.String(length=500), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.Column('videogame_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['videogame_id'], ['videogames.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('platforms',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=500), nullable=False),
    sa.Column('videogame_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['videogame_id'], ['videogames.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=500), nullable=False),
    sa.Column('videogame_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['videogame_id'], ['videogames.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorites_genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('genre_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['genre_id'], ['genres.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('post',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(length=500), nullable=False),
    sa.Column('like', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('comment_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['comment_id'], ['comments.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(length=500), nullable=False))
        batch_op.add_column(sa.Column('birth_date', sa.Date(), nullable=False))
        batch_op.add_column(sa.Column('creation_date', sa.TIMESTAMP(), nullable=False))
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=500),
               existing_nullable=False)
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=500),
               existing_nullable=False)
        batch_op.create_unique_constraint(None, ['username'])
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.alter_column('password',
               existing_type=sa.String(length=500),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)
        batch_op.alter_column('email',
               existing_type=sa.String(length=500),
               type_=sa.VARCHAR(length=120),
               existing_nullable=False)
        batch_op.drop_column('creation_date')
        batch_op.drop_column('birth_date')
        batch_op.drop_column('username')

    op.drop_table('post')
    op.drop_table('favorites_genres')
    op.drop_table('tags')
    op.drop_table('platforms')
    op.drop_table('genres')
    op.drop_table('favorites_videogames')
    op.drop_table('developers')
    op.drop_table('comments')
    op.drop_table('videogames')
    # ### end Alembic commands ###
