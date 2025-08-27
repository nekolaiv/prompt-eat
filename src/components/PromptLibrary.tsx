'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Prompt } from '@/lib/prompts'

interface Props {
  prompts: Prompt[]
}

export default function PromptLibrary({ prompts }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(prompts.map(p => p.category))]
    return cats
  }, [prompts])

  // Filter prompts
  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All' || prompt.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [prompts, searchTerm, selectedCategory])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search prompts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-secondary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-4">
        {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''} found
      </p>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt) => (
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

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No prompts found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}