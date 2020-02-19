from rest_framework import serializers

from api.models import (User, WMData,
                    Windmills)

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("url", "id", "score", "coins")
class WMDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WMData
        fields = ("url", "id", "user_id", "height", "starts", "lat", "long", "county")

class WindmillsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Windmills
        fields = ("url", "id", "speed", "height", "year")
