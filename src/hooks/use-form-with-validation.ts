import { type ChangeEvent, useState } from 'react';

import VALIDATORS from '@utils/validators.ts';

type FormValues = Record<string, string>;

type FormErrors = Record<string, string>;

export const useFormWithValidation = (
  initialValues: FormValues = {}
): {
  values: FormValues;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
  isValid: boolean;
  resetValues: () => void;
} => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>(initErrors(initialValues));
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target;
    const value = input.value;
    const name = input.name;

    const newValues: FormValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);

    const validator = VALIDATORS[name as keyof typeof VALIDATORS];
    const isValidField = validator?.validator(value) ?? true;

    const newErrors: FormErrors = {
      ...errors,
      [name]: !isValidField ? validator.message : '',
    };

    setErrors(newErrors);

    const formIsNotValid = Object.values(newErrors).some((x) => !!x);

    setIsValid(!formIsNotValid);
  };

  const resetValues = (): void => {
    setValues(initialValues);
    setErrors(initErrors(initialValues));
  };

  return { values, handleChange, errors, isValid, resetValues };
};

const initErrors = (formValues: FormValues): FormErrors => {
  return Object.keys(formValues).reduce((errors: FormErrors, fieldName) => {
    errors[fieldName] = '';
    return errors;
  }, {});
};
