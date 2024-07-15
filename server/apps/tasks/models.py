from django.db import models
import uuid
from users.models import User
from .managers import TaskManager
# Create your models here.
class Task(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable = False )
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=2000)
    done = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks', null=True)
    is_favorite = models.BooleanField(default=False)
    objects = TaskManager()
    
    def __str__(self):
        return f'{self.title} '
    
    class Meta:
        pass
        