import React from 'react';
import { Upload, ScanLine, ListChecks, CreditCard, Truck } from 'lucide-react';

const steps = [
  { icon: Upload, label: 'Upload' },
  { icon: ScanLine, label: 'Match' },
  { icon: ListChecks, label: 'Review' },
  { icon: CreditCard, label: 'Pay' },
  { icon: Truck, label: 'Deliver' },
];

const HowItWorks: React.FC = () => {
  return (
    <div className="py-6 px-1">
      <h4 className="text-app-dark font-semibold text-sm mb-4 text-center opacity-80">
        How it works
      </h4>
      <div className="flex justify-between items-start relative px-2">
        {/* Connecting Line */}
        <div className="absolute top-[14px] left-6 right-6 h-[2px] bg-app-divider -z-10" />

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex flex-col items-center gap-2 bg-app-bg z-10 px-1">
              <div className="w-8 h-8 rounded-full bg-white border border-app-primary flex items-center justify-center shadow-sm">
                <Icon size={14} className="text-app-dark" />
              </div>
              <span className="text-[10px] font-medium text-app-text">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowItWorks;
