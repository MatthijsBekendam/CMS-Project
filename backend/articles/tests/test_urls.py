from django.test import SimpleTestCase
from django.urls import reverse, resolve
from ..views import ArticleView, ArticleCommentView, DeleteArticle, EditArticleView


class TestUrls(SimpleTestCase):
    """Test if url resolves correct view"""

    def test_articles_url_is_resolved(self):
        """test if articles url resolves to article create/view_all view"""

        url = reverse('articles')
        self.assertEqual(resolve(url).func.view_class, ArticleView)

    def test_edit_articles_url_is_resolved(self):
        """test if edit articles url resolves to edit article view"""

        url = reverse('edit')
        self.assertEqual(resolve(url).func.view_class, EditArticleView)

    def test_delete_articles_url_is_resolved(self):
        """test if delete articles url resolves to delete article view"""

        url = reverse('delete')
        self.assertEqual(resolve(url).func.view_class, DeleteArticle)

    def test_comments_articles_url_is_resolved(self):
        """test if comment on articles url resolves to comment article view"""

        url = reverse('comment')
        self.assertEqual(resolve(url).func.view_class, ArticleCommentView)



