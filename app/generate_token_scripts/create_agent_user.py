import random
from django.contrib.auth import get_user_model

UserModel = get_user_model ()
if not UserModel.objects.filter(username='agent_user').exists():
    #############################
    length = 25

    #define data
    lower = "abcdefghijklmnopqrstuvwxyz"
    upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    num = "0123456789"
    symbols = "!#$%&'()*+, -./:;<=>?@[\]^_`{|}~"
    #string.ascii_letters
    all = lower + upper + num + symbols
    temp = random.sample(all,length)

    #create the password 
    passw = "".join(temp)
    ######################################

    user=UserModel.objects.create_user('agent_user', password=passw)
    user.is_superuser=True
    user.is_staff=True
    user.save()

#### after the user is created, the token should be generated using (python3 manage.py drf_create_token agent_user > agent_token.txt)