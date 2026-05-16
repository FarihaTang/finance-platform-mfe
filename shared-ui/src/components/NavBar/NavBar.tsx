import React from 'react'

interface NavItem {
  label: string
  path: string
  icon?: React.ReactNode
}

interface NavBarProps {
  appName: string
  items: NavItem[]
  activePath?: string
  onNavigate: (path: string) => void
  userAvatar?: string
  userName?: string
}

export const NavBar: React.FC<NavBarProps> = ({
  appName,
  items,
  activePath,
  onNavigate,
  userName,
}) => {
  return (
    <nav className="h-full flex flex-col bg-slate-900/50 border-r border-white/5 w-56 p-4">
      {/* Logo */}
      <div className="mb-8">
        <span className="text-emerald-400 font-bold text-lg tracking-tight">{appName}</span>
      </div>

      {/* Nav Items */}
      <ul className="flex-1 space-y-1">
        {items.map((item) => {
          const isActive = activePath === item.path
          return (
            <li key={item.path}>
              <button
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                  ${isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>

      {/* User */}
      {userName && (
        <div className="pt-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-semibold">
              {userName[0]}
            </div>
            <span className="text-white/70 text-sm truncate">{userName}</span>
          </div>
        </div>
      )}
    </nav>
  )
}
