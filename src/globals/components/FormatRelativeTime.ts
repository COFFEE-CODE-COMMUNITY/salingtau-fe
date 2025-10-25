export function FormatRelativeTime(dateISO?: string | Date): string {
  if (!dateISO) return "Unknown time"

  const date = new Date(dateISO)
  if (isNaN(date.getTime())) return "Invalid date"

  const now = Date.now()
  const then = date.getTime()
  const diffMs = then - now

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const divisions: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [60_000, 'minute'], // ms/minute
    [60 * 60_000, 'hour'],
    [24 * 60 * 60_000, 'day'],
    [7 * 24 * 60 * 60_000, 'week'],
    [30 * 24 * 60 * 60_000, 'month'],
    [365 * 24 * 60 * 60_000, 'year'],
  ]

  const abs = Math.abs(diffMs)
  if (abs < divisions[0][0]) {
    const minutes = Math.round(diffMs / 60_000) || 0
    return rtf.format(minutes, 'minute')
  }

  for (let i = 0; i < divisions.length; i++) {
    const [ms, unit] = divisions[i]
    const next = divisions[i + 1]?.[0]
    if (!next || abs < next) {
      const value = Math.round(diffMs / ms)
      if (!isFinite(value)) return "Invalid date"
      return rtf.format(value, unit)
    }
  }

  return date.toLocaleString()
}
