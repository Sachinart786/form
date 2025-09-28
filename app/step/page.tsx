"use client";
import { form } from "@/forms/form";
import { ProfessionalForm } from "@/forms/job";
import { FormContainer } from "@/components/FormContainer";

const steps = [
  { id: 0, title: "Personal Info", description: "3 to 5 minutes" },
  { id: 1, title: "Job Info", description: "3 to 5 minutes" },
  {
    id: 2,
    title: "Confirmation",
    description: "Review and submit your details",
  },
];

const forms = [form, ProfessionalForm];

const Step = () => {
  return <FormContainer steps={steps} forms={forms} />;
};

export default Step;
