export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'credit' | 'debit'
  category: 'food' | 'transport' | 'shopping' | 'utilities' | 'salary' | 'transfer'
  date: string
  status: 'completed' | 'pending' | 'failed'
}

export const transactions: Transaction[] = [
  { id: 'txn-001', description: 'Salary — China Minsheng Bank', amount: 4500, type: 'credit', category: 'salary', date: '2026-05-01', status: 'completed' },
  { id: 'txn-002', description: 'Sainsbury\'s Supermarket', amount: 67.40, type: 'debit', category: 'food', date: '2026-05-03', status: 'completed' },
  { id: 'txn-003', description: 'TfL — Oyster Card Top Up', amount: 40.00, type: 'debit', category: 'transport', date: '2026-05-04', status: 'completed' },
  { id: 'txn-004', description: 'Netflix Subscription', amount: 15.99, type: 'debit', category: 'utilities', date: '2026-05-05', status: 'completed' },
  { id: 'txn-005', description: 'ASOS — Clothing', amount: 89.99, type: 'debit', category: 'shopping', date: '2026-05-06', status: 'completed' },
  { id: 'txn-006', description: 'Transfer to Savings', amount: 500.00, type: 'debit', category: 'transfer', date: '2026-05-07', status: 'completed' },
  { id: 'txn-007', description: 'Pret A Manger', amount: 8.50, type: 'debit', category: 'food', date: '2026-05-08', status: 'completed' },
  { id: 'txn-008', description: 'EDF Energy — Electricity', amount: 72.00, type: 'debit', category: 'utilities', date: '2026-05-09', status: 'pending' },
  { id: 'txn-009', description: 'Freelance Payment', amount: 800.00, type: 'credit', category: 'salary', date: '2026-05-10', status: 'completed' },
  { id: 'txn-010', description: 'Amazon — Books', amount: 24.97, type: 'debit', category: 'shopping', date: '2026-05-11', status: 'completed' },
]
