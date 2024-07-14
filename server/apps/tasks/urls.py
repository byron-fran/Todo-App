from django.urls import path, include
from . import views
from rest_framework import routers




urlpatterns = [
    path('tasks/',views.Tasks.as_view(), name='tasks' ),
    path('tasks/<str:pk>/', views.TaskDetail.as_view(), name='task'),
    path('favorites/<str:id>/', views.change_status_favorite, name='favorites'),
    path('done/<str:id>/', views.change_status_done, name='done')
]
