/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
 
import { useChat } from "ai/react"
import { Chat } from "@/components/ui/chat"
 
export default function AIChat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    stop,
  } = useChat()
 
  const suggestions = [
    "What is the capital of France?", 
    "Tell me a joke",
    "Explain quantum computing", 
    "How do I learn React?"
  ]
 
  return (
    <Chat
      messages={messages}
      handleSubmit={handleSubmit as any}
      input={input}
      handleInputChange={handleInputChange}
      isGenerating={isLoading}
      stop={stop}
      append={append}
      suggestions={suggestions}
    />
  )
}