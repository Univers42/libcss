/**
 * @file LoginForm.tsx
 * @description Presentational component for the user login form.
 */

import { useId } from 'react';
import type { JSX } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/shared/ui/atoms/Button';
import { GoogleIcon, GitHubIcon } from '@/shared/ui/atoms/Icon';
import { FormField } from '@/shared/ui/molecules/FormField';
import { SocialButton } from '@/shared/ui/molecules/SocialButton';

import type { LoginFormProps } from '../model/LoginForm.types';
import { useLogin } from '../model/useLogin';
import styles from './LoginForm.module.scss';

export function LoginForm({ onSwitch, className = '' }: LoginFormProps): JSX.Element {
  const uid = useId();
  const {
    form,
    errors,
    isLoading,
    showPassword,
    setFieldValue,
    handleSubmit,
    togglePassword,
  } = useLogin();

  return (
    <form
      onSubmit={handleSubmit}
      className={[styles.form, className].filter(Boolean).join(' ')}
      noValidate
    >
      <div className={styles.socials}>
        <SocialButton
          icon={<GoogleIcon size="sm" />}
          label="Google"
          onClick={() => toast.info('Coming soon')}
        />
        <SocialButton
          icon={<GitHubIcon size="sm" />}
          label="GitHub"
          onClick={() => toast.info('Coming soon')}
        />
      </div>

      <div className={styles.divider}>
        <div className={styles.divider__line} />
        <span className={styles.divider__text}>or continue with email</span>
        <div className={styles.divider__line} />
      </div>

      <FormField label="Email" error={errors.email} id={`${uid}-email`} required>
        <input
          id={`${uid}-email`}
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          value={form.email}
          onChange={(e) => setFieldValue('email', e.target.value)}
          className={[
            styles.input,
            errors.email && styles['input--error']
          ].filter(Boolean).join(' ')}
        />
      </FormField>

      <FormField label="Password" error={errors.password} id={`${uid}-password`} required>
        <div className={styles.inputWrapper}>
          <input
            id={`${uid}-password`}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setFieldValue('password', e.target.value)}
            className={[
              styles.input,
              styles['input--withAction'],
              errors.password && styles['input--error']
            ].filter(Boolean).join(' ')}
          />
          <button
            type="button"
            onClick={togglePassword}
            className={styles.inputAction}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </FormField>

      <div className={styles.actions}>
        <label className={styles.remember}>
          <input
            type="checkbox"
            checked={form.remember}
            onChange={(e) => setFieldValue('remember', e.target.checked)}
          />
          <span>Remember me</span>
        </label>
        <button type="button" className={styles.forgotBtn}>
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>

      <p className={styles.switch}>
        Don't have an account?{' '}
        <button type="button" onClick={onSwitch}>
          Create account
        </button>
      </p>
    </form>
  );
}
