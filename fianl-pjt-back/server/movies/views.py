from django.shortcuts import render, get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import MovieListSerializer, MovieDetailSerializer
from. models import Movie
import json
@api_view(['POST'])
def movie_save(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        movie = Movie(**data)
        print(movie)
        movie.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)

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