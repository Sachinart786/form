import { RegisterOptions } from "react-hook-form";

export interface Option {
  label: string;
  value: string;
}

export interface Field {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "select" | "radio" | "checkbox"; // restrict field type
  placeholder?: string;
  options?: Option[];
  validation?: RegisterOptions; // Directly compatible with react-hook-form
}

export interface FormProps {
  id?: string;
  title: string;
  fields: Field[];
}
