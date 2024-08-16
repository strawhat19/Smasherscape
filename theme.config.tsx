import React from 'react';
import { useDB } from './pages/_app';
import Form from './components/Form';
import Footer from './components/footer';
import NavIcons from './components/NavIcons';
import TopBanner from './components/TopBanner';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  primaryHue: 195, // Sky Blue
  useNextSeoProps() {
    return {
      titleTemplate: `%s | Smasherscape`
    }
  },
  feedback: {
    content: null,
  },
  editLink: {
    text: null,
  },
  toc: {
    component: null,
  },
  banner: {
    dismissible: false,
    key: `bannerDismissed`,
    text: (
      <TopBanner />
    ),
  },
  head: <>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="icon" href="/assets/OSRS_Top_Hat.png" type="image/x-icon"></link>
    <meta name="description" content="Players can level up and gain experience while keeping a record of their wins, defeats, kills, deaths, characters played and level. Players can level up to gain rewards, search for their card and expand to view details, or view other player data on the leaderboard."/>
    <meta property="og:title" content="Smasherscape Leaderboard" />
    <meta property="og:description" content="Players can level up and gain experience while keeping a record of their wins, defeats, kills, deaths, characters played and level. Players can level up to gain rewards, search for their card and expand to view details, or view other player data on the leaderboard." />
    <meta property="og:image" content="/assets/SmasherScapeOGImage.png" />
    <meta name="twitter:card" content="/assets/SmasherScapeOGImage.png" />
    <meta name="twitter:site" content="@Xuruko1" />
    <meta name="twitter:title" content="Smasherscape" />
    <meta name="twitter:description" content="Players can level up and gain experience while keeping a record of their wins, defeats, kills, deaths, characters played and level. Players can level up to gain rewards, search for their card and expand to view details, or view other player data on the leaderboard." />
    <meta name="twitter:image" content="/assets/SmasherScapeOGImage.png" />
    </>,
  logo: <>
    <img width={40} src={`/assets/OSRS_Top_Hat.png`} alt={`Tophat Logo`} /> <h1 style={{marginLeft: 15}}>Xuruko</h1>
  </>,
  ...(useDB() == false && {
    navbar: {
      extraContent: <>
        <div className={`navIconsContainer`}>
          <NavIcons />
        </div>
      </>
    }
  }),
  search: {
    ...(useDB() == false && {
      placeholder: `Search...`,
    }),
    ...(useDB() == true && {
      component: <>
        <div className={`navIconsContainer showWhenNoDB`}>
          <NavIcons />
        </div>
        <div className={`navFormDiv`} style={{order: 0, display: `flex`, flexDirection: `row`, gridGap: 15, justifyContent: `space-between`, alignItems: `center`}}>
          <section className={`navFormSection showWhenDB`} style={{margin: 0, position: `relative`}}>
            <Form className={`navForm`} style={{display: `flex`, flexDirection: `row`}} />
          </section>
          <NavIcons />
        </div>
      </>
    }),
  },
  docsRepositoryBase: 'https://github.com/strawhat19/Smasherscape/',
  footer: {
    component: <Footer style={{margin: `0 5px`}} />
  },
}

export default config