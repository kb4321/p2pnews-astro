import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Breaking',
      links: [
        {
          text: 'Israel',
          href: getPermalink('/homes/saas'),
        },
        {
          text: 'Ukraine',
          href: getPermalink('/homes/startup'),
        },
        {
          text: 'Just In',
          href: getPermalink('/homes/mobile-app'),
        },
        {
          text: 'On-Going',
          href: getPermalink('/homes/personal'),
        },
      ],
    },
    {
      text: 'Trending',
      links: [
        {
          text: 'Popular',
          href: getPermalink('/#features'),
        },
        {
          text: 'Social Media',
          href: getPermalink('/services'),
        },
        {
          text: 'Quirky',
          href: getPermalink('/pricing'),
        },
        {
          text: 'Funny',
          href: getPermalink('/about'),
        },
        {
          text: 'Inspirational',
          href: getPermalink('/contact'),
        },
        {
          text: 'Opinions',
          href: getPermalink('/terms'),
        },
        {
          text: 'Random',
          href: getPermalink('/privacy'),
        },
      ],
    },
    {
      text: 'Sports',
      links: [
        {
          text: 'Football',
          href: getPermalink('/landing/lead-generation'),
        },
        {
          text: 'Basketball',
          href: getPermalink('/landing/sales'),
        },
        {
          text: 'Hockey',
          href: getPermalink('/landing/click-through'),
        },
        {
          text: 'Baseball',
          href: getPermalink('/landing/product'),
        },
        {
          text: 'Soccer/Futbol',
          href: getPermalink('/landing/pre-launch'),
        },
        {
          text: 'MMA',
          href: getPermalink('/landing/subscription'),
        },
        {
          text: 'Extreme',
          href: getPermalink('/landing/subscription'),
        },
        {
          text: 'Olympic',
          href: getPermalink('/landing/subscription'),
        },
        {
          text: 'Other',
          href: getPermalink('/landing/subscription'),
        },
      ],
    },
    {
      text: 'Celebrity',
      links: [
        {
          text: 'Rumors',
          href: getBlogPermalink(),
        },
        {
          text: 'Social Media',
          href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
        },
        {
          text: 'Stories',
          href: getPermalink('markdown-elements-demo-post', 'post'),
        },
        {
          text: 'Relationships',
          href: getPermalink('tutorials', 'category'),
        },
      ],
    },
    {
      text: 'Entertainment',
      links: [
        {
          text: 'Movies',
          href: getBlogPermalink(),
        },
        {
          text: 'TV Shows',
          href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
        },
        {
          text: 'Music',
          href: getPermalink('markdown-elements-demo-post', 'post'),
        },
      ],
    },
    {
      text: 'Politics',
      links: [
        {
          text: 'US',
          href: getBlogPermalink(),
        },
        {
          text: '2024 ELection',
          href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
        },
        {
          text: 'World',
          href: getPermalink('markdown-elements-demo-post', 'post'),
        },
        {
          text: 'Conflicts',
          href: getPermalink('tutorials', 'category'),
        },
      ],
    },
    {
      text: 'Business',
      links: [
        {
          text: 'Tech',
          href: getBlogPermalink(),
        },
        {
          text: 'Stocks',
          href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
        },
        {
          text: 'Economy',
          href: getPermalink('markdown-elements-demo-post', 'post'),
        },
        { 
          text: 'Trade',
          href: getPermalink('tutorials', 'category'),
        },
      ],
    },
  ],
  actions: [{ text: 'Subscribe', href: 'https://github.com/onwidget/astrowind', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'News Categories',
      links: [
        { text: 'Breaking News', href: '#' },
        { text: 'Trending', href: '#' },
        { text: 'Sports', href: '#' },
        { text: 'Entertainment', href: '#' },
        { text: 'Celebrity', href: '#' },
        { text: 'Politics', href: '#' },
        { text: 'Business', href: '#' },
        { text: 'Tech', href: '#' },
      ],
    },
    {

      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Terms', href: getPermalink('/terms') },
        { text: 'Privacy', href: getPermalink('/privacy') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
    NimbleNews - JB Corporations · All rights reserved.
  `,
};
