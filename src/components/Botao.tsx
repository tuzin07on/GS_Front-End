import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'destaque' | 'secondary' | 'danger'
}

export function Botao({ children, variant = 'primary', className = '', ...props }: Props) {
  const styles = {
    primary: 'btn-primary',
    destaque: 'btn-destaque',
    secondary: 'btn-secondary',
    danger: 'inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700 disabled:opacity-50',
  }
  return <button className={`${styles[variant]} ${className}`} {...props}>{children}</button>
}
