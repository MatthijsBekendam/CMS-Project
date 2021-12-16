from rest_framework import serializers
from .models import Article, ArticleComments


class ArticleSerializer(serializers.ModelSerializer):
    """serializes the Article model"""
    class Meta:
        model = Article
        fields = ('id', 'title', 'description')


class CommentSerializer(serializers.ModelSerializer):
    """serializes the Comments model"""

    class Meta:
        model = ArticleComments
        fields = ('comment', 'user','article')
