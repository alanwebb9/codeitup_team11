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

class Game_WMill_Asset(models.Model):
    county_id = models.IntegerField()
    county_name = models.CharField(max_length=50, default='')
    WMill_Height = models.IntegerField()
    WMill_Speed = models.CharField(max_length=50, default='')
    WMill_Power = models.IntegerField()
    WMill_Coins = models.IntegerField()

    def __str__(self):
        return f'{self.county_id}'
