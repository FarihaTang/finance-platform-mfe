export interface Account {
  id: string
  name: string
  type: 'current' | 'savings' | 'investment'
  balance: number
  currency: string
  iban: string
  change: number // percentage change this month
}

export const accounts: Account[] = [
  {
    id: 'acc-001',
    name: 'Main Current Account',
    type: 'current',
    balance: 12450.80,
    currency: 'GBP',
    iban: 'GB29 NWBK 6016 1331 9268 19',
    change: 2.4,
  },
  {
    id: 'acc-002',
    name: 'Savings Account',
    type: 'savings',
    balance: 8920.00,
    currency: 'GBP',
    iban: 'GB29 NWBK 6016 1331 9268 20',
    change: 5.1,
  },
  {
    id: 'acc-003',
    name: 'Investment Portfolio',
    type: 'investment',
    balance: 3150.20,
    currency: 'GBP',
    iban: 'GB29 NWBK 6016 1331 9268 21',
    change: -1.2,
  },
]
