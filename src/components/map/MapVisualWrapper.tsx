export default function MapVisualWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="absolute inset-0 z-10 md:static md:flex-1 bg-zinc-950">
      <div className="h-full w-full md:p-4">
        <div className="h-full w-full overflow-hidden md:rounded-[2rem] md:border border-zinc-800 shadow-2xl relative">
          {/* Inner Shadow Overlay */}
          <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_100px_rgba(0,0,0,0.7)] md:rounded-[2rem]" />
          {children}
        </div>
      </div>
    </main>
  )
}
