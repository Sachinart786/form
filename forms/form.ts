import { FormProps } from "@/types/form";

export const form: FormProps = {
  title: "User Registration",
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter name",
      validation: {
        minLength: {
          value: 3,
          message: "Name must be at least 3 characters long",
        },
        maxLength: {
          value: 8,
          message: "Name cannot exceed 8 characters",
        },
        pattern: {
          value: /^[A-Za-z ]+$/,
          message: "Name can only contain letters and spaces",
        },
      },
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter username",
      validation: {
        required: "Username is required",
        minLength: {
          value: 3,
          message: "Username must be at least 3 characters long",
        },
        maxLength: {
          value: 12,
          message: "Username cannot exceed 12 characters",
        },
        pattern: {
          value: /^[A-Za-z0-9]+$/,
          message: "Username can only contain letters and numbers",
        },
      },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email format",
        },
      },
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter age",
      validation: {
        required: "Age is required",
        min: {
          value: 18,
          message: "You must be at least 18 years old",
        },
      },
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
      validation: {
        required: "Please select your gender",
      },
    },
    {
      name: "terms",
      label: "Accept Terms & Conditions",
      type: "checkbox",
      validation: {
        required: "You must accept the terms",
      },
    },
  ],
};
