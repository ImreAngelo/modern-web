export default function staticImageLoader({ src, quality, width }) {
    // const host = process.env.HOSTNAME || 'localhost'; // Could use static.domain.etc
    const rSrc = src.replace(/^(\/_next\/static)/, "");
    const url = new URL(rSrc, 'http://localhost');

    if(width) url.searchParams.set('w', width);
    if(quality) url.searchParams.set('q', quality);

    return url.toString().slice(16);
}