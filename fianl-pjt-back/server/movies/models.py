from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=50)

class Movie(models.Model):
    adult = models.BooleanField(blank=True)
    backdrop_path = models.CharField(max_length=200, blank=True)
    genre_ids = models.ManyToManyField(Genre)
    id = models.IntegerField(primary_key=True)
    original_language = models.CharField(max_length=200, blank=True)
    original_title = models.CharField(max_length=100, blank=True)
    overview = models.CharField(max_length=200, blank=True)
    popularity = models.FloatField(blank=True)
    poster_path = models.CharField(max_length=200, blank=True)
    release_date = models.DateField(blank=True)
    title = models.CharField(max_length=200, blank=True)
    video = models.BooleanField(blank=True)
    vote_average = models.FloatField(blank=True)
    vote_count = models.IntegerField(blank=True)
