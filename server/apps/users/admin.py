from django.contrib import admin
from .models import User    


# Register your models here.
class UserAdmin (admin.ModelAdmin):
    readonly_fields = ['password']
    list_display = ['username', 'email']

admin.site.register(User, UserAdmin)