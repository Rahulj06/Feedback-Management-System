from rest_framework import serializers
from core.models import feedback
from core.models import comments

class feedbackserializer(serializers.ModelSerializer):

    class Meta:
        model = feedback
        fields = (
            'id',
            'email',
            'feed',
            'name',
            'phoneNo',
            'tag',
            'feed_time',
        )

class commentserializer(serializers.ModelSerializer):

    class Meta:
        model = comments
        fields = (
            'id',
            'feed_id',
            'comment',
            'comment_time',
        )