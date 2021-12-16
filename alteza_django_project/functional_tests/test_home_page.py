from selenium import webdriver
from articles.models import *
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium.webdriver.common.by import By

ID_ADD_PRODUCT_BUTTON = "add-product-button"


class TestHomePage(StaticLiveServerTestCase):
    def setUp(self) -> None:
        self.browser = webdriver.Chrome('functional_tests/chromedriver_mac_96')

    def tearDown(self) -> None:
        self.browser.close()

    def test_add_article_button_is_displayed(self):
        self.browser.get('http://localhost:3000/home')
        alert = self.browser.find_element(By.ID, ID_ADD_PRODUCT_BUTTON)
        self.assertEqual("ADD PRODUCT", alert.text)
