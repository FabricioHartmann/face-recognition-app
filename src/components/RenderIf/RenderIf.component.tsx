import type { RenderIfProps } from './RenderIf.types'

export function RenderIf({condition, children} : RenderIfProps) {
    return (
        condition ? <div>{children}</div> : null
    )
}