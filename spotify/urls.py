from django.urls import path, include
from .views import AuthURL, IsAuthenticated, spotify_callback, IsAuthenticated, \
    CurrentSong, SkipSong

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated',  IsAuthenticated.as_view()),
    path('current-song',  CurrentSong.as_view()),
    path('skip',  SkipSong.as_view()),
]