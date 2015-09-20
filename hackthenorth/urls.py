from django.conf.urls import patterns, include, url
from django.contrib import admin
from app.views import index, get_nearby, foodordrink, favourites, set_favorite, get_favourites

urlpatterns = patterns('',

    url(r'^admin/', include(admin.site.urls)),

    url(r'^get_nearby/(-?[0-9]*\.?[0-9]*)/(-?[0-9]*\.?[0-9]*)/$', "app.views.get_nearby", name="get_nearby"),
    url(r'^set_favorite/', "app.views.set_favorite"),
    url(r'^favourites/', "app.views.favourites"),
    url(r'^foodordrink/', "app.views.foodordrink"),
    url(r'^home/', "app.views.home"),
    url(r'^favourites/', "app.views.favourites"),
    url(r'^get_favourites/', "app.views.get_favourites"),
    url(r'^.*', "app.views.index"),
)
