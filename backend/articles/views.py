from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from .serializers import ArticleSerializer
from .models import Article
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist


# class ArticleView(viewsets.ModelViewSet):
#     serializer_class = ArticleSerializer
#     queryset = Article.objects.all()


class ArticleView(APIView):
    serializer_class = ArticleSerializer

    def get(self, format=None):
        queryset = Article.objects.all()
        if len(queryset) > 0:
            serializer = ArticleSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"Bad Request:", "No Articles Found!"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            title = serializer.data.get('title')
            description = serializer.data.get('description')
            query_if_already_exists = Article.objects.filter(title=title)
            if query_if_already_exists.exists():
                return Response({"message:", "Article already exists in database!"},
                                status=status.HTTP_306_RESERVED)
            else:
                Article.objects.create(title=title, description=description)
                return Response({"message:", "Article Created!"}, status=status.HTTP_201_CREATED)

        return Response({f'Serializer not valid': f'{serializer.errors}'}, status=status.HTTP_400_BAD_REQUEST)


class EditArticleView(APIView):
    serializer_class = ArticleSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            title = serializer.data.get('title')
            description = serializer.data.get('description')
            id = request.data.get('id')
            query_if_exists = Article.objects.filter(id=id)
            if query_if_exists.exists():
                object_to_update = query_if_exists[0]
                object_to_update.title = title
                object_to_update.description = description
                object_to_update.save()
                return Response({"message:", "Article Edited!"}, status=status.HTTP_200_OK)

            else:
                return Response({"message:", "Article Not Found!"}, status=status.HTTP_404_NOT_FOUND)
        print(serializer.errors)
        return Response({f'Serializer not valid': f'{serializer.errors}'}, status=status.HTTP_400_BAD_REQUEST)
