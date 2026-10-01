import type { Metadata } from 'next'
import { PageHero, PageSection } from '@/components/digi/page-hero'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How Digi∞Artha uses essential and analytics cookies.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Cookies' }]}
        eyebrow="LEGAL"
        h1={<>Cookie <span className="text-ribbon-diag">Policy</span></>}
        lead="This site uses essential cookies for core functionality and analytics cookies to understand how visitors use the site."
      />
      <PageSection tone="mist">
        <div className="prose prose-lg max-w-2xl text-ink/80">
          <h2 className="text-2xl font-bold text-ink">Essential cookies</h2>
          <p className="mt-2">
            Required for core site functionality — session continuity, security, and form
            submission. These cannot be disabled.
          </p>
          <h2 className="mt-8 text-2xl font-bold text-ink">Analytics cookies</h2>
          <p className="mt-2">
            Used to understand how visitors discover and use the site — sessions, device type,
            engagement depth, conversion events. We use this to improve the site and our services.
          </p>
          <h2 className="mt-8 text-2xl font-bold text-ink">Consent</h2>
          <p className="mt-2">
            Consent is requested where required by the visitor's market. Where consent is required
            and not given, non-essential cookies are not set.
          </p>
          <h2 className="mt-8 text-2xl font-bold text-ink">Third-party tags</h2>
          <p className="mt-2">
            Where we embed third-party analytics or advertising tags, those vendors may set their
            own cookies subject to their own policies. We do not display third-party advertising
            networks on this site.
          </p>
          <p className="mt-8 text-sm text-ink/50">
            For specific data requests, contact{' '}
            <a href="mailto:hello@digiartha.com" className="underline">hello@digiartha.com</a>.
          </p>
        </div>
      </PageSection>
    </>
  )
}
