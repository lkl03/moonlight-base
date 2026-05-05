'use client';

import Image from 'next/image';
import {
  PageWrapper,
  PageHeader,
  Eyebrow,
  PageTitle,
  PageSubtitle,
  ProjectGrid,
  ProjectCard,
  ProjectCoverWrap,
  ProjectPill,
  ProjectBody,
  ProjectYear,
  ProjectTitle,
  ProjectDesc,
  ProjectCTA,
} from './styles';

const projects = [
  {
    title: 'DV Legales',
    tag: 'Law Firm',
    description:
      'Legal firm website redesign focused on clarity, trust, and high performance. Clean layout built to convert visitors into clients.',
    href: 'https://dvlegales.com.ar',
    cover: '/images/work/dvlegales-cover.jpg',
    year: '2026',
  },
  {
    title: 'Bioprotece3D',
    tag: 'Healthcare',
    description:
      'Bioprotection company site redesign — structured around credibility, bold visual identity, and frictionless information flow.',
    href: 'https://bioprotece3d.com',
    cover: '/images/work/bioprotece3d-cover.jpg',
    year: '2026',
  },
  {
    title: 'promptea.me',
    tag: 'SaaS',
    description:
      'AI-powered prompt analyzer and optimizer. Detects issues and rewrites prompts for better results across different AI platforms.',
    href: 'https://promptea.me',
    cover: '/images/work/promptea-cover.jpg',
    year: '2025',
  },
];

const WorkPageContent = () => {
  return (
    <PageWrapper>
      <PageHeader>
        <Eyebrow>Our Work</Eyebrow>
        <PageTitle>Projects We&apos;ve Built</PageTitle>
        <PageSubtitle>
          From landing pages to full business websites — here&apos;s a look at what we&apos;ve
          shipped for our clients.
        </PageSubtitle>
      </PageHeader>

      <ProjectGrid>
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${project.title} — open site in a new tab`}
          >
            <ProjectCoverWrap>
              <Image
                src={project.cover}
                alt={`${project.title} website screenshot`}
                fill
                sizes="(max-width: 720px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <ProjectPill>{project.tag}</ProjectPill>
            </ProjectCoverWrap>

            <ProjectBody>
              <ProjectYear>{project.year}</ProjectYear>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDesc>{project.description}</ProjectDesc>
              <ProjectCTA>
                Open site <span aria-hidden="true">→</span>
              </ProjectCTA>
            </ProjectBody>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </PageWrapper>
  );
};

export default WorkPageContent;
