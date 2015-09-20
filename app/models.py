from django.db import models
# try:
#     from django.contrib.auth import get_user_model
#     User = get_user_model()
# except ImportError:
#     
from django.contrib.auth.models import User

class WebUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    weights = models.CharField(max_length=200)

    def set_weights(self, x):
        self.foo = json.dumps(x)

    def get_weights(self, x):
        return json.loads(self.foo)