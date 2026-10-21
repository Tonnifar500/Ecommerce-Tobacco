import { photoBg } from "@/lib/products";

export default function Gallery({ name, beginner, image }: { name: string; beginner: boolean; image?: { src: string; alt: string } }) {
  const alt = image?.alt ?? `${name} resting on a crystal ashtray in soft window light`;
  return (
    <div style={{ flex: "1 1 440px", minWidth: 0 }}>
      <div className="img-ph" role="img" aria-label={alt} style={{ aspectRatio: "1/1", maxHeight: 600, width: "100%", borderRadius: 16, background: image ? photoBg(image.src) : undefined }}>
        {beginner && <div style={{ position: "absolute", top: 14, left: 14 }}><span className="badge">Beginner-friendly</span></div>}
        {!image && <div className="cap">Photo slot – {alt}</div>}
      </div>
    </div>
  );
}
