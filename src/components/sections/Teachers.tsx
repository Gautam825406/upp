import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { TeacherCard } from '@/components/teachers/TeacherCard';
import { TEACHERS } from '@/data/teachers';
import { Icon } from '@/components/ui/Icon';

export function Teachers() {
  const featuredTeachers = TEACHERS.filter((teacher) => teacher.featured);

  return (
    <Section id="teachers">
      <SectionHeading
        eyebrow="Meet our teachers"
        title={
          <>
            The team behind <span className="text-gradient-iris">U++ Academy</span>
          </>
        }
        description="U++ Academy is led by Director Umesh Kumar, focused on building strong foundations and giving every student the attention they need."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {featuredTeachers.map((teacher, index) => (
          <Reveal key={teacher.id} delay={index * 120}>
            <TeacherCard teacher={teacher} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={280} className="mt-10">
        <Link
          to="/teachers"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
        >
          Meet the full team
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </Reveal>
    </Section>
  );
}
