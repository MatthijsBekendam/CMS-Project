from selenium import webdriver
from articles.models import *
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.urls import reverse
import time


class TestHomePage(StaticLiveServerTestCase):
    def setUp(self) -> None:
        self.browser = webdriver.Chrome('functional_tests/chromedriver_mac_96', port=3000)

    def tearDown(self) -> None:
        self.browser.close()

    def test_add_article_button_is_displayed(self):
        self.browser.get(self.live_server_url)
        time.sleep(20)
