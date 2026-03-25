export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  fullWidth?: boolean;
  autoGrow?: boolean;
  minRows?: number;
  maxRows?: number;
}
