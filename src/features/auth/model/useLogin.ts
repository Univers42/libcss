/**
 * @file useLogin.ts
 * @description Logic hook for the user login process.
 */

import { useState, useCallback, type FormEvent } from 'react';
import { toast } from 'sonner';
import type { LoginFormState, LoginErrors, LoginField } from './LoginForm.types';

const INITIAL_STATE: LoginFormState = {
  email: '',
  password: '',
  remember: false,
};

export function useLogin() {
  const [form, setForm] = useState<LoginFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const setFieldValue = useCallback(<K extends LoginField>(
    field: K,
    value: LoginFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const validate = useCallback((): boolean => {
    const newErrors: LoginErrors = {};
    
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Minimum 6 characters required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsLoading(true);
    try {
      // TODO: Connect with actual auth API via authStore
      await new Promise((resolve) => setTimeout(resolve, 1400));
      toast.success('Welcome back!', {
        description: 'Redirecting to your dashboard...',
      });
    } catch (error) {
      toast.error('Login failed', {
        description: 'Please check your credentials.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [validate]);

  const togglePassword = useCallback(() => setShowPassword((v) => !v), []);

  return {
    form,
    errors,
    isLoading,
    showPassword,
    setFieldValue,
    handleSubmit,
    togglePassword,
  } as const;
}
