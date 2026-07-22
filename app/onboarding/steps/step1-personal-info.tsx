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
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold text-text-primary mb-2">Personal Information</h2>
        <p className="text-text-secondary">Tell us about yourself so we can provide tailored tax strategies</p>
      </div>

      {/* Individual Information */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="pb-8 border-b border-fintech-border">
          <h3 className="text-xl font-bold text-text-primary mb-8">Your Information</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-3">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none text-base"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-4 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none text-base"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-4 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none text-base"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">Marital Status *</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-4 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none text-base"
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
                <label className="block text-sm font-semibold text-text-primary mb-3">Social Security Number *</label>
                <input
                  type="text"
                  name="ssn"
                  value={formData.ssn || ''}
                  onChange={handleChange}
                  placeholder="XXX-XX-XXXX"
                  maxLength={11}
                  className="w-full px-4 py-4 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none text-base"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-3">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none text-base"
                placeholder="123 Main Street, City, State, ZIP"
                required
              />
            </div>

            <label className="flex items-center gap-3 p-4 rounded-lg bg-fintech-surface border border-fintech-border cursor-pointer hover:border-emerald-primary/50 transition-all">
              <input
                type="checkbox"
                name="changedAddressThisYear"
                checked={formData.changedAddressThisYear || false}
                onChange={handleChange}
                className="w-5 h-5 rounded border-fintech-border accent-emerald-primary cursor-pointer"
              />
              <span className="text-base text-text-primary font-medium">
                Did you change your address in the last year?
              </span>
            </label>
          </div>
        </div>

        {/* Spouse Information */}
        {isMarried && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 pb-8 border-b border-fintech-border"
          >
            <h3 className="text-xl font-bold text-text-primary">Spouse Information</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">Spouse Name *</label>
                <input
                  type="text"
                  name="spouseName"
                  value={formData.spouseName || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-4 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none text-base"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">Spouse SSN *</label>
                  <input
                    type="text"
                    name="spouseSSN"
                    value={formData.spouseSSN || ''}
                    onChange={handleChange}
                    placeholder="XXX-XX-XXXX"
                    maxLength={11}
                    className="w-full px-4 py-4 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">Spouse DOB *</label>
                  <input
                    type="date"
                    name="spouseDOB"
                    value={formData.spouseDOB || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl bg-fintech-surface border border-fintech-border text-text-primary focus:border-emerald-primary focus:ring-2 focus:ring-emerald-primary/20 transition-all outline-none text-base"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Dependents */}
        <motion.div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-text-primary">Dependents</h3>
              <p className="text-sm text-text-secondary mt-1">Add any dependents for tax purposes</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={addDependent}
              className="px-6 py-3 rounded-lg bg-emerald-primary/15 text-emerald-primary hover:bg-emerald-primary/25 text-sm font-semibold transition-all border border-emerald-primary/30"
            >
              + Add Dependent
            </motion.button>
          </div>

          {dependentCount > 0 && (
            <div className="space-y-4">
              {Array.from({ length: dependentCount }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-xl bg-fintech-surface border-2 border-fintech-border space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-text-primary">Dependent {index + 1}</span>
                    <button
                      onClick={() => removeDependent(index)}
                      className="text-red-500 hover:text-red-600 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.dependents?.[index]?.name || ''}
                      onChange={(e) => handleDependentChange(index, 'name', e.target.value)}
                      className="px-4 py-3 rounded-lg bg-fintech-canvas border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary outline-none text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Age"
                      value={formData.dependents?.[index]?.age || ''}
                      onChange={(e) => handleDependentChange(index, 'age', e.target.value)}
                      className="px-4 py-3 rounded-lg bg-fintech-canvas border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary outline-none text-sm"
                    />
                    <input
                      type="text"
                      placeholder="SSN"
                      value={formData.dependents?.[index]?.ssn || ''}
                      onChange={(e) => handleDependentChange(index, 'ssn', e.target.value)}
                      maxLength={11}
                      className="px-4 py-3 rounded-lg bg-fintech-canvas border border-fintech-border text-text-primary placeholder-text-muted focus:border-emerald-primary outline-none text-sm"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
