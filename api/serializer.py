from rest_framework import serializers

from api.models import (User, WMData,
                    Windmills, Game_WMill_Asset)

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

class Game_WMill_AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game_WMill_Asset
        fields = ("county_id", "county_name", "WMill_Height", "WMill_Speed", "WMill_Power", "WMill_Coins")
