export default function Term({ children, tip }: { children: React.ReactNode; tip: string }) {
  return (
    <button type="button" className="term">
      {children}
      <span className="pop" role="tooltip">{tip}</span>
    </button>
  );
}
