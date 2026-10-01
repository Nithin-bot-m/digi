'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Section, SectionHeading, CtaButton } from '@/components/digi/ui'
import { CtaArrow } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { TurnstileWidget } from '@/components/digi/turnstile-widget'
import { BorderBeam } from '@/components/ui/border-beam'
import { analytics } from '@/lib/analytics'
import { TURNSTILE_SITE_KEY } from '@/lib/turnstile'

/**
 * SectionContact — Digi∞Artha Contact (Source A §21 verbatim)
 * Tone: dark. Accent: full brand gradient.
 *
 * Form fields (verbatim): Name, Work Email, Phone, Company, Website, Industry,
 * "What do you need help with?" (Select with 12 options), Message.
 * CTA: Start the Conversation →
 * Alt CTA: Not ready to talk? Get Your Digital Growth Score →
 *
 * Submits POST /api/contact with all fields + hidden utm (captured on mount
 * from window.location.search). Honeypot field `company_website` (hidden,
 * aria-hidden). On success, toast with the API message + reset form. On
 * error, render the API error in a red <p> above the form. Uses
 * react-hook-form + zod for validation.
 */

const TOPICS = [
  'Performance Marketing',
  'SEO',
  'AI Search',
  'Creative & Content',
  'Website',
  'CRO',
  'Lead Generation',
  'Analytics',
  'CRM',
  'Automation',
  'AI Solutions',
  'Complete Growth Strategy',
] as const

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  email: z
    .string()
    .min(1, 'A valid work email is required')
    .email('A valid work email is required')
    .max(160),
  phone: z.string().max(40).optional(),
  company: z.string().max(160).optional(),
  website: z.string().max(200).optional(),
  industry: z.string().max(160).optional(),
  topic: z.string().max(60).optional(),
  message: z.string().max(4000).optional(),
  company_website: z.string().max(200).optional(), // honeypot — must stay empty
  utm: z.string().max(800).optional(),
  turnstile_token: z.string().max(2048).optional(),
})

type FormValues = z.infer<typeof schema>

export function SectionContact() {
  const reduced = useReducedMotion()
  const { toast } = useToast()
  const [serverError, setServerError] = React.useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = React.useState('')
  const formStartedRef = React.useRef(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      industry: '',
      topic: '',
      message: '',
      company_website: '',
      utm: '',
      turnstile_token: '',
    },
  })

  // Capture UTM string once on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const utm = window.location.search || ''
    setValue('utm', utm)
  }, [setValue])

  const topicValue = useWatch({ control, name: 'topic' })

  // analytics: form_start fires once on first interaction
  const onFormStart = React.useCallback(() => {
    if (formStartedRef.current) return
    formStartedRef.current = true
    analytics.formStart('contact')
  }, [])

  // keep the turnstile_token field in sync with the widget
  React.useEffect(() => {
    setValue('turnstile_token', turnstileToken, { shouldValidate: false })
  }, [turnstileToken, setValue])

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    // In production with Turnstile enabled, block submit until token is set
    if (TURNSTILE_SITE_KEY && !values.turnstile_token) {
      setServerError('Please complete the anti-spam verification.')
      return
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = (await res.json().catch(() => ({}))) as {
        message?: string
        error?: string
      }
      if (!res.ok) {
        const msg = data.error || 'Something went wrong. Please try again.'
        setServerError(msg)
        return
      }
      analytics.formSubmit('contact', values.topic || undefined)
      toast({
        title: 'Message received.',
        description:
          data.message ||
          'A growth strategist will reply within one business day.',
      })
      reset()
      setTurnstileToken('')
    } catch {
      setServerError(
        'Could not submit right now. Please email hello@digiartha.com.',
      )
    }
  }

  return (
    <Section id="contact" scene="C" tone="dark">
      <SectionHeading
        eyebrow="CONTACT"
        h2={
          <>
            Let&rsquo;s build your next{' '}
            <span className="text-ribbon">growth engine</span>.
          </>
        }
        lead="Tell us what you&rsquo;re trying to achieve, what is currently holding growth back and which part of the customer journey you want to improve."
        align="left"
      />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* LEFT — heading recap + alternative CTA */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col gap-6"
        >
          <div className="glass-dark relative overflow-hidden rounded-2xl border border-white/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
              Self-serve diagnostic
            </p>
            <p className="mt-3 text-base leading-relaxed text-mist/80">
              Want an instant baseline before our strategy call? Run the 10-dimension diagnostic in under 60 seconds.
            </p>
            <div className="mt-5">
              <CtaButton href="/growth-score" variant="ghost">
                Get Your Digital Growth Score →
              </CtaButton>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mist/55">
              What happens next
            </p>
            <ol className="mt-4 space-y-3 text-sm text-mist/75">
              <li className="flex gap-3">
                <span className="font-mono text-cyan">01</span>
                <span>A growth strategist reviews your message within one business day.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-royal">02</span>
                <span>We diagnose where you are today and where the biggest growth gap sits.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-violet">03</span>
                <span>You receive a recommended next step — diagnostic, sprint, or full growth system.</span>
              </li>
            </ol>
          </div>
        </motion.div>

        {/* RIGHT — the form */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          className="relative"
        >
          {/* Server error */}
          {serverError && (
            <p
              role="alert"
              className="mb-4 rounded-md border border-coral/40 bg-coral/10 px-4 py-3 text-sm font-medium text-coral"
            >
              {serverError}
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            onPointerDown={onFormStart}
            noValidate
            className="glass-dark relative overflow-hidden flex flex-col gap-5 rounded-2xl p-6 sm:p-8"
            aria-label="Contact Digi∞Artha"
          >
            <BorderBeam size={250} duration={12} borderWidth={1.5} />
            {/* Honeypot — hidden from humans, visible to bots */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company_website">Company website</label>
              <input
                id="company_website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register('company_website')}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Name" required error={errors.name?.message} id="name">
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  aria-invalid={!!errors.name}
                  {...register('name')}
                />
              </Field>

              <Field label="Work Email" required error={errors.email?.message} id="email">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@work.com"
                  aria-invalid={!!errors.email}
                  {...register('email')}
                />
              </Field>

              <Field label="Phone" id="phone" error={errors.phone?.message}>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 90000 00000"
                  {...register('phone')}
                />
              </Field>

              <Field label="Company" id="company" error={errors.company?.message}>
                <Input
                  id="company"
                  autoComplete="organization"
                  placeholder="Company name"
                  {...register('company')}
                />
              </Field>

              <Field label="Website" id="website" error={errors.website?.message}>
                <Input
                  id="website"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="https://"
                  {...register('website')}
                />
              </Field>

              <Field label="Industry" id="industry" error={errors.industry?.message}>
                <Input
                  id="industry"
                  autoComplete="organization-title"
                  placeholder="e.g. B2B SaaS, EdTech, Real Estate"
                  {...register('industry')}
                />
              </Field>
            </div>

            {/* Topic — radix Select wired to react-hook-form via setValue */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="topic" className="text-mist/80">
                What do you need help with?
              </Label>
              <Select
                value={topicValue || ''}
                onValueChange={(v) => setValue('topic', v, { shouldValidate: false })}
              >
                <SelectTrigger
                  id="topic"
                  className="w-full border-white/15 bg-white/5 text-mist data-[placeholder]:text-mist/50"
                  aria-label="What do you need help with?"
                >
                  <SelectValue placeholder="Select a focus area" />
                </SelectTrigger>
                <SelectContent className="border-white/15 bg-ink-soft text-mist">
                  {TOPICS.map((t) => (
                    <SelectItem key={t} value={t} className="text-mist/90 focus:bg-white/10 focus:text-mist">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Field label="Message" id="message" error={errors.message?.message}>
              <Textarea
                id="message"
                rows={5}
                placeholder="Tell us what you are trying to achieve, what is holding growth back, and which part of the journey you want to improve."
                className="border-white/15 bg-white/5 text-mist placeholder:text-mist/45"
                {...register('message')}
              />
            </Field>

            {/* Cloudflare Turnstile — renders nothing in dev (no keys) */}
            {TURNSTILE_SITE_KEY && (
              <div className="flex flex-col gap-2">
                <Label className="text-mist/80">Anti-spam verification</Label>
                <TurnstileWidget onToken={setTurnstileToken} />
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ribbon px-5 py-2.5 text-sm font-semibold text-white glow-ribbon transition-all hover:scale-[1.02] disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting…' : 'Start the Conversation'}
              {!isSubmitting && <CtaArrow />}
            </Button>

            <p className="text-xs text-mist/45">
              By submitting, you agree to be contacted about your enquiry. See our
              Privacy and Cookie Policy below.
            </p>
          </form>
        </motion.div>
      </div>
    </Section>
  )
}

function Field({
  label,
  id,
  required,
  error,
  children,
}: {
  label: string
  id: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-mist/80">
        {label}
        {required && <span className="ml-1 text-coral">*</span>}
      </Label>
      {children}
      {error && (
        <p role="alert" className="text-xs font-medium text-coral">
          {error}
        </p>
      )}
    </div>
  )
}
