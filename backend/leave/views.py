from rest_framework import status, viewsets, views
from rest_framework.response import Response

from .models import LeaveRequest
from .serializers import LeaveSerializer

class LeaveViewset(viewsets.ModelViewSet):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user_id')
        if user_id is not None:
            queryset = queryset.filter(user=user_id)
        return queryset
