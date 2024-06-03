from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication,SessionAuthentication
from rest_framework.response import Response
from .serealizers import UserSerealizer
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.http import request
from .models import User
from rest_framework import status
from django.shortcuts import get_object_or_404
# Create your views here.

class Profile(APIView):
    
    permission_classes = [IsAuthenticated]
    authentication_classes = [ TokenAuthentication]
    
    def get(self, request, format=None):
        user = request.user
        serializer = UserSerealizer(user)
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                'user': serializer.data,
                'token': token.key
            },
            status=status.HTTP_200_OK
        )
    
class Register(APIView):
    
    def post(self, request, format=None):
        serializer = UserSerealizer(data=request.data)
        
        if serializer.is_valid():
            
            serializer.save()
            user = User.objects.get(email=serializer.data['email'])
            token, created = Token.objects.get_or_create(user=user)
        
            return Response(
                data =
                    {
                    'user' : serializer.data, 
                    'token'  : token.key
                    }, 
                    status=status.HTTP_201_CREATED
                )
            
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):

    def post(self, request, format=None):
        
        email = request.data.get('email')
        password = request.data.get('password')

        if email is None or password is None:
            return Response({'message': 'email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            
            user = User.objects.get(email=email)
            
        except User.DoesNotExist:
            
            return Response({'message': 'Email or password incorrect'}, status=status.HTTP_404_NOT_FOUND)

        if not user.check_password(password):
            return Response({'message': 'invalid password'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerealizer(instance=user)
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                'user': serializer.data,
                'token': token.key
            },
            status=status.HTTP_200_OK
        )