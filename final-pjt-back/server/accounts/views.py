from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import UserSerializer, UserGetSerializer, FollowSerializer
from rest_framework.permissions import IsAuthenticated
from .models import User
from rest_framework import status
# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userinfo(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def profile(request, user_id):
    user = get_object_or_404(User, id=user_id)
    if request.method == 'PUT':
        serializer = UserGetSerializer(instance=user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            serializer = UserGetSerializer(user)
            return Response(serializer.data)
    if request.method == 'GET':
        serializer = UserGetSerializer(instance=user)
        return Response(serializer.data)
    
# 회원탈퇴
@api_view(['POST'])
@permission_classes([IsAuthenticated]) # 인증된 사용자만 권한 허용
def user_delete(request):
    request.user.delete()
    data = {
            'content': f'{request.user}님의 탈퇴처리가 완료되었습니다.',
        }
    return Response(data, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def follow(request, each_id):
    follow_user = get_object_or_404(User, pk=each_id)
    user = request.user
    if follow_user != user:
        if follow_user.followings.filter(pk=each_id).exists():
            follow_user.followings.remove(user)
            follow = '팔로우' 
        else:
            follow_user.followings.add(user)
            follow = '언팔로우'

        serializer = FollowSerializer(follow_user)

        follow_status = {
            'follow' : follow,
            'count' : follow_user.followings.count(), 
            'follow_list' : serializer.data.get('followings'),
            'following_count' : follow_user.followers.count(),
            
        }
        return JsonResponse(follow_status)
        # return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)