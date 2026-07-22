'use client'

import { useState, useEffect } from 'react'

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
    setDependentCount((prev: number) => prev + 1)
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
    setDependentCount((prev: number) => Math.max(0, prev - 1))
    setFormData(prev => ({
      ...prev,
      dependents: prev.dependents?.filter((_, i) => i !== index) || [],
    }))
  }

  const isMarried = formData.maritalStatus === 'married'

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-slate-900">Your Information</h2>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          placeholder="John Doe"
          required
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-colors"
        />
      </div>

      {/* Gender & DOB */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-colors"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Marital Status & SSN */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Marital Status <span className="text-red-500">*</span>
          </label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus || ''}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-colors"
          >
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            SSN <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="ssn"
            value={formData.ssn || ''}
            onChange={handleChange}
            placeholder="XXX-XX-XXXX"
            maxLength={11}
            required
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
          placeholder="123 Main Street, City, State, ZIP"
          required
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-colors"
        />
      </div>

      {/* Address Change Checkbox */}
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="changedAddressThisYear"
          checked={formData.changedAddressThisYear || false}
          onChange={handleChange}
          className="w-5 h-5 rounded border-slate-200 accent-indigo-600 cursor-pointer"
        />
        <span className="text-sm font-medium text-slate-700">
          Did you change your address in the last year?
        </span>
      </label>

      {/* Spouse Information */}
      {isMarried && (
        <div className="pt-6 border-t border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Spouse Information</h3>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Spouse Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="spouseName"
              value={formData.spouseName || ''}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Spouse SSN <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="spouseSSN"
                value={formData.spouseSSN || ''}
                onChange={handleChange}
                placeholder="XXX-XX-XXXX"
                maxLength={11}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Spouse DOB <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="spouseDOB"
                value={formData.spouseDOB || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>
      )}

      {/* Dependents */}
      <div className="pt-6 border-t border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Dependents</h3>
          <button
            type="button"
            onClick={addDependent}
            className="px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            + Add
          </button>
        </div>

        {dependentCount > 0 && (
          <div className="space-y-3">
            {Array.from({ length: dependentCount }).map((_, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Dependent {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeDependent(index)}
                    className="text-xs font-semibold text-red-600 hover:text-red-700"
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
                    className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={formData.dependents?.[index]?.age || ''}
                    onChange={(e) => handleDependentChange(index, 'age', e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="SSN"
                    maxLength={11}
                    value={formData.dependents?.[index]?.ssn || ''}
                    onChange={(e) => handleDependentChange(index, 'ssn', e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
