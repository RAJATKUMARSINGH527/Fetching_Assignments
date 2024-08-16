from rest_framework import generics,filters
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.pagination import PageNumberPagination
# Create your views here.

class CustomPagination(PageNumberPagination):
    page_size=2

class TodoListCreateView(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filter_backends=[filters.OrderingFilter]
    ordering_fields=['title']
    pagination_class=CustomPagination

class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


