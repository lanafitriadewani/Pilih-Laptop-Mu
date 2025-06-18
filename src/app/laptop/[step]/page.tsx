'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CardContainer from '@/components/CardContainer'

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

  // Ambil jumlah laptop dari localStorage hanya sekali di awal
  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem('count') || '2')
    setCount(savedCount)
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

  // Dummy CPU and GPU data with full CSV fields
  const cpuOptions = [
    {
      cpuName: 'AMD Ryzen Threadripper PRO 5995WX', price: '', cpuMark: '108822', cpuValue: '', threadMark: '3330', threadValue: '', TDP: '280', powerPerf: '388.65', cores: '64', testDate: '2022', socket: 'sWRX8', category: 'Desktop'
    },
    {
      cpuName: 'AMD EPYC 7763', price: '7299.99', cpuMark: '88338', cpuValue: '12.1', threadMark: '2635', threadValue: '0.36', TDP: '280', powerPerf: '315.49', cores: '64', testDate: '2021', socket: 'SP3', category: 'Server'
    },
    {
      cpuName: 'AMD EPYC 7J13', price: '', cpuMark: '86006', cpuValue: '', threadMark: '2387', threadValue: '', TDP: '', powerPerf: '', cores: '64', testDate: '2021', socket: 'unknown', category: 'Server'
    },
    {
      cpuName: 'AMD EPYC 7713', price: '7060', cpuMark: '85861', cpuValue: '12.16', threadMark: '2727', threadValue: '0.39', TDP: '225', powerPerf: '381.6', cores: '64', testDate: '2021', socket: 'SP3', category: 'Server'
    },
  ]
  const gpuOptions = [
    {
      gpuName: 'GeForce RTX 3090 Ti', G3Dmark: '29094', G2Dmark: '1117', price: '2099.99', gpuValue: '13.85', TDP: '450', powerPerformance: '64.65', testDate: '2022', category: 'Unknown'
    },
    {
      gpuName: 'GeForce RTX 3080 Ti', G3Dmark: '26887', G2Dmark: '1031', price: '1199.99', gpuValue: '22.41', TDP: '350', powerPerformance: '76.82', testDate: '2021', category: 'Desktop'
    },
    {
      gpuName: 'GeForce RTX 3090', G3Dmark: '26395', G2Dmark: '999', price: '1749.99', gpuValue: '15.08', TDP: '350', powerPerformance: '75.41', testDate: '2020', category: 'Desktop'
    },
    {
      gpuName: 'Radeon RX 6900 XT', G3Dmark: '25458', G2Dmark: '1102', price: '1120.31', gpuValue: '22.72', TDP: '300', powerPerformance: '84.86', testDate: '2020', category: 'Desktop'
    },
  ]

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

      {/* Render CPU dropdown */}
      <select
        className="w-full mb-3 p-2 border rounded text-gray-600"
        value={data.cpu}
        onChange={e => setData({ ...data, cpu: e.target.value })}
      >
        <option value="">Pilih CPU</option>
        {cpuOptions.map(option => (
          <option key={option.cpuName} value={option.cpuName}>{option.cpuName}</option>
        ))}
      </select>

      {/* Render GPU dropdown */}
      <select
        className="w-full mb-3 p-2 border rounded text-gray-600"
        value={data.gpu}
        onChange={e => setData({ ...data, gpu: e.target.value })}
      >
        <option value="">Pilih GPU</option>
        {gpuOptions.map(option => (
          <option key={option.gpuName} value={option.gpuName}>{option.gpuName}</option>
        ))}
      </select>

      {/* Render other fields as before, except cpu/gpu */}
      {Object.keys(placeholderMap).filter(field => field !== 'cpu' && field !== 'gpu').map((field) => (
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
