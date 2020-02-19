from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
                    UserViewset, WindmillsViewset,
                    WMDataViewset, Game_WMill_AssetViewset
                    )

# wire up the views with urls
router = DefaultRouter()
router.register(r"users", UserViewset, basename='User')
router.register(r"windmills", WindmillsViewset, basename='Windmills')
router.register(r"wmdatas", WMDataViewset, basename='WMData')
router.register(r"wmillasset", Game_WMill_AssetViewset, basename='Game_WMill')

urlpatterns = [
    path("", include(router.urls)),
]
