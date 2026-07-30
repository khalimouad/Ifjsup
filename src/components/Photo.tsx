import Image from "next/image";

/**
 * Équivalent du `<image-slot>` du concept : remplit son parent positionné,
 * recadrage `cover`, fond `--soft` en attente de chargement.
 * Le parent doit porter `position: relative` (classes `.pcard-media`,
 * `.hero-photo`, `.detail-photo`…).
 */
export function Photo({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 900px) 100vw, 50vw",
}: {
  src: string;
  /** vide pour une image purement décorative */
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <span className="ph">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    </span>
  );
}
