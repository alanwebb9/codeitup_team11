from django.shortcuts import render
from rest_framework import viewsets

from api.models import (User, WMData,
                    Windmills, Game_WMill_Asset)
from api.serializer import (UserSerializer,
                        WMDataSerializer,
                        WindmillSerializer,
                        Game_WMill_AssetSerializer)

# Create your views here.
class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class WMDataViewset(viewsets.ModelViewSet):
    queryset = WMData.objects.all()
    serializer_class = WMDataSerializer

class WindmillsViewset(viewsets.ModelViewSet):
    queryset = Windmills.objects.all()
    serializer_class = WindmillSerializer

class Game_WMill_AssetViewset(viewsets.ModelViewSet):
    queryset = Game_WMill_Asset.objects.all()
    serializer_class = Game_WMill_AssetSerializer
