import React from "react";
import Button from "../Button/Button";

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  legend: string;
  submitText: string;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  legend,
  submitText,
  children,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>{legend}</legend>
        {children}
        <Button type="submit">{submitText}</Button>
      </fieldset>
    </form>
  );
};

export default Form;
