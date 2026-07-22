'use client'

import { useState, useEffect } from 'react'

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
          <label key={option.id} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={sources.includes(option.id)}
              onChange={(e) => handleIncomeChange(type, option.id, e.target.checked)}
              className="w-5 h-5 rounded border-slate-200 accent-indigo-600 cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-700">
              {option.label}
            </span>
          </label>
        ))}

        {/* Other Income */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={!!otherIncome}
              onChange={(e) => handleOtherIncomeChange(type, e.target.checked ? 'other' : '')}
              className="w-5 h-5 rounded border-slate-200 accent-indigo-600 cursor-pointer mt-0.5"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-slate-700">Other Source</span>
              {otherIncome && (
                <input
                  type="text"
                  placeholder="Please specify"
                  value={otherIncome === 'other' ? '' : otherIncome}
                  onChange={(e) => handleOtherIncomeChange(type, e.target.value)}
                  className="w-full mt-2 px-4 py-2 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-colors"
                />
              )}
            </div>
          </label>
        </div>
      </div>
    )
  }

  const isMarried = true

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-slate-900">Housing & Income</h2>

      {/* Housing Status */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700">
          Housing Status <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-slate-600 mb-3">Do you rent or own your house?</p>

        <div className="flex gap-3">
          {['renting', 'owning'].map(status => (
            <label
              key={status}
              className={`flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                formData.housingStatus === status
                  ? 'bg-indigo-50 border-indigo-600'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name="housingStatus"
                value={status}
                checked={formData.housingStatus === status}
                onChange={(e) => handleHousingChange(e.target.value)}
                className="accent-indigo-600 cursor-pointer"
              />
              <span className="ml-2 text-sm font-medium text-slate-700 capitalize">
                {status === 'renting' ? 'Renting' : 'Owning'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Primary Income Sources */}
      <div className="pt-6 border-t border-slate-200 space-y-3">
        <label className="block text-sm font-semibold text-slate-700">
          Your Income Sources <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-slate-600 mb-3">Select all that apply</p>

        {renderIncomeCheckboxes('primary', formData.primaryIncomeSources)}
      </div>

      {/* Spouse Income Sources */}
      {isMarried && (
        <div className="pt-6 border-t border-slate-200 space-y-3">
          <label className="block text-sm font-semibold text-slate-700">
            Spouse Income Sources <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-slate-600 mb-3">Select all that apply</p>

          {renderIncomeCheckboxes('spouse', formData.spouseIncomeSources)}
        </div>
      )}
    </div>
  )
}
