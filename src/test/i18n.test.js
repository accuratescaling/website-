import { describe, it, expect } from 'vitest'
import en from '../i18n/en'
import ar from '../i18n/ar'

/* ----------------------------------------------------------------------------
 *  The dictionaries are the site's biggest breakage risk: a key added to one
 *  file and forgotten in the other renders `undefined` on a live page in one
 *  language only, which is easy to ship and hard to notice. These tests make
 *  that impossible to merge.
 * --------------------------------------------------------------------------*/

/** Every leaf path in an object, as dotted strings. */
function paths(node, prefix = '', out = []) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => paths(v, `${prefix}[${i}]`, out))
    return out
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) paths(v, prefix ? `${prefix}.${k}` : k, out)
    return out
  }
  out.push(prefix)
  return out
}

/** Walks both trees together, collecting shape differences. */
function diff(a, b, path = 'root', out = []) {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      out.push(`${path}: array/non-array mismatch`)
      return out
    }
    if (a.length !== b.length) out.push(`${path}: length ${a.length} vs ${b.length}`)
    a.forEach((v, i) => b[i] !== undefined && diff(v, b[i], `${path}[${i}]`, out))
    return out
  }
  if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object') {
      out.push(`${path}: object missing on the other side`)
      return out
    }
    for (const k of Object.keys(a)) {
      if (!(k in b)) out.push(`${path}.${k}: missing in ar`)
      else diff(a[k], b[k], `${path}.${k}`, out)
    }
    for (const k of Object.keys(b)) if (!(k in a)) out.push(`${path}.${k}: extra in ar`)
    return out
  }
  if (typeof a !== typeof b) out.push(`${path}: ${typeof a} vs ${typeof b}`)
  return out
}

describe('i18n dictionaries', () => {
  it('are structurally identical', () => {
    expect(diff(en, ar)).toEqual([])
  })

  it('expose the same set of leaf paths', () => {
    expect(paths(ar).sort()).toEqual(paths(en).sort())
  })

  it('have no accidentally blank Arabic strings', () => {
    /* Two blanks are structural, not lost translations:
     *   · `hookGloss` — the Arabic hook needs no English gloss of itself.
     *   · any `title.post` — headings use a {pre, accent, post} shape and
     *     `post` is simply empty whenever nothing follows the accent.
     * Anything else that is blank is a translation that went missing. */
    const isStructuralBlank = (path) =>
      path === 'clinicos.hookGloss' || /(^|\.)title\.post$/.test(path)

    const blanks = []
    const walk = (node, path = '') => {
      if (typeof node === 'string') {
        if (!node.trim() && !isStructuralBlank(path)) blanks.push(path)
        return
      }
      if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${path}[${i}]`))
      if (node && typeof node === 'object')
        Object.entries(node).forEach(([k, v]) => walk(v, path ? `${path}.${k}` : k))
    }
    walk(ar)
    expect(blanks).toEqual([])
  })

  it('keeps brand names in Latin script in Arabic', () => {
    expect(ar.brand.name).toBe('Accurate Scaling')
    const arText = JSON.stringify(ar)
    expect(arText).not.toMatch(/أكيوريت/)
    expect(arText).not.toMatch(/كلينيك أو إس/)
  })
})

describe('pricing', () => {
  for (const [name, dict] of [
    ['en', en],
    ['ar', ar],
  ]) {
    describe(name, () => {
      it('has exactly three tiers plus a separate enterprise entry', () => {
        expect(dict.pricing.tiers).toHaveLength(3)
        expect(dict.pricing.enterprise).toBeTruthy()
        expect(dict.pricing.enterprise.upfront).toBeUndefined()
        expect(dict.pricing.enterprise.monthly).toBeUndefined()
      })

      it('keeps prices switched off', () => {
        expect(dict.pricing.showPrices).toBe(false)
      })

      it('gives every tier a scoped-on-the-call line to show instead', () => {
        for (const tier of dict.pricing.tiers) expect(tier.quote?.trim()).toBeTruthy()
      })

      it('never exposes a figure in any RENDERED string', () => {
        /* upfront/monthly are deliberately retained but hidden behind
         * showPrices, so they are excluded. Everything else is rendered text
         * and must stay free of numbers. */
        const hidden = new Set(['upfront', 'monthly', 'originalUpfront', 'originalMonthly'])
        const price = /\d[\d,]*\s*(JD|د\.أ)/
        const leaks = []
        const walk = (node, path, key) => {
          if (typeof node === 'string') {
            if (!hidden.has(key) && price.test(node)) leaks.push(`${path}: "${node}"`)
            return
          }
          if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${path}[${i}]`, key))
          if (node && typeof node === 'object')
            Object.entries(node).forEach(([k, v]) => walk(v, `${path}.${k}`, k))
        }
        walk(dict, name, null)
        expect(leaks).toEqual([])
      })
    })
  }
})

