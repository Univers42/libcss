/**
 * UI TextArea — Stub input component
 */
import type { TextareaHTMLAttributes, FC } from 'react';

export const TextArea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => <textarea className={`textarea ${className ?? ''}`} {...props} />;
