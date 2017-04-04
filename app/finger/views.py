from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from finger.models import UserData
from finger.serializer import UserDataSerializer

MASTER_KEY = "kinglavi"

class UserDataView(viewsets.ModelViewSet):
    serializer_class = UserDataSerializer
    queryset = UserData.objects.all()

    def create(self, request, *args, **kwargs):
        # print "lalalalal"
        # request.data['user_hash'] = "lalalal"
        return super(UserDataView, self).create(request, *args, **kwargs)

