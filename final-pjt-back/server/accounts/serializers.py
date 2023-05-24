from rest_framework import serializers
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = get_user_model()
        fields = ('id', 'username',)

class UserGetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = get_user_model()
        fields = ('id' , 'username', 'profile', 'region', 'sex', 'followings', 'email', 'imgId',)

class FollowSerializer(serializers.ModelSerializer):

    followings = UserSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'followings',)
