from django.contrib.auth import authenticate, login, logout as django_logout
from django.contrib.auth import get_user_model
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response
from django.conf import settings
from django.core.urlresolvers import reverse
from django.http import JsonResponse

import rauth
import json
from datetime import datetime
User = get_user_model()

# Create your views here.

def index(request):
    return HttpResponse("GottaYelp")

def get_meal():
    time = datetime.time(datetime.now())
    if( time.hour < 11 ) and (time.hour > 6):
        return "breakfast"
    elif (time.hour >= 11 and time.hour < 12):
        return "brunch"
    elif (time.hour >= 12 and time.hour <= 14):
        return "lunch"
    elif (time.hour > 14 and time.hour < 17):
        return "afternoon tea"
    elif (time.hour >= 17 and time.hour <=20):
        return "dinner"
    elif (time.hour > 20):
        return "snack"


def get_nearby(request, lat, long):

    #Obtain these from Yelp's manage access page
    consumer_key = "iSWa2hQ-Kv8MFPg1LcmOUQ"
    consumer_secret = "6_m9chXf0DD0ly3E496dGk-lRgA"
    token = "ACKdlyF_e3fqfHlO3gYQMMfz2oUiVBVQ"
    token_secret = "rDD-b06ViYvmgQ9KHAcERrAo-w8"
    
    session = rauth.OAuth1Session(
        consumer_key = consumer_key
        ,consumer_secret = consumer_secret
        ,access_token = token
        ,access_token_secret = token_secret)
        
    params = {}
    params["term"]=get_meal()
    params["location"]="Waterloo"
    params["cl"] = lat + "," + long
    params["limit"]= 3
    request = session.get("http://api.yelp.com/v2/search",params=params)    
    #Transforms the JSON API response into a Python dictionary
    data = request.json()
    session.close()
    
    return JsonResponse(data)
