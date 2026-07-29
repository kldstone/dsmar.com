export function optimizedImage(src: string) {
  if (/^\/(brand-gallery|gani-home|gani-products|catalog-images|catalog-products|real-photos|hero-slides)\/.+\.(jpe?g|png)$/i.test(src)) {
    return `/optimized${src.replace(/\.(jpe?g|png)$/i, ".webp")}`;
  }

  if (/^\/gani-products\/.+\.webp$/i.test(src)) {
    return `/optimized${src}`;
  }

  return src;
}

export function responsiveImage(src: string) {
  const optimized = optimizedImage(src);
  const extensionIndex = optimized.lastIndexOf(".");
  if (extensionIndex === -1) return { src: optimized };

  const stem = optimized.slice(0, extensionIndex);
  const variant = (width: number) => `/responsive${stem}-${width}.webp`;

  return {
    src: variant(1280),
    srcSet: `${variant(640)} 640w, ${variant(1280)} 1280w, ${variant(1920)} 1920w`,
    sizes: "100vw",
  };
}
