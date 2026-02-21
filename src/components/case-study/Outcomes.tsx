interface OutcomesProps {
  outcomes: { metric: string; description: string }[];
}

export function Outcomes({ outcomes }: OutcomesProps) {
  if (outcomes.length === 0) return null;

  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-brand text-[24px] font-bold text-brand-ink">
        Outcomes
      </h2>
      <div
        className={`grid gap-5 ${
          outcomes.length === 1
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {outcomes.map((outcome, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-2xl bg-blue-50 p-6"
          >
            <span className="text-[20px]">{"\u{1F3AF}"}</span>
            <h3 className="font-brand text-[20px] font-bold text-brand-ink">
              {outcome.metric}
            </h3>
            <p className="text-14 leading-[1.6] text-neutral-600">
              {outcome.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
