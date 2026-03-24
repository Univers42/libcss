/**
 * @file LoginForm.types.ts
 * @description Type definitions for the LoginForm feature.
 */

export interface LoginFormProps {
  /** Callback to switch to the registration form */
  readonly onSwitch: () => void;
  /** Optional class name for the form container */
  readonly className?: string;
}

export interface LoginFormState {
  readonly email:     string;
  readonly password:  string;
  readonly remember:  boolean;
}

export type LoginField = keyof LoginFormState;

export type LoginErrors = Partial<Record<LoginField, string>>;
