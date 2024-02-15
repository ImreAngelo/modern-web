# Modern Web Template
A mono-repo template for modern web projects.

## Configured Features
- Static React site (using NextJS)
- HTTP/2 and HTTP/3 support
- Microservices implemented with Docker
- Preconfigured Nginx reverse proxy
- Auto-generate and trust local SSL certificates for development

## Build Pipeline
Nginx is built from source in Docker. The user has the option to set `GET_DEPENDENCIES` to `copy` or `clone` (default).
The configured web app (`services/app`) is built in Docker and served as a static site by nginx.