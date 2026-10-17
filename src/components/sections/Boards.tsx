import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Card, CardIcon } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { BOARDS, COURSE_GROUPS, FOCUS_AREAS } from '@/data/courses';

const BOARD_ICONS: Record<string, IconName> = {
  JAC: 'shield',
  CBSE: 'graduation',
  ICSE: 'book',
};

const BOARD_TONES: Record<string, 'gold' | 'iris' | 'aqua'> = {
  JAC: 'gold',
  CBSE: 'iris',
  ICSE: 'aqua',
};

export function Boards() {
  return (
    <Section id="boards" subtle>
      <SectionHeading
        eyebrow="Classes 1 to 10 · All boards"
        title={
          <>
            Coaching for <span className="text-gradient-gold">JAC, CBSE and ICSE</span> students
          </>
        }
        description="U++ Academy runs coaching across the full school range from Class 1 to Class 10, supporting students from Jharkhand Academic Council, CBSE and ICSE boards."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {BOARDS.map((board, index) => (
          <Reveal key={board.code} delay={index * 100}>
            <Card lift ring>
              <CardIcon tone={BOARD_TONES[board.code] ?? 'gold'}>
                <Icon name={BOARD_ICONS[board.code] ?? 'book'} />
              </CardIcon>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-50">{board.code}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-400">{board.full}</p>
              <p className="mt-3.5 text-sm leading-relaxed text-slate-400">{board.blurb}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <Reveal>
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            What we focus on
          </h3>
        </Reveal>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FOCUS_AREAS.map((area, index) => (
            <Reveal key={area.id} delay={index * 80}>
              <Card className="h-full p-6">
                <span className="eyebrow">{area.title}</span>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{area.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <Reveal>
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Class groups
          </h3>
        </Reveal>
        <div className="mt-7 grid gap-5 sm:grid-cols-3">
          {COURSE_GROUPS.map((group, index) => (
            <Reveal key={group.id} delay={index * 100}>
              <Card lift strong className="h-full">
                <span className="inline-flex items-center rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
                  {group.rangeLabel}
                </span>
                <h4 className="mt-4 text-lg font-bold text-slate-50">{group.label}</h4>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{group.summary}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
