import React, { useState } from 'react'
import './index.css'
import { Card, Badge, Button } from '@mfe-fintech/shared-ui'
import { useUserStore } from '@mfe-fintech/shared-store'
import { transactions, Transaction } from './data/transactions'

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount)

const categoryEmoji: Record<Transaction['category'], string> = {
  food: '🍽️',
  transport: '🚇',
  shopping: '🛍️',
  utilities: '💡',
  salary: '💰',
  transfer: '↔️',
}

const statusVariant: Record<Transaction['status'], 'success' | 'warning' | 'danger'> = {
  completed: 'success',
  pending: 'warning',
  failed: 'danger',
}

const App: React.FC = () => {
  const user = useUserStore((s) => s.user)
  const [filter, setFilter] = useState<'all' | Transaction['type']>('all')

  const filtered = transactions.filter((t) =>
    filter === 'all' ? true : t.type === filter
  )

  const totalIn = transactions.filter((t) => t.type === 'credit').reduce((s, t) => s + t.amount, 0)
  const totalOut = transactions.filter((t) => t.type === 'debit').reduce((s, t) => s + t.amount, 0)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Transactions</h1>
        <p className="text-white/50 mt-1">Recent activity, {user?.name?.split(' ')[0]}</p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
          <p className="text-emerald-400/70 text-xs mb-1">Money In</p>
          <p className="text-emerald-400 text-xl font-bold">+{formatCurrency(totalIn)}</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
          <p className="text-red-400/70 text-xs mb-1">Money Out</p>
          <p className="text-red-400 text-xl font-bold">-{formatCurrency(totalOut)}</p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4">
        {(['all', 'credit', 'debit'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {/* Transaction list */}
      <Card>
        <div className="divide-y divide-white/5">
          {filtered.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-base">
                  {categoryEmoji[txn.category]}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{txn.description}</p>
                  <p className="text-white/40 text-xs">{txn.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={statusVariant[txn.status]}>{txn.status}</Badge>
                <p className={`text-sm font-semibold ${txn.type === 'credit' ? 'text-emerald-400' : 'text-white'}`}>
                  {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-8 p-3 bg-white/3 border border-white/5 rounded-xl">
        <p className="text-white/30 text-xs text-center">
          📦 Independently deployed micro-frontend — <code className="text-emerald-400/60">appTransactions@localhost:3002</code>
        </p>
      </div>
    </div>
  )
}

export default App
