import type { Metadata } from 'next';
import type { CSSProperties } from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how Moonlight Web Designs collects, uses, shares, and protects personal information when you use our website and services.',
};

/* ── Types ──────────────────────────────────────────────────────────────── */
type ContentItem =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'subsection'; title: string; items: string[] };

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
  subsectionBlock: {
    marginBottom: '1rem',
  },
  subsectionTitle: {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'var(--white)',
    marginBottom: '0.4rem',
    lineHeight: 1.6,
  },
  accentLink: {
    color: 'var(--emerald)',
    textDecoration: 'none',
  },
};

/* ── Content ────────────────────────────────────────────────────────────── */
const intro =
  'This Privacy Policy explains how Moonlight Web Designs ("Moonlight," "we," "us," or "our") collects, uses, discloses, and protects information when you visit our website, contact us, purchase a plan, use our services, or otherwise interact with us. By using our website or services, you agree to the practices described in this Privacy Policy.';

const sections: Section[] = [
  {
    title: 'Information we collect',
    content: [
      {
        type: 'subsection',
        title: 'Personal information you provide:',
        items: [
          'Name',
          'Email address',
          'Phone number',
          'Company name',
          'Billing information',
          'Project details',
          'Messages, form submissions, and support requests',
          'Brand assets, website content, images, copy, login credentials, and other materials you choose to provide',
        ],
      },
      {
        type: 'subsection',
        title: 'Business and project information:',
        items: [
          'Website goals',
          'Design preferences',
          'Brand guidelines',
          'Technical requirements',
          'Feedback, approvals, and revision requests',
          'Information needed to provide design, development, maintenance, and support services',
        ],
      },
      {
        type: 'paragraph',
        text: 'Payment information: Payments may be processed by third-party payment providers. We may receive limited billing details such as payment status, billing address, transaction records, and subscription status. We do not intentionally store full credit card numbers on our own systems.',
      },
      {
        type: 'paragraph',
        text: 'Automatically collected information: When you use our website, we or our service providers may collect information such as IP address, browser type, device type, pages visited, referring URLs, approximate location, timestamps, cookies, analytics data, and usage information.',
      },
    ],
  },
  {
    title: 'How we use information',
    content: [
      {
        type: 'list',
        items: [
          'Provide, operate, and improve our website and services',
          'Respond to inquiries and support requests',
          'Create proposals, invoices, accounts, and service agreements',
          'Manage subscriptions, billing, renewals, and payments',
          'Design, build, revise, launch, maintain, and support client projects',
          'Communicate about project status, feedback, approvals, updates, and administrative matters',
          'Personalize and improve the client experience',
          'Analyze website performance and service usage',
          'Protect against fraud, abuse, security incidents, and unauthorized access',
          'Comply with legal, tax, accounting, and contractual obligations',
          'Enforce our agreements and policies',
        ],
      },
    ],
  },
  {
    title: 'How we share information',
    content: [
      {
        type: 'paragraph',
        text: 'We may share information with:',
      },
      {
        type: 'list',
        items: [
          'Service providers that help us operate our business, such as hosting providers, analytics tools, payment processors, email providers, CRM tools, project management tools, cloud storage providers, and customer support tools',
          'Contractors or partners who help us deliver design, development, maintenance, or support services',
          'Professional advisors, such as lawyers, accountants, bookkeepers, and insurers',
          'Government authorities, courts, regulators, or other parties when required by law or to protect rights, safety, and security',
          'Successors or potential successors in connection with a merger, acquisition, reorganization, sale of assets, or similar business transaction',
        ],
      },
      {
        type: 'paragraph',
        text: 'We do not sell your personal information in the traditional sense.',
      },
    ],
  },
  {
    title: 'Cookies and analytics',
    content: [
      {
        type: 'paragraph',
        text: 'Our website may use cookies, pixels, analytics tools, and similar technologies to understand website traffic, improve performance, remember preferences, and support marketing or measurement.',
      },
      {
        type: 'paragraph',
        text: 'You can usually control cookies through your browser settings. Disabling cookies may affect how certain parts of the website function.',
      },
    ],
  },
  {
    title: 'Client materials and credentials',
    content: [
      {
        type: 'paragraph',
        text: 'To perform services, you may provide access to websites, hosting accounts, CMS platforms, domain registrars, analytics accounts, design files, third-party tools, or other systems.',
      },
      {
        type: 'paragraph',
        text: 'We use this access only as needed to provide services. You are responsible for granting appropriate access levels, maintaining ownership of your accounts, and removing or rotating credentials when our work is complete if desired.',
      },
      {
        type: 'paragraph',
        text: 'Please do not send sensitive credentials through insecure channels unless specifically instructed. We may recommend secure methods for sharing access.',
      },
    ],
  },
  {
    title: 'Data retention',
    content: [
      {
        type: 'paragraph',
        text: 'We retain information for as long as reasonably necessary to provide services, manage our business, comply with legal obligations, resolve disputes, enforce agreements, maintain records, and protect our rights.',
      },
      {
        type: 'paragraph',
        text: 'We may retain project files, communications, invoices, contracts, and related records after a project or subscription ends unless deletion is required by law or agreed in writing.',
      },
    ],
  },
  {
    title: 'Security',
    content: [
      {
        type: 'paragraph',
        text: 'We use reasonable administrative, technical, and organizational measures designed to protect information. However, no method of transmission or storage is completely secure. We cannot guarantee absolute security.',
      },
    ],
  },
  {
    title: 'International users',
    content: [
      {
        type: 'paragraph',
        text: 'If you access our website or services from outside the country where we operate, your information may be processed in countries that may have different data protection laws than your location.',
      },
    ],
  },
  {
    title: 'Your choices and rights',
    content: [
      {
        type: 'paragraph',
        text: 'Depending on where you live, you may have rights to access, correct, delete, restrict, or object to certain uses of your personal information. You may also have the right to withdraw consent or request a copy of certain information.',
      },
      {
        type: 'paragraph',
        text: 'To make a request, contact us using the contact information below. We may need to verify your identity before responding.',
      },
    ],
  },
  {
    title: 'Marketing communications',
    content: [
      {
        type: 'paragraph',
        text: 'If you subscribe to updates or receive marketing emails from us, you may opt out by following the unsubscribe instructions in the email or contacting us. We may still send transactional or administrative messages related to your services.',
      },
    ],
  },
  {
    title: 'Third-party links and tools',
    content: [
      {
        type: 'paragraph',
        text: 'Our website or services may link to third-party websites, platforms, or tools. We are not responsible for the privacy practices, content, or security of third parties. Your use of third-party services is governed by their own terms and privacy policies.',
      },
    ],
  },
  {
    title: "Children's privacy",
    content: [
      {
        type: 'paragraph',
        text: 'Our website and services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided personal information to us, contact us so we can take appropriate action.',
      },
    ],
  },
  {
    title: 'Changes to this Privacy Policy',
    content: [
      {
        type: 'paragraph',
        text: 'We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised "Last updated" date. Your continued use of our website or services after updates means you accept the revised Privacy Policy.',
      },
    ],
  },
];

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function PrivacyPage() {
  return (
    <div style={s.page}>
      <header style={s.header}>
        <h1 style={s.h1}>Privacy Policy</h1>
        <p style={s.meta}>Last updated: January 2026</p>
        <p style={s.intro}>{intro}</p>
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
            if (item.type === 'subsection') {
              return (
                <div key={j} style={s.subsectionBlock}>
                  <p style={s.subsectionTitle}>{item.title}</p>
                  <ul style={s.ul}>
                    {item.items.map((text) => (
                      <li key={text} style={s.li}>{text}</li>
                    ))}
                  </ul>
                </div>
              );
            }
            return null;
          })}
        </section>
      ))}

      <section style={s.section}>
        <h2 style={s.h2}>14. Contact</h2>
        <p style={s.p}>For questions about this Privacy Policy or privacy requests, contact us at:</p>
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
