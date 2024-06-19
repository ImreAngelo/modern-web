# Modern Web Template
This is a template project for development of modern web apps, approrpiate for everything from static websites to fully managed containerized microservices. Pre-configured with all these neat features:

- Static React site (using Next 14)
- HTTP/2 and HTTP/3 (QUIC over UDP) served by nginx
- Microservices implemented with Docker and scaled by k8s
- Preconfigured nginx reverse proxy and high speed server
- Responsive images handled by nginx ([image filter module](https://nginx.org/en/docs/http/ngx_http_image_filter_module.html))
- Auto-generated and trusted local SSL certificates for development
- Service worker with caching and offline PWA functionality
- Compression with gzip and brotli for text files
- Compression with avif and webp for image files

## Branches
Each branch of this repo has a more specialized template.

| Branch  | Description  |
|---------|--------------|
| `main`  | High-performance static React site served by nginx. |
| `isr`   | Server-side rendering behind nginx acting as a cache and reverse proxy ensures the same speed and efficiency as a static site, but also allows for user-generated content baked in. |
| `wp`    | Wordpress used as a headless CMS. Content is updated in the same manner as in `isr`, incrementally adding new posts to the static HTML as they are added. |
| `push`  | A separate backend service communicates with the frontend service worker to allow push notifications, even when the browser is closed. |

## Set up
- Clone repo
- Configure yarn with `yarn`
- Run `yarn init` to generate trusted SSL certificates for development
- Run `yarn build` to build docker containers, or `yarn docker` to also run the containers
- Set up kubernetes (optional)

## Building and Deployment
Use the `docker-compose.yml` file to build the project for production. Docker compose can be used to run the template on a single host, 
but each branch contains k8s deployments/services as starting points for a multi-host setup.