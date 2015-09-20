from django.db import models
import json
   
from django.contrib.auth.models import User

class WebUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    weights = models.TextField()

    def set_weights(self, x):
        self.weights = json.dumps(x)

    def get_weights(self):
        vector = []
        vector = json.loads(self.weights)
        return vector

class Favorite(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=200)
    img_url = models.CharField(max_length=200)
    rating = models.CharField(max_length=200)
    distance = models.CharField(max_length=200)
    categories = models.CharField(max_length=200)
    def set_categories(self, x):
        self.categories= json.dumps(x)

    def get_categories(self):
        dict = {}
        dict = json.loads(self.categories)
        return dict