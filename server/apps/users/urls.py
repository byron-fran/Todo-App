from django.urls import path
from . import views    
from rest_framework import routers



urlpatterns = [
    
    path('profile/', views.Profile.as_view(), name='profile'),
    path('auth/register/', views.Register.as_view(), name='register'),
    path('auth/login/', views.Login.as_view(), name='login')
]
