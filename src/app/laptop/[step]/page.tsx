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

      {Object.keys(placeholderMap).map((field) => (
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
