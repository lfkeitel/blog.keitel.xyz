# Build site with Hugo
FROM lfkeitel/hugo:0.61.0 AS build-site

ADD . /site

RUN cd /site && hugo

# Build image with caddy to serve static site generated above
FROM lfkeitel/caddy:1.0.4

COPY --from=build-site /site/public /site
ADD docker/caddy.conf /etc/caddy/caddy.conf
