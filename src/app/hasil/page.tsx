'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CardContainer from '@/components/CardContainer'

export default function ResultPage() {
  const [result, setResult] = useState<any>(null)
  const [ranking, setRanking] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('laptops') || '[]')
    const weights = JSON.parse(localStorage.getItem('weights') || '{}')
    // Dummy CPU/GPU benchmark data (should match the dropdowns)
    const cpuBench = [
      { cpuName: 'AMD Ryzen Threadripper PRO 5995WX', cpuMark: 108822 },
      { cpuName: 'AMD EPYC 7763', cpuMark: 88338 },
      { cpuName: 'AMD EPYC 7J13', cpuMark: 86006 },
      { cpuName: 'AMD EPYC 7713', cpuMark: 85861 },
    ]
    const gpuBench = [
      { gpuName: 'GeForce RTX 3090 Ti', G3Dmark: 29094 },
      { gpuName: 'GeForce RTX 3080 Ti', G3Dmark: 26887 },
      { gpuName: 'GeForce RTX 3090', G3Dmark: 26395 },
      { gpuName: 'Radeon RX 6900 XT', G3Dmark: 25458 },
    ]
    // Attach benchmark scores to each laptop
    const laptops = data.map((l: any) => {
      const cpu = cpuBench.find(c => c.cpuName === l.cpu)
      const gpu = gpuBench.find(g => g.gpuName === l.gpu)
      return {
        ...l,
        cpuMark: cpu ? cpu.cpuMark : 0,
        gpuMark: gpu ? gpu.G3Dmark : 0,
        ram: parseFloat(l.ram) || 0,
        storage: parseFloat(l.storage) || 0,
        screen: parseFloat(l.screen) || 0,
        price: parseFloat(l.price) || 0,
      }
    })
    // Normalization
    const getMax = (arr: any[], key: string) => Math.max(...arr.map(l => l[key] || 0))
    const getMin = (arr: any[], key: string) => Math.min(...arr.map(l => l[key] || 0))
    const max = {
      cpuMark: getMax(laptops, 'cpuMark'),
      gpuMark: getMax(laptops, 'gpuMark'),
      ram: getMax(laptops, 'ram'),
      storage: getMax(laptops, 'storage'),
      screen: getMax(laptops, 'screen'),
    }
    const min = {
      price: getMin(laptops, 'price'),
    }
    // Calculate scores
    const scored = laptops.map((l: any) => {
      // Benefit: normalized = value / max
      // Cost: normalized = min / value
      const norm: Record<string, number> = {
        cpu: max.cpuMark ? l.cpuMark / max.cpuMark : 0,
        gpu: max.gpuMark ? l.gpuMark / max.gpuMark : 0,
        ram: max.ram ? l.ram / max.ram : 0,
        storage: max.storage ? l.storage / max.storage : 0,
        screen: max.screen ? l.screen / max.screen : 0,
        price: l.price > 0 ? min.price / l.price : 0, // cost
      }
      let score = 0;
      (Object.keys(weights) as Array<keyof typeof norm>).forEach((k: keyof typeof norm) => {
        score += (norm[k] || 0) * (weights[k] || 0)
      })
      return { ...l, score }
    })
    // Sort by score descending
    scored.sort((a: any, b: any) => b.score - a.score)
    setRanking(scored)
    setResult(scored[0])
  }, [])

  if (!result) return null

  const handleBack = () => {
    router.push('/')
  }

  return (
    <CardContainer>
      <h2 className="text-xl font-bold mb-4 text-center text-blue-800">Laptop Terbaik</h2>
      <ul className="text-sm text-gray-600 space-y-1 mb-4">
        <li><strong>Nama:</strong> {result.name}</li>
        <li><strong>CPU:</strong> {result.cpu}</li>
        <li><strong>GPU:</strong> {result.gpu}</li>
        <li><strong>RAM:</strong> {result.ram} GB</li>
        <li><strong>Storage:</strong> {result.storage} GB</li>
        <li><strong>Layar:</strong> {result.screen} inch</li>
        <li><strong>Harga:</strong> Rp {result.price}</li>
        <li><strong>Skor Akhir:</strong> {result.score ? result.score.toFixed(4) : '-'}</li>
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
