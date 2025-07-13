import React from "react";

interface FormFields {
  [key: string]: string;
}

interface UseFormFieldsReturn {
  fields: FormFields;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFields: () => void;
  setField: (name: string, value: string) => void;
}

const useFormFields = (initialFields: FormFields): UseFormFieldsReturn => {
  const [fields, setFields] = React.useState<FormFields>(initialFields);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFields = () => {
    setFields(initialFields);
  };

  const setField = (name: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    fields,
    handleChange,
    resetFields,
    setField,
  };
};

export default useFormFields;
