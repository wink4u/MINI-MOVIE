from django.urls import path
from . import views

urlpatterns = [
    path('', views.movie_list),
    # path('save/', views.movie_save),
    path('<int:movie_pk>/', views.movie_detail, name='movie_detail'),
    path('like/<int:user_id>/', views.movie_liked),
    #영화댓글
    path('<int:movie_pk>/movieComment/', views.movie_comment),
    path('<int:movie_pk>/<int:id>/', views.movie_change_comment),
    path('<int:movie_pk>/like/', views.movie_like),
    path('movieComment/', views.movie_comments),
    #자유게시판
    path('board/', views.board_list),
    path('board/create/', views.board_create),
    path('board/<int:real_id>/', views.board_delete),
    path('comments/' , views.comments),
    path('<int:board_pk>/comment/', views.board_create_comment),
    path('board/<int:board_pk>/<int:id>/', views.board_change_comment),
]

