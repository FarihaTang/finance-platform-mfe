import React, { useState } from 'react'
import './index.css'
import { Card, CardHeader, Badge, Button } from '@mfe-fintech/shared-ui'
import { useUserStore } from '@mfe-fintech/shared-store'
import { accounts, Account } from './data/accounts'

const formatCurrency = (amount: number, currency = 'GBP') =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(amount)

const AccountCard: React.FC<{ account: Account }> = ({ account }) => {
  const typeVariant = {
    current: 'info',
    savings: 'success',
    investment: 'warning',
  } as const

  return (
    <Card className="hover:border-white/20 transition-all duration-200 cursor-pointer group">
      <CardHeader
        title={account.name}
        subtitle={account.iban}
        action={<Badge variant={typeVariant[account.type]}>{account.type}</Badge>}
      />
      <div className="flex items-end justify-between">
        <div>
          <p className="text-white/40 text-xs mb-1">Available Balance</p>
          <p className="text-white text-2xl font-bold">
            {formatCurrency(account.balance, account.currency)}
          </p>
        </div>
        <div className="text-right">
          <p className={`text-sm font-medium ${account.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {account.change >= 0 ? '+' : ''}{account.change}%
          </p>
          <p className="text-white/40 text-xs">this month</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
        <Button variant="secondary" size="sm">Transfer</Button>
        <Button variant="ghost" size="sm">Details</Button>
      </div>
    </Card>
  )
}

const App: React.FC = () => {
  const user = useUserStore((s) => s.user)
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Accounts</h1>
        <p className="text-white/50 mt-1">Manage your accounts, {user?.name?.split(' ')[0]}</p>
      </div>

      {/* Total balance summary */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-6">
        <p className="text-white/50 text-sm">Total across all accounts</p>
        <p className="text-white text-3xl font-bold mt-1">{formatCurrency(totalBalance)}</p>
        <p className="text-emerald-400 text-sm mt-2">↑ 3.2% from last month</p>
      </div>

      {/* Account cards */}
      <div className="grid grid-cols-1 gap-4">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>

      {/* MFE badge */}
      <div className="mt-8 p-3 bg-white/3 border border-white/5 rounded-xl">
        <p className="text-white/30 text-xs text-center">
          📦 This is an independently deployed micro-frontend — <code className="text-emerald-400/60">appAccounts@localhost:3001</code>
        </p>
      </div>
    </div>
  )
}

export default App
