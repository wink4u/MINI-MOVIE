from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import MovieListSerializer, MovieDetailSerializer, BoardSerializer
from .serializers import BoardCommentSerializer, CommentSerializer
from accounts.serializers import UserSerializer
from .models import Movie, Board, BoardComment, Comment
import json

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