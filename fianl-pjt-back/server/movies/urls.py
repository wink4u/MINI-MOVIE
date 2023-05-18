from django.urls import path
from . import views

urlpatterns = [
    path('', views.movie_article),
    path('save/', views.movie_save),
    path('detail/', views.movie_detail),
]

