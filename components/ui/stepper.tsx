export interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  activeStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  return (
    <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {steps.map(({ id, title, description }) => {
        const isActive = id === activeStep;
        const isCompleted = id < activeStep;

        let indicatorClasses =
          "absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ";
        if (isCompleted) {
          indicatorClasses += "bg-green-200 dark:bg-green-900";
        } else if (isActive) {
          indicatorClasses += "bg-blue-100 dark:bg-blue-800";
        } else {
          indicatorClasses += "bg-gray-200 dark:bg-gray-700";
        }

        return (
          <li
            key={id}
            className="mb-10 ms-6"
            aria-current={isActive ? "step" : undefined}
          >
            <span className={indicatorClasses}>
              {isCompleted ? (
                // Completed step → Show checkmark
                <svg
                  className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              ) : (
                // Active or upcoming step → Show step number
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {id + 1}
                </span>
              )}
            </span>

            <h3 className="font-medium leading-tight">{title}</h3>
            <p className="text-xs">{description}</p>
          </li>
        );
      })}
    </ol>
  );
};
