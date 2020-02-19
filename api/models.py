from django.db import models

# Create your models here.

class User(models.Model):
    score = models.IntegerField()
    coins = models.IntegerField()

    def __str__(self):
        return f'{self.pk}'

class Windmills(models.Model):
    user_id = models.ForeignKey('User', on_delete=models.CASCADE)
    height = models.IntegerField()
    starts = models.BooleanField(default=False)
    lat = models.CharField(max_length=30, default='')
    long = models.CharField(max_length=30, default='')
    county = models.CharField(max_length=30, default='')

    def __str__(self):
        return f'{self.pk}'

class WMData(models.Model):
    speed = models.CharField(max_length=30, default='')
    height = models.CharField(max_length=30, default='')
    year = models.CharField(max_length=30, default='')

    def __str__(self):
        return f'{self.pk}'
