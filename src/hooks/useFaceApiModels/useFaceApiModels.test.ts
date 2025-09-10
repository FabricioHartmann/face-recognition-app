import { vi } from 'vitest'
import * as faceapi from 'face-api.js'
import { renderHook, waitFor } from '@testing-library/react'
import type { FaceApiStatus } from './useFaceApiModels.types'
import { useFaceApiModels } from './'

vi.mock('face-api.js', () => ({
  nets: {
    tinyFaceDetector: { loadFromUri: vi.fn().mockResolvedValue(undefined) },
    faceLandmark68Net: { loadFromUri: vi.fn().mockResolvedValue(undefined) },
    faceRecognitionNet: { loadFromUri: vi.fn().mockResolvedValue(undefined) },
  },
}))

describe('useFaceApiModels', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('deve iniciar em idle e ir para loading imediatamente', () => {
    let firstValue: FaceApiStatus | undefined

    const { result } = renderHook(() => {
      const status = useFaceApiModels()
      if (firstValue === undefined) firstValue = status
      return status
    })

    expect(firstValue).toBe('idle')
    expect(result.current).toBe('loading')
  })

  it('deve mudar para success quando modelos carregam', async () => {
    const { result } = renderHook(() => useFaceApiModels())

    await waitFor(() => {
      expect(result.current).toBe('success')
    })
  })

  it('deve mudar para error se algum modelo falhar', async () => {
    ;(faceapi.nets.tinyFaceDetector.loadFromUri as any).mockRejectedValueOnce(new Error('fail'))

    const { result } = renderHook(() => useFaceApiModels())

    await waitFor(() => {
      expect(result.current).toBe('error')
    })
  })
})