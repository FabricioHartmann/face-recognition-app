import type { RenderIfProps } from './RenderIf.types'

export function RenderIf({condition, children} : RenderIfProps) {
    return (
        condition ? <>{children}</> : null
    )
}