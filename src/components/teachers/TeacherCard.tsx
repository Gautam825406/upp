import type { Teacher } from '@/data/teachers';
import { TEACHER_PHOTOS } from '@/data/teachers';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';

interface TeacherCardProps {
  teacher: Teacher;
}

const INITIALS_SIZE: Record<string, string> = {
  'UK': 'h-24 w-24 text-2xl',
  'Gk': 'h-24 w-24 text-2xl',
};

export function TeacherCard({ teacher }: TeacherCardProps) {
  const photo = TEACHER_PHOTOS[teacher.id];
  const initialsSize = INITIALS_SIZE[teacher.initials] ?? 'h-20 w-20 text-xl';

  return (
    <Card lift ring className="flex h-full flex-col">
      <div className="flex items-start gap-5">
        {photo ? (
          <img
            src={photo}
            alt={teacher.name}
            className="h-24 w-24 shrink-0 rounded-full border-2 border-gold-500/30 object-cover"
          />
        ) : (
          <div
            className={cn(
              'flex shrink-0 items-center justify-center rounded-2xl border',
              'border-gold-500/20 bg-gradient-to-br from-gold-500/15 via-iris-500/10 to-ink-800/40',
              initialsSize,
              teacher.role === 'Featured Teacher' && 'border-iris-400/25 from-iris-400/15 via-gold-500/10 to-ink-800/40',
            )}
            aria-hidden="true"
          >
            <span className="font-display font-extrabold tracking-tight text-gradient-gold">
              {teacher.initials}
            </span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]',
              teacher.role === 'Director'
                ? 'border-gold-500/25 bg-gold-500/10 text-gold-400'
                : 'border-iris-400/25 bg-iris-400/10 text-iris-400',
            )}
          >
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

      <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
        <Icon name="graduation" className="h-4 w-4 text-slate-500" />
        U++ Academy · Madhygopali, Maharajgunj
      </div>
    </Card>
  );
}
