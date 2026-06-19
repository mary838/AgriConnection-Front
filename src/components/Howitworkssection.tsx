"use client";

const steps = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a9 9 0 0 1 9 9c0 4.17-2.84 7.67-6.73 8.65L12 22l-2.27-2.35C5.84 18.67 3 15.17 3 11a9 9 0 0 1 9-9z"/>
        <path d="M12 6v6l3 3"/>
      </svg>
    ),
    title: "Farmers list daily",
    description: "Verified growers add fresh harvests to the marketplace each morning with transparent pricing.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: "You order with confidence",
    description: "Every product is traceable. Pay securely. Know exactly which farm grew your food.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    title: "Delivered direct",
    description: "Picked, packed and shipped in under 24 hours. Track your order from field to table.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-[#edeae2] py-20">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Title */}
        <h2
          className="text-[36px] font-semibold text-[#1c2b1a] text-center mb-14"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          How AgriConnect works
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col gap-4">
              {/* Icon circle */}
              <div className="w-11 h-11 rounded-full bg-[#1e3d18] text-white flex items-center justify-center shrink-0">
                {step.icon}
              </div>
              <h3
                className="text-[19px] font-semibold text-[#1c2b1a]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {step.title}
              </h3>
              <p className="text-[14px] text-[#5a6a52] leading-[1.75]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}