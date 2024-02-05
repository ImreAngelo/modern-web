# ======
# Build Nginx from source
# ======
FROM alpine AS build-nginx
ARG NGINX_VERSION=1.25.1

RUN apk update
RUN apk --update add git make g++ zlib-dev linux-headers pcre-dev openssl-dev

WORKDIR /home
RUN wget https://nginx.org/download/nginx-$NGINX_VERSION.tar.gz
RUN tar xvf nginx-$NGINX_VERSION.tar.gz

# Use SSL with QUIC support
# RUN git clone https://github.com/quictls/openssl
WORKDIR /home/quictls
COPY vendors/openssl .

# Build Nginx from source
WORKDIR /home/nginx-$NGINX_VERSION
RUN ./configure \
	--prefix=/etc/nginx \
	--conf-path=/etc/nginx/nginx.conf \
	--sbin-path=/usr/sbin/nginx \
	--with-debug \
	--with-http_gzip_static_module \
	--with-http_v2_module \
    --with-http_v3_module \
	--with-cc-opt="-I../quictls/build/include" \
    --with-ld-opt="-L../quictls/build/lib"
RUN make
RUN make install

# Logs
WORKDIR /var/log/nginx
RUN touch /var/log/nginx/error.log

# Config
WORKDIR /etc/nginx
COPY services/nginx/nginx.conf nginx.conf
COPY services/nginx/conf.d conf.d

CMD ["nginx", "-g", "daemon off;"]



# ======
# Build web app
# ======
FROM node:lts AS build-app

WORKDIR /usr/app
ADD ./services/app .
RUN yarn install
RUN yarn build



# ======
# Only include necessary files
# ======
FROM alpine AS production

# Static files
COPY --from=build-app /usr/app/dist /var/lib/nginx

# Nginx
WORKDIR /etc/nginx
COPY --from=build-nginx /etc/nginx .
COPY --from=build-nginx /usr/sbin/nginx /usr/sbin/nginx
COPY --from=build-nginx /var/log/nginx /var/log/nginx
RUN apk add pcre

CMD ["nginx", "-g", "daemon off;"]