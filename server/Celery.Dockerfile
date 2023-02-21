#---- Base python ----
FROM python:3.9-slim-bullseye as base

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Create app directory
WORKDIR /src
COPY requirements/requirements-celery.txt ./requirements/requirements-celery.txt
RUN pip install --no-cache-dir -r ./requirements/requirements-celery.txt 
RUN python -m spacy download en_core_web_trf

# ---- Copy Files/Build ----
FROM base

ARG USERNAME=appuser
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user and group
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME

WORKDIR /src

COPY . /src

RUN chmod -R 777 /src

USER $USERNAME