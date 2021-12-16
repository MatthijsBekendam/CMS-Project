from selenium import webdriver
from articles.models import *
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.urls import reverse

class TestHomePage(StaticLiveServerTestCase):
    def test_foo(self):
        self.assertEqual(0, 1)
