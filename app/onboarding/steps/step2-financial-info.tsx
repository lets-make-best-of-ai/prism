'use client'

import { useState, useEffect } from 'react'

interface Step2Data {
  primarySalary?: string
  spouseSalary?: string
  bonuses?: string | number
  rental?: string | number
  dividends?: string | number
  activeCards?: string[]
  ownsHome?: boolean
  [key: string]: any
}

interface Step2Props {
  data: Record<string, any>
  onDataChange: (data: Step2Data) => void
}

export default function Step2FinancialInfo({ data, onDataChange }: Step2Props) {
  const [formData, setFormData] = useState<Step2Data>(data || {})
  const [activeCards, setActiveCards] = useState<Set<string>>(new Set(data?.activeCards || []))

  useEffect(() => {
    onDataChange({
      ...formData,
      activeCards: Array.from(activeCards),
    })
  }, [formData, activeCards])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleCard = (cardId: string) => {
    const newActive = new Set(activeCards)
    if (newActive.has(cardId)) {
      newActive.delete(cardId)
    } else {
      newActive.add(cardId)
    }
    setActiveCards(newActive)
  }

  const incomeCards = [
    { id: 'bonuses', label: 'Bonuses', description: 'Annual performance-based equity or cash incentives.', icon: 'redeem' },
    { id: 'rental', label: 'Rental', description: 'Passive net income from real estate portfolios.', icon: 'real_estate_agent' },
    { id: 'dividends', label: 'Dividends', description: 'Recurring payouts from equity and fund holdings.', icon: 'show_chart' },
  ]

  return (
    <div className="space-y-8">
      {/* Primary Income Section */}
      <div className="glass-card rounded-xl p-stack-lg neon-glow-indigo">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/20 p-2 rounded-lg">
            <span className="material-symbols-outlined text-primary">work</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface">Primary Income</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
          <div className="space-y-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Annual Base Salary</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors">$</span>
              <input
                type="number"
                name="primarySalary"
                value={formData.primarySalary || ''}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 focus:ring-0 focus:outline-none transition-all font-numeric-data text-numeric-data"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Spouse/Partner Salary</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors">$</span>
              <input
                type="number"
                name="spouseSalary"
                value={formData.spouseSalary || ''}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-surface-container-high/60 border border-outline-variant/40 rounded-xl pl-8 pr-4 py-3 focus:border-secondary focus:shadow-md focus:ring-0 focus:outline-none transition-all font-numeric-data text-numeric-data text-on-surface neon-glow-indigo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Income Streams */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <h3 className="font-headline-md text-headline-md text-on-surface">Additional Income Streams</h3>
        <p className="text-sm text-on-surface-variant">Select income sources that apply to you.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {incomeCards.map(card => (
            <button
              key={card.id}
              onClick={() => toggleCard(card.id)}
              className={`group glass-card rounded-xl p-6 text-left transition-all focus:outline-none ${
                activeCards.has(card.id) ? 'border-secondary/50 neon-glow-indigo' : 'hover:border-secondary/50'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`bg-secondary/10 p-2 rounded-lg transition-colors ${
                  activeCards.has(card.id) ? 'bg-secondary/30' : ''
                }`}>
                  <span className="material-symbols-outlined text-secondary">{card.icon}</span>
                </div>
                <span className={`material-symbols-outlined text-on-surface-variant text-lg transition-opacity ${
                  activeCards.has(card.id) ? 'opacity-100' : 'opacity-0'
                }`}>
                  check_circle
                </span>
              </div>
              <h4 className="font-headline-md text-on-surface mb-1 text-lg">{card.label}</h4>
              <p className="text-sm text-on-surface-variant mb-4">{card.description}</p>
              {activeCards.has(card.id) && (
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant">$</span>
                    <input
                      type="number"
                      name={card.id}
                      value={formData[card.id as keyof Step2Data] || ''}
                      onChange={handleChange}
                      placeholder={card.id === 'rental' ? 'Monthly Net' : 'Annual Amount'}
                      className="w-full pl-6 pr-3 py-2 focus:ring-0 text-sm font-numeric-data transition-all"
                    />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Property Ownership */}
      <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-xl pt-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary">home</span>
          <div>
            <p className="font-body-md text-on-surface">Do you own or rent your primary residence?</p>
            <p className="text-xs text-on-surface-variant">This helps us tailor deduction recommendations.</p>
          </div>
        </div>
        <select
          value={formData.ownsHome ? 'own' : 'rent'}
          onChange={(e) => setFormData(prev => ({ ...prev, ownsHome: e.target.value === 'own' }))}
          className="px-3 py-2 text-sm focus:outline-none transition-all"
        >
          <option value="rent">Rent</option>
          <option value="own">Own</option>
        </select>
      </div>
    </div>
  )
}
