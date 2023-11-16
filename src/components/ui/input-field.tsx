import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  register: any;
  errors: any;
  textarea?: boolean;
}

export const InputField = ({
  label,
  name,
  register,
  errors,
  textarea,
}: InputFieldProps) => {
  return (
    <div>
      <label htmlFor={name} className="block font-semibold text-gray-700">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          {...register(name, { required: "Este campo é obrigatório" })}
          className="h-24 w-full resize-none rounded border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
        />
      ) : (
        <input
          type="text"
          id={name}
          {...register(name, { required: "Este campo é obrigatório" })}
          className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
        />
      )}
      {errors[name] && (
        <span className="text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
};
