import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'
import { getAllPrompts, getPromptBySlug } from '@/lib/prompts'
import CopyButton from '@/components/CopyButton'
import BackButton from '@/components/BackButton'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const prompts = getAllPrompts()
  return prompts.map((prompt) => ({
    slug: prompt.slug,
  }))
}

export default async function PromptDetail({ params }: Props) {
  const prompt = getPromptBySlug(params.slug)
  
  if (!prompt) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <BackButton />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{prompt.title}</h1>
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-lg">
              {prompt.category}
            </span>
          </div>
          <p className="text-lg text-muted-foreground mb-4">{prompt.description}</p>
          
          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {prompt.tags.map((tag) => (
              <span key={tag} className="text-sm bg-secondary px-3 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Prompt Content */}
        <div className="bg-card border rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Prompt</h2>
            <CopyButton text={prompt.content} />
          </div>
          <div className="bg-muted p-4 rounded border overflow-x-auto">
            <pre className="whitespace-pre-wrap text-sm font-mono">{prompt.content}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}