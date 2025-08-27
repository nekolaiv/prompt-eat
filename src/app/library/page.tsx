import { getAllPrompts } from '@/lib/prompts'
import PromptLibrary from '@/components/PromptLibrary'

export default async function Library() {
  const prompts = await getAllPrompts()

  return (
    <div className="min-h-screen bg-background">
      <PromptLibrary prompts={prompts} />
    </div>
  )
}