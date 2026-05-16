import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  glass?: boolean
}

export const Card: React.FC<CardProps> = ({ children, className = '', glass = true }) => {
  const base = 'rounded-2xl p-6'
  const glassStyle = glass
    ? 'bg-white/5 border border-white/10 backdrop-blur-sm'
    : 'bg-slate-800 border border-slate-700'

  return (
    <div className={`${base} ${glassStyle} ${className}`}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action }) => (
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="text-white font-semibold text-base">{title}</h3>
      {subtitle && <p className="text-white/50 text-sm mt-0.5">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
)
