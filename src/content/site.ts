export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dclxxxvi.github.io/portfolio',
  repoUrl: 'https://github.com/dclxxxvi/portfolio',
  contacts: {
    email: 't.aleksandr888@mail.ru',
    telegram: 'dclxxxvi',
    github: 'dclxxxvi',
  },
} as const;

export const links = {
  email: `mailto:${site.contacts.email}`,
  telegram: `https://t.me/${site.contacts.telegram}`,
  github: `https://github.com/${site.contacts.github}`,
} as const;
