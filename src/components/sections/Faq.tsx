import { useState } from 'react';
import type { Faq as FaqItem } from '@/data/faqs';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';

interface FaqSectionProps {
  faqs: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function Faq({ faqs, eyebrow = 'FAQ', title = 'Frequently asked questions', description }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  if (faqs.length === 0) return null;

  return (
    <Section id="faq" subtle>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div className="mt-12 flex flex-col gap-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <Reveal key={faq.id} delay={0}>
              <details
                open={isOpen}
                className="group glass overflow-hidden transition-colors"
                style={{ borderStyle: 'solid', borderWidth: 1, borderColor: isOpen ? 'rgba(255,194,75,0.25)' : 'rgba(255,255,255,0.08)' }}
              >
                <summary
                  className="faq-summary flex cursor-pointer items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-white/[0.03] sm:px-7"
                  onClick={(event) => {
                    event.preventDefault();
                    setOpenId(isOpen ? null : faq.id);
                  }}
                >
                  <span className="text-[15px] font-semibold text-slate-50 sm:text-base">
                    {faq.question}
                  </span>
                  <Icon
                    name="chevron-down"
                    className={cn(
                      'h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300',
                      isOpen && 'rotate-180 text-gold-400',
                    )}
                  />
                </summary>
                {isOpen && (
                  <div className="border-t border-white/[0.06] px-5 py-5 text-sm leading-relaxed text-slate-400 sm:px-7 sm:text-[15px]">
                    {faq.answer}
                  </div>
                )}
              </details>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
