declare module 'color-parse' {
  export interface Color {
    readonly space: string
    readonly values: [number, number, number]
    readonly alpha: number
  }

  export default function parseColor(input: string | number | number[] | Record<string, number>): Color
}
