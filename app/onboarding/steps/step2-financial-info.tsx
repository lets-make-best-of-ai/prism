'use client'

import { useState, useEffect } from 'react'

interface Step2Data {
  primarySalary?: string
  spouseSalary?: string
  bonuses?: string
  rental?: string
  dividends?: string
}

interface Step2Props {
  data: Record<string, any>
  onDataChange: (data: Step2Data) => void
}

export default function Step2FinancialInfo({ data, onDataChange }: Step2Props) {
  const [formData, setFormData] = useState<Step2Data>(data || {})
  const [activeCards, setActiveCards] = useState<Set<string>>(new Set())

  useEffect(() => {
    onDataChange(formData)
  }, [formData])

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
      <section className="glass-card rounded-xl p-stack-lg flex flex-col gap-6 neon-glow-indigo">
        <div className="flex items-center gap-3">
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
                className="w-full bg-surface-container-high border border-outline-variant rounded-lg pl-8 pr-4 py-4 focus:border-secondary focus:ring-0 focus:outline-none transition-all font-numeric-data text-numeric-data text-on-surface"
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
                className="w-full bg-surface-container-high border border-outline-variant rounded-lg pl-8 pr-4 py-4 focus:border-secondary focus:ring-0 focus:outline-none transition-all font-numeric-data text-numeric-data text-on-surface"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Income Streams */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {incomeCards.map(card => (
          <button
            key={card.id}
            onClick={() => toggleCard(card.id)}
            className={`group glass-card rounded-xl p-6 text-left transition-all hover:border-secondary/50 focus:outline-none ${
              activeCards.has(card.id) ? 'neon-glow-indigo' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`bg-secondary/10 p-2 rounded-lg transition-colors ${
                activeCards.has(card.id) ? 'bg-secondary/30' : ''
              }`}>
                <span className="material-symbols-outlined text-secondary">{card.icon}</span>
              </div>
              {activeCards.has(card.id) && (
                <span className="material-symbols-outlined text-on-surface-variant">check_circle</span>
              )}
            </div>
            <h4 className="font-headline-md text-on-surface mb-1">{card.label}</h4>
            <p className="text-sm text-on-surface-variant mb-4">{card.description}</p>
            {activeCards.has(card.id) && (
              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant">$</span>
                  <input
                    type="number"
                    name={card.id}
                    value={formData[card.id as keyof Step2Data] || ''}
                    onChange={handleChange}
                    placeholder={card.id === 'rental' ? 'Monthly Net' : 'Amount'}
                    className="w-full bg-surface-container border border-outline-variant rounded-lg pl-6 pr-3 py-2 focus:border-secondary focus:ring-0 text-sm font-numeric-data text-on-surface focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
