from datetime import datetime
from django.db import models
from django.conf import settings
from django.utils import timezone

class LeaveRequest(models.Model):
    TYPES = [
        ('sick_leave', 'Sick Leave'),
        ('exam_leave', 'Exam Leave'),
        ('annual_leave', 'Annual Leave'),
        ('compassionate_leave', 'Compassionate Leave'),
    ]
    STATUS = [
        ('pending', 'Pending'),
        ('rejected', 'Rejected'),
        ('approved', 'Approved'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    type_of_leave = models.CharField(max_length=100, choices=TYPES)
    start_date = models.DateField()
    end_date = models.DateField()
    resumption_date = models.DateField()
    date_posted = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS, default='pending')

    initial_balance = models.IntegerField(blank=True)
    after_balance = models.IntegerField(blank=True)
    date_approved = models.DateTimeField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.status is not 'pending':
            self.date_approved = timezone.now()
        super().save(*args, **kwargs)