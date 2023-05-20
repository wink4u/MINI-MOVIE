from django.urls import path
from . import views

urlpatterns = [
    path('', views.movie_list),
    # path('save/', views.movie_save),
    path('<int:movie_pk>/', views.movie_detail, name='movie_detail'),
    path('board/', views.board_list),
    path('board/create/', views.board_create),
    path('comments/' , views.comments),
    path('<int:board_pk>/comment/', views.board_create_comment),
    path('<int:board_pk>/<int:id>/', views.board_change_comment),
]

