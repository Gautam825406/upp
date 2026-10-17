/**
 * Local SEO FAQ content for U++ Academy.
 *
 * These answers are shown to visitors and mirrored verbatim into FAQPage structured data.
 * Google requires the visible text and the JSON-LD to match, so this file is the single source
 * for both — never edit one without the other.
 *
 * Answers are deliberately short, factual and keyword-natural. They describe only what U++
 * Academy has told us: the location, the class range, the boards, the approach and how to contact.
 */

export interface Faq {
  id: string;
  /** Question as shown on the page. */
  question: string;
  /** Answer as shown on the page and in FAQPage structured data. */
  answer: string;
}

export const FAQS: Faq[] = [
  {
    id: 'location',
    question: 'Where is U++ Academy located?',
    answer:
      'U++ Academy is located in Madhygopali, Maharajgunj, and welcomes students and parents from nearby Chouparan and surrounding areas.',
  },
  {
    id: 'classes-1-10',
    question: 'Does U++ Academy offer tuition for Classes 1–10?',
    answer:
      'Yes. U++ Academy runs coaching for Class 1 to Class 10, with academic support suited to each stage of learning — from building early school foundations to preparing for higher secondary entry.',
  },
  {
    id: 'boards',
    question: 'Does U++ Academy support JAC, CBSE and ICSE students?',
    answer:
      'Yes. U++ Academy supports students studying under the JAC, CBSE and ICSE boards in Maharajgunj, Madhygopali and nearby Chouparan.',
  },
  {
    id: 'weak-students',
    question: 'Does U++ Academy provide special attention to weak students?',
    answer:
      'Yes. U++ Academy places special emphasis on weak students, working on concept clarity, repeated practice and personalised attention so that students who have fallen behind can improve steadily.',
  },
  {
    id: 'director',
    question: 'Who is the director of U++ Academy?',
    answer:
      'Umesh Kumar is the Director of U++ Academy. He leads the academy with a focus on strong academic foundations and a supportive learning environment for students.',
  },
  {
    id: 'chouparan-contact',
    question: 'How can parents from Chouparan contact U++ Academy?',
    answer:
      'Parents from Chouparan can call +91 9065792628 or message U++ Academy on WhatsApp. U++ Academy is based in Madhygopali, Maharajgunj, and parents can enquire about available classes directly from there.',
  },
  {
    id: 'contact-umesh-kumar',
    question: 'How can parents contact Umesh Kumar?',
    answer:
      'Parents can reach the U++ Academy team, including Director Umesh Kumar, by phone at +91 9065792628 or by sending a WhatsApp message to the same number to discuss admissions.',
  },
  {
    id: 'admission',
    question: 'How can students enquire about admission?',
    answer:
      'Students and parents can enquire about admission by calling +91 9065792628, sending a WhatsApp message, or filling in the admission enquiry form on the contact page of the U++ Academy website.',
  },
];

/** Subset shown on the homepage — the questions that answer the most common parent concerns. */
export const HOME_FAQ_IDS = ['location', 'classes-1-10', 'boards', 'weak-students', 'admission'] as const;

/** Questions most relevant to the Maharajgunj location page. */
export const MAHARAJGUNJ_FAQ_IDS = [
  'location',
  'classes-1-10',
  'boards',
  'weak-students',
  'director',
  'admission',
] as const;

/** Questions most relevant to the Chouparan page. */
export const CHOUPARAN_FAQ_IDS = [
  'location',
  'chouparan-contact',
  'classes-1-10',
  'boards',
  'admission',
] as const;

/** Questions most relevant to the Madhygopali page. */
export const MADHYGOPALI_FAQ_IDS = [
  'location',
  'classes-1-10',
  'boards',
  'weak-students',
  'director',
  'chouparan-contact',
] as const;

export function selectFaqs(ids: readonly string[]): Faq[] {
  return FAQS.filter((faq) => ids.includes(faq.id));
}
