import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { TeacherCard } from '@/components/teachers/TeacherCard';
import { TEACHERS } from '@/data/teachers';

/**
 * Homepage teachers strip. There is one verified teacher — Director Umesh Kumar — so this
 * shows one card, not a "team" grid, and there is no "meet the full team" link pretending
 * there are more people to meet. The /teachers page carries the director's note instead.
 */
export function Teachers() {
  const featuredTeachers = TEACHERS.filter((teacher) => teacher.featured);

  return (
    <Section id="teachers">
      <SectionHeading
        eyebrow="Meet the director"
        title={
          <>
            Led by <span className="text-pine-600">Umesh Kumar</span>
          </>
        }
        description="U++ Academy is led by Director Umesh Kumar, focused on building strong foundations and giving every student the attention they need."
      />

      <div className="mt-12 max-w-2xl">
        {featuredTeachers.map((teacher, index) => (
          <Reveal key={teacher.id} delay={index * 120}>
            <TeacherCard teacher={teacher} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
