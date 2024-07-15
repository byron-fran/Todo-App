from django.forms import ValidationError
from django.http import HttpRequest
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
from rest_framework.decorators import permission_classes,authentication_classes,api_view

# Create your views here.
class TasksView(APIView):
    
    permission_classes = [IsAuthenticated]
    authentication_classes = [ TokenAuthentication]
    
    def get(self , request : HttpRequest, format=None):
        tasks = Task.objects.filter(user=request.user)
        serializer = TaskSerealizer(tasks, many=True)
        
        q = request.GET.get('q')
        if q is not None:
            tasks_filters = Task.objects.search_tasks(q)
            serializer_filters = TaskSerealizer(tasks_filters, many=True)
            return Response(serializer_filters.data, status=status.HTTP_200_OK)
        
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

 # 
@permission_classes(IsAuthenticated)
@authentication_classes(TokenAuthentication)
@api_view(['PUT'])
def change_status_favorite(request, id : str):
    try:
         task = Task.objects.get(id=id)
    except Task.DoesNotExist:
         return Response({'message': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
    except ValidationError:
         return Response({'message': 'Invalid ID format'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
         return Response({'message': f'An unexpected error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if task.is_favorite:
        task.is_favorite = False
        task.save()
        return Response({'message': 'It was removed from favorites'}, status=status.HTTP_200_OK)
    else:
        task.is_favorite = True
        task.save()
        return Response({'message': 'Added to favorites'}, status=status.HTTP_200_OK)
  
@permission_classes(IsAuthenticated)
@authentication_classes(TokenAuthentication)
@api_view(['PUT'])
def change_status_done(request, id : str):
    try:
         task = Task.objects.get(id=id)
    except Task.DoesNotExist:
         return Response({'message': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
    except ValidationError:
         return Response({'message': 'Invalid ID format'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
         return Response({'message': f'An unexpected error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
     
    if task.done:
        task.done = False
        task.save()
        return Response({'message': 'Task pending'}, status=status.HTTP_200_OK)
    else:
        task.done = True
        task.save()
        return Response({'message': 'Task done'}, status=status.HTTP_200_OK)