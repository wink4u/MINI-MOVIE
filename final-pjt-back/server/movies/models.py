from django.db import models
from django.conf import settings

class Genre(models.Model):
    name = models.CharField(max_length=50)

class Movie(models.Model):
    adult = models.BooleanField(blank=True)
    # backdrop_path = models.CharField(max_length=200, blank=True)
    genre_ids = models.ManyToManyField(Genre, related_name = 'movie')
    movie_id = models.IntegerField()
    # original_language = models.CharField(max_length=200, blank=True)
    # original_title = models.CharField(max_length=100, blank=True)
    overview = models.CharField(max_length=200, blank=True)
    # popularity = models.FloatField(blank=True)
    poster_path = models.CharField(max_length=200, blank=True)
    release_date = models.CharField(max_length=200, blank=True)
    title = models.CharField(max_length=200, blank=True)
    # video = models.BooleanField(blank=True)
    vote_average = models.FloatField(blank=True)
    # vote_count = models.IntegerField(blank=True)

    like_movie_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_movies', blank=True)
    register_manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)



class Board(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at =   models.DateTimeField(auto_now=True)

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class BoardComment(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    comment_board = models.ForeignKey(Board, on_delete=models.CASCADE)
    write_comment_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) 
    # write_review_board = models.ForeignKey(Board , on_delete=models.CASCADE, null=True, blank=True)
    # like_review_users = models.ManyToManyField(settings.AUTH_USER_MODEL)

