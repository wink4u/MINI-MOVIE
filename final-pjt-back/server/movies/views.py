from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import MovieListSerializer, MovieDetailSerializer, BoardSerializer
from .serializers import BoardCommentSerializer, CommentSerializer, MovieLikeSerialzer
from accounts.serializers import UserSerializer
from .models import Movie, Board, BoardComment, Comment
from django.http import JsonResponse
from rest_framework import permissions
# 전체 영화 조회
@api_view(['GET'])
def movie_list(request):
    if request.method == 'GET':
        movies = Movie.objects.all()
        serializer = MovieListSerializer(movies, many=True)
        return Response(serializer.data)

# 세부 영화 조회
@api_view(['GET'])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    
    if request.method == 'GET':
        serializer = MovieDetailSerializer(movie)
        return Response(serializer.data)
    

@api_view(['GET'])
def movie_comments(request):
    if request.method == 'GET':
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
def movie_comment(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if request.method == 'GET':
        comments = Comment.objects.filter(movie=movie)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        movie = get_object_or_404(Movie, pk=movie_pk)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, movie=movie)
            return Response(status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
def movie_change_comment(request, movie_pk, id):
    movie = get_object_or_404(Movie, pk=movie_pk)
    comment = get_object_or_404(Comment, pk=id, movie=movie)
    
    if request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)    
    
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def movie_like(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    user = request.user

    if movie.like_movie_users.filter(pk=user.pk).exists():
        # 현재 로그인한 사용자와 좋아요를 등록한 사용자가 동일한 경우에만 제거
        if user == movie.like_movie_users.get(pk=user.pk):
            movie.like_movie_users.remove(user)

    else:
        movie.like_movie_users.add(user)

    serializer = MovieLikeSerialzer(movie)

    like_movie_register = {
        'id' : serializer.data.get('id'),
        'like_movie_users_count' : movie.like_movie_users.count(),
        'like_movie_users' : serializer.data.get('like_movie_users'),
    }
    return JsonResponse(like_movie_register)



# 전체 자유게시판 목록 조회
@api_view(['GET'])
def board_list(request):
    if request.method == 'GET':
        boards = Board.objects.all()
        serializer = BoardSerializer(boards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# 자유게시판 글 작성
@api_view(['POST'])
def board_create(request):
    serializer = BoardSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def board_delete(request, real_id):
    board = Board(id=real_id)
    board.delete()
    return Response(status=status.HTTP_200_OK)

# 자유게시판 댓글 작성 , 게시판하나당 댓글
@api_view(['GET', 'POST'])
# @permission_classes([])
def board_create_comment(request, board_pk):
    board = get_object_or_404(Board, pk=board_pk)
    if request.method == 'POST':
        serializer = BoardCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(comment_board=board, write_comment_user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    if request.method == 'GET':
        comments = BoardComment.objects.filter(comment_board=board)
        serializer = BoardCommentSerializer(comments, many=True)
        return Response(serializer.data)
    
# 자유게시판 댓글 리스트
@api_view(['GET'])
def comments(request):
    if request.method == 'GET':
        comments = BoardComment.objects.all()
        serializer = BoardCommentSerializer(comments, many=True)
        return Response(serializer.data)

# 자유게시판 댓글 지우기
@api_view(['DELETE'])
def board_change_comment(request, board_pk, id):
    board = get_object_or_404(Board, pk=board_pk)
    comment = get_object_or_404(BoardComment, pk=id, comment_board=board)
    
    if request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET'])
def movie_liked(request, user_id):
    user = get_object_or_404(get_user_model(), pk=user_id)
    liked_movies = user.like_movies.all()
    serializer = MovieListSerializer(liked_movies, many=True)
    return Response(serializer.data)