from django.shortcuts import render
from difflib import SequenceMatcher
# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from finger.models import UserData
from finger.serializer import UserDataSerializer
import json

MASTER_KEY = "kinglavi"


def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()


class UserDataView(viewsets.ModelViewSet):
    serializer_class = UserDataSerializer
    queryset = UserData.objects.all()


# @api_view(['GET'])
@api_view(['POST'])
def find_username_from_details(request):
    body = json.loads(request.body)
    # return Response(str(request.body))

    # user_hash = request.query_params.get('hash')
    user_hash = body.get('hash')
    # details = request.query_params.get('details')
    details = body.get('details')
    try:
        user = UserData.objects.get(user_hash=user_hash)
        return Response({"user_hash" : user.user_hash, "username": user.username})
    except Exception as e:
        pass
    max_percent = 0.0
    result = None
    for user in UserData.objects.all():
        temp_percent = similar(user.details, details)
        if temp_percent > max_percent and temp_percent > 0.8:
            result = user
    if result:
        return Response({"user_hash" : user.user_hash, "username": user.username})
    else:
        return Response("Can not find a proper match.")

@api_view(['GET'])
def find_allusers(request):
    try:
        users = {}
        for user in UserData.objects.all():
            users[user.user_hash] = user.username
        return Response(users)
    except Exception as e:
        return Response(str(e))
    
