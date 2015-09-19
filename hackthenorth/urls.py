from django.conf.urls import patterns, include, url
from django.contrib import admin
from app.views import index, get_nearby

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'hackthenorth.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^get_nearby/(-?[0-9]*\.?[0-9]*)/(-?[0-9]*\.?[0-9]*)/$', "app.views.get_nearby", name="get_nearby"),
    # First leg of the authentication journey...
    # url(r'^.*', "app.views.index"),
)
