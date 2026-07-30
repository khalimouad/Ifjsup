"use client";

import Image from "next/image";
import { useState } from "react";
import { BLUR } from "@/lib/blur";

/**
 * Photo qui remplit son parent positionné, recadrage `cover`.
 *
 * Chargement progressif : un aperçu flou de 12 px (`src/lib/blur.ts`) tient la
 * place, une lueur balaie le cadre tant que rien n'est arrivé, puis la photo
 * monte en fondu. Hors du premier écran, `next/image` diffère le chargement —
 * c'est son comportement par défaut, `priority` ne servant qu'aux visuels
 * immédiatement visibles.
 *
 * Le parent doit porter `position: relative`.
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
  const [loaded, setLoaded] = useState(false);
  const blur = BLUR[src];

  return (
    <span className="ph" data-loaded={loaded ? "1" : "0"}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        // Une image prioritaire ne doit pas attendre un état React pour
        // apparaître : elle est visible d'emblée.
        onLoad={() => setLoaded(true)}
        placeholder={blur ? "blur" : "empty"}
        blurDataURL={blur}
        style={{ objectFit: "cover" }}
      />
    </span>
  );
}
