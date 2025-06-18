'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CardContainer from '@/components/CardContainer'
import Select from 'react-select'

export default function LaptopForm() {
  const router = useRouter()
  const params = useParams()
  const step = parseInt(params.step as string || '1')

  const [count, setCount] = useState(2)
  const [data, setData] = useState({
    name: '',
    cpu: '',
    gpu: '',
    ram: '',
    storage: '',
    screen: '',
    price: ''
  })
  const [cpuOptions, setCpuOptions] = useState<any[]>([])
  const [gpuOptions, setGpuOptions] = useState<any[]>([])

  // Ambil jumlah laptop dari localStorage hanya sekali di awal
  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem('count') || '2')
    setCount(savedCount)
  }, [])

  useEffect(() => {
    // Fetch CPU and GPU data from API
    fetch('/api/cpu-gpu-data')
      .then(res => res.json())
      .then(data => {
        setCpuOptions(data.cpu)
        setGpuOptions(data.gpu)
      })
  }, [])

  const placeholderMap: Record<string, string> = {
    name: "Nama / Merk Laptop",
    cpu: "CPU (contoh: Intel i7 12700H)",
    gpu: "GPU (contoh: RTX 4060)",
    ram: "RAM (GB)",
    storage: "Local Storage (GB)",
    screen: "Ukuran Layar (inch)",
    price: "Harga (Rupiah)"
  }

  const inputTypeMap: Record<string, string> = {
    ram: "number",
    storage: "number",
    screen: "number",
    price: "number"
  }

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      color: '#1e293b',
      backgroundColor: '#fff',
      borderColor: '#cbd5e1',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: '#1e293b',
      backgroundColor: state.isFocused ? '#e0e7ef' : '#fff',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#1e293b',
    }),
    input: (provided: any) => ({
      ...provided,
      color: '#1e293b',
    }),
  }

  const handleNext = () => {
    const allData = JSON.parse(localStorage.getItem('laptops') || '[]')
    allData[step - 1] = data
    localStorage.setItem('laptops', JSON.stringify(allData))

    if (step < count) {
      router.push(`/laptop/${step + 1}`)
    } else {
      router.push('/hasil')
    }
  }

  return (
    <CardContainer>
      <h2 className="text-xl font-bold mb-4 text-center text-blue-800">Laptop ke {step}</h2>

      {/* Laptop Name input at the top */}
      <input
        key="name"
        type="text"
        placeholder={placeholderMap.name}
        value={data.name}
        onChange={e => setData({ ...data, name: e.target.value })}
        className="w-full mb-3 p-2 border rounded text-gray-600"
      />

      {/* Render CPU dropdown with search */}
      <div className="mb-3">
        <Select
          styles={customSelectStyles}
          options={cpuOptions.map(cpu => ({ value: cpu.cpuName, label: cpu.cpuName }))}
          value={data.cpu ? { value: data.cpu, label: data.cpu } : null}
          onChange={option => setData({ ...data, cpu: option?.value || '' })}
          placeholder="Pilih CPU"
          isClearable
        />
      </div>

      {/* Render GPU dropdown with search */}
      <div className="mb-3">
        <Select
          styles={customSelectStyles}
          options={gpuOptions.map(gpu => ({ value: gpu.gpuName, label: gpu.gpuName }))}
          value={data.gpu ? { value: data.gpu, label: data.gpu } : null}
          onChange={option => setData({ ...data, gpu: option?.value || '' })}
          placeholder="Pilih GPU"
          isClearable
        />
      </div>

      {/* Render other fields as before, except name/cpu/gpu */}
      {Object.keys(placeholderMap).filter(field => field !== 'name' && field !== 'cpu' && field !== 'gpu').map((field) => (
        <input
          key={field}
          type={inputTypeMap[field] || 'text'}
          placeholder={placeholderMap[field]}
          value={(data as any)[field]}
          onChange={e => setData({ ...data, [field]: e.target.value })}
          className="w-full mb-3 p-2 border rounded text-gray-600"
        />
      ))}

      <button onClick={handleNext} className="mt-2 font-bold w-full bg-blue-800 text-white rounded py-2 hover:bg-blue-700">
        {step < count ? 'Next' : 'Lihat Hasil'}
      </button>
    </CardContainer>
  )
}
