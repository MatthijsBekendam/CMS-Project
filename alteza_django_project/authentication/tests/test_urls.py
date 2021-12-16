from django.test import SimpleTestCase
from django.urls import reverse, resolve
from ..views import CustomUserCreate


class TestUrls(SimpleTestCase):
    """Test if url resolves correct view"""

    def test_articles_url_is_resolved(self):
        """test if articles url resolves to article post/get/put/delete view"""

        url = reverse('user')
        self.assertEqual(resolve(url).func.view_class, CustomUserCreate)


