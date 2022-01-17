<p align="center">
    <img src="app/core/static/assets/images/mid_new.png"/>
</p>
  
# Yara Station- Managment portal for LoKi scanner

Yara station is a managment portal designed to facilitate the use of (Neo23x0 / Loki scanner).  

it was created to act as a workaround solution for orgnizations that do not have an enterprise solution to manage thier yara scanning activities.

The idea is to use loki scanner as the base for all scanning activities, and to parse and aggregate all the results in a centralized database to facilitie the following:

    1. Storing/archiving yara results.
    2. Creating dashboards
    3. Scanning clients/servers centrally (comming soon)

       

## How-To Run Yara Station 

### Run (Option 1 - Using Docker) Recomended: 

    sudo apt update
    sudo apt install docker-compose
    git clone https://github.com/NumLocK15/yara-station/
    cd yara-station/
    sudo docker-compose -f docker-compose-deploy.yml up -d
    
That is it :) .. Now you can access the portal on http://localhost

### Run (Option 2 - Running it directly without docker) 

    #download the code
    git clone https://github.com/NumLocK15/yara-station/
    cd  yara-station/app
    
    #setup the virtual environemt and download requirments
    sudo apt update
    sudo apt install virtualenv
    sudo virtualenv env
    source env/bin/activate
    pip3 install -r requirements.txt
    
    # #### Adding a secret key ####
    # in the setting.py file, change the secret key value to any string you like.. 
    #
    # ### Remove Wsgi service by uncommenting the statement in the setting folder ####
    #
    # #### intialize databse ####
    # IMPORTANT!!! First: change the database setting in the core/setting.py file by uncommenting SqLite section
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME'  : 'db.sqlite3',
    # }
    # 
    #
    # Then Comment out the Postgress instance bellow it.
    #
    #
    # This will tell django to create and use a new sqLite instance rather than using postgress which is not present outside docker.
    # Note: if you have an external postgress instance or MySQl instance you can use the commented code to connect to them 
    #
    
    # Create tables in db
    python manage.py makemigrations
    python manage.py migrate
    
    # Start the application 
    python manage.py runserver 0.0.0.0:8015 --insecure

That is it :) .. Now you can access the portal on http://localhost:8015

## Disclaimer
The portal is still in the earlly development phases, it is recommended to run it in a controlled environemnt that does not have internet access. 


## Roadmap
    1. (live) Provide support for Uploading/Parsing loki results
    2. (Coming Soon) Provide support for managment agents to run scans from a centralized location
    3. (Coming soon) Provide support for Uploading/Parsing results from different sources (e.g. Thor scanner, EDRs etc.)
