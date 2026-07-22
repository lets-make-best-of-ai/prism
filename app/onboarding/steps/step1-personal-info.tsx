'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Step1Data {
  name?: string
  gender?: string
  dob?: string
  maritalStatus?: string
  ssn?: string
  address?: string
  changedAddressThisYear?: boolean
  spouseName?: string
  spouseSSN?: string
  spouseDOB?: string
  dependents?: Array<{ name: string; age: string; ssn: string }>
}

interface Step1Props {
  data: Record<string, any>
  onDataChange: (data: Step1Data) => void
}

export default function Step1PersonalInfo({ data, onDataChange }: Step1Props) {
  const [formData, setFormData] = useState<Step1Data>(data || {})
  const [dependentCount, setDependentCount] = useState(data?.dependents?.length || 0)

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

  const handleDependentChange = (index: number, field: string, value: string) => {
    const dependents = [...(formData.dependents || [])]
    if (!dependents[index]) {
      dependents[index] = { name: '', age: '', ssn: '' }
    }
    dependents[index] = { ...dependents[index], [field]: value }
    setFormData(prev => ({
      ...prev,
      dependents,
    }))
  }

  const addDependent = () => {
    setDependentCount(prev => prev + 1)
    if (!formData.dependents) {
      setFormData(prev => ({ ...prev, dependents: [{ name: '', age: '', ssn: '' }] }))
    } else {
      setFormData(prev => ({
        ...prev,
        dependents: [...prev.dependents!, { name: '', age: '', ssn: '' }],
      }))
    }
  }

  const removeDependent = (index: number) => {
    setDependentCount(prev => Math.max(0, prev - 1))
    setFormData(prev => ({
      ...prev,
      dependents: prev.dependents?.filter((_, i) => i !== index) || [],
    }))
  }

  const isMarried = formData.maritalStatus === 'married'

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-text-primary">Personal Information</h2>

      {/* Individual Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-text-primary">Your Information</h3>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Gender *</label>
            <select
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={formData.dob || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Marital Status *</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none"
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">SSN *</label>
            <input
              type="text"
              name="ssn"
              value={formData.ssn || ''}
              onChange={handleChange}
              placeholder="XXX-XX-XXXX"
              maxLength={11}
              className="w-full px-4 py-3 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none"
            placeholder="123 Main Street, City, State, ZIP"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="changedAddressThisYear"
            checked={formData.changedAddressThisYear || false}
            onChange={handleChange}
            className="w-5 h-5 rounded border-fintech-border accent-emerald-primary cursor-pointer"
          />
          <label className="text-sm text-text-primary cursor-pointer">
            Did you change your address in the last year?
          </label>
        </div>
      </div>

      {/* Spouse Information */}
      {isMarried && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 pt-6 border-t border-fintech-border"
        >
          <h3 className="text-lg font-semibold text-text-primary">Spouse Information</h3>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Spouse Name *</label>
            <input
              type="text"
              name="spouseName"
              value={formData.spouseName || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none"
              placeholder="Jane Doe"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Spouse SSN *</label>
              <input
                type="text"
                name="spouseSSN"
                value={formData.spouseSSN || ''}
                onChange={handleChange}
                placeholder="XXX-XX-XXXX"
                maxLength={11}
                className="w-full px-4 py-3 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Spouse DOB *</label>
              <input
                type="date"
                name="spouseDOB"
                value={formData.spouseDOB || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Dependents */}
      <motion.div className="space-y-6 pt-6 border-t border-fintech-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Dependents</h3>
          <button
            onClick={addDependent}
            className="px-4 py-2 rounded-lg bg-emerald-primary/10 text-emerald-primary hover:bg-emerald-primary/20 text-sm font-semibold transition-all"
          >
            + Add Dependent
          </button>
        </div>

        {dependentCount > 0 && (
          <div className="space-y-4">
            {Array.from({ length: dependentCount }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-fintech-surface border border-fintech-border space-y-3"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-text-primary">Dependent {index + 1}</span>
                  <button
                    onClick={() => removeDependent(index)}
                    className="text-red-500 hover:text-red-600 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.dependents?.[index]?.name || ''}
                    onChange={(e) => handleDependentChange(index, 'name', e.target.value)}
                    className="px-3 py-2 rounded-lg bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary outline-none text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={formData.dependents?.[index]?.age || ''}
                    onChange={(e) => handleDependentChange(index, 'age', e.target.value)}
                    className="px-3 py-2 rounded-lg bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary outline-none text-sm"
                  />
                  <input
                    type="text"
                    placeholder="SSN"
                    value={formData.dependents?.[index]?.ssn || ''}
                    onChange={(e) => handleDependentChange(index, 'ssn', e.target.value)}
                    maxLength={11}
                    className="px-3 py-2 rounded-lg bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary outline-none text-sm"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
