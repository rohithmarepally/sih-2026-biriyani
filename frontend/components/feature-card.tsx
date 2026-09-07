type FeatureCardProps = {
  title: string;
  description: string;
};

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <article className="rounded-2xl border border-ink/10 bg-white/50 p-5">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-ink/60">{description}</p>
    </article>
  );
}
