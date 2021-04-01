# Generated by Django 3.1.4 on 2021-03-30 15:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='LeaveRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_of_leave', models.CharField(choices=[('sick_leave', 'Sick Leave'), ('exam_leave', 'Exam Leave'), ('annual_leave', 'Annual Leave'), ('compassionate_leave', 'Compassionate Leave')], max_length=100)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('resumption_date', models.DateField()),
                ('date_posted', models.DateTimeField()),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('rejected', 'Rejected'), ('approved', 'Approved')], max_length=20)),
                ('initial_balance', models.IntegerField(blank=True)),
                ('after_balance', models.IntegerField(blank=True)),
                ('date_approved', models.DateTimeField(blank=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
