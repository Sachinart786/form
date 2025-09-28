// import React, { useState } from "react";
// import { Stepper } from "./ui/stepper";
// import { DynamicForm } from "./Form";
// import { form } from "@/forms/form";

// const steps = [
//   { id: 1, title: "Personal Info", description: "3 to 5 minutes" },
//   { id: 2, title: "Job Info", description: "3 to 5 minutes" },
//   { id: 3, title: "Confirmation", description: "Review and submit your details" },
// ];

// export const FormContainer = () => {
//   const [activeStep, setActiveStep] = useState<number>(0); // Start at first step (0-based index)

//   const handleNext = () => {
//     setActiveStep((prev) => Math.min(prev + 1, steps.length - 1)); // prevent overflow
//   };

//   const handlePrev = () => {
//     setActiveStep((prev) => Math.max(prev - 1, 0)); // prevent going negative
//   };

//   const handleFormSubmit = (data: unknown) => {
//     console.log("Form Data Submitted:", data);

//     // Go to next step after submission
//     if (activeStep < steps.length - 1) {
//       setActiveStep((prev) => prev + 1);
//     } else {
//       alert("Form completed successfully!");
//       // You could also reset the form here:
//       // setActiveStep(0);
//     }
//   };

//   return (
//     <div className="p-6 flex">
//       {/* Stepper */}
//       <div className="grid grid-cols-3">
//         <Stepper steps={steps} activeStep={activeStep} />
//       </div>

//       {/* Dynamic Form */}
//       <div className="grid grid-cols-9">
//         <div className="w-full">
//           {activeStep < steps.length - 1 ? (
//             <DynamicForm
//               title={form.title}
//               fields={form.fields} // Dynamically load fields for current step
//             //   fields={form.fields[activeStep] || []} // Dynamically load fields for current step
//               formValues={{}}
//               handlePrev={handlePrev}
//               onSubmit={handleFormSubmit}
//             />
//           ) : (
//             <div className="p-6 text-center">
//               <h2 className="text-2xl font-bold text-green-600 mb-4">
//                 🎉 All Steps Completed!
//               </h2>
//               <p className="text-gray-600">
//                 Thank you for submitting your information. We will review it shortly.
//               </p>
//               <button
//                 onClick={() => setActiveStep(0)}
//                 className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Restart
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

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

  /** Handle form submission and progress to next step */
  const handleFormSubmit = (data: unknown) => {
    console.log("Form Data Submitted:", data);

    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      alert("Form completed successfully!");
      // Optionally reset to the beginning
      // setActiveStep(0);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-8">
      {/* Stepper Section */}
      <div className="w-full max-w-3xl mx-auto">
        <Stepper steps={steps} activeStep={activeStep} />
      </div>

      {/* Dynamic Form Section */}
      <div className="w-full max-w-4xl mx-auto">
        {activeStep < steps.length - 1 ? (
          <DynamicForm
            // id={getForm.id}
            title={getForm.title}
            fields={getForm.fields}
            // formId={getForm.formId}
            formValues={{}}
            handlePrev={handlePrev}
            onSubmit={handleFormSubmit}
          />
        ) : (
          <div className="p-6 text-center">
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
  );
};
