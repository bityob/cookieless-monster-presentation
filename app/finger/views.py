from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from finger.models import UserData
from finger.serializer import UserDataSerializer


class UserDataView(viewsets.ModelViewSet):
    serializer_class = UserDataSerializer
    queryset = UserData.objects.all()
