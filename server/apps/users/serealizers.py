from .models import User
from rest_framework import serializers

class UserSerealizer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'id']
        
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    def create(self, validated_data):
        user = User( username=validated_data['username'],email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user