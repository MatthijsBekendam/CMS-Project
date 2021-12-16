from django.test import TestCase
from django.urls import reverse
from ..models import Article, ArticleComments
from rest_framework.test import APIClient

HTTP_200_OK = 200
HTTP_201_CREATED = 201
HTTP_406_NOT_ACCEPTABLE = 406
HTTP_306_RESERVED = 306


class TestView(TestCase):
    """tests for the the article views"""

    def setUp(self) -> None:
        self.client = APIClient()
        self.article_url = reverse('articles')
        self.comment_url = reverse('comment')

    def test_article_GET(self):
        """tests article GET request"""

        Article.objects.create(title="Test Article",
                               description="this is a test article")

        response = self.client.get(self.article_url)
        self.assertEqual(response.status_code, HTTP_200_OK)

    def test_article_POST_adds_new_article(self):
        """tests article POST request"""

        response = self.client.post(self.article_url,
                                    {
                                        "title": "New Test Article",
                                        "description": "Test Description",

                                    })

        self.assertEqual(response.status_code, HTTP_201_CREATED)
        self.assertEqual(Article.objects.first().title, 'New Test Article')

    def test_article_POST_adds_no_data(self):
        """tests article POST request when no data is submitted"""

        response = self.client.post(self.article_url,
                                    {
                                        "title": "",
                                        "description": "",
                                    })

        self.assertEqual(response.status_code, HTTP_406_NOT_ACCEPTABLE)

    def test_article_POST_article_duplicate(self):
        """tests article POST request when index already exists"""

        Article.objects.create(title="test_duplicate",
                               description="test_duplicate")
        response = self.client.post(self.article_url,
                                    {
                                        "id": "1",
                                        "title": "test_duplicate",
                                        "description": "test_duplicate",
                                    })

        self.assertEqual(response.status_code, HTTP_306_RESERVED)

    def test_article_PUT_article(self):
        """tests article PUT request"""

        Article.objects.create(title="test_duplicate",
                               description="test_duplicate")
        response = self.client.put(self.article_url,
                                   {
                                       "id": "1",
                                       "title": "test_duplicate2",
                                       "description": "test_duplicate2",
                                   })

        self.assertEqual(response.status_code, HTTP_200_OK)

    def test_article_DELETE_article(self):
        """tests article PUT request"""

        Article.objects.create(title="test_duplicate",
                               description="test_duplicate")
        response = self.client.delete(self.article_url, format="json", data={"source":
            {
                "id": "1",
                "title": "test_duplicate",
                "description": "test_duplicate",
            }})

        self.assertEqual(response.status_code, HTTP_200_OK)

    def test_comment_GET(self):
        """tests comments GET request"""
        Article.objects.create(title="Test Article",
                               description="this is a test article")
        query_article = Article.objects.first()

        ArticleComments.objects.create(comment="My test comment",
                                       user="Matthijs",
                                       article=query_article)

        response = self.client.get(self.comment_url)
        self.assertEqual(response.status_code, HTTP_200_OK)
