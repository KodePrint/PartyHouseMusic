from django.urls import path, include
from .views import index

urlpatterns = [
    path('', index),
    path('join', index),
    path('create', index),
    path('room/<str:roomCode>', index),
    path('update/<str:roomCode>', index),
]