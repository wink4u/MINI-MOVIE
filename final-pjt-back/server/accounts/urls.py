from django.urls import path
from . import views


app_name = 'accounts'
# 회원가입(POST) : auth/signup/
# 프로필 정보 조회 및 수정(GET/PUT) : auth/user
# 비밀번호 번형(POST) : auth/password/change/
# 비밀번호 찾기(POST) : auth/password/reset/
urlpatterns = [
    path('userinfo/', views.userinfo),
    path('profile/<int:user_id>/', views.profile),
    path('delete/', views.user_delete,),
    path('follow/' , views.follow),
    
]

