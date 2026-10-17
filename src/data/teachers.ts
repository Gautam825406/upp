/**
 * Teacher profiles for U++ Academy.
 *
 * STRICTLY VERIFIED FACTS ONLY. The only facts we were given about each person are their name,
 * their role at U++ Academy, and the approved one-line description below. Nothing else — no
 * qualifications, degrees, subjects taught, years of experience, awards, testimonials or review
 * counts has been added, because inventing them would be misinformation about a real person.
 *
 * Once genuine biographies and verified credentials are available, add a `bio` array of paragraphs
 * and real subjects here, then create dedicated `/teachers/:slug` pages. Until that happens the
 * site keeps them as profile cards on the single /teachers page.
 */

export type TeacherRole = 'Director' | 'Featured Teacher';

export interface Teacher {
  /** Stable id used for DOM keys. */
  id: string;
  name: string;
  role: TeacherRole;
  /** The approved biographical sentence, used verbatim on the site. */
  blurb: string;
  /** Initials rendered in the photograph placeholder. */
  initials: string;
  /** Whether this person is shown in the homepage preview strip. */
  featured: boolean;
}

export const TEACHERS: Teacher[] = [
  {
    id: 'umesh-kumar',
    name: 'Umesh Kumar',
    role: 'Director',
    blurb:
      'Umesh Kumar leads U++ Academy with a focus on building strong academic foundations and creating a supportive learning environment for students.',
    initials: 'UK',
    featured: true,
  },
];

/**
 * Photograph placeholders.
 *
 * TODO(owner): drop real headshots into `src/assets/teachers/` and assign them here, e.g.
 *   photo: ukHeadshot,
 * The UI shows a labelled monogram frame until a real photograph exists, so the page never shows
 * a stock face of someone who is not a real person.
 */
export const TEACHER_PHOTOS: Record<string, string | undefined> = {
  'umesh-kumar': '/umesh%20kumar.png',
};
