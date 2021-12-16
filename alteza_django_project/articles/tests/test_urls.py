from django.test import SimpleTestCase
from django.urls import reverse, resolve
from ..views import ArticleView, ArticleCommentView


class TestUrls(SimpleTestCase):
    """Test if url resolves correct view"""

    def test_articles_url_is_resolved(self):
        """test if articles url resolves to article post/get/put/delete view"""

        url = reverse('articles')
        self.assertEqual(resolve(url).func.view_class, ArticleView)

    def test_comments_articles_url_is_resolved(self):
        """test if comment on articles url resolves to comment article view"""

        url = reverse('comment')
        self.assertEqual(resolve(url).func.view_class, ArticleCommentView)



