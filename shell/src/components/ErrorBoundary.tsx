import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: string
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[MFE ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-red-500/10 border border-red-500/20 rounded-2xl">
          <p className="text-red-400 font-semibold mb-2">
            {this.props.fallback ?? 'This module failed to load.'}
          </p>
          <p className="text-white/40 text-sm">
            {this.state.error?.message}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition"
          >
            Retry
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
