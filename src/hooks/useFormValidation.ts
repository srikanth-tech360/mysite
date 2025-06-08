import { useState, useEffect, FormEvent } from 'react';

interface FormErrors<T> {
  [key: string]: string;
}

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validate: (values: T) => Partial<FormErrors<T>>,
  onSubmit: (values: T) => Promise<void>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<FormErrors<T>>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        onSubmit(values).then(() => {
          setIsSubmitting(false);
        }).catch(() => {
          setIsSubmitting(false);
        });
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors, isSubmitting, onSubmit, values]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    
    setValues({
      ...values,
      [name]: value,
    });

    // Real-time validation
    const fieldErrors = validate({
      ...values,
      [name]: value,
    });
    
    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors[name],
    }));
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = event.target;
    
    setTouched({
      ...touched,
      [name]: true,
    });
    
    const fieldErrors = validate(values);
    
    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors[name],
    }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    // Touch all fields to show validation
    const touchedFields: Record<string, boolean> = {};
    Object.keys(values).forEach(key => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);
    
    // Validate all fields
    const formErrors = validate(values);
    setErrors(formErrors);
    
    // Start submission if no errors
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
    }
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    resetForm,
  };
}