from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userinfo(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)