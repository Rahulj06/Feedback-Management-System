from django.shortcuts import render

# Create your views here.
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from core.models import feedback
from core.serializers import feedbackserializer
from rest_framework.decorators import api_view
from rest_framework import permissions

permission_classes = [permissions.AllowAny]

@api_view(['GET', 'POST', 'DELETE'])
def core_list(request):

    if request.method == 'GET':
        feedbacks = feedback.objects.order_by('-feed_time')
        feed = request.GET.get('feed', None)
        if feed is not None:
            feedbacks = feedbacks.filter(feed__icontains=feed)
        
        feedbacks_serializer = feedbackserializer(feedbacks, many=True)
        return JsonResponse(feedbacks_serializer.data, safe=False)

    elif request.method == 'POST':
        feedback_data = JSONParser().parse(request)
        feedback_serializer = feedbackserializer(data=feedback_data)
        if feedback_serializer.is_valid():
            feedback_serializer.save()
            return JsonResponse(feedback_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(feedback_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = feedback.objects.all().delete()
        return JsonResponse({'message': '{} feedbacks were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def core_detail(request, pk):
    try: 
        feedbacks = feedback.objects.get(pk=pk) 
    except feedback.DoesNotExist: 
        return JsonResponse({'message': 'The feed does not exist'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET': 
        feedback_serializer = feedbackserializer(feedbacks) 
        return JsonResponse(feedback_serializer.data)
    elif request.method == 'PUT': 
        feed_data = JSONParser().parse(request) 
        feedback_serializer = feedbackserializer(feedbacks, data=feed_data) 
        if feedback_serializer.is_valid(): 
            feedback_serializer.save() 
            return JsonResponse(feedback_serializer.data) 
        return JsonResponse(feedback_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE': 
        feedback.delete() 
        return JsonResponse({'message': 'feedback was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT) 
    
        
@api_view(['GET'])
def core_list_tag(request):
    feed = feedback.objects.filter(tag=True)
        
    if request.method == 'GET': 
        feedback_serializer = feedbackserializer(feed, many=True)
        return JsonResponse(feedback_serializer.data, safe=False)