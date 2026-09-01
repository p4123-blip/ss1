interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  center = true,
}: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span className="badge bg-primary-50 text-primary-700">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
