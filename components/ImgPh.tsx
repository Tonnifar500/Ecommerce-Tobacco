export default function ImgPh({ alt, label, style, className = "" }: { alt: string; label?: string; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`img-ph ${className}`} role="img" aria-label={alt} style={style}>
      {label !== "" && <div className="cap">{label ?? alt}</div>}
    </div>
  );
}
