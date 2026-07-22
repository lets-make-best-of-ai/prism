'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Step3Data {
  childCareExpenses?: boolean
  kidsEducationFees?: boolean
  mortgageInterest?: boolean
  medicalExpenses?: boolean
  charitableDonations?: boolean
  businessExpenses?: boolean
  studentLoanInterest?: boolean
  homeOfficeExpenses?: boolean
  vehicleExpenses?: boolean
  investmentAdvisoryFees?: boolean
}

interface Step3Props {
  data: Record<string, any>
  onDataChange: (data: Step3Data) => void
}

const EXPENSE_OPTIONS = [
  {
    id: 'childCareExpenses',
    label: 'Child Care Expenses',
    description: 'Daycare, preschool, babysitting',
  },
  {
    id: 'kidsEducationFees',
    label: 'Kids Tuition Fees',
    description: 'School, college, educational programs',
  },
  {
    id: 'mortgageInterest',
    label: 'Mortgage Interest',
    description: 'Home mortgage payments',
  },
  {
    id: 'medicalExpenses',
    label: 'Medical Expenses',
    description: 'Healthcare, insurance, prescriptions',
  },
  {
    id: 'charitableDonations',
    label: 'Charitable Donations',
    description: 'Charitable contributions and donations',
  },
  {
    id: 'businessExpenses',
    label: 'Business Expenses',
    description: 'Self-employment business costs',
  },
  {
    id: 'studentLoanInterest',
    label: 'Student Loan Interest',
    description: 'Educational loan interest payments',
  },
  {
    id: 'homeOfficeExpenses',
    label: 'Home Office Expenses',
    description: 'Office supplies, equipment, utilities',
  },
  {
    id: 'vehicleExpenses',
    label: 'Vehicle Expenses',
    description: 'Car loans, maintenance, fuel',
  },
  {
    id: 'investmentAdvisoryFees',
    label: 'Investment Advisory Fees',
    description: 'Financial advisor, investment management',
  },
]

export default function Step3Expenses({ data, onDataChange }: Step3Props) {
  const [formData, setFormData] = useState<Step3Data>(data || {})

  useEffect(() => {
    onDataChange(formData)
  }, [formData])

  const handleExpenseChange = (expenseId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [expenseId]: checked,
    }))
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Major Expenses & Deductions</h2>
        <p className="text-text-secondary">Select all expenses that apply to your situation</p>
      </div>

      {/* Expenses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EXPENSE_OPTIONS.map((expense, index) => (
          <motion.label
            key={expense.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all group ${
              formData[expense.id as keyof Step3Data]
                ? 'bg-emerald-primary/20 border-emerald-primary'
                : 'bg-fintech-surface border-fintech-border hover:border-emerald-primary/50'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData[expense.id as keyof Step3Data] || false}
                onChange={(e) => handleExpenseChange(expense.id, e.target.checked)}
                className="w-5 h-5 rounded border-fintech-border accent-emerald-primary cursor-pointer mt-0.5 flex-shrink-0"
              />
              <div className="flex-1">
                <div className="font-semibold text-text-primary group-hover:text-emerald-primary transition-colors">
                  {expense.label}
                </div>
                <div className="text-xs text-text-muted mt-1">{expense.description}</div>
              </div>
            </div>
          </motion.label>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 p-4 rounded-lg bg-emerald-primary/10 border border-emerald-primary/20"
      >
        <p className="text-sm text-text-secondary">
          <span className="font-semibold text-emerald-primary">
            {Object.values(formData).filter(Boolean).length}
          </span>{' '}
          expense categories selected
        </p>
        <p className="text-xs text-text-muted mt-1">
          These will help us identify tax optimization opportunities for your situation.
        </p>
      </motion.div>
    </div>
  )
}
