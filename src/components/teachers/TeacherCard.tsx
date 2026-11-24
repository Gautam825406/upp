import type { Teacher } from '@/data/teachers';
import { TEACHER_PHOTOS } from '@/data/teachers';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';

/**
 * One teacher card. Only verified facts are shown: name, role, and the approved one-line
 * description. No qualifications, subjects, or experience are listed because none were verified.
 * The photo is the director's real photograph; if a teacher has no photo, plain initials are
 * shown instead of a stock face.
 */
export function TeacherCard({ teacher }: { teacher: Teacher }) {
  const photo = TEACHER_PHOTOS[teacher.id];

  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start gap-5">
        {photo ? (
          <img
            src={photo}
            alt={`${teacher.name}, ${teacher.role} of U++ Academy`}
            width={96}
            height={96}
            loading="lazy"
            className="h-24 w-24 shrink-0 rounded-lg border border-ink-700 object-cover object-top"
          />
        ) : (
          <div
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-ink-700 bg-ink-900"
            aria-hidden="true"
          >
            <span className="font-display text-2xl font-extrabold tracking-tight text-pine-600">
              {teacher.initials}
            </span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center rounded-md border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold-600">
            {teacher.role}
          </span>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-50">
            {teacher.name}
          </h3>
        </div>
      </div>

      <p className="mt-6 flex-1 text-[15px] leading-relaxed text-slate-300">
        {teacher.blurb}
      </p>

      <div className="mt-6 flex items-center gap-2 border-t border-ink-700 pt-4 text-sm text-slate-400">
        <Icon name="graduation" className="h-4 w-4" />
        U++ Academy · Madhygopali, Maharajgunj
      </div>
    </Card>
  );
}
