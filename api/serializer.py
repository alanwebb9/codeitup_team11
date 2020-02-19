from rest_framework import serializers

from api.models import (User, WMData,
                    Windmills)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "score", "coins")

class WindmillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Windmills
        fields = ("id", "user_id", "height", "starts", "lat", "long", "county")

class WMDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WMData
        fields = ("id", "speed", "height", "year")
