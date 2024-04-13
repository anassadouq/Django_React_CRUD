from django.db import models

# Create your models here.
class React(models.Model):
    id = models.AutoField(primary_key=True)
    employee = models.CharField(max_length=30)
    department = models.CharField(max_length=200)