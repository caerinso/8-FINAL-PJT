from rest_framework import serializers
from .models import Movie, Actor, Genre, Comment


class MovieListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    like_users_count = serializers.IntegerField(source='like_users.count', read_only=True)

    class Meta:
        model = Movie
        fields = ('id', 'title', 'release_date', 'popularity', 'vote_average', 'poster_path', 'genres', 'like_users', 'like_users_count', 'username')


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('movie',)

class MovieSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    comment_set = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.IntegerField(source='comment_set.count', read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'
        read_only_fields = ('user', 'actor', 'genre',)

class GenreSerializer(serializers.ModelSerializer):
    movie_set = MovieSerializer(many=True, read_only=True)

    class Meta:
        model = Genre
        fields = '__all__'

class ActorSerializer(serializers.ModelSerializer):
    movie_set = MovieSerializer(many=True, read_only=True)

    class Meta:
        model = Actor
        fields = '__all__'