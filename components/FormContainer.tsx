import React, { useMemo, useState } from "react";
import { Step, Stepper } from "./ui/stepper";
import { DynamicForm } from "./Form";
import { FormProps } from "@/types/form";

interface FormContainerProps {
  steps: Step[];
  forms: FormProps[];
}

export const FormContainer: React.FC<FormContainerProps> = ({
  steps,
  forms,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0); // Start at first step (0-indexed)

  /** Move to the next step safely */
  // const handleNext = () => {
  //   setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  // };

  const getForm = useMemo(() => forms[activeStep], [activeStep, forms]);
  /** Move to the previous step safely */
  const handlePrev = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleFormSubmit = (data: unknown) => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      alert("Form completed successfully!");
      console.log("Form Data Submitted:", data);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Stepper Section: col-span-3 */}
        <div className="col-span-12 md:col-span-3">
          <Stepper steps={steps} activeStep={activeStep} />
        </div>

        {/* Dynamic Form Section: col-span-9 */}
        <div className="col-span-12 md:col-span-9">
          {activeStep < steps.length - 1 ? (
            <DynamicForm
              title={getForm.title}
              fields={getForm.fields}
              formValues={{}}
              handlePrev={handlePrev}
              onSubmit={handleFormSubmit}
            />
          ) : (
            <div className="p-6 text-center border rounded shadow">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                🎉 All Steps Completed!
              </h2>
              <p className="text-gray-600">
                Thank you for submitting your information. We will review it
                shortly.
              </p>
              <button
                onClick={() => setActiveStep(0)}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Restart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
