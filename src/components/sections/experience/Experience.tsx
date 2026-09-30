import { Check, MapPin } from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Tag } from '@/components/ui/Tag';
import type { Dictionary, Locale } from '@/content';
import type { Job } from '@/content/types';
import { formatDuration, formatPeriod } from '@/lib/dates';

import { CaseStudyItem } from './CaseStudyItem';
import { TimelineTrack } from './TimelineTrack';

interface ExperienceProps {
  locale: Locale;
  experience: Dictionary['experience'];
}

export function Experience({ locale, experience }: ExperienceProps) {
  return (
    <Section
      id="experience"
      eyebrow={experience.eyebrow}
      title={experience.title}
      lead={experience.lead}
    >
      <TimelineTrack>
        <ol className="space-y-16 md:space-y-24">
          {experience.jobs.map((job) => (
            <li key={job.id}>
              <JobEntry job={job} locale={locale} labels={experience} />
            </li>
          ))}
        </ol>
      </TimelineTrack>
    </Section>
  );
}

interface JobEntryProps {
  job: Job;
  locale: Locale;
  labels: Dictionary['experience'];
}

function JobEntry({ job, locale, labels }: JobEntryProps) {
  const period = formatPeriod(job.period, locale, labels.present);

  return (
    <article
      aria-labelledby={`${job.id}-title`}
      className="relative grid gap-6 pl-8 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-12 md:pl-0"
    >
      <span
        aria-hidden
        className="bg-sunset ring-bg absolute top-2 left-0 size-[15px] rounded-full ring-4 md:left-[12rem]"
      />

      <Reveal className="md:sticky md:top-28 md:h-fit md:pr-10 md:text-right">
        <p className="text-fg font-mono text-sm">
          <span className="md:block">{period.start} —</span>{' '}
          <span className="md:block">{period.end}</span>
        </p>
        <p className="text-muted mt-1 font-mono text-xs">{formatDuration(job.period, locale)}</p>
        <p className="text-muted mt-3 inline-flex items-center gap-1.5 text-sm">
          <MapPin className="size-3.5" aria-hidden />
          {job.location}
        </p>
      </Reveal>

      <Reveal delay={0.05} className="md:pl-6">
        <SpotlightCard className="p-5 sm:p-8">
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3
                id={`${job.id}-title`}
                className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {job.company}
              </h3>
              <p className="text-fg/90 mt-2 text-lg">{job.role}</p>
              <p className="text-muted mt-1 font-mono text-xs tracking-wider uppercase">
                {job.domain}
              </p>
            </div>
            {job.badge ? (
              <span className="border-orange/40 bg-orange/10 text-orange rounded-full border px-3 py-1 text-xs font-semibold">
                {job.badge}
              </span>
            ) : null}
          </header>

          <p className="text-muted mt-5 leading-relaxed text-pretty">{job.summary}</p>

          {job.metrics.length > 0 ? (
            <dl className="mt-6 flex flex-wrap gap-3">
              {job.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="border-line bg-bg/40 flex min-w-[7rem] flex-1 flex-col rounded-2xl border px-4 py-3"
                >
                  <dt className="text-muted order-2 mt-0.5 text-xs">{metric.label}</dt>
                  <dd className="text-gradient font-display order-1 text-xl font-semibold whitespace-nowrap sm:text-2xl">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <h4 className="text-muted mt-8 font-mono text-xs tracking-[0.2em] uppercase">
            {labels.achievementsLabel}
          </h4>
          <ul className="mt-3 space-y-2.5">
            {job.achievements.map((achievement) => (
              <li key={achievement} className="flex gap-3 leading-relaxed">
                <Check className="text-pink mt-1 size-4 shrink-0" aria-hidden />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>

          <h4 className="text-muted mt-8 font-mono text-xs tracking-[0.2em] uppercase">
            {labels.stackLabel}
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {job.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>

          {job.cases.length > 0 ? (
            <>
              <h4 className="font-display mt-10 flex items-center gap-3 text-lg font-semibold">
                {labels.casesLabel}
                <span className="bg-surface-strong text-muted rounded-full px-2 py-0.5 font-mono text-xs">
                  {job.cases.length}
                </span>
              </h4>
              <div className="mt-4 space-y-3">
                {job.cases.map((study, index) => (
                  <CaseStudyItem key={study.id} study={study} index={index} labels={labels} />
                ))}
              </div>
            </>
          ) : null}
        </SpotlightCard>
      </Reveal>
    </article>
  );
}
