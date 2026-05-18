import type { Metadata } from 'next';
import type { CSSProperties } from 'react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Review the Terms of Service for Moonlight Web Designs, including subscription terms, billing, scope, revisions, intellectual property, and client responsibilities.',
};

/* ── Types ──────────────────────────────────────────────────────────────── */
type ContentItem =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

type Section = {
  title: string;
  content: ContentItem[];
};

/* ── Styles ─────────────────────────────────────────────────────────────── */
const s: Record<string, CSSProperties> = {
  page: {
    maxWidth: '52rem',
    margin: '3rem auto 8rem',
    padding: '0 1.5rem',
    fontFamily: 'Raleway, sans-serif',
  },
  header: {
    marginBottom: '3rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  h1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 900,
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    color: 'var(--white)',
    marginBottom: '0.75rem',
  },
  meta: {
    fontSize: '0.85rem',
    color: 'var(--light-gray)',
    lineHeight: 1.6,
  },
  intro: {
    fontSize: '0.975rem',
    color: 'var(--light-gray)',
    lineHeight: 1.8,
    marginTop: '1.25rem',
  },
  section: {
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    paddingTop: '2rem',
    marginBottom: '2.25rem',
  },
  h2: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '1.1rem',
    color: 'var(--white)',
    marginBottom: '0.9rem',
  },
  p: {
    fontSize: '0.95rem',
    color: 'var(--light-gray)',
    lineHeight: 1.8,
    marginBottom: '0.75rem',
  },
  ul: {
    paddingLeft: '1.4rem',
    marginBottom: '0.75rem',
    listStyle: 'disc',
  } as CSSProperties,
  li: {
    fontSize: '0.95rem',
    color: 'var(--light-gray)',
    lineHeight: 1.8,
    marginBottom: '0.3rem',
  },
  accentLink: {
    color: 'var(--emerald)',
    textDecoration: 'none',
  },
};

/* ── Content ────────────────────────────────────────────────────────────── */
const intro = [
  'Welcome to Moonlight Web Designs. These Terms of Service ("Terms") govern your access to and use of our website, subscription plans, design services, web development services, maintenance services, and any related offerings provided by Moonlight Web Designs ("Moonlight," "we," "us," or "our").',
  'By using our website, purchasing a plan, signing an agreement, paying an invoice, or otherwise engaging our services, you agree to these Terms and any applicable order form, proposal, statement of work, service agreement, or written addendum between you and Moonlight.',
  'If you are entering into these Terms on behalf of a company or organization, you represent that you have authority to bind that entity.',
];

const sections: Section[] = [
  {
    title: 'Services',
    content: [
      {
        type: 'paragraph',
        text: 'Moonlight provides subscription-based design, web, and creative services. Depending on your selected plan or written agreement, services may include website design, website development, landing pages, UI/UX design, CMS updates, content implementation, maintenance, design revisions, strategy, consulting, and related support.',
      },
      {
        type: 'paragraph',
        text: 'The exact services, deliverables, timelines, and plan entitlements may be described on our website, in a proposal, in an order form, or in a separate written agreement. If there is a conflict between these Terms and a signed written agreement, the signed written agreement controls for that specific engagement.',
      },
    ],
  },
  {
    title: 'Plans and subscriptions',
    content: [
      {
        type: 'paragraph',
        text: 'Moonlight offers two subscription-style service plans. Each plan includes a defined level of access, service capacity, and support. Unless otherwise agreed in writing, subscription plans are billed monthly and require a minimum twelve (12) month commitment.',
      },
      {
        type: 'paragraph',
        text: 'Monthly subscription fees are collected via PayPal as the recurring payment processor. PayPal is used solely as the billing method and does not govern the duration, scope, or obligations of your subscription. Your contractual commitment to Moonlight is governed by these Terms.',
      },
      {
        type: 'paragraph',
        text: 'Subscription services are not a guarantee of unlimited simultaneous output. Requests are typically handled through an active queue. We may work on one or more active requests at a time depending on your plan, the complexity of the work, dependencies, and our internal capacity.',
      },
    ],
  },
  {
    title: 'Minimum commitment and renewal',
    content: [
      {
        type: 'paragraph',
        text: 'Unless a different term is stated in a signed agreement, subscription plans begin on the subscription start date and continue for a minimum term of twelve (12) months.',
      },
      {
        type: 'paragraph',
        text: 'Moonlight Web Designs plans are billed monthly through PayPal and require a minimum commitment of twelve (12) months unless otherwise agreed in writing. By subscribing to a plan, the client authorizes recurring monthly charges for the selected plan and agrees to maintain an active payment method for the duration of the minimum commitment.',
      },
      {
        type: 'paragraph',
        text: 'The PayPal subscription is used as the payment method and does not replace the client\'s contractual commitment. If the client cancels, pauses, disputes, blocks, or otherwise disables the PayPal subscription before the end of the twelve-month minimum term, the client remains responsible for any unpaid amounts due for the remainder of the minimum commitment, unless otherwise agreed in writing by Moonlight Web Designs.',
      },
      {
        type: 'paragraph',
        text: 'At the end of the initial term, the subscription may renew for successive renewal terms unless either party provides written notice of non-renewal at least thirty (30) days before the end of the then-current term.',
      },
    ],
  },
  {
    title: 'Billing and payment',
    content: [
      {
        type: 'paragraph',
        text: 'You agree to pay all fees described in your selected plan, invoice, order form, or written agreement. Monthly fees are due according to the billing schedule provided at checkout, in your invoice, or in your written agreement.',
      },
      {
        type: 'paragraph',
        text: 'Subscription fees may begin on the subscription start date regardless of whether a website, page, asset, or deliverable has launched. Client delays, delayed approvals, missing content, delayed feedback, or requested scope changes do not pause or waive payment obligations unless agreed in writing by Moonlight.',
      },
      {
        type: 'paragraph',
        text: 'All fees are exclusive of applicable taxes unless otherwise stated. You are responsible for applicable sales, use, VAT, GST, or similar taxes.',
      },
    ],
  },
  {
    title: 'Late payments',
    content: [
      {
        type: 'paragraph',
        text: 'If payment is late, failed, disputed, or reversed, we may pause work, suspend services, withhold deliverables, remove access to project systems, or suspend hosting/maintenance until the account is brought current. You remain responsible for unpaid fees during any suspension caused by non-payment.',
      },
      {
        type: 'paragraph',
        text: 'Failed, cancelled, or disabled PayPal payments do not automatically cancel the client\'s 12-month minimum commitment. If a monthly payment fails, Moonlight Web Designs may notify the client and request that the payment method be updated. Services may be paused or suspended until the outstanding payment is resolved.',
      },
    ],
  },
  {
    title: 'Scope of work',
    content: [
      {
        type: 'paragraph',
        text: 'Each plan or agreement includes a scope of services. Work outside the included scope may require a separate quote, written approval, additional fees, or a plan upgrade.',
      },
      {
        type: 'paragraph',
        text: 'Examples of out-of-scope work may include custom software functionality, complex integrations, advanced animations, copywriting, brand strategy, paid advertising management, SEO campaigns, extensive content migration, custom backend systems, legal/compliance review, or other work not expressly included in your plan or agreement.',
      },
    ],
  },
  {
    title: 'Client responsibilities',
    content: [
      {
        type: 'paragraph',
        text: 'You agree to provide timely feedback, approvals, access credentials, brand assets, content, images, copy, legal notices, technical information, and other materials reasonably required for us to perform the services.',
      },
      {
        type: 'paragraph',
        text: 'You are responsible for ensuring that any materials you provide are accurate, lawful, properly licensed, and do not infringe third-party rights.',
      },
      {
        type: 'paragraph',
        text: 'Delays in providing required materials, feedback, or approvals may delay delivery timelines and do not pause billing unless agreed in writing.',
      },
    ],
  },
  {
    title: 'Revisions and approvals',
    content: [
      {
        type: 'paragraph',
        text: 'Your plan or agreement may include a defined number of revision rounds or ongoing revision support. Revisions must remain within the original scope of the request or project.',
      },
      {
        type: 'paragraph',
        text: 'Requests that materially change the direction, structure, functionality, content, or scope of a deliverable may be treated as a new request or additional work.',
      },
      {
        type: 'paragraph',
        text: 'Once you approve a deliverable, request publication, or use the deliverable publicly, it will be considered accepted unless you notify us of a material issue within a reasonable period.',
      },
    ],
  },
  {
    title: 'Turnaround times',
    content: [
      {
        type: 'paragraph',
        text: 'Any timelines, turnaround estimates, launch dates, or delivery dates are estimates unless expressly stated as binding in a signed written agreement. Actual delivery depends on the complexity of the request, client responsiveness, third-party systems, technical dependencies, and revision cycles.',
      },
    ],
  },
  {
    title: 'Website launch, hosting, and third-party platforms',
    content: [
      {
        type: 'paragraph',
        text: 'Moonlight may design, build, maintain, or support websites using third-party platforms, hosting providers, CMS tools, analytics services, payment processors, form providers, plugins, integrations, and other vendors.',
      },
      {
        type: 'paragraph',
        text: 'We are not responsible for outages, policy changes, data loss, pricing changes, bugs, limitations, or security incidents caused by third-party platforms or services.',
      },
      {
        type: 'paragraph',
        text: 'You may be required to maintain separate accounts, subscriptions, licenses, or payment methods with third-party providers.',
      },
    ],
  },
  {
    title: 'Intellectual property',
    content: [
      {
        type: 'paragraph',
        text: "Subject to full payment of all amounts due, you will own the final custom deliverables created specifically for you, excluding Moonlight's pre-existing materials, internal tools, templates, frameworks, code libraries, know-how, processes, reusable components, and third-party materials.",
      },
      {
        type: 'paragraph',
        text: "Moonlight retains ownership of its pre-existing intellectual property, reusable systems, methods, templates, design patterns, and general knowledge used to provide the services.",
      },
      {
        type: 'paragraph',
        text: 'You grant Moonlight a limited license to use materials you provide solely as needed to perform the services.',
      },
    ],
  },
  {
    title: 'Portfolio rights',
    content: [
      {
        type: 'paragraph',
        text: 'Unless you request otherwise in writing and we agree, you grant Moonlight permission to display completed work, screenshots, your name, logo, and a general description of the project in our portfolio, website, social media, proposals, and marketing materials.',
      },
    ],
  },
  {
    title: 'Confidentiality',
    content: [
      {
        type: 'paragraph',
        text: 'Each party may receive non-public information from the other. Both parties agree to use reasonable care to protect confidential information and not disclose it except as necessary to perform the services, comply with law, or work with contractors, vendors, or advisors who are bound by confidentiality obligations.',
      },
    ],
  },
  {
    title: 'Contractors and service providers',
    content: [
      {
        type: 'paragraph',
        text: "Moonlight may use employees, contractors, subcontractors, vendors, or specialized partners to perform parts of the services. Moonlight remains responsible for the services provided under your agreement, subject to these Terms.",
      },
    ],
  },
  {
    title: 'Cancellations and early termination',
    content: [
      {
        type: 'paragraph',
        text: 'Because subscription plans are based on a minimum twelve (12) month commitment, you may not cancel early unless expressly allowed in a signed written agreement or approved by Moonlight in writing.',
      },
      {
        type: 'paragraph',
        text: 'If early termination is approved, you may remain responsible for unpaid fees, committed monthly fees, completed work, work in progress, third-party costs, and any other amounts described in your agreement.',
      },
      {
        type: 'paragraph',
        text: 'Moonlight may terminate or suspend services if you fail to pay, breach these Terms, misuse the services, request unlawful work, or engage in abusive, fraudulent, or harmful conduct.',
      },
    ],
  },
  {
    title: 'Refunds',
    content: [
      {
        type: 'paragraph',
        text: 'Payments are non-refundable unless required by law or expressly agreed in writing by Moonlight. This includes setup fees, monthly subscription fees, deposits, rush fees, third-party costs, and fees for completed or in-progress work.',
      },
    ],
  },
  {
    title: 'Acceptable use',
    content: [
      {
        type: 'paragraph',
        text: 'You may not use our services or deliverables for unlawful, harmful, fraudulent, defamatory, infringing, abusive, or deceptive purposes. We may refuse or discontinue work that we reasonably believe violates law, third-party rights, platform rules, or our professional standards.',
      },
    ],
  },
  {
    title: 'No guaranteed results',
    content: [
      {
        type: 'paragraph',
        text: 'Moonlight does not guarantee specific business outcomes, revenue, search rankings, conversion rates, traffic levels, accessibility compliance, performance scores, or marketing results. We provide professional creative and technical services, but outcomes depend on many factors outside our control.',
      },
    ],
  },
  {
    title: 'Disclaimers',
    content: [
      {
        type: 'paragraph',
        text: 'Our website and services are provided on an "as is" and "as available" basis to the fullest extent permitted by law. We disclaim warranties of merchantability, fitness for a particular purpose, non-infringement, and uninterrupted or error-free operation.',
      },
    ],
  },
  {
    title: 'Limitation of liability',
    content: [
      {
        type: 'paragraph',
        text: 'To the fullest extent permitted by law, Moonlight will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including lost profits, lost revenue, lost data, business interruption, or reputational harm.',
      },
      {
        type: 'paragraph',
        text: "To the fullest extent permitted by law, Moonlight's total liability for any claim arising out of or relating to the services will not exceed the amounts paid by you to Moonlight for the services giving rise to the claim during the three (3) months before the event giving rise to liability.",
      },
    ],
  },
  {
    title: 'Indemnification',
    content: [
      {
        type: 'paragraph',
        text: 'You agree to indemnify and hold harmless Moonlight from claims, damages, liabilities, losses, and expenses arising from materials you provide, your use of the services or deliverables, your breach of these Terms, your violation of law, or your infringement of third-party rights.',
      },
    ],
  },
  {
    title: 'Governing law',
    content: [
      {
        type: 'paragraph',
        text: 'These Terms are governed by the laws stated in your signed agreement. If no governing law is stated, these Terms will be governed by the laws of the jurisdiction in which Moonlight Web Designs is organized, without regard to conflict of law principles.',
      },
    ],
  },
  {
    title: 'Changes to these Terms',
    content: [
      {
        type: 'paragraph',
        text: 'We may update these Terms from time to time. The updated version will be posted on this page with a revised "Last updated" date. Your continued use of our website or services after updates become effective means you accept the revised Terms.',
      },
    ],
  },
];

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function TermsPage() {
  return (
    <div style={s.page}>
      <header style={s.header}>
        <h1 style={s.h1}>Terms of Service</h1>
        <p style={s.meta}>Last updated: January 2026</p>
        {intro.map((text, i) => (
          <p key={i} style={s.intro}>{text}</p>
        ))}
      </header>

      {sections.map((section, i) => (
        <section key={section.title} style={s.section}>
          <h2 style={s.h2}>{i + 1}. {section.title}</h2>
          {section.content.map((item, j) => {
            if (item.type === 'paragraph') {
              return <p key={j} style={s.p}>{item.text}</p>;
            }
            if (item.type === 'list') {
              return (
                <ul key={j} style={s.ul}>
                  {item.items.map((text) => (
                    <li key={text} style={s.li}>{text}</li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </section>
      ))}

      <section style={s.section}>
        <h2 style={s.h2}>24. Contact</h2>
        <p style={s.p}>For questions about these Terms, contact us at:</p>
        <p style={{ ...s.p, marginBottom: '0.25rem' }}><strong>Moonlight Web Designs</strong></p>
        <p style={s.p}>
          Email:{' '}
          <a href="mailto:contact.eterlab@gmail.com" style={s.accentLink}>
            contact.eterlab@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
}
