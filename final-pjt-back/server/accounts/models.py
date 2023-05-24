from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    email = models.CharField(max_length=30, blank=True)
    sex = models.CharField(max_length=20, blank=True)
    region = models.CharField(max_length=100,blank=True)
    profile =  models.CharField(max_length=200, null=True, blank=True)
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers', blank=True)
    imgId = models.IntegerField(null=True, blank=True)