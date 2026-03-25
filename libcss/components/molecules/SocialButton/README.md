# SocialButton

social login button — wraps the base Button with provider-specific styling.

## usage

```tsx
<SocialButton provider="google" onClick={() => loginWithGoogle()}>
  Sign in with Google
</SocialButton>

<SocialButton provider="github" onClick={() => loginWithGitHub()}>
  Continue with GitHub
</SocialButton>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `provider` | `'google' \| 'github'` etc. | which social provider |
| `onClick` | `() => void` | click handler |
| `children` | `ReactNode` | button text |

## things to remember

- BEM class: `prisma-social-button`
- internally uses `Button` with `variant="outline"` + the provider's icon
- the provider prop determines which icon to show (Google, GitHub, etc.)
- used in auth/login forms alongside the traditional email/password fields
- the icons come from the `Icon` atom (GitHubIcon, GoogleIcon)
