import React from "react";
import Button from "../Button/Button";

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  legend: string;
  submitLabel: string;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, legend, submitLabel, children }) => {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>{legend}</legend>
        {children}
        <Button type="submit">{submitLabel}</Button>
      </fieldset>
    </form>
  );
};

export default Form;
