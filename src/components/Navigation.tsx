import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/library" className="text-xl font-bold">
            PrompEAT
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/library" className="text-sm hover:text-primary">
              Library
            </Link>
            <a 
              href="https://github.com" 
              className="text-sm hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}