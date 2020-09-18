import parseColor from 'color-parse'

export type RgbValues = [number, number, number]

const luminance = (rgb: RgbValues): number => {
  const [r, g, b] = rgb
    .map(v => v / 255)
    .map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
  return r * 0.2126 + g * 0.7152 + b * 0.0722
}

const contrast = (rgb0: RgbValues, rgb1: RgbValues): number => {
  const lum0 = luminance(rgb0)
  const lum1 = luminance(rgb1)
  const brightest = Math.max(lum0, lum1)
  const darkest = Math.min(lum0, lum1)
  return (brightest + 0.05) / (darkest + 0.05)
}

const invert = (rgb: RgbValues): RgbValues => rgb.map(v => 255 - v) as RgbValues

export const invertIfLowContrast = (textColor: string, bgColor: string): string => {
  const {values: textColorRgbValues} = parseColor(textColor)
  const {values: bgColorRgbValues} = parseColor(bgColor)

  const [r, g, b] = contrast(textColorRgbValues, bgColorRgbValues) < 5 ? invert(textColorRgbValues) : textColorRgbValues

  return `rgb(${r}, ${g}, ${b})`
}
