ARG GET_DEPENDENCIES=clone

# ======
# Clone dependencies from git repositories
# Allows cloning repo without submodules and installing only inside Docker
# ======
FROM alpine AS clone-dependencies

WORKDIR /home
RUN apk update
RUN apk add git
RUN git clone --recurse-submodules -j8 https://github.com/google/ngx_brotli
RUN git clone https://github.com/quictls/openssl



# # ======
# # Copy dependencies from vendors folder
# # Allows using submodules
# # ======
# FROM alpine AS copy-dependencies
# # Path to git submodules
# ARG VENDOR_DIR=./vendors
# COPY ${VENDOR_DIR} /home



# ======
# Build Nginx from source, with additional features:
# HTTP/3 (QUIC over UDP), gzip and brotli compression, responsive images (filter module)
# ======
FROM ${GET_DEPENDENCIES}-dependencies AS build-nginx
ARG NGINX_VERSION=1.25.1

# Get required packages
RUN apk --update add make cmake g++ zlib-dev linux-headers pcre-dev openssl-dev gd-dev

# Get Nginx source code
WORKDIR /home
RUN wget https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz
RUN tar xvf nginx-${NGINX_VERSION}.tar.gz

# Enable brotli compression
WORKDIR /home/ngx_brotli/deps/brotli/out
RUN cmake -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF \
	-DCMAKE_C_FLAGS="-Ofast -m64 -march=native -mtune=native -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections" \
	-DCMAKE_CXX_FLAGS="-Ofast -m64 -march=native -mtune=native -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections" \
	-DCMAKE_INSTALL_PREFIX=./installed ..
RUN cmake --build . --config Release --target brotlienc

# Build Nginx from source
WORKDIR /home/nginx-${NGINX_VERSION}
RUN export CFLAGS="-m64 -march=native -mtune=native -Ofast -flto -funroll-loops -ffunction-sections -fdata-sections -Wl,--gc-sections"
RUN export LDFLAGS="-m64 -Wl,-s -Wl,-Bsymbolic -Wl,--gc-sections"
# RUN ./configure \
# 	--add-module=/home/ngx_brotli \
# 	--prefix=/etc/nginx \
# 	--conf-path=/etc/nginx/nginx.conf \
# 	--sbin-path=/usr/sbin/nginx \
# 	--with-debug \
# 	--with-http_gzip_static_module \
# 	--with-http_image_filter_module \
# 	--with-http_v2_module \
# 	--with-http_v3_module \
# 	--with-cc-opt="-I../openssl/build/include" \
# 	--with-ld-opt="-L../openssl/build/lib"
# RUN make && make install

CMD tail -f /dev/null

# Logs
WORKDIR /var/log/nginx
RUN touch /var/log/nginx/error.log
RUN touch /var/log/nginx/access.log
RUN ln -sf /dev/stdout /var/log/nginx/access.log 
RUN ln -sf /dev/stderr /var/log/nginx/error.log 



# ======
# Only include necessary files
# ======
FROM alpine AS production

# ARG GET_STATIC_FROM=build-app

RUN apk update
RUN apk add pcre gd

# Nginx
WORKDIR /etc/nginx
COPY --from=build-nginx /etc/nginx .
COPY --from=build-nginx /usr/sbin/nginx /usr/sbin/nginx
COPY --from=build-nginx /var/log/nginx /var/log/nginx

# Static files
COPY --from=build-app /usr/app data

# Config
WORKDIR /etc/nginx
COPY nginx.conf nginx.conf
COPY conf.d conf.d

# Startup
CMD ["nginx", "-g", "daemon off;"]



# ======
# Development build with trusted localhost certificates
# ======
FROM production AS development

# SSL certificates
WORKDIR /etc/nginx
ADD ssl certs



# ======
# Development build with untrusted self-signed certificates
# ======
FROM production AS nossl-development

# SSL certificates
WORKDIR /etc/nginx/certs
RUN apk add openssl
RUN openssl req -x509 -out localhost.com.crt -keyout localhost.com.key \
			-newkey rsa:2048 -nodes -sha256 \
			-subj '/CN=localhost' -extensions EXT -config <( \
			printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

WORKDIR /etc/nginx


## TODO: Use certbot and volumes etc. in production 