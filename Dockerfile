FROM python:3.9-alpine3.13
LABEL maintainer="NumLocK15"

ENV PYTHONUNBUFFERED 1

COPY ./app/requirements.txt /requirements.txt
COPY ./app /app
COPY ./scripts /scripts

WORKDIR /app
EXPOSE 8015

USER root 

RUN apk add --update --no-cache python3-tkinter

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client && \
    apk add --update --no-cache --virtual .tmp-deps \
        build-base postgresql-dev musl-dev linux-headers && \
    /py/bin/pip install -r /requirements.txt && \
    apk del .tmp-deps
    
RUN adduser --disabled-password --no-create-home app && \
    mkdir -p /vol/web/static && \
    mkdir -p /vol/web/media && \
    chown -R app:app /vol && \
    chmod -R 755 /vol && \ 
    chmod -R +x /scripts

ENV PATH="/scripts:/py/bin:$PATH"


CMD ["run.sh"]