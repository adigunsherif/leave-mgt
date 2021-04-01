# Generated by Django 3.1.4 on 2021-03-31 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leave', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leaverequest',
            name='date_approved',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='leaverequest',
            name='date_posted',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='leaverequest',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('rejected', 'Rejected'), ('approved', 'Approved')], default='pending', max_length=20),
        ),
    ]