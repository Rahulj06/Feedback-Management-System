from django.db import models
from django.db.models.base import Model
from django.db.models.deletion import CASCADE
from django.utils.functional import empty

class feedback(models.Model):
    email = models.EmailField(unique=True)
    feed = models.TextField(default="")
    name = models.TextField(default="")
    phoneNo = models.CharField(max_length=12)
    tag = models.TextField(default="Happy")
    feed_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.feed

class comments(models.Model):
    feed_id = models.ForeignKey(feedback,on_delete=CASCADE)
    comment = models.TextField(default="")
    comment_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.comment
    
    
