'use client'

import { useState, useEffect } from 'react'

interface Step1Data {
  name?: string
  dob?: string
  email?: string
  phone?: string
  address?: string
  employmentStatus?: string
  maritalStatus?: string
  includeSpouse?: boolean
  spouseName?: string
  dependents?: Array<{ name: string; age: string }>
}

interface Step1Props {
  data: Record<string, any>
  onDataChange: (data: Step1Data) => void
}

export default function Step1PersonalInfo({ data, onDataChange }: Step1Props) {
  const [formData, setFormData] = useState<Step1Data>(data || {})
  const [showSpouseForm, setShowSpouseForm] = useState(!!data?.includeSpouse)

  useEffect(() => {
    onDataChange(formData)
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleToggleSpouse = (checked: boolean) => {
    setShowSpouseForm(checked)
    setFormData(prev => ({
      ...prev,
      includeSpouse: checked,
    }))
  }

  const handleMaritalChange = (status: string) => {
    setFormData(prev => ({
      ...prev,
      maritalStatus: status,
    }))
  }

  const addDependent = () => {
    setFormData(prev => ({
      ...prev,
      dependents: [...(prev.dependents || []), { name: '', age: '' }],
    }))
  }

  const removeDependent = (index: number) => {
    setFormData(prev => ({
      ...prev,
      dependents: prev.dependents?.filter((_, i) => i !== index) || [],
    }))
  }

  return (
    <div className="space-y-8">
      {/* Identity Details */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Full Legal Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              placeholder="Johnathan Doe"
              className="w-full bg-surface-container-low/60 border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-md transition-all neon-glow"
            />
          </div>
          <div className="space-y-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob || ''}
              onChange={handleChange}
              className="w-full bg-surface-container-low/60 border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:shadow-md transition-all neon-glow"
            />
          </div>
          <div className="space-y-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="john@prism.com"
              className="w-full bg-surface-container-low/60 border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-md transition-all neon-glow"
            />
          </div>
          <div className="space-y-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-surface-container-low/60 border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-md transition-all neon-glow"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Primary Residence Address</label>
            <input
              type="text"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              placeholder="123 Wealth Avenue, Finance District"
              className="w-full bg-surface-container-low/60 border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-md transition-all neon-glow"
            />
          </div>
          <div className="space-y-2">
            <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Employment Status</label>
            <select
              name="employmentStatus"
              value={formData.employmentStatus || ''}
              onChange={handleChange}
              className="w-full bg-surface-container-low/60 border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:shadow-md transition-all neon-glow"
            >
              <option value="">Select Status</option>
              <option value="full-time">Full-time Employed</option>
              <option value="self-employed">Self-Employed</option>
              <option value="business-owner">Business Owner</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Marital Status */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Marital Status</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: 'married', label: 'Married', icon: 'favorite' },
            { value: 'single', label: 'Single', icon: 'person' },
            { value: 'partnership', label: 'Partnership', icon: 'diversity_1' },
            { value: 'divorced', label: 'Divorced', icon: 'heart_broken' },
          ].map(option => (
            <button
              key={option.value}
              onClick={() => handleMaritalChange(option.value)}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                formData.maritalStatus === option.value
                  ? 'border-primary bg-primary-container/10 text-primary'
                  : 'border-outline-variant text-on-surface-variant hover:border-primary'
              }`}
            >
              <span className="material-symbols-outlined">{option.icon}</span>
              <span className="text-xs font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Spouse Toggle */}
      <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-xl">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary">supervisor_account</span>
          <div>
            <p className="font-body-md text-on-surface">Include Spouse in Strategy?</p>
            <p className="text-xs text-on-surface-variant">Recommended for joint tax-efficiency planning.</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showSpouseForm}
            onChange={(e) => handleToggleSpouse(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>

      {/* Spouse Details */}
      {showSpouseForm && (
        <div className="space-y-3 p-4 bg-surface-container/20 rounded-xl border border-primary/10">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Spouse Name</label>
          <input
            type="text"
            name="spouseName"
            value={formData.spouseName || ''}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="w-full bg-surface-container-low/60 border border-outline-variant/40 rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:shadow-md transition-all neon-glow"
          />
        </div>
      )}

      {/* Dependents */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex justify-between items-center">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Dependents</label>
          <button
            type="button"
            onClick={addDependent}
            className="text-primary flex items-center gap-1 text-xs hover:underline transition-colors"
          >
            <span className="material-symbols-outlined text-sm">add</span> Add Dependent
          </button>
        </div>

        {formData.dependents && formData.dependents.length > 0 && (
          <div className="space-y-3">
            {formData.dependents.map((dependent, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-surface-container/30 border border-outline-variant/30 rounded-xl"
              >
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary flex-shrink-0">
                  <span className="material-symbols-outlined">child_care</span>
                </div>
                <div className="flex-1">
                  <p className="font-body-md text-on-surface">{dependent.name || 'Unnamed'}</p>
                  <p className="text-xs text-on-surface-variant">{dependent.age ? `Age ${dependent.age}` : 'No age'}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeDependent(index)}
                  className="text-on-surface-variant cursor-pointer hover:text-error transition-colors flex-shrink-0"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
