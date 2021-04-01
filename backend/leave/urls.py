from django.urls import path
from rest_framework import routers

from . import views

routes = routers.DefaultRouter()
routes.register('', views.LeaveViewset)

urlpatterns = routes.urls