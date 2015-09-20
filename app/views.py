from django.contrib.auth import authenticate, login, logout as django_logout
from django.contrib.auth import get_user_model
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response
from django.conf import settings
from django.core.urlresolvers import reverse
from django.http import JsonResponse
from django.contrib.auth.models import User
from models import WebUser, Favorite

import logging
import rauth
import json
from classifier import best_match
from datetime import datetime
User = get_user_model()

# Create your views here.
logger = logging.getLogger(__name__)

def index(request):
    return render_to_response('yelp/yelp_api.html')

def foodordrink(request):
    return render_to_response('yelp/foodordrink.html')

def home(request):
    return render_to_response('yelp/home.html')

def set_favorite(request):
    user = WebUser.objects.get(id=1)
    fav = Favorite.objects.create(user_id=1,rating=1.0, distance=0)
    fav.user = user.user
    fav.name = request.POST.get("name", "Caspers resto")
    fav.img_url = request.POST.get("image_url", "qq.jpg")
    fav.rating = request.POST.get("rating", "3.0")
    fav.categories = request.POST.get("categories", "taiwanese")
    fav.distance = request.POST.get("distance", 0)
    fav.save()
    return HttpResponse('')

def favourites(request):
    return render_to_response('yelp/favourites.html')

def get_favourites(request):
    favs = WebUser.objects.get(id=1).user.favorite_set.all()
    restos = []
    for fav in favs:
        dict = {}
        dict["rating"] = float(fav.rating)
        dict["name"] = fav.name
        dict["image_url"] = fav.img_url
        restos.append(dict)
    return JsonResponse(restos, safe=False)



def get_meal():
    time = datetime.time(datetime.now())
    hour = time.hour - 4
    if( hour < 11 ) and (hour >= 6):
        return "breakfast"
    elif (hour >= 11 and hour < 12):
        return "brunch"
    elif (hour >= 12 and hour <= 14):
        return "lunch"
    elif (hour > 14 and hour < 17):
        return "afternoon tea"
    elif (hour >= 17 and hour <=20):
        return "dinner"
    elif (hour > 20 or hour < 6):
        return "snack"


def get_nearby(request, lat, lon):

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
    params["cl"] = lat + "," + lon
    params["sort"] = 2
    params["limit"]= 20
    print (json.dumps(params))
    request = session.get("http://api.yelp.com/v2/search/",params=params)    
    #Transforms the JSON API response into a Python dictionary
    data = request.json()
    best_data = best_match(data["businesses"], lon, lat)

    session.close()
    
    return JsonResponse(best_data, safe=False)
