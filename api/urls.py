from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
                    UserViewset, WindmillsViewset,
                    WMDataViewset
                    )

# wire up the views with urls
router = DefaultRouter()
router.register(r"users", UserViewset, basename='User')
router.register(r"windmills", WindmillsViewset, basename='Windmills')
router.register(r"wmdatas", WMDataViewset, basename='WMData')

urlpatterns = [
    path("", include(router.urls)),
]
