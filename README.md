# Modern Web Template
A mono-repo template for modern web projects.

## Configured Features
- Static React site (using NextJS)
- HTTP/2 and HTTP/3 (QUIC) support
- Microservices implemented with Docker
- Preconfigured nginx cache + reverse proxy for microservices
- Responsive images handled by nginx
- Auto-generated and trusted local SSL certificates for development
- Service worker with caching and offline PWA functionality

## Usage
- Clone repo
- Run `yarn install`
- Run `yarn ssl`

## Build Pipeline
Nginx is built from source in Docker. The user has the option to set `GET_DEPENDENCIES` to `copy` or `clone` (default).
The configured web app (`services/app`) is built in Docker and served as a static site by nginx.