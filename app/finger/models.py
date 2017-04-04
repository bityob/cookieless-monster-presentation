from django.db import models


# Create your models here.


class UserData(models.Model):
    username = models.CharField(max_length=500)
    details = models.CharField(max_length=5000)
    user_hash = models.CharField(max_length=1000)
