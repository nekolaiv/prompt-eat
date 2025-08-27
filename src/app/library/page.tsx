import { getAllPrompts } from '@/lib/prompts'
import Link from 'next/link'

export default async function Library() {
  const prompts = await getAllPrompts()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search prompts..."
            className="w-full p-3 border rounded-lg mb-4"
          />
          <div className="flex gap-2 flex-wrap">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
              All
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-secondary">
              Coding
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-secondary">
              Creative
            </button>
          </div>
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <div key={prompt.slug} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold">{prompt.title}</h3>
                <span className="text-xs bg-secondary px-2 py-1 rounded">
                  {prompt.category}
                </span>
              </div>
              <p className="text-muted-foreground mb-4">{prompt.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-1 flex-wrap">
                  {prompt.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-muted px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/prompts/${prompt.slug}`}>
                  <button className="text-sm text-primary hover:underline">
                    View →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}