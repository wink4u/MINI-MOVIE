from rest_framework import serializers
from .models import Movie, Genre, Board, Comment
from django.contrib.auth import get_user_model

User = get_user_model()

class MovieListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Movie
        fields = '__all__'
        

# movie Genre_id에 따라서 Genre를 불러오기위한 Serializer
class GenreSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Genre
        fields = ('name',)
        


class BoardSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username',)

    class Meta:
        model = Board
        fields = ('pk', 'title', 'content', 'updated_at', 'created_at',)

class CommentSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username',)
    
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep.pop("movie" , None)
        return rep

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ("movie",)
        

class MovieDetailSerializer(serializers.ModelSerializer):
    genre_ids = GenreSerializer(many=True, read_only=True)
    comment_set = CommentSerializer(many=True)
    class Meta:
        model = Movie
        fields = '__all__'