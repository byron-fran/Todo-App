from rest_framework import serializers, viewsets
from .models import Task

class TaskSerealizer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Task
        fields = ['title', 'description', 'done', 'id']