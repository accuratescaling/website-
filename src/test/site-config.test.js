import { describe, it, expect, afterEach } from 'vitest'
import { site, calendlyUrl, calendlyIsPlaceholder } from '../config/site'

/* `site` is a shared mutable object; restore anything a test changes. */
const original = { ...site }
afterEach(() => Object.assign(site, original))

describe('calendlyUrl()', () => {
  it('normalises every accepted form to one full URL', () => {
    const expected = 'https://calendly.com/accuratescaling/discovery-call'
    for (const input of [
      'accuratescaling/discovery-call',
      'calendly.com/accuratescaling/discovery-call',
      'https://calendly.com/accuratescaling/discovery-call',
      '  accuratescaling/discovery-call  ',
      'https://calendly.com/accuratescaling/discovery-call/',
    ]) {
      site.calendlyUrl = input
      expect(calendlyUrl(), `input: ${input}`).toBe(expected)
    }
  })

  it('preserves an existing query string', () => {
    site.calendlyUrl = 'https://calendly.com/accuratescaling/15min?month=2026-09'
    expect(calendlyUrl()).toBe('https://calendly.com/accuratescaling/15min?month=2026-09')
  })

  it('reports the placeholder state correctly', () => {
    site.calendlyUrl = ''
    expect(calendlyIsPlaceholder()).toBe(true)
    site.calendlyUrl = 'YOUR-HANDLE/discovery-call'
    expect(calendlyIsPlaceholder()).toBe(true)
    site.calendlyUrl = 'accuratescaling'
    expect(calendlyIsPlaceholder()).toBe(false)
  })
})

describe('socials', () => {
  it('points Instagram at the correct handle', () => {
    expect(site.socials.instagram).toBe('https://www.instagram.com/accurate.scaling/')
  })
})
