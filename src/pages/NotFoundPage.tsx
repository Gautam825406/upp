import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { Icon } from '@/components/ui/Icon';
import { LogoMark } from '@/components/ui/Logo';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 py-24 text-center">
      <Seo
        title="Page Not Found | U++ Academy"
        description="The page you are looking for could not be found. Visit the U++ Academy homepage for coaching in Maharajgunj, Madhygopali and Chouparan."
        canonicalPath="/404"
        robots="noindex, follow"
      />

      <LogoMark className="h-16 w-16 opacity-70" />

      <p className="eyebrow mt-8">404</p>

      <h1 className="mt-5 text-4xl font-extrabold tracking-tightest text-slate-50 sm:text-6xl">
        Page not found
      </h1>

      <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
        The page you are looking for does not exist. It may have been moved or the address might be incorrect.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
        <Link
          to="/"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Icon name="arrow-left" className="h-4 w-4" />
          Back to homepage
        </Link>
        <Link
          to="/contact"
          className="btn-ghost"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
