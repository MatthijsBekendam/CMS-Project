from django.db import models


class Article(models.Model):
    """
    Model containing all articles.

    title (str) : the title of the product
    description (str) : the description of the product

    """
    title = models.CharField(max_length=60)
    description = models.TextField(max_length=120)

    def _str_(self):
        return self.title


class ArticleComments(models.Model):
    """
      Model containing all comments.

      comment (str) : comment writen for a specific product
      article (int) : the many-to-one index holder
      user (str) : the specific user posting the comment


      """
    comment = models.TextField(max_length=120)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    user = models.CharField(max_length=60, default="")
