import React from 'react';
import { useDB } from './pages/_app';
import Form from './components/Form';
import Footer from './components/footer';
import NavIcons from './components/NavIcons';
// import { generateUniqueID } from './pages/_app';
import { DocsThemeConfig } from 'nextra-theme-docs';
// import NextraSearch from './components/NextraSearch';

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
  // banner: {
  //   text: `Hello All`,
  //   dismissible: true,
  //   key: `bannerDismissed`,
  // },
  head: <>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link rel="icon" href="https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/OSRS_Top_Hat.png?raw=true" type="image/x-icon"></link>
  </>,
  logo: <>
  <img width={40} src={`https://github.com/strawhat19/Smasherscape/blob/main/assets/smasherscape/OSRS_Top_Hat.png?raw=true`} alt={`Tophat Logo`} /> <h1 style={{marginLeft: 15}}>Xuruko</h1>
  </>,
  // navbar: {
    // extraContent: <NextraSearch />
  // },
  ...(useDB() == false && {
    navbar: {
      extraContent: <div className={`navIconsContainer`}>
      <NavIcons />
    </div>
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
