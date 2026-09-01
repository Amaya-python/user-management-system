#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

# Force superuser creation with explicit credentials
python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(username='amaya').exists():
    User.objects.create_superuser('amaya', 'amaya@gmail.com', 'Amaya@123')
else:
    u = User.objects.get(username='amaya')
    u.set_password('Amaya@123')
    u.is_staff = True
    u.is_superuser = True
    u.save()
"