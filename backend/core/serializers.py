from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    class Meta:
        model = User
        fields = ('id', 'staff_id', 'first_name', 'last_name', 'leave_balance', 'password')

    def create(self, validated_data):
        """
        Create and return a new `User` instance, given the validated data.
        """
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user



class LoginSerializer(serializers.Serializer):
    staff_id = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(read_only=True)
    is_superuser = serializers.BooleanField(read_only=True)
    uid = serializers.IntegerField(read_only=True)

    def validate(self, data):
        staff_id = data.get('staff_id', None)
        password = data.get('password', None)

        if staff_id is None:
            raise serializers.ValidationError(
                'Staff ID is required to log in.'
            )

        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )

        user = authenticate(username=staff_id, password=password)

        if user is None:
            raise serializers.ValidationError(
                'A user with this staff_id and password was not found.'
            )

        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated.'
            )

        return {
            'staff_id': user.staff_id,
            'token': user.token,
            'is_superuser': user.is_superuser,
            'uid': user.id
        }
