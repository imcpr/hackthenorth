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
    return render_to_response('yelp/yelp_api.html')

def foodordrink(request):
    return render_to_response('yelp/foodordrink.html')

def home(request):
    return render_to_response('yelp/home.html')

def get_meal():
    time = datetime.time(datetime.now())
    if( time.hour < 11 ) and (time.hour >= 6):
        return "breakfast"
    elif (time.hour >= 11 and time.hour < 12):
        return "brunch"
    elif (time.hour >= 12 and time.hour <= 14):
        return "lunch"
    elif (time.hour > 14 and time.hour < 17):
        return "afternoon tea"
    elif (time.hour >= 17 and time.hour <=20):
        return "dinner"
    elif (time.hour > 20 or time.hour < 6):
        return "snack"


def get_nearby(request, lat, long):

    #Obtain these from Yelp's manage access page
    consumer_key = "F-Epqe-t3SqZI7oeHYChog"
    consumer_secret = "7Zm2GYFEUTxq-E2zSdLqx5DJ8SA"
    token = "Lh3NQGlLsKvCbrvpvrxgX7ixM7QmOKjU"
    token_secret = "6LtYsDJtaGBDzVDubdZQ5bamS5Y"
    
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
