/**
 * Course structure for U++ Academy — Classes 1 to 10 across JAC, CBSE and ICSE.
 *
 * Everything here describes the class range and boards U++ Academy has confirmed. Subjects are
 * expressed generically ("all board subjects") because we were not told which specific subjects
 * are taught; naming specific subjects would be fabrication.
 */

export interface CourseGroup {
  id: string;
  label: string;
  /** Inclusive class range as numbers, used for rendering "Class 1 – 5". */
  from: number;
  to: number;
  rangeLabel: string;
  summary: string;
  points: string[];
}

export const COURSE_GROUPS: CourseGroup[] = [
  {
    id: 'primary',
    label: 'Primary Foundation',
    from: 1,
    to: 5,
    rangeLabel: 'Class 1 – 5',
    summary:
      'Early learning is where habits are formed. U++ Academy builds reading, writing and numeracy foundations so that young students stay confident in school.',
    points: [
      'Building core reading, writing and numeracy skills',
      'Correcting early learning gaps before they widen',
      'A calm, structured environment for younger students',
      'Regular check-ins so parents know how progress is going',
    ],
  },
  {
    id: 'middle',
    label: 'Middle School',
    from: 6,
    to: 8,
    rangeLabel: 'Class 6 – 8',
    summary:
      'Classes 6 to 8 are where school subjects multiply and board syllabi get demanding. Concept clarity matters more here than ever.',
    points: [
      'Concept clarity across all board subjects',
      'Exam preparation aligned to JAC, CBSE and ICSE syllabi',
      'Extra practice for students who find classroom pace too fast',
      'Personalised attention for students recovering from a weak start',
    ],
  },
  {
    id: 'secondary',
    label: 'Secondary',
    from: 9,
    to: 10,
    rangeLabel: 'Class 9 – 10',
    summary:
      'Classes 9 and 10 shape the path a student takes next. U++ Academy focuses on thorough understanding and steady improvement rather than shortcuts.',
    points: [
      'Board-aligned preparation for JAC, CBSE and ICSE',
      'Focused revision and regular self-assessment',
      'Extra support for weak students working towards improvement',
      'Academic guidance conversations for parents',
    ],
  },
];

export interface Board {
  code: 'JAC' | 'CBSE' | 'ICSE';
  full: string;
  blurb: string;
}

/** Boards U++ Academy supports. Descriptions state only what the code stands for. */
export const BOARDS: Board[] = [
  {
    code: 'JAC',
    full: 'Jharkhand Academic Council',
    blurb:
      'JAC is the board followed by most schools in Jharkhand, including the Maharajgunj area where U++ Academy is based.',
  },
  {
    code: 'CBSE',
    full: 'Central Board of Secondary Education',
    blurb:
      'U++ Academy supports students following the CBSE syllabus, alongside the boards studied in local schools.',
  },
  {
    code: 'ICSE',
    full: 'Indian Certificate of Secondary Education',
    blurb:
      'Students studying under the ICSE pattern can enquire with U++ Academy about available support.',
  },
];

/** The four areas of focus U++ Academy stated it specialises in. */
export const FOCUS_AREAS = [
  {
    id: 'weak-students',
    title: 'Weak students',
    description:
      'Patients, targeted help for students who have fallen behind and need to rebuild confidence subject by subject.',
  },
  {
    id: 'concept-clarity',
    title: 'Concept clarity',
    description:
      'Understanding why a method works, not just memorising a method. This is what carries students through higher classes.',
  },
  {
    id: 'personalised-attention',
    title: 'Personalised attention',
    description:
      'Every student learns at a different pace. U++ Academy adjusts its approach to the student in front of it.',
  },
  {
    id: 'improvement',
    title: 'Academic improvement',
    description:
      'Steady, measurable progress is the goal — helping students improve from where they currently stand.',
  },
] as const;
