import React from 'react'

interface MicroAppLoaderProps {
  name: string
}

export const MicroAppLoader: React.FC<MicroAppLoaderProps> = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mb-4" />
      <p className="text-white/50 text-sm">Loading {name} app...</p>
    </div>
  )
}
