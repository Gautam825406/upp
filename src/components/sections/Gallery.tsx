/**
 * Gallery — real photos from U++ Academy, not stock images.
 *
 * The first gallery is Bal Diwas (Children's Day), 14 November, at the academy in Madhygopali,
 * Maharajgunj: two group photos from the celebration and two newspaper reports about it.
 * Captions use only what the photos and the newspaper text actually show — no invented names,
 * counts or claims. Chief guests named in the reports were Mukesh Kumar and Shahid Ahmad;
 * Director Umesh Kumar addressed the children.
 */

import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';

const PHOTOS: { src: string; alt: string; caption: string; width: number; height: number }[] = [
  {
    src: '/gallery/bal-diwas-group.jpg',
    alt: 'Students and teachers together on Bal Diwas at U++ Academy, Madhygopali',
    caption: 'Students and teachers together on Bal Diwas, 14 November, at U++ Academy.',
    width: 1280,
    height: 588,
  },
  {
    src: '/gallery/bal-diwas-teachers-students.jpg',
    alt: 'Teachers with students at the Bal Diwas celebration at U++ Academy',
    caption: 'Teachers with students at the Bal Diwas celebration.',
    width: 1280,
    height: 588,
  },
  {
    src: '/gallery/bal-diwas-newspaper-johar-times.jpg',
    alt: 'Bal Diwas at U++ Academy reported in The Johar Times newspaper',
    caption: 'Bal Diwas at U++ Academy, reported in The Johar Times.',
    width: 706,
    height: 1014,
  },
  {
    src: '/gallery/bal-diwas-newspaper-report.jpg',
    alt: 'Newspaper report on the Bal Diwas celebration at U++ Academy',
    caption: 'Newspaper report on the Bal Diwas celebration at U++ Academy.',
    width: 706,
    height: 1227,
  },
];

export function Gallery() {
  return (
    <Section id="gallery">
      <SectionHeading
        eyebrow="Gallery"
        title={
          <>
            Bal Diwas at <span className="text-pine-600">U++ Academy</span>
          </>
        }
        description="Children's Day, 14 November — students and teachers celebrating at the academy in Madhygopali, Maharajgunj. Chief guests Mukesh Kumar and Shahid Ahmad joined the celebration, and Director Umesh Kumar addressed the children."
      />

      <div className="mt-10 columns-1 gap-6 sm:mt-12 sm:columns-2 [&>*]:mb-6">
        {PHOTOS.map((photo, index) => (
          <Reveal key={photo.src} delay={index * 100} className="break-inside-avoid">
            <figure className="card-flat overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                className="w-full object-cover"
              />
              <figcaption className="border-t border-ink-700 px-5 py-4 text-sm leading-relaxed text-slate-300">
                {photo.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
