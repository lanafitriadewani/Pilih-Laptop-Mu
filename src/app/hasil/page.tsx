'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CardContainer from '@/components/CardContainer'

export default function ResultPage() {
  const [result, setResult] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('laptops') || '[]')
    // Dummy logic: ambil laptop dengan RAM terbanyak
    const recommended = data.reduce((prev: any, curr: any) => {
      return parseInt(curr.ram) > parseInt(prev.ram) ? curr : prev
    }, data[0])
    setResult(recommended)
  }, [])

  if (!result) return null

  const handleBack = () => {
    router.push('/') // Ganti '/' dengan path halaman utama kamu jika berbeda
  }

  return (
    <CardContainer>
      <h2 className="text-xl font-bold mb-4 text-center text-blue-800">Rekomendasi Laptop Terbaik</h2>
      <ul className="text-sm text-gray-600 space-y-1">
        <li><strong>Nama:</strong> {result.name}</li>
        <li><strong>CPU:</strong> {result.cpu}</li>
        <li><strong>GPU:</strong> {result.gpu}</li>
        <li><strong>RAM:</strong> {result.ram}</li>
        <li><strong>Storage:</strong> {result.storage}</li>
        <li><strong>Layar:</strong> {result.screen}</li>
        <li><strong>Harga:</strong> {result.price}</li>
        
      </ul>
       <button
        onClick={handleBack}
        className="mt-3 font-bold w-full bg-blue-800 text-white rounded py-2 hover:bg-blue-700"
      >
        Kembali ke Halaman Utama
      </button>
    </CardContainer>
  )
}
