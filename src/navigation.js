import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Breaking',
      href: getPermalink('/news/breaking'),
      links: [
        {
          text: 'Israel',
          href: getPermalink('/news/isreal')
        },
        {
          text: 'Ukraine',
          href: getPermalink('/news/ukraine'),
        },
        {
          text: 'Just In',
          href: getPermalink('/news/justin'),
        },
        {
          text: 'On-Going',
          href: getPermalink('/news/ongoing'),
        },
      ],
    },
    {
      text: 'Trending',
      href: getPermalink('/news/trending'),
      links: [
        {
          text: 'Popular',
          href: getPermalink('/news/popular'),
        },
        {
          text: 'Social Media',
          href: getPermalink('/news/socialmedia'),
        },
        {
          text: 'Quirky',
          href: getPermalink('/news/quirky'),
        },
        {
          text: 'Funny',
          href: getPermalink('/news/funny'),
        },
        {
          text: 'Inspirational',
          href: getPermalink('/news/inspirational'),
        },
        {
          text: 'Opinions',
          href: getPermalink('/news/opinions'),
        },
        {
          text: 'Random',
          href: getPermalink('/news/random'),
        },
      ],
    },
    {
      text: 'Sports',
      href: getPermalink('/news/sports'),
      links: [
        {
          text: 'Football',
          href: getPermalink('/news/football'),
        },
        {
          text: 'Basketball',
          href: getPermalink('/news/basketball'),
        },
        {
          text: 'Hockey',
          href: getPermalink('/news/hockey'),
        },
        {
          text: 'Baseball',
          href: getPermalink('/news/baseball'),
        },
        {
          text: 'Soccer/Futbol',
          href: getPermalink('/news/soccer'),
        },
        {
          text: 'MMA',
          href: getPermalink('/news/mma'),
        },
        {
          text: 'Extreme',
          href: getPermalink('/news/extreme'),
        },
        {
          text: 'Olympic',
          href: getPermalink('/news/olympic'),
        },
        {
          text: 'Other',
          href: getPermalink('/news/other'),
        },
      ],
    },
    {
      text: 'Celebrity',
      href: getPermalink('/news/celebrity'),
      links: [
        {
          text: 'Rumors',
          href: getPermalink('/news/rumors'),
        },
        {
          text: 'Social Media',
          href: getPermalink('/news/socialmedia'),
        },
        {
          text: 'Stories',
          href: getPermalink('/news/stories'),
        },
        {
          text: 'Relationships',
          href: getPermalink('/news/relationships'),
        },
      ],
    },
    {
      text: 'Entertainment',
      href: getPermalink('/news/entertainment'),
      links: [
        {
          text: 'Movies',
          href: getPermalink('/news/movies'),
        },
        {
          text: 'TV Shows',
          href: getPermalink('/news/tv'),
        },
        {
          text: 'Music',
          href: getPermalink('/news/music'),
        },
      ],
    },
    {
      text: 'Politics',
      href: getPermalink('/news/politics'),
      links: [
        {
          text: 'US',
          href: getPermalink('/news/us'),
        },
        {
          text: '2024 ELection',
          href: getPermalink('/news/election'),
        },
        {
          text: 'World',
          href: getPermalink('/news/world'),
        },
        {
          text: 'Conflicts',
          href: getPermalink('/news/conflicts'),
        },
      ],
    },
    {
      text: 'Business',
      href: getPermalink('/news/business'),
      links: [
        {
          text: 'Tech',
          href: getPermalink('/news/tech'),
        },
        {
          text: 'Stocks',
          href: getPermalink('/news/stocks'),
        },
        {
          text: 'Economy',
          href: getPermalink('/news/economy'),
        },
        { 
          text: 'Trade',
          href: getPermalink('/news/trade'),
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
        { text: 'Breaking News', href: '/news/breaking' },
        { text: 'Trending', href: '/news/trending' },
        { text: 'Sports', href: '/news/sports' },
        { text: 'Entertainment', href: '/news/entertainment' },
        { text: 'Celebrity', href: '/news/celebrity' },
        { text: 'Politics', href: '/news/politics' },
        { text: 'Business', href: '/news/business' },
        { text: 'Tech', href: '/news/tech' },
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
