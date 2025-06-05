'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CardContainer from '@/components/CardContainer'

export default function Home() {
  const [usage, setUsage] = useState('Game')
  const [count, setCount] = useState(2)
  const router = useRouter()

  const handleNext = () => {
    if (count < 2 || count > 4) return alert('Minimal 2, maksimal 4 laptop')
    localStorage.setItem('usage', usage)
    localStorage.setItem('count', count.toString())
    router.push('/laptop/1')
  }

  return (
    <CardContainer>
      <h1 className="text-2xl font-extrabold mb-2 text-center text-blue-800">Pilih Laptop Mu</h1>
      <p className="text-sm text-gray-600 mb-4 text-center text-justify leading-relaxed">
        Website ini membantumu memilih laptop terbaik berdasarkan spesifikasi dan tujuan penggunaan. 
        Kamu hanya perlu memasukkan spesifikasi dari 2 hingga 4 laptop yang ingin dibandingkan. 
        Jika belum tahu speknya, kamu bisa cek di 
        {' '}
        <a href="https://laptopmedia.com/specs/" target="_blank" rel="noopener noreferrer" className="text-blue-800 underline">
          laptopmedia.com/specs
        </a>.
      </p>

      <label className="block mb-2 text-sm text-gray-600">Tujuan Penggunaan</label>
      <select value={usage} onChange={e => setUsage(e.target.value)} className="w-full mb-4 p-2 border rounded text-gray-600">
        <option>Game</option>
        <option>Kerja</option>
        <option>Belajar</option>
        <option>Lainnya</option>
      </select>

      <label className="block mb-2 text-sm text-gray-600">Jumlah Laptop (2–4)</label>
      <input type="number" min={2} max={4} value={count} onChange={e => setCount(parseInt(e.target.value))} className="w-full mb-6 p-2 border rounded text-gray-600" />

      <button onClick={handleNext} className="font-bold w-full bg-blue-800 text-white rounded py-2 hover:bg-blue-700">Next</button>
    </CardContainer>
  )
}
