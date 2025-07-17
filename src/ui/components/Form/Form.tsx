import { FormHTMLAttributes, PropsWithChildren } from "react";
import Button from "../Button/Button";

interface FormProps
  extends PropsWithChildren,
    FormHTMLAttributes<HTMLFormElement> {
  legend: string;
  submitText?: string;
  isSubmitting?: boolean;
}

const Form = ({
  children,
  legend,
  onSubmit,
  submitText = "Submit",
  isSubmitting = false,
  ...props
}: FormProps) => {
  return (
    <form onSubmit={onSubmit} {...props}>
      <fieldset>
        <legend>{legend}</legend>

        {Array.isArray(children) ? (
          children.map((child, index) => (
            <div key={index} className="form-row">
              {child}
            </div>
          ))
        ) : (
          <div className="form-row">{children}</div>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : submitText}
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
