# Build site with Hugo
FROM lfkeitel/hugo:latest AS build-site

ADD . /site

RUN cd /site && hugo

# Build image with caddy to serve static site generated above
FROM lfkeitel/caddy:latest

COPY --from=build-site /site/public /site
ADD docker/caddy.conf /etc/caddy/caddy.conf
