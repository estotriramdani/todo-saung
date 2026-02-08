export interface ResponseApiMessages {
  data: IMessage[]
}

export interface IMessage {
  id: number
  chat_id: number
  type: 'user' | 'bot'
  content: string
  created_at: string
}

export interface ResponseApiAI {
  data: IMessageAI
}

export interface IMessageAI {
  prompt: string
  answer: string
  // detail: Detail
}

export interface Detail {
  candidates: Candidate[]
  usageMetadata: UsageMetadata
  modelVersion: string
  responseId: string
}

export interface Candidate {
  content: Content
  finishReason: string
  index: number
}

export interface Content {
  parts: Part[]
  role: string
}

export interface Part {
  text: string
}

export interface UsageMetadata {
  promptTokenCount: number
  candidatesTokenCount: number
  totalTokenCount: number
  promptTokensDetails: PromptTokensDetail[]
  thoughtsTokenCount: number
}

export interface PromptTokensDetail {
  modality: string
  tokenCount: number
}
