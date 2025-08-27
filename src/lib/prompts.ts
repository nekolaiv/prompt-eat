import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Prompt {
  slug: string
  title: string
  category: string
  description: string
  tags: string[]
  content: string
  filePath: string
}

const promptsDirectory = path.join(process.cwd(), 'src/prompts')

export function getAllPrompts(): Prompt[] {
  const prompts: Prompt[] = []

  function readDirectory(dir: string) {
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        readDirectory(fullPath)
      } else if (item.endsWith('.md')) {
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        
        const slug = path.basename(item, '.md')
        
        prompts.push({
          slug,
          title: data.title || slug,
          category: data.category || 'Uncategorized',
          description: data.description || '',
          tags: data.tags || [],
          content,
          filePath: fullPath
        })
      }
    }
  }

  readDirectory(promptsDirectory)
  return prompts
}

export function getPromptBySlug(slug: string): Prompt | null {
  const prompts = getAllPrompts()
  return prompts.find(prompt => prompt.slug === slug) || null
}