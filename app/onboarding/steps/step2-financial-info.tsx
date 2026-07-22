'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Step2Data {
  housingStatus?: string
  primaryIncomeSources?: string[]
  primaryOtherIncome?: string
  spouseIncomeSources?: string[]
  spouseOtherIncome?: string
}

interface Step2Props {
  data: Record<string, any>
  onDataChange: (data: Step2Data) => void
}

const INCOME_OPTIONS = [
  { id: 'salary', label: 'Salary' },
  { id: 'social_security', label: 'Social Security' },
  { id: 'self_employment', label: 'Self Employment' },
  { id: 'investment_stocks', label: 'Investment Income (Stocks)' },
  { id: 'esop', label: 'ESOP' },
  { id: 'rental', label: 'Rental Income' },
  { id: 'royalties', label: 'Royalty Income' },
]

export default function Step2FinancialInfo({ data, onDataChange }: Step2Props) {
  const [formData, setFormData] = useState<Step2Data>(data || {})

  useEffect(() => {
    onDataChange(formData)
  }, [formData])

  const handleHousingChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      housingStatus: value,
    }))
  }

  const handleIncomeChange = (
    type: 'primary' | 'spouse',
    sourceId: string,
    checked: boolean
  ) => {
    const key = type === 'primary' ? 'primaryIncomeSources' : 'spouseIncomeSources'
    setFormData(prev => ({
      ...prev,
      [key]: checked
        ? [...(prev[key] || []), sourceId]
        : (prev[key] || []).filter(s => s !== sourceId),
    }))
  }

  const handleOtherIncomeChange = (type: 'primary' | 'spouse', value: string) => {
    const key = type === 'primary' ? 'primaryOtherIncome' : 'spouseOtherIncome'
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const renderIncomeCheckboxes = (
    type: 'primary' | 'spouse',
    sources: string[] = []
  ) => {
    const otherIncome = type === 'primary' ? formData.primaryOtherIncome : formData.spouseOtherIncome

    return (
      <div className="space-y-3">
        {INCOME_OPTIONS.map(option => (
          <label key={option.id} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={sources.includes(option.id)}
              onChange={(e) => handleIncomeChange(type, option.id, e.target.checked)}
              className="w-5 h-5 rounded border-fintech-border accent-emerald-primary cursor-pointer"
            />
            <span className="text-sm text-text-primary group-hover:text-emerald-primary transition-colors">
              {option.label}
            </span>
          </label>
        ))}

        {/* Other Income */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={!!otherIncome}
              onChange={(e) => handleOtherIncomeChange(type, e.target.checked ? 'other' : '')}
              className="w-5 h-5 rounded border-fintech-border accent-emerald-primary cursor-pointer mt-1"
            />
            <div className="flex-1">
              <span className="text-sm text-text-primary">Other Source</span>
              {otherIncome && (
                <motion.input
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  type="text"
                  placeholder="Please specify"
                  value={otherIncome === 'other' ? '' : otherIncome}
                  onChange={(e) => handleOtherIncomeChange(type, e.target.value)}
                  className="w-full mt-2 px-3 py-2 rounded-lg bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary outline-none text-sm"
                />
              )}
            </div>
          </label>
        </motion.div>
      </div>
    )
  }

  const isMarried = true // Assuming married based on context, adjust as needed

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-text-primary">Financial Information</h2>

      {/* Housing Status */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Housing Status</h3>
        <p className="text-sm text-text-secondary">Do you rent or own your house?</p>

        <div className="flex gap-4">
          {['renting', 'owning'].map(status => (
            <motion.label
              key={status}
              whileHover={{ scale: 1.02 }}
              className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formData.housingStatus === status
                  ? 'bg-emerald-primary/20 border-emerald-primary'
                  : 'bg-fintech-surface border-fintech-border hover:border-emerald-primary/50'
              }`}
            >
              <input
                type="radio"
                name="housingStatus"
                value={status}
                checked={formData.housingStatus === status}
                onChange={(e) => handleHousingChange(e.target.value)}
                className="w-5 h-5 rounded-full accent-emerald-primary cursor-pointer"
              />
              <span className="ml-3 text-sm font-semibold text-text-primary capitalize">
                {status === 'renting' ? 'Renting' : 'Owning'}
              </span>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Primary Income Sources */}
      <div className="space-y-4 pt-6 border-t border-fintech-border">
        <h3 className="text-lg font-semibold text-text-primary">Your Income Sources</h3>
        <p className="text-sm text-text-secondary">Select all that apply</p>

        {renderIncomeCheckboxes('primary', formData.primaryIncomeSources)}
      </div>

      {/* Spouse Income Sources */}
      {isMarried && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 pt-6 border-t border-fintech-border"
        >
          <h3 className="text-lg font-semibold text-text-primary">Spouse Income Sources</h3>
          <p className="text-sm text-text-secondary">Select all that apply</p>

          {renderIncomeCheckboxes('spouse', formData.spouseIncomeSources)}
        </motion.div>
      )}
    </div>
  )
}
