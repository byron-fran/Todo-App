from django.db.models import Manager, Q

class TaskManager(Manager):
    def search_tasks(self, q : str):
        return self.filter(
            Q(title__icontains=q)|
            Q(description__icontains=q)
        )