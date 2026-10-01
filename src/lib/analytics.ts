'use client'

/**
 * Digi∞Artha — analytics layer (Master Prompt §12 + §25)
 *
 * Pluggable measurement: if `NEXT_PUBLIC_GA_ID` is set (e.g. "G-XXXXXXXXXX"),
 * the GA4 script is loaded after consent and events are pushed to
 * `window.dataLayer` + `gtag()`. If unset, `track()` becomes a no-op
 * (dev mode, no network calls).
 *
 * Event taxonomy (Source A §26):
 *  - cta_click            { cta_id, cta_label, destination }
 *  - form_start           { form_id }
 *  - form_submit          { form_id, topic }
 *  - growth_score_start   { url }
 *  - growth_score_complete{ url, overall }
 *  - panel_open           { panel_id, type }   // solution / pillar / stage
 *  - consultation_booking { method }           // phone / whatsapp / email
 *  - sector_selected      { sector }
 *  - lane_selected        { lane }
 *  - chapter_reached      { chapter }
 *
 * Consent gate:
 *  - If `NEXT_PUBLIC_GA_ID` is unset → no script load, no events fire.
 *  - If set + consent granted → load GA4, fire events.
 *  - If set + consent denied   → do not load GA4, do not fire events.
 *
 * The <ConsentBanner> component shows only when `NEXT_PUBLIC_GA_ID` is set.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

type ConsentState = 'granted' | 'denied' | 'unknown'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    __digiConsent?: ConsentState
  }
}

const CONSENT_KEY = 'digi_consent_v1'

export function readConsent(): ConsentState {
  if (typeof window === 'undefined') return 'unknown'
  try {
    return (localStorage.getItem(CONSENT_KEY) as ConsentState) || 'unknown'
  } catch {
    return 'unknown'
  }
}

export function writeConsent(state: ConsentState) {
  try {
    localStorage.setItem(CONSENT_KEY, state)
    window.__digiConsent = state
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: state === 'granted' ? 'granted' : 'denied',
      })
    }
    window.dispatchEvent(new CustomEvent('digi:consent-change', { detail: state }))
  } catch {
    /* noop */
  }
}

export function isAnalyticsEnabled(): boolean {
  if (!GA_ID) return false
  if (typeof window === 'undefined') return false
  return readConsent() === 'granted'
}

/**
 * Track an event. No-op until:
 *  (a) a GA ID is configured, AND
 *  (b) the visitor has granted consent.
 */
export function track(event: string, payload?: Record<string, unknown>) {
  if (!GA_ID) return
  if (typeof window === 'undefined') return
  if (readConsent() !== 'granted') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...payload, _ts: Date.now() })
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload)
  }
}

/** Specialised helpers so call sites read cleanly. */
export const analytics = {
  ctaClick: (ctaId: string, label: string, destination?: string) =>
    track('cta_click', { cta_id: ctaId, cta_label: label, destination }),
  formStart: (formId: string) => track('form_start', { form_id: formId }),
  formSubmit: (formId: string, topic?: string) => track('form_submit', { form_id: formId, topic }),
  scoreStart: (url: string) => track('growth_score_start', { url }),
  scoreComplete: (url: string, overall: number) =>
    track('growth_score_complete', { url, overall }),
  panelOpen: (panelId: string, type: string) => track('panel_open', { panel_id: panelId, type }),
  laneSelected: (lane: string) => track('lane_selected', { lane }),
  sectorSelected: (sector: string) => track('sector_selected', { sector }),
  chapterReached: (chapter: string) => track('chapter_reached', { chapter }),
}

export const GA_MEASUREMENT_ID = GA_ID
