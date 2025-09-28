import { FormProps } from "@/types/form";

export const ProfessionalForm: FormProps = {
  title: "Professional Background Details",
  fields: [
    {
      name: "ctc",
      label: "CTC",
      type: "number",
      placeholder: "Enter CTC",
      validation: {
        required: "CTC is required",
      },
    },
    {
      name: "company",
      label: "Company",
      type: "text",
      placeholder: "Enter company",
      validation: {
        required: "Company is required",
        minLength: {
          value: 3,
          message: "Company must be at least 3 characters long",
        },
        maxLength: {
          value: 12,
          message: "Company cannot exceed 12 characters",
        },
        pattern: {
          value: /^[A-Za-z0-9]+$/,
          message: "Company can only contain letters and numbers",
        },
      },
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Enter address",
      validation: {
        required: "Address is required"
      },
    },
    {
      name: "city",
      label: "City",
      type: "text",
      placeholder: "Enter city",
      validation: {
        minLength: {
          value: 3,
          message: "City must be at least 3 characters long",
        },
        maxLength: {
          value: 8,
          message: "City cannot exceed 8 characters",
        },
        pattern: {
          value: /^[A-Za-z ]+$/,
          message: "City can only contain letters and spaces",
        },
      },
    },
  ],
};
