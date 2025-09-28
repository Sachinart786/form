import { Field, FormProps, Option } from "@/types/form";
import { useForm, FieldErrors, UseFormRegister } from "react-hook-form";

interface DynamicFormProps {
  title?: string;
  fields: Field[];
  formValues: Record<string, unknown>;
  handlePrev: () => void;
  onSubmit: (data: unknown) => void;
}

interface DynamicFieldProps {
  field: Field;
  register: UseFormRegister<FormProps> | any;
  errors: FieldErrors<FormProps> | any;
}

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const Label: React.FC<{ label: string; required?: boolean }> = ({
  label,
  required,
}) => (
  <label className="ml-2 mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
    {label}
    {required && <span className="text-red-500 text-sm ml-1">*</span>}
  </label>
);

const ErrorMessage: React.FC<{ message?: string }> = ({ message }) =>
  message ? <p className="text-red-500 text-xs mt-1 ml-2">{message}</p> : null;

const DynamicField: React.FC<DynamicFieldProps> = ({
  field,
  register,
  errors,
}) => {
  const { name, label, type, placeholder, options, validation } = field;

  const errorMessage = errors?.[name]?.message as string;

  switch (type) {
    case "select":
      return (
        <>
          <Label label={label} required={!!validation?.required} />
          <select {...register(name, validation)} className={inputClass}>
            <option value="">Select {label}</option>
            {options?.map(({ value, label }: Option) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ErrorMessage message={errorMessage} />
        </>
      );

    case "checkbox":
      return (
        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register(name, validation)} />
          <span className={errorMessage ? "text-red-500 text-sm" : "text-sm"}>
            {label}
          </span>
        </label>
      );

    case "radio":
      return (
        <>
          <Label label={label} required={!!validation?.required} />
          <div className="flex flex-col space-y-2">
            {options?.map(({ value, label }: Option) => (
              <label key={value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={value}
                  {...register(name, validation)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
          <ErrorMessage message={errorMessage} />
        </>
      );

    default:
      return (
        <>
          <Label label={label} required={!!validation?.required} />
          <input
            type={type}
            placeholder={placeholder}
            {...register(name, validation)}
            className={inputClass}
          />
          <ErrorMessage message={errorMessage} />
        </>
      );
  }
};

export const DynamicForm: React.FC<DynamicFormProps> = ({
  title,
  fields,
  formValues,
  handlePrev,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "onBlur",
    defaultValues: formValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {title && <p className="text-lg font-medium">{title}</p>}

      {fields.map((field) => (
        <div key={field.name}>
          <DynamicField field={field} register={register} errors={errors} />
        </div>
      ))}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrev}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Prev
        </button>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Next
        </button>
      </div>
    </form>
  );
};
