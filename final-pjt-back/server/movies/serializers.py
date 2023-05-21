from rest_framework import serializers
from .models import Movie, Genre, Board, Comment, BoardComment
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('pk', 'username',)

class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
        
# movie Genre_id에 따라서 Genre를 불러오기위한 Serializer
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('name',)
    
#자유게시판 글
class BoardSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Board
        fields = '__all__'
        read_only_field = ('user',)

# 영화 댓글
class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class MovieSerializer(serializers.ModelSerializer):
        class Meta:
            model = Movie
            fields = ('id', 'title')
    movie = MovieSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ("movie", 'user',)
        

class MovieDetailSerializer(serializers.ModelSerializer):
    genre_ids = GenreSerializer(many=True, read_only=True)
    comment_set = CommentSerializer(many=True)
    class Meta:
        model = Movie
        fields = '__all__'
    
# 자유게시판 글의 댓글
class BoardCommentSerializer(serializers.ModelSerializer):
    comment_board = BoardSerializer(read_only=True)
    write_comment_user = UserSerializer(read_only=True)
    
    class Meta:
        model = BoardComment
        fields = '__all__'
        read_only_field = ('write_comment_user','comment_board',)

# 영화 좋아요 등록 및 해제
class MovieLikeSerialzer(serializers.ModelSerializer):
    like_movie_users = UserSerializer(many=True, read_only=True)
    
    class Meta:
        model = Movie
        # 영화 id, 좋아요를 한 사용자 목록, 좋아요 수
        fields = ('id','like_movie_users', )