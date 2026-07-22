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

  const selectedCount = Object.values(formData).filter(Boolean).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-1">Major Expenses & Deductions</h2>
        <p className="text-sm text-slate-600">Select all expenses that apply to your situation</p>
      </div>

      {/* Expenses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {EXPENSE_OPTIONS.map(expense => (
          <label
            key={expense.id}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              formData[expense.id as keyof Step3Data]
                ? 'bg-indigo-50 border-indigo-600'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData[expense.id as keyof Step3Data] || false}
                onChange={(e) => handleExpenseChange(expense.id, e.target.checked)}
                className="w-5 h-5 rounded border-slate-200 accent-indigo-600 cursor-pointer mt-0.5 flex-shrink-0"
              />
              <div className="flex-1">
                <div className="font-semibold text-slate-900 text-sm">
                  {expense.label}
                </div>
                <div className="text-xs text-slate-600 mt-1">{expense.description}</div>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
        <p className="text-sm font-medium text-slate-700">
          <span className="text-indigo-600 font-semibold">{selectedCount}</span> expense {selectedCount === 1 ? 'category' : 'categories'} selected
        </p>
        <p className="text-xs text-slate-600 mt-1">
          These will help us identify tax optimization opportunities for your situation.
        </p>
      </div>
    </div>
  )
}
