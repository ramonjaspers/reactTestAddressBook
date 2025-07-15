import { useState } from "react";

type FormFields = Record<string, string>;

export default function useFormFields(initialValues: FormFields) {
  const [fields, setFields] = useState<FormFields>(initialValues);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFields((prev:any) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  
  const reset = () => {
    setFields(initialValues);
  };

  return {
    fields,
    onChange,
    reset,
    setFields, 
  };
}
