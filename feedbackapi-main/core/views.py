from django.http import response
from django.shortcuts import render

# Create your views here.
from django.http.response import JsonResponse
from django.core.paginator import Paginator
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from core.models import feedback,comments
from core.serializers import feedbackserializer,commentserializer
from rest_framework.decorators import api_view
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination as pg

from core.producer import pushmsg
#pushmsg( feedback,feedback.id)

permission_classes = [permissions.AllowAny]
@api_view(['GET', 'POST', 'DELETE'])
def core_list(request):

    if request.method == 'GET':
        feedbacks = feedback.objects.order_by('-feed_time')
        feed = request.GET.get('feed', None)
        tag = request.GET.get('tag',None)
        size = request.GET.get('size',10)
        page_number = request.GET.get('page',1)

        if feed is not None:
            feedbacks = feedbacks.filter(feed__icontains=feed)
            if tag is not None:
                feedbacks = feedbacks.filter(tag=tag)
        
        #feedbacks_serializer = feedbackserializer(feedbacks, many=True)

        paginator = Paginator(feedbacks, size)
        page_obj = paginator.get_page(page_number)
        feedbacks_serializer = [feedbackserializer(feed).data for feed in page_obj]
        return JsonResponse(feedbacks_serializer,safe=False)

    elif request.method == 'POST':
        feedback_data = JSONParser().parse(request)
        feedback_serializer = feedbackserializer(data=feedback_data)
        if feedback_serializer.is_valid():
            feedback_serializer.save()
            pushmsg(feedback_serializer.data['feed'],feedback_serializer.data['id'])
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
            pushmsg(feedback_serializer.data['feed'],feedback_serializer.data['id'])
            return JsonResponse(feedback_serializer.data) 
        return JsonResponse(feedback_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        feedbacks.delete()
        return JsonResponse({'message': 'feedback was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    


@api_view(['GET', 'POST', 'DELETE'])
def core_list(request):

    if request.method == 'GET':
        feedbacks = feedback.objects.order_by('-feed_time')
        feed = request.GET.get('feed', None)
        tag = request.GET.get('tag',None)
        size = request.GET.get('size',999999999999999999999999)
        page_number = request.GET.get('page',0)

        if feed is not None:
            feedbacks = feedbacks.filter(feed__icontains=feed)
            if tag is not None:
                feedbacks = feedbacks.filter(tag=tag)
        
        #feedbacks_serializer = feedbackserializer(feedbacks, many=True)

        paginator = Paginator(feedbacks, size)
        page_obj = paginator.get_page(page_number)
        feedbacks_serializer = [feedbackserializer(feed).data for feed in page_obj]
        return JsonResponse(feedbacks_serializer,safe=False)

    elif request.method == 'POST':
        feedback_data = JSONParser().parse(request)
        feedback_serializer = feedbackserializer(data=feedback_data)
        if feedback_serializer.is_valid():
            feedback_serializer.save()
            pushmsg(feedback_serializer.data['feed'],feedback_serializer.data['id'])
            return JsonResponse(feedback_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(feedback_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = feedback.objects.all().delete()
        return JsonResponse({'message': '{} feedbacks were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def comment_list(request):
    feed_id = request.GET.get('feed_id',None)
    try:
        feedbacks = feedback.objects.get(pk=feed_id)
    except feedback.DoesNotExist:
        return JsonResponse({'message': 'The feed does not exist'}, status=status.HTTP_404_NOT_FOUND)

    comment = comments.objects.filter(feed_id=feed_id).order_by('comment_time')

    if request.method == 'GET':
        comment_serializer = commentserializer(comment, many=True)
        return JsonResponse(comment_serializer.data, safe=False)

    elif request.method == 'POST':
        comment_data = JSONParser().parse(request)
        comment_serializer = commentserializer(data=comment_data) 
        if comment_serializer.is_valid():
            comment_serializer.save()
            return JsonResponse(comment_serializer.data)
        return JsonResponse(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def comment_detail(request,pk):
    try: 
        comment = comments.objects.get(pk=pk)
    except comments.DoesNotExist:
        return JsonResponse({'message': 'The comment does not exist'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET': 
        comment_serializer = commentserializer(comment)
        return JsonResponse(comment_serializer.data)
    elif request.method == 'PUT': 
        com_data = JSONParser().parse(request) 
        comment_serializer = commentserializer(comment, data=com_data) 
        if comment_serializer.is_valid(): 
            comment_serializer.save() 
            return JsonResponse(comment_serializer.data) 
        return JsonResponse(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        comment.delete()
        return JsonResponse({'message': 'comment was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
