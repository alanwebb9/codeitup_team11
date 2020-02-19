from django.shortcuts import render
from rest_framework import viewsets

from api.models import (User, WMData,
                    Windmills)
from api.serializer import (UserSerializer,
                        WMDataSerializer,
                        WindmillsSerializer)

# Create your views here.

class UserViewset(viewsets.ModelViewSet):
    models = User.objects.all()
    serializer_class = UserSerializer

class WMDataViewset(viewsets.ModelViewSet):
    models = WMData.objects.all()
    serializer_class = WMDataSerializer

class WindmillsViewset(viewsets.ModelViewSet):
    models = Windmills.objects.all()
    serializer_class = WindmillsSerializer
