# CMS project

- Constructed using Python 3.10 and Node.js version 16.13.1.

INSTALL INSTRUCTIONS


- Python requirements can be installed via "pip install -r requirements.txt"
- Cd into alteza_django_project/frontend folder and run
  "npm install" to install node dependencies.

- in same folder run "npm start" to serve front-end
- open new terminal and cd into "alteza_django_project" and run "python manage.py migrate"
- cd into "alteza_django_project" and run "python manage.py runserver"

- go to http://localhost:3000/ to view articles.
- go to http://localhost:3000/users to view user page.

TEST INSTRUCTIONS

- tests can be run by going to "alteza_django_project/" and running "python manage.py test articles" 
  or by running "python manage.py test authentication"

- the functional test can be run by going to "alteza_django_project" and running "python manage.py test
  functional_tests"
  NOTE : for the functional test a MacOS chromedriver with chrome version 96 is used. If you have a different operating
  system / Chrome version than you need to replace the current driver in the functional_tests folder.
  Drivers can be found at:
  "https://chromedriver.chromium.org/downloads" 
