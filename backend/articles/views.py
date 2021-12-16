from .serializers import ArticleSerializer, CommentSerializer
from .models import Article, ArticleComments
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class ArticleView(APIView):
    """
    Process GET/POST request for the Article model.
    """
    serializer_class = ArticleSerializer

    def get(self, format=None):
        """Returns all objects within the Article model"""
        queryset = Article.objects.all()
        if len(queryset) > 0:
            serializer = ArticleSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"Bad Request:", "No Articles Found!"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        """Create new objects for the Article model"""
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
    """
    Process POST request for the Article model.
    """

    serializer_class = ArticleSerializer

    def post(self, request, format=None):
        """Edit an object within the Article model."""
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

        return Response({f'Serializer not valid': f'{serializer.errors}'}, status=status.HTTP_400_BAD_REQUEST)


class ArticleCommentView(APIView):
    """
    Process GET/POST request for the Comments model.
    """
    serializer_class = CommentSerializer

    def get(self, format=None):
        """Returns all objects within the Comments model"""
        queryset = ArticleComments.objects.all()
        if len(queryset) > 0:
            serializer = CommentSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"Bad Request:", "No Comments Found!"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        """Create new objects for the Comments model"""
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.data.get('user')
            comment = serializer.data.get('comment')
            id = request.data.get('id')
            query_article = Article.objects.get(id=id)

            ArticleComments.objects.create(user=user, comment=comment, article=query_article)
            return Response({"message:", "Article Created!"}, status=status.HTTP_201_CREATED)

        return Response({f'Serializer not valid': f'{serializer.errors}'}, status=status.HTTP_400_BAD_REQUEST)
