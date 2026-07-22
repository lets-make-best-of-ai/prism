'use client'

import { useState, useEffect } from 'react'

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
    icon: 'child_care',
  },
  {
    id: 'kidsEducationFees',
    label: 'Kids Tuition Fees',
    description: 'School, college, educational programs',
    icon: 'school',
  },
  {
    id: 'mortgageInterest',
    label: 'Mortgage Interest',
    description: 'Home mortgage payments',
    icon: 'home',
  },
  {
    id: 'medicalExpenses',
    label: 'Medical Expenses',
    description: 'Healthcare, insurance, prescriptions',
    icon: 'medical_services',
  },
  {
    id: 'charitableDonations',
    label: 'Charitable Donations',
    description: 'Charitable contributions and donations',
    icon: 'volunteer_activism',
  },
  {
    id: 'businessExpenses',
    label: 'Business Expenses',
    description: 'Self-employment business costs',
    icon: 'business_center',
  },
  {
    id: 'studentLoanInterest',
    label: 'Student Loan Interest',
    description: 'Educational loan interest payments',
    icon: 'school',
  },
  {
    id: 'homeOfficeExpenses',
    label: 'Home Office Expenses',
    description: 'Office supplies, equipment, utilities',
    icon: 'home_work',
  },
  {
    id: 'vehicleExpenses',
    label: 'Vehicle Expenses',
    description: 'Car loans, maintenance, fuel',
    icon: 'directions_car',
  },
  {
    id: 'investmentAdvisoryFees',
    label: 'Investment Advisory Fees',
    description: 'Financial advisor, investment management',
    icon: 'trending_up',
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

  const selectedCount = Object.values(formData).filter(Boolean).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="font-body-lg text-body-lg text-on-surface-variant">Select all expenses that apply to your situation. This helps us identify tax optimization opportunities.</h2>
      </div>

      {/* Expenses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {EXPENSE_OPTIONS.map(expense => (
          <label
            key={expense.id}
            className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
              formData[expense.id as keyof Step3Data]
                ? 'bg-primary-container/10 border-primary glass-card neon-glow'
                : 'glass-card border-outline-variant hover:border-primary/50'
            }`}
          >
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                formData[expense.id as keyof Step3Data]
                  ? 'bg-primary/20 text-primary'
                  : 'bg-secondary/10 text-secondary'
              }`}>
                <span className="material-symbols-outlined text-lg">{expense.icon}</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData[expense.id as keyof Step3Data] || false}
                  onChange={(e) => handleExpenseChange(expense.id, e.target.checked)}
                  className="w-4 h-4 rounded border-outline-variant cursor-pointer"
                />
                <div className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider">
                  {expense.label}
                </div>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">{expense.description}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Summary Card */}
      <div className="glass-card p-4 rounded-xl border border-secondary/20">
        <p className="font-label-sm text-label-sm text-secondary uppercase mb-2">Summary</p>
        <div className="flex justify-between items-center">
          <span className="text-on-surface-variant text-sm">Deduction Categories Selected</span>
          <span className="font-numeric-data text-numeric-data text-primary">{selectedCount} of {EXPENSE_OPTIONS.length}</span>
        </div>
      </div>
    </div>
  )
}
