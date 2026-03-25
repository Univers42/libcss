export interface StepperStep {
  id: string;
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: readonly StepperStep[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  orientation = 'horizontal',
  className,
}: StepperProps) {
  const cls = ['stepper', `stepper--${orientation}`, className].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {steps.map((step, i) => {
        const state = i < currentStep ? 'completed' : i === currentStep ? 'active' : 'pending';
        return (
          <div key={step.id} className={`stepper__step stepper__step--${state}`}>
            <div className="stepper__indicator">{state === 'completed' ? '✓' : i + 1}</div>
            <div className="stepper__content">
              <span className="stepper__label">{step.label}</span>
              {step.description && <span className="stepper__desc">{step.description}</span>}
            </div>
            {i < steps.length - 1 && <div className="stepper__connector" />}
          </div>
        );
      })}
    </div>
  );
}
