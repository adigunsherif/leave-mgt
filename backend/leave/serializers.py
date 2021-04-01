from django.db.models import F
from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import LeaveRequest

class LeaveSerializer(serializers.ModelSerializer):
    fullname = serializers.CharField(read_only=True)
    class Meta:
        model = LeaveRequest
        fields = ('id', 'user', 'type_of_leave', 'start_date','end_date', 'resumption_date', 'status', 'initial_balance', 'after_balance', 'date_approved', 'fullname')

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['user'] = instance.user.staff_id
        ret['fullname'] = instance.user.__str__()
        ret['type_of_leave'] = instance.get_type_of_leave_display()
        ret['status'] = instance.get_status_display()
        return ret

    def difference(self, date1, date2):
        return abs(date2-date1).days

    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        
        if start_date is not None and end_date is not None:
            diff = self.difference(start_date, end_date)
            user = data['user']
            if user.leave_balance < diff:
                raise serializers.ValidationError("Requested leave duration is more than your leave balance.")
            if  diff > 14:
                raise serializers.ValidationError("Annnual leave of more than 14 working days at a stretch not allowed.")

        return data

    def create(self, validated_data):
        start_date = validated_data.get('start_date')
        end_date = validated_data.get('end_date')
        diff = self.difference(start_date, end_date)

        user = validated_data.get('user')
        balance = user.leave_balance
        user.leave_balance = F('leave_balance') - diff
        user.save()

        obj = LeaveRequest.objects.create(
            **validated_data,
            initial_balance=balance,
            after_balance= balance - diff
        )
        return obj