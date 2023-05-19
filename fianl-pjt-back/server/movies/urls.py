from django.urls import path
from . import views

urlpatterns = [
    path('', views.movie_list),
    # path('save/', views.movie_save),
    path('<int:movie_pk>/', views.movie_detail, name='movie_detail'),
    path('board/', views.board_list),
    path('board/create/', views.board_create)
]

