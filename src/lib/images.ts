export function optimizedImage(src: string) {
  if (/^\/(brand-gallery|gani-home|gani-products|catalog-images|catalog-products|real-photos|hero-slides)\/.+\.(jpe?g|png)$/i.test(src)) {
    return `/optimized${src.replace(/\.(jpe?g|png)$/i, ".webp")}`;
  }

  if (/^\/gani-products\/.+\.webp$/i.test(src)) {
    return `/optimized${src}`;
  }

  return src;
}
