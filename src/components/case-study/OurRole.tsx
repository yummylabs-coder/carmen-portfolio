interface OurRoleProps {
  description: string;
}

export function OurRole({ description }: OurRoleProps) {
  if (!description) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-brand text-[24px] font-bold text-brand-ink">
        Our Role
      </h2>
      <div className="max-w-[756px] text-16 leading-[1.8] text-neutral-600 whitespace-pre-line">
        {description}
      </div>
    </section>
  );
}
