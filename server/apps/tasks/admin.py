from django.contrib import admin
from .models import Task
# Register your models here.

class TasksAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_favorite', 'done', 'user', 'id']
    list_filter = ['user', 'done', 'is_favorite']
    search_fields = ('title',)

admin.site.register(Task, TasksAdmin)