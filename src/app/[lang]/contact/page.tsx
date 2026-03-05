import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <>
      {/* Page Header */}
      <section className="bg-[var(--color-surface-alt)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-headline">{t('title')}</h1>
          <p className="text-subhead text-[var(--color-text-secondary)]">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="h-full text-center">
              <div className="mb-4 flex justify-center">
                <svg className="h-10 w-10 text-[var(--color-interactive)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold">{t('address.title')}</h3>
              <a
                href="https://maps.google.com/?q=Riva+Antonio+Caccivio,+6900+Lugano,+Switzerland"
                target="_blank"
                rel="noopener noreferrer"
                className="text-body text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-interactive)]"
              >
                Riva Antonio Caccivio<br />
                6900 Lugano<br />
                Switzerland
              </a>
            </Card>

            <Card className="h-full text-center">
              <div className="mb-4 flex justify-center">
                <svg className="h-10 w-10 text-[var(--color-interactive)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold">{t('phone.title')}</h3>
              <a
                href="tel:+4191XXXXXXXX"
                className="text-body text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-interactive)]"
              >
                +41 91 XXX XX XX
              </a>
            </Card>

            <Card className="h-full text-center">
              <div className="mb-4 flex justify-center">
                <svg className="h-10 w-10 text-[var(--color-interactive)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold">{t('email.title')}</h3>
              <a
                href="mailto:info@belvga.ch"
                className="text-body text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-interactive)]"
              >
                info@belvga.ch
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="bg-[var(--color-surface-alt)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-headline">{t('hours.title')}</h2>

          <Card>
            <table className="w-full">
              <tbody>
                <tr className="border-b border-[var(--color-border)] last:border-0">
                  <td className="py-4 font-semibold">{t('hours.monday')}</td>
                  <td className="py-4 text-right text-[var(--color-text-secondary)]">
                    {t('hours.closed')}
                  </td>
                </tr>
                <tr className="border-b border-[var(--color-border)] last:border-0">
                  <td className="py-4 font-semibold">{t('hours.tuesdayToFriday')}</td>
                  <td className="py-4 text-right text-[var(--color-text-secondary)]">
                    {t('hours.lunch')} {t('hours.times.lunch')}<br />
                    {t('hours.dinner')} {t('hours.times.dinner')}
                  </td>
                </tr>
                <tr className="border-b border-[var(--color-border)] last:border-0">
                  <td className="py-4 font-semibold">{t('hours.saturday')}</td>
                  <td className="py-4 text-right text-[var(--color-text-secondary)]">
                    {t('hours.dinner')} {t('hours.times.dinner')}
                  </td>
                </tr>
                <tr className="border-b border-[var(--color-border)] last:border-0">
                  <td className="py-4 font-semibold">{t('hours.sunday')}</td>
                  <td className="py-4 text-right text-[var(--color-text-secondary)]">
                    {t('hours.lunch')} {t('hours.times.lunch')}<br />
                    {t('hours.dinner')} {t('hours.times.dinner')}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Map */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Card className="overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.123456789!2d8.951234!3d46.003456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDAwJzEyLjQiTiA4wrA1NycwNC40IkU!5e0!3m2!1sen!2sch!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ristorante Pescheria Belvga Location"
            />
          </Card>
        </div>
      </section>

      {/* Reserve CTA */}
      <section className="bg-[var(--color-surface-warm)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-headline">{t('cta.title')}</h2>
          <p className="mb-8 text-body text-[var(--color-text-secondary)]">
            {t('cta.subtitle')}
          </p>
          <Link href="/reserve">
            <Button variant="primary" size="lg">
              {t('cta.button')}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
