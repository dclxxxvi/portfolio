import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Education } from '@/components/sections/Education';
import { Experience } from '@/components/sections/experience/Experience';
import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { getDictionary, type Locale } from '@/content';

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <ScrollProgress />
      <Header locale={locale} nav={dict.nav} ui={dict.ui} />
      <main id="main">
        <Hero hero={dict.hero} />
        <About about={dict.about} />
        <Experience locale={locale} experience={dict.experience} />
        <Skills skills={dict.skills} />
        <Education education={dict.education} />
        <Contact contact={dict.contact} />
      </main>
      <Footer footer={dict.footer} name={dict.hero.name} />
    </>
  );
}
