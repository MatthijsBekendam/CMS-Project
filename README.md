# CMS project

- Constructed using Python 3.10.

INSTALL INSTRUCTIONS

- Python requirements can be installed via "pip install -r requirements.txt"
- Npm version 8.1.2 used. Cd into alteza_django_project/frontend folder and run
  "npm install" to install node dependencies.

- in same folder run "npm start" to serve front-end
- alteza_django_project/backend run "python manage.py migrate"
- in alteza_django_project/backend run "python manage.py runserver"

- go to http://localhost:3000/ to view articles.
- go to http://localhost:3000/users to view user page.

TEST INSTRUCTIONS

- test can be ran by going to "alteza_django_project/backend" and running "python manage.py test articles" 
  or run "python manage.py test authentication"


- functional test can by ran by going to "alteza_django_project/backend" and running "python manage.py test
  functional_tests"
  NOTE : for the functional test a MacOS chromedriver using chrome version 96 is used. If you have a different operating
  system / chrome version than you need to replace the current driver in the functional_tests folder.
  "https://chromedriver.chromium.org/downloads" 
