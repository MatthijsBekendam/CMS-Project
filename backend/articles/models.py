from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=60)
    description = models.TextField(max_length=120)

    def _str_(self):
        return self.title


class ArticleComments(models.Model):
    comment = models.TextField(max_length=120)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    user = models.CharField(max_length=60, default="")
