from rest_framework import serializers
from core.models import feedback

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