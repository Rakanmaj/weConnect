import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Stepper({ steps, currentStep, className, orientation = "horizontal" }: StepperProps) {
  if (orientation === "vertical") {
    return (
      <div className={cn("space-y-0", className)}>
        {steps.map((step, index) => {
          const isComplete = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          return (
            <div key={step.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium shrink-0",
                    isComplete && "border-primary bg-primary text-white",
                    isCurrent && "border-primary text-primary bg-blue-50",
                    !isComplete && !isCurrent && "border-border text-muted"
                  )}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn("w-0.5 flex-1 my-1 min-h-[24px]", isComplete ? "bg-primary" : "bg-border")} />
                )}
              </div>
              <div className="pb-6 min-w-0">
                <p className={cn("text-sm font-medium", isCurrent ? "text-navy" : "text-muted")}>
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-caption mt-0.5">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isComplete = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          return (
            <div key={step.id} className="flex items-center flex-1 min-w-0 last:flex-none">
              <div className="flex flex-col items-center min-w-0">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium shrink-0",
                    isComplete && "border-primary bg-primary text-white",
                    isCurrent && "border-primary text-primary bg-blue-50",
                    !isComplete && !isCurrent && "border-border text-muted"
                  )}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <p
                  className={cn(
                    "text-xs mt-2 text-center truncate max-w-[80px] sm:max-w-none sm:whitespace-nowrap",
                    isCurrent ? "text-navy font-medium" : "text-muted"
                  )}
                >
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2 sm:mx-4",
                    isComplete ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
