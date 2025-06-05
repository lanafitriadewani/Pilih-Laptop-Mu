export default function CardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xl">
      {children}
    </div>
  )
}
