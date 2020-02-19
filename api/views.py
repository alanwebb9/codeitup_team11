from django.shortcuts import render
from rest_framework import viewsets

from api.models import (User, WMData,
                    Windmills)
from api.serializer import (UserSerializer,
                        WMDataSerializer,
                        WindmillSerializer)

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
