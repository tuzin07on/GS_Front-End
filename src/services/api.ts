import type { ApiError } from '../types/api'

const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

export class ApiRequestError extends Error {
  status?: number
  data?: ApiError

  constructor(message: string, status?: number, data?: ApiError) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.data = data
  }
}

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (!API_URL) {
    throw new ApiRequestError('A URL da API ainda não foi configurada.')
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  })

  if (!response.ok) {
    let data: ApiError | undefined
    try {
      data = await response.json() as ApiError
    } catch {
      // A API deve devolver JSON; mantém uma mensagem segura se não devolver.
    }
    throw new ApiRequestError(
      data?.mensagem ?? `Não foi possível concluir a operação (${response.status}).`,
      response.status,
      data,
    )
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}
