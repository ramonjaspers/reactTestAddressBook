import { useState, useCallback, ChangeEvent } from 'react';

export function useFormFields<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleChange = useCallback((fieldName: keyof T) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: e.target.value
    }));

    if (error) {
      setError(undefined);
    }
  }, [error]);

  const setValue = useCallback((fieldName: keyof T, value: T[keyof T]) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setError(undefined);
  }, [initialValues]);

  const setFormError = useCallback((errorMessage: string | undefined) => {
    setError(errorMessage);
  }, []);

  return {
    values,
    error,
    handleChange,
    setValue,
    reset,
    setFormError
  };
} 