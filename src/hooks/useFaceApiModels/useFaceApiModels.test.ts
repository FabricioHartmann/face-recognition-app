import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { useFaceApiModels } from './'
import * as faceapi from 'face-api.js'
import type { FaceApiStatus } from './useFaceApiModels.types'

vi.mock('face-api.js', () => ({
  nets: {
    tinyFaceDetector: { loadFromUri: vi.fn().mockResolvedValue(undefined) },
    faceLandmark68Net: { loadFromUri: vi.fn().mockResolvedValue(undefined) },
    faceRecognitionNet: { loadFromUri: vi.fn().mockResolvedValue(undefined) },
  },
}))

describe('useFaceApiModels', () => {
  afterEach(() => {
    vi.clearAllMocks() // limpa mocks entre testes
  })

  it('deve iniciar em idle e ir para loading imediatamente', () => {
    let firstValue: FaceApiStatus | undefined

    const { result } = renderHook(() => {
      const status = useFaceApiModels()
      if (firstValue === undefined) firstValue = status
      return status
    })

    expect(firstValue).toBe('idle')       // primeiro valor
    expect(result.current).toBe('loading') // valor atual após useEffect
  })

  it('deve mudar para success quando modelos carregam', async () => {
    const { result } = renderHook(() => useFaceApiModels())

    await waitFor(() => {
      expect(result.current).toBe('success')
    })
  })

  it('deve mudar para error se algum modelo falhar', async () => {
    // Sobrescreve apenas a próxima chamada do tinyFaceDetector
    ;(faceapi.nets.tinyFaceDetector.loadFromUri as any).mockRejectedValueOnce(new Error('fail'))

    const { result } = renderHook(() => useFaceApiModels())

    await waitFor(() => {
      expect(result.current).toBe('error')
    })
  })
})