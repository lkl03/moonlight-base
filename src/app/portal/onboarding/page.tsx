'use client';

import { useEffect, useState, type CSSProperties, type FormEvent, type ChangeEvent } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getClientAuth } from '@/lib/firebase/client';

// ── Types ────────────────────────────────────────────────────────────────────

type ViewState = 'loading' | 'no-auth' | 'form' | 'submitting' | 'success' | 'error';

interface FormData {
  businessName: string;
  businessIndustry: string;
  businessDescription: string;
  primaryGoal: string;
  targetAudience: string;
  desiredPages: string[];
  hasExistingWebsite: boolean;
  existingWebsiteUrl: string;
  brandColors: string;
  brandFonts: string;
  designNotes: string;
  providingOwnContent: boolean;
  contentNotes: string;
  inspirationUrls: string;
  desiredFeatures: string[];
  launchTimeline: string;
  additionalNotes: string;
}

const EMPTY_FORM: FormData = {
  businessName: '',
  businessIndustry: '',
  businessDescription: '',
  primaryGoal: '',
  targetAudience: '',
  desiredPages: [],
  hasExistingWebsite: false,
  existingWebsiteUrl: '',
  brandColors: '',
  brandFonts: '',
  designNotes: '',
  providingOwnContent: false,
  contentNotes: '',
  inspirationUrls: '',
  desiredFeatures: [],
  launchTimeline: '',
  additionalNotes: '',
};

const PAGE_OPTIONS = ['Home', 'About', 'Services', 'Portfolio / Gallery', 'Blog', 'Pricing', 'Contact', 'FAQ', 'Testimonials', 'Booking / Appointments'];
const FEATURE_OPTIONS = ['Contact form', 'Newsletter signup', 'Live chat', 'Social media links', 'Google Maps embed', 'Online booking', 'E-commerce / shop', 'Client login area', 'Analytics / tracking', 'SEO optimisation'];
const INDUSTRY_OPTIONS = ['Retail / E-commerce', 'Health & Wellness', 'Food & Hospitality', 'Professional Services', 'Creative / Design', 'Technology', 'Real Estate', 'Education', 'Non-profit', 'Other'];
const GOAL_OPTIONS = ['Generate leads / enquiries', 'Sell products online', 'Build brand awareness', 'Showcase portfolio / work', 'Provide information to customers', 'Replace an outdated website', 'Other'];
const TIMELINE_OPTIONS = ['As soon as possible', '1–2 months', '2–3 months', '3–6 months', 'Flexible / no rush'];

// ── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#121717',
    color: '#ffffff',
    fontFamily: 'Raleway, sans-serif',
    padding: '2.5rem 1.5rem',
  },
  card: {
    maxWidth: '640px',
    margin: '0 auto',
  },
  labelTag: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: '#17F2A6',
    marginBottom: '1rem',
    display: 'block',
  },
  h1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 900,
    fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
    color: '#ffffff',
    marginBottom: '0.6rem',
    lineHeight: 1.15,
  },
  intro: {
    fontSize: '0.9rem',
    color: '#9ca3a3',
    lineHeight: 1.7,
    marginBottom: '2rem',
  },
  section: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: '#17F2A6',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  field: {
    marginBottom: '1.25rem',
  },
  label: {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#dcdcdc',
    marginBottom: '0.4rem',
  },
  required: {
    color: '#17F2A6',
    marginLeft: '2px',
  },
  input: {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    color: '#ffffff',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.9rem',
    padding: '0.65rem 0.9rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
  },
  textarea: {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    color: '#ffffff',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.9rem',
    padding: '0.65rem 0.9rem',
    outline: 'none',
    resize: 'vertical' as const,
    minHeight: '90px',
    boxSizing: 'border-box' as const,
  },
  select: {
    width: '100%',
    background: '#1a2020',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    color: '#ffffff',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.9rem',
    padding: '0.65rem 0.9rem',
    outline: 'none',
    appearance: 'none' as const,
    boxSizing: 'border-box' as const,
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '0.6rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#dcdcdc',
    cursor: 'pointer',
    userSelect: 'none' as const,
  },
  checkbox: {
    accentColor: '#17F2A6',
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    flexShrink: 0,
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.875rem',
    color: '#dcdcdc',
    cursor: 'pointer',
    userSelect: 'none' as const,
  },
  hint: {
    fontSize: '0.78rem',
    color: '#6b7280',
    marginTop: '0.35rem',
  },
  divider: {
    border: 0,
    height: '1px',
    background: 'rgba(255,255,255,0.07)',
    margin: '2rem 0',
  },
  submitBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.8rem 2rem',
    background: '#45a383',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.95rem',
    fontWeight: 700,
    cursor: 'pointer',
    width: '100%',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.65rem 1.25rem',
    background: 'transparent',
    color: '#dcdcdc',
    border: '1.5px solid rgba(255,255,255,0.18)',
    borderRadius: '8px',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 600,
    textDecoration: 'none',
    marginBottom: '2rem',
    cursor: 'pointer',
  },
  errorBox: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    color: '#fca5a5',
    marginBottom: '1.25rem',
  },
  successCard: {
    textAlign: 'center' as const,
    padding: '2rem 0',
  },
  successIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  successTitle: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 900,
    fontSize: '1.6rem',
    color: '#17F2A6',
    marginBottom: '0.75rem',
  },
  successText: {
    fontSize: '0.9rem',
    color: '#9ca3a3',
    lineHeight: 1.7,
    marginBottom: '2rem',
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function toggleArrayItem(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [view, setView] = useState<ViewState>('loading');
  const [idToken, setIdToken] = useState('');
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [isUpdate, setIsUpdate] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const auth = getClientAuth();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setView('no-auth');
        return;
      }
      try {
        const token = await user.getIdToken();
        setIdToken(token);
        // Try to prefill from existing submission
        const res = await fetch('/api/portal/onboarding', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.found) {
            setIsUpdate(true);
            setForm({
              businessName: data.businessName ?? '',
              businessIndustry: data.businessIndustry ?? '',
              businessDescription: data.businessDescription ?? '',
              primaryGoal: data.primaryGoal ?? '',
              targetAudience: data.targetAudience ?? '',
              desiredPages: data.desiredPages ?? [],
              hasExistingWebsite: data.hasExistingWebsite ?? false,
              existingWebsiteUrl: data.existingWebsiteUrl ?? '',
              brandColors: data.brandColors ?? '',
              brandFonts: data.brandFonts ?? '',
              designNotes: data.designNotes ?? '',
              providingOwnContent: data.providingOwnContent ?? false,
              contentNotes: data.contentNotes ?? '',
              inspirationUrls: data.inspirationUrls ?? '',
              desiredFeatures: data.desiredFeatures ?? [],
              launchTimeline: data.launchTimeline ?? '',
              additionalNotes: data.additionalNotes ?? '',
            });
          }
        }
        setView('form');
      } catch {
        setView('error');
      }
    });
    return () => unsub();
  }, []);

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setValidationError('');
    setServerError('');

    const required: Array<[keyof FormData, string]> = [
      ['businessName', 'Business name'],
      ['businessIndustry', 'Industry'],
      ['businessDescription', 'Business description'],
      ['primaryGoal', 'Primary goal'],
      ['targetAudience', 'Target audience'],
      ['launchTimeline', 'Launch timeline'],
    ];
    for (const [key, label] of required) {
      if (!String(form[key]).trim()) {
        setValidationError(`${label} is required.`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    setView('submitting');
    try {
      const res = await fetch('/api/portal/onboarding', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? `HTTP ${res.status}`);
      }
      setView('success');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setView('form');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ── Views ──────────────────────────────────────────────────────────────────

  if (view === 'loading') {
    return (
      <main style={s.page}>
        <div style={s.card}>
          <p style={{ color: '#9ca3a3', fontSize: '0.9rem' }}>Loading…</p>
        </div>
      </main>
    );
  }

  if (view === 'no-auth') {
    return (
      <main style={s.page}>
        <div style={s.card}>
          <span style={s.labelTag}>Client Portal</span>
          <h1 style={s.h1}>Sign in required</h1>
          <p style={s.intro}>Please sign in to access your onboarding form.</p>
          <a href="/portal" style={s.backLink}>← Back to portal</a>
        </div>
      </main>
    );
  }

  if (view === 'success') {
    return (
      <main style={s.page}>
        <div style={s.card}>
          <div style={s.successCard}>
            <div style={s.successIcon}>✓</div>
            <h2 style={s.successTitle}>
              {isUpdate ? 'Details updated' : 'Onboarding submitted'}
            </h2>
            <p style={s.successText}>
              {isUpdate
                ? "We've updated your onboarding details. We'll be in touch if we have any questions."
                : "Thanks for completing your onboarding form. We'll review your details and be in touch soon to get your project started."}
            </p>
            <a href="/portal" style={{ ...s.backLink, marginBottom: 0 }}>← Back to portal</a>
          </div>
        </div>
      </main>
    );
  }

  const isSubmitting = view === 'submitting';

  return (
    <main style={s.page}>
      <div style={s.card}>
        <a href="/portal" style={s.backLink}>← Back to portal</a>

        <span style={s.labelTag}>Client Portal</span>
        <h1 style={s.h1}>{isUpdate ? 'Update onboarding' : 'Onboarding'}</h1>
        <p style={s.intro}>
          {isUpdate
            ? 'Review and update your details below. All changes will be saved when you resubmit.'
            : 'Tell us about your business and website goals so we can get started. Fields marked with * are required.'}
        </p>

        {validationError && <div style={s.errorBox}>{validationError}</div>}
        {serverError && <div style={s.errorBox}>{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>

          {/* ── Section 1: Business basics ── */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>1 · Business basics</h2>

            <div style={s.field}>
              <label style={s.label} htmlFor="businessName">
                Business name<span style={s.required}>*</span>
              </label>
              <input
                id="businessName"
                style={s.input}
                type="text"
                value={form.businessName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setField('businessName', e.target.value)}
                placeholder="e.g. Acme Studio"
                disabled={isSubmitting}
              />
            </div>

            <div style={s.field}>
              <label style={s.label} htmlFor="businessIndustry">
                Industry<span style={s.required}>*</span>
              </label>
              <select
                id="businessIndustry"
                style={s.select}
                value={form.businessIndustry}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setField('businessIndustry', e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">Select an industry</option>
                {INDUSTRY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div style={s.field}>
              <label style={s.label} htmlFor="businessDescription">
                Business description<span style={s.required}>*</span>
              </label>
              <textarea
                id="businessDescription"
                style={s.textarea}
                value={form.businessDescription}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setField('businessDescription', e.target.value)}
                placeholder="Briefly describe what your business does and who you serve."
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* ── Section 2: Offer & audience ── */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>2 · Offer &amp; audience</h2>

            <div style={s.field}>
              <label style={s.label} htmlFor="primaryGoal">
                Primary goal for this website<span style={s.required}>*</span>
              </label>
              <select
                id="primaryGoal"
                style={s.select}
                value={form.primaryGoal}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setField('primaryGoal', e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">Select a goal</option>
                {GOAL_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div style={s.field}>
              <label style={s.label} htmlFor="targetAudience">
                Target audience<span style={s.required}>*</span>
              </label>
              <textarea
                id="targetAudience"
                style={s.textarea}
                value={form.targetAudience}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setField('targetAudience', e.target.value)}
                placeholder="Describe your ideal customer — age, location, interests, pain points, etc."
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* ── Section 3: Website scope ── */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>3 · Website scope</h2>

            <div style={s.field}>
              <label style={s.label}>Pages needed</label>
              <div style={s.checkboxGrid}>
                {PAGE_OPTIONS.map((page) => (
                  <label key={page} style={s.checkboxLabel}>
                    <input
                      type="checkbox"
                      style={s.checkbox}
                      checked={form.desiredPages.includes(page)}
                      onChange={() => setField('desiredPages', toggleArrayItem(form.desiredPages, page))}
                      disabled={isSubmitting}
                    />
                    {page}
                  </label>
                ))}
              </div>
            </div>

            <div style={s.field}>
              <label style={s.toggleRow}>
                <input
                  type="checkbox"
                  style={s.checkbox}
                  checked={form.hasExistingWebsite}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setField('hasExistingWebsite', e.target.checked)}
                  disabled={isSubmitting}
                />
                I have an existing website
              </label>
            </div>

            {form.hasExistingWebsite && (
              <div style={s.field}>
                <label style={s.label} htmlFor="existingWebsiteUrl">Existing website URL</label>
                <input
                  id="existingWebsiteUrl"
                  style={s.input}
                  type="url"
                  value={form.existingWebsiteUrl}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setField('existingWebsiteUrl', e.target.value)}
                  placeholder="https://example.com"
                  disabled={isSubmitting}
                />
              </div>
            )}
          </div>

          {/* ── Section 4: Branding & design ── */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>4 · Branding &amp; design</h2>

            <div style={s.field}>
              <label style={s.label} htmlFor="brandColors">Brand colours</label>
              <input
                id="brandColors"
                style={s.input}
                type="text"
                value={form.brandColors}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setField('brandColors', e.target.value)}
                placeholder="e.g. Navy blue (#1a2a6c), Gold (#f5c518)"
                disabled={isSubmitting}
              />
            </div>

            <div style={s.field}>
              <label style={s.label} htmlFor="brandFonts">Brand fonts</label>
              <input
                id="brandFonts"
                style={s.input}
                type="text"
                value={form.brandFonts}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setField('brandFonts', e.target.value)}
                placeholder="e.g. Montserrat (headings), Open Sans (body)"
                disabled={isSubmitting}
              />
            </div>

            <div style={s.field}>
              <label style={s.label} htmlFor="designNotes">Design notes</label>
              <textarea
                id="designNotes"
                style={s.textarea}
                value={form.designNotes}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setField('designNotes', e.target.value)}
                placeholder="Describe the look and feel you're going for — modern, minimal, bold, playful, etc."
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* ── Section 5: Content ── */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>5 · Content</h2>

            <div style={s.field}>
              <label style={s.toggleRow}>
                <input
                  type="checkbox"
                  style={s.checkbox}
                  checked={form.providingOwnContent}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setField('providingOwnContent', e.target.checked)}
                  disabled={isSubmitting}
                />
                I will provide my own copy and images
              </label>
              <p style={s.hint}>If unchecked, we will discuss content creation as part of your project.</p>
            </div>

            <div style={s.field}>
              <label style={s.label} htmlFor="contentNotes">Content notes</label>
              <textarea
                id="contentNotes"
                style={s.textarea}
                value={form.contentNotes}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setField('contentNotes', e.target.value)}
                placeholder="Anything specific about your content — tone of voice, key messages, images you already have, etc."
                disabled={isSubmitting}
              />
            </div>

            <div style={s.field}>
              <label style={s.label} htmlFor="inspirationUrls">Inspiration websites</label>
              <textarea
                id="inspirationUrls"
                style={{ ...s.textarea, minHeight: '70px' }}
                value={form.inspirationUrls}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setField('inspirationUrls', e.target.value)}
                placeholder="List any websites you like the look of (one per line or comma-separated)."
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* ── Section 6: Integrations & launch ── */}
          <div style={s.section}>
            <h2 style={s.sectionTitle}>6 · Integrations &amp; launch</h2>

            <div style={s.field}>
              <label style={s.label}>Features needed</label>
              <div style={s.checkboxGrid}>
                {FEATURE_OPTIONS.map((feat) => (
                  <label key={feat} style={s.checkboxLabel}>
                    <input
                      type="checkbox"
                      style={s.checkbox}
                      checked={form.desiredFeatures.includes(feat)}
                      onChange={() => setField('desiredFeatures', toggleArrayItem(form.desiredFeatures, feat))}
                      disabled={isSubmitting}
                    />
                    {feat}
                  </label>
                ))}
              </div>
            </div>

            <div style={s.field}>
              <label style={s.label} htmlFor="launchTimeline">
                Launch timeline<span style={s.required}>*</span>
              </label>
              <select
                id="launchTimeline"
                style={s.select}
                value={form.launchTimeline}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setField('launchTimeline', e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">Select a timeline</option>
                {TIMELINE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div style={s.field}>
              <label style={s.label} htmlFor="additionalNotes">Anything else?</label>
              <textarea
                id="additionalNotes"
                style={s.textarea}
                value={form.additionalNotes}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setField('additionalNotes', e.target.value)}
                placeholder="Any other details, questions, or requirements we should know about."
                disabled={isSubmitting}
              />
            </div>
          </div>

          <hr style={s.divider} />

          <button
            type="submit"
            style={{
              ...s.submitBtn,
              opacity: isSubmitting ? 0.6 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting…' : isUpdate ? 'Update onboarding' : 'Submit onboarding'}
          </button>

        </form>
      </div>
    </main>
  );
}
