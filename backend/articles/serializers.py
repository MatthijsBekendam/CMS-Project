from rest_framework import serializers
from .models import Article, ArticleComments


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', 'description')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleComments
        fields = ('comment', 'user','article')
