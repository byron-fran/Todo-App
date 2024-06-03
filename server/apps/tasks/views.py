from django.shortcuts import render
from .serealizers import TaskSerealizer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Task
from django.shortcuts import get_object_or_404

# Create your views here.
class Tasks(APIView):
    
    permission_classes = [IsAuthenticated]
    authentication_classes = [ TokenAuthentication]
    
    def get(self, request, format=None):
        tasks = Task.objects.filter(user=request.user)
        serializer = TaskSerealizer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
     
        task = Task.objects.create(
            user=request.user,
            title = request.data['title'],
            description = request.data['description']
        )
        task.save()
        serializer = TaskSerealizer(task)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
class TaskDetail(APIView):
    
    permission_classes = [IsAuthenticated]
    authentication_classes = [ TokenAuthentication]
    
    def get (self, request, pk,  format=None):
        
        try:
            
            task = get_object_or_404(Task, pk=pk, user=request.user)
            serializer = TaskSerealizer(task)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except:
            return Response({'message': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
        
    
    def put(self, request, pk,  format=None):
    
        try:
            
            task = get_object_or_404(Task, pk=pk, user=request.user)
            serializer = TaskSerealizer(task, request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return  Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except:
            return Response({'message': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
        
        
    def delete(self, request, pk, format=None):
        
        try:
            
            task = get_object_or_404(Task, pk=pk, user=request.user)
            task.delete()   
            return Response(status=status.HTTP_204_NO_CONTENT)

        except:
            return Response({'message': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)