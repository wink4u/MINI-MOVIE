from django.db import models
from django.conf import settings
# Create your models here.

class Movie(models.Model):
    title = models.CharField(max-_length=100)
    content = models.TextField()