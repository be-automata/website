export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export const defaultLang = 'es' as const;

export type Lang = keyof typeof languages;

export const ui = {
  es: {
    'nav.home': 'Inicio',
    'nav.capabilities': 'Capacidades',
    'nav.cases': 'Casos',
    'nav.contact': 'Contacto',
    'cta.book': 'Agendar llamada de descubrimiento',
    'cta.cases': 'Ver casos de estudio',
    'cta.process': 'Ver el proceso completo',
    'footer.tag': 'IA que ejecuta trabajo real — con un humano que aprueba antes de cada paso importante.',
    'footer.rights': 'Todos los derechos reservados',
    'lang.switch': 'EN',
  },
  en: {
    'nav.home': 'Home',
    'nav.capabilities': 'Capabilities',
    'nav.cases': 'Cases',
    'nav.contact': 'Contact',
    'cta.book': 'Book a discovery call',
    'cta.cases': 'See case studies',
    'cta.process': 'See the full process',
    'footer.tag': 'AI that does real work — with a human approving every important step.',
    'footer.rights': 'All rights reserved',
    'lang.switch': 'ES',
  },
} as const;

export function t(lang: Lang, key: keyof typeof ui['es']): string {
  return ui[lang][key];
}

export function pathFor(lang: Lang, path: string): string {
  const clean = path.replace(/^\/+/, '');
  return lang === 'es' ? `/${clean}` : `/en/${clean}`;
}

const slugTranslations: Record<string, string> = {
  capacidades: 'capabilities',
  capabilities: 'capacidades',
  casos: 'cases',
  cases: 'casos',
  privacidad: 'privacy',
  privacy: 'privacidad',
  terminos: 'terms',
  terms: 'terminos',
};

export function translatePath(fromLang: Lang, toLang: Lang, pathname: string): string {
  if (fromLang === toLang) return pathname;

  const stripped = fromLang === 'en' ? pathname.replace(/^\/en(?=\/|$)/, '') : pathname;
  const segments = stripped.split('/').filter(Boolean);

  if (segments.length === 0) return toLang === 'en' ? '/en/' : '/';

  const first = segments[0];
  if (first in slugTranslations) segments[0] = slugTranslations[first];

  const translated = '/' + segments.join('/');
  return toLang === 'en' ? `/en${translated}` : translated;
}
