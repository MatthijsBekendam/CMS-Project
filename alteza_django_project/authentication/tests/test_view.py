from django.test import TestCase
from django.urls import reverse
from ..models import CustomUser
from rest_framework.test import APIClient

HTTP_200_OK = 200
HTTP_201_CREATED = 201
HTTP_406_NOT_ACCEPTABLE = 406
HTTP_306_RESERVED = 306


class TestView(TestCase):
    """tests for the the user view"""

    def setUp(self) -> None:
        self.client = APIClient()
        self.user_url = reverse('user')

    def test_custom_user_view_GET(self):
        """tests user GET request"""

        CustomUser.objects.create(username="Test User",
                                  email="email@email",
                                  password="secretpassword",
                                  role="Developer")

        response = self.client.get(self.user_url)
        self.assertEqual(response.status_code, HTTP_200_OK)

    def test_custom_user_view_POST(self):
        """tests user POST request"""

        response = self.client.post(self.user_url, {
            'username': "Test User",
            'email': "email@email.com",
            'password': "secretpassword",
            'role': "Developer"
        })
        self.assertEqual(response.status_code, HTTP_201_CREATED)
        self.assertEqual(CustomUser.objects.first().role, 'Developer')
