from django.urls import path
from rest_framework import routers

from . import views

routes = routers.DefaultRouter()
routes.register('', views.UserViewset)

urlpatterns = [
    path('login/', views.LoginAPIView.as_view()),
] + routes.urls