python manage.py makemigrations jobAPI assignmentAPI
python manage.py makemigrations
python manage.py migrate
python manage.py shell < tools/create_superuser.py
python manage.py shell < tools/create_groups.py
python manage.py collectstatic --noinput