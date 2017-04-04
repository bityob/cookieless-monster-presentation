from rest_framework import serializers
from finger.models import UserData


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ("username", "details")
