# Build site with Hugo
FROM alpine:edge AS build-site

RUN apk update \
    && apk add hugo \
    && rm -rf /var/cache/apk/*

ADD . /site

RUN cd /site \
    && hugo

# Build image with caddy to serve static site generated above
FROM alpine:edge

RUN apk update \
    && apk add caddy \
    && rm -rf /var/cache/apk/*

COPY --from=build-site /site/public /site
ADD docker/caddy.conf /etc/caddy/caddy.conf

EXPOSE 80 443

CMD ["/usr/sbin/caddy", "-conf", "/etc/caddy/caddy.conf"]
