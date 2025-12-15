from rest_framework.decorators import api_view
from rest_framework.response import Response

tasks = []
task_id_counter = 1

@api_view(['POST'])
def add_task(request):
    global task_id_counter

    task = {
        "id": task_id_counter,
        "title": request.data.get("title"),
        "completed": False
    }

    tasks.append(task)
    task_id_counter += 1

    return Response(task)

@api_view(['GET'])
def list_tasks(request):
    return Response(tasks)

@api_view(['PUT'])
def complete_task(request, task_id):
    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = True
            return Response(task)

    return Response({"error": "Task not found"}, status=404)

@api_view(['DELETE'])
def delete_task(request, task_id):
    global tasks
    tasks = [task for task in tasks if task["id"] != task_id]
    return Response({"message": "Task deleted"})

