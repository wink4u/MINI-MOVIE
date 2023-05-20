from rest_framework import serializers
from .models import Movie, Genre, Board, Comment, BoardComment
from django.contrib.auth import get_user_model

class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
        
# movie Genre_id에 따라서 Genre를 불러오기위한 Serializer
class GenreSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Genre
        fields = ('name',)
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('pk', 'username',)
        
class BoardSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Board
        fields = '__all__'
        read_only_field = ('user',)
    
    # def create(self, validated_data):
    #     validated_data['user'] = self.context['request'].user
    #     return super().create(validated_data)

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
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
    
class BoardCommentSerializer(serializers.ModelSerializer):
    comment_board = BoardSerializer(read_only=True)
    write_comment_user = UserSerializer(read_only=True)
    
    class Meta:
        model = BoardComment
        fields = '__all__'
        read_only_field = ('write_comment_user','comment_board',)
