export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="17" fill="none" stroke="#C8963E" strokeWidth="2" />
      <circle cx="20" cy="20" r="11" fill="none" stroke="#C8963E" strokeWidth="1" />
      <circle cx="20" cy="20" r="4.5" fill="#A63A24" />
    </svg>
  );
}
