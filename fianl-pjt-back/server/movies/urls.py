from django.urls import path
from . import views

urlpatterns = [
    path('', views.movie_article),
    path('detail/', views.movie_detail),
]

