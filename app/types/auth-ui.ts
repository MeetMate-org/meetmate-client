export interface AuthPageProps {
  pageTitle: string;
  pageSubtitle?: string;
  secondTitle?: string;
}

export interface AuthFormProps {
  type: 'login' | 'signup' | 'reset';
  usernameLabel?: string;
  usernamePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  identifierLabel?: string;
  identifierPlaceholder?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  rememberMeLabel?: string;
  submitButtonText: string;
  googleButtonText?: string;
  alternativeActionText?: string;
  onSubmit: (data: AuthFormData) => void;
  onGoogleAction?: () => void;
  onAlternativeAction?: () => void;
  onForgotPassword?: () => void;
}

export interface AuthFormData {
  identifier?: string;
  username?: string;
  email?: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
  pageProps: AuthPageProps;
} 