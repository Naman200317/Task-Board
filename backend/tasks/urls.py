from django.urls import path
from .views import add_task, list_tasks, complete_task, delete_task

urlpatterns = [
    path('tasks/', list_tasks),
    path('tasks/add/', add_task),
    path('tasks/<int:task_id>/complete/', complete_task),
    path('tasks/<int:task_id>/delete/', delete_task),
]
