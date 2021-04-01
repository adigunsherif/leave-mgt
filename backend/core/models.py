import jwt
from datetime import datetime, timedelta
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.conf import settings


class MyUserManager(BaseUserManager):
    def create_user(self, staff_id, first_name, last_name, password=None, **kwargs):
        if not staff_id:
            raise ValueError('Users must have a staff ID')

        user = self.model(
            staff_id=staff_id,
            first_name=first_name,
            last_name=last_name,
            **kwargs
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, staff_id, first_name, last_name, password=None):
        user = self.create_user(
            staff_id,
            first_name=first_name,
            last_name=last_name,
            password=password,
        )
        user.is_superuser = True
        user.save(using=self._db)
        return user



class User(AbstractBaseUser):
    staff_id = models.CharField(max_length=10, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    leave_balance = models.IntegerField(default=35)

    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    is_superuser = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'staff_id'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return f'{self.last_name} {self.first_name}'

    @property
    def token(self):
        return self._generate_jwt_token()

    def _generate_jwt_token(self):
        """
        Generates a JSON Web Token that stores this user's ID and has an expiry
        date set to 60 minutes into the future.
        """
        dt = datetime.now() + timedelta(minutes=60)

        token = jwt.encode({
            'id': self.pk,
            #'exp': int(dt)
        }, settings.SECRET_KEY, algorithm="HS256")

        return token