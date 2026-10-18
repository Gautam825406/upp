import { useState } from 'react';
import type { FormEvent } from 'react';
import { BUSINESS, whatsappHref } from '@/data/business';
import { Icon } from '@/components/ui/Icon';

const CLASS_OPTIONS = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12',
];

const BOARD_OPTIONS = ['JAC', 'CBSE', 'ICSE', 'Not sure yet'];

interface FormState {
  name: string;
  phone: string;
  className: string;
  board: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  phone: '',
  className: '',
  board: '',
  message: '',
};

export function EnquiryForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [sent, setSent] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const summary = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Class: ${form.className || 'Not specified'}`,
      `Board: ${form.board || 'Not specified'}`,
      form.message ? `Message: ${form.message}` : '',
    ].filter(Boolean).join('\n');

    const waUrl = whatsappHref(
      `Hello ${BUSINESS.name}, I would like to enquire about admission.\n\n${summary}`,
    );
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  if (sent) {
    return (
      <div className="glass-strong rounded-2xl p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
          <Icon name="check" className="h-7 w-7 text-emerald-400" />
        </div>
        <h3 className="mt-5 text-xl font-bold text-slate-50">Thank you!</h3>
        <p className="mt-2 text-sm text-slate-400">
          We have opened WhatsApp with your enquiry. If it did not open, call us directly at{' '}
          <a href={`tel:${BUSINESS.phoneE164}`} className="text-gold-400 underline">
            {BUSINESS.phone}
          </a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-6 sm:p-8">
      <h3 className="text-xl font-bold text-slate-50">Admission Enquiry</h3>
      <p className="mt-1.5 text-sm text-slate-400">
        Tell us about your child and we will get back to you on WhatsApp.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-name" className="mb-1.5 block text-sm font-medium text-slate-300">
            Your name
          </label>
          <input
            id="enquiry-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-ink-900/70 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors focus:border-gold-500/50"
            placeholder="Parent or guardian name"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="enquiry-phone" className="mb-1.5 block text-sm font-medium text-slate-300">
            Phone number
          </label>
          <input
            id="enquiry-phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-ink-900/70 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors focus:border-gold-500/50"
            placeholder="+91 98765 43210"
          />
        </div>

        <div>
          <label htmlFor="enquiry-class" className="mb-1.5 block text-sm font-medium text-slate-300">
            Class of student
          </label>
          <select
            id="enquiry-class"
            required
            value={form.className}
            onChange={(e) => update('className', e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-ink-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition-colors focus:border-gold-500/50"
          >
            <option value="" disabled>Select class</option>
            {CLASS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="enquiry-board" className="mb-1.5 block text-sm font-medium text-slate-300">
            Board
          </label>
          <select
            id="enquiry-board"
            value={form.board}
            onChange={(e) => update('board', e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-ink-900/70 px-4 py-3 text-sm text-slate-100 outline-none transition-colors focus:border-gold-500/50"
          >
            <option value="">Select board</option>
            {BOARD_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="enquiry-message" className="mb-1.5 block text-sm font-medium text-slate-300">
            Message <span className="text-slate-500">(optional)</span>
          </label>
          <textarea
            id="enquiry-message"
            rows={3}
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-ink-900/70 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors focus:border-gold-500/50"
            placeholder="Any specific subject or class requirement?"
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn-whatsapp mt-7 w-full"
      >
        <Icon name="whatsapp" className="h-5 w-5" />
        Send Enquiry on WhatsApp
      </button>

      <p className="mt-4 text-center text-xs text-slate-500">
        Your details are used only to respond to this enquiry. No data is stored on our servers.
      </p>
    </form>
  );
}
