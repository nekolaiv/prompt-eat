'use client'
import { useState } from 'react'

interface Props {
  text: string
  className?: string
}

export default function CopyButton({ text, className = '' }: Props) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <button
      onClick={copyToClipboard}
      className={`bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors ${className}`}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}