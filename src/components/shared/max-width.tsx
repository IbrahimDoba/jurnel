export default function MaxWidth({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto h-full w-full max-w-screen-2xl px-6 md:px-12 lg:px-24 ${className}`}
    >
      {children}
    </div>
  );
}
