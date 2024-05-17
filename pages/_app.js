import '../main.scss';
import '../xuruko.scss';
import '../concentration.scss';
import User from '../models/User';
import Play from '../models/Play';
import { auth, db } from '../firebase';
import ReactDOM from 'react-dom/client';
import { onAuthStateChanged } from 'firebase/auth';
import { parseDate } from '../components/PlayerRecord';
import { AnimatePresence, motion } from 'framer-motion';
import { defaultCommands } from '../components/Commands';
import { createUserFromFirebaseData } from '../components/Form';
import { createContext, useRef, useState, useEffect } from 'react';
import { getActivePlayers, newPlayerType } from '../components/smasherscape';
import { collection, onSnapshot, query, limit, orderBy } from 'firebase/firestore';

export const useDB = () => true;
export const StateContext = createContext({});
export const signUpOrSignIn = `Sign Up or Sign In`;

export const environments = {
  dev: {
    playsDatabase: `devPlays`,
    playersDatabase: `devPlayers`,
  },
  test: {
    playsDatabase: `testPlays`,
    playersDatabase: `testPlayers`,
  },
  alpha: {
    playsDatabase: `alphaPlays`,
    playersDatabase: `alphaPlayers`,
  },
  beta: {
    playsDatabase: `betaPlays`,
    playersDatabase: `betaPlayers`,
  },
  prod: {
    playsDatabase: `plays`,
    playersDatabase: `players`,
  },
};

export const environment = environments.alpha;
export const usePlaysDatabase = environment.playsDatabase;
export const usePlayersDatabase = environment.playersDatabase;

export const defaultWinXP = 400;
export const testingWinXP = 1000;
export const defaultXPMultiplier = 1;
export const XPGainOnWin = defaultWinXP;
export const globalBonusXPMultiplier = 1;
export const defaultLoserXPForEachStockTaken = 100;
export const testingLoserXPForEachStockTaken = 300;
export const XPGainOnLoserXPForEachStockTaken = defaultLoserXPForEachStockTaken;
export const loseCons = [`loses-to`, `falls-to`, `defeated-by`, `destroyed-by`, `gets-owned-by`];
export const winCons = [`beat`, `beats`, `destroys`, `destroyed`, `defeats`, `defeated`, `conquers`, `crushes`, `kills`, `killed`];

export const getPage = () => capitalizeAllWords(window.location.pathname.replace(`/`,``));
export const replaceAll = (str, search, replacement) => str.replace(new RegExp(search, `g`), replacement);
export const renderLogMessage = (string, useDatabase) => `${useDatabase == true ? `Database ` : ``}${string}`;
export const getCurrentPageName = () => window.location.hash.slice(window.location.hash.lastIndexOf(`/`)).replace(`/`, ``);
export const detectIfMobile = () => (typeof window.orientation !== `undefined`) || (navigator.userAgent.indexOf(`IEMobile`) !== -1);

export const capWords = (str) => {
  return str.replace(/(?:^|\s)\w/g, (match) => {
    return match.toUpperCase();
  });
};

export const getNumberFromString = (string) => {
  let result = string.match(/\d+/);
  let number = parseInt(result[0]);
  return number;
}

export const createXML = (xmlString) => {
  let div = document.createElement(`div`);
  div.innerHTML = xmlString.trim();
  return div.firstChild;
}

export const setThemeUI = () => {
  localStorage.setItem(`alertOpen`, false);
  document.documentElement.setAttribute(`data-theme`, `dark`);
  localStorage.setItem(`theme`, `dark`);
}

export const getTimezone = (date) => {
  const timeZoneString = new Intl.DateTimeFormat(undefined, {timeZoneName: `short`}).format(date);
  const match = timeZoneString.match(/\b([A-Z]{3,5})\b/);
  return match ? match[1] : ``;
}

export const getAllPlaysJSON = (players) => {
  let allPlays = players.map(player => player.plays).reduce((acc, curr) => acc.concat(curr), []).sort((a, b) => parseDate(b.date) - parseDate(a.date));
  return allPlays;
}

export const logPlayers = (plyrs, useDatabase, plays) => {
  if (getActivePlayers(plyrs, true, plays).length > 0) {
    dev() && console.log(`All ${renderLogMessage(`Player(s)`, useDatabase)}`, plyrs.map(pla => newPlayerType(pla, true, plays)));
    dev() && console.log(`Active ${renderLogMessage(`Player(s)`, useDatabase)}`, getActivePlayers(plyrs.map(pla => newPlayerType(pla, true, plays)), true, plays));
  }
}

export const cutOffTextAndReplace = (string, end, replacement) => {
  if (!replacement) {
    replacement = `...` || `-`;
  }
  return string?.length > end ? string?.substring(0, end - 1) + replacement : string;
};

export const genUUIDNumbers = (existingIDs) => {
  let newID;
  do {
    newID = Math.floor(Math.random() * 1000000); // generate a random integer between 0 and 999999
  } while (existingIDs.includes(newID)); // keep generating a new ID until it's not already in the existing IDs array
  return newID;
}

export const getFormValuesFromFields = (formFields) => {
  for (let i = 0; i < formFields.length; i++) {
    let field = formFields[i];
    if (field.type != `submit`) {
      console.log(field.type, field.value);
    };
  }
};

export const updateOrAdd = (obj, arr) => {
  let index = arr.findIndex((item) => item.name === obj.name);
  if (index !== -1) {
    arr[index] = obj;
  } else {
    arr.push(obj);
  }
  return arr;
};

export const getActivePlayersJSON = (players, customObject = false, plays) => {
  let activePlayers = players.filter(plyr => (plyr.active || !plyr.disabled)).sort((a, b) => {
    if (b.experience.arenaXP !== a.experience.arenaXP) {
      return b.experience.arenaXP - a.experience.arenaXP;
    }
    if (plays && plays.length > 0) return plays.filter(ply => ply?.winnerUUID == b?.uuid || ply?.loserUUID == b?.uuid).length - plays.filter(ply => ply?.winnerUUID == a?.uuid || ply?.loserUUID == a?.uuid).length;
  });
  return customObject == true ? activePlayers.map(plyr => newPlayerType(plyr)) : activePlayers;
}

export const removeDuplicateObjectFromArray = (arrayOfObjects) => {
  const uniqueArray = arrayOfObjects?.filter((value, index) => {
    const _value = JSON.stringify(value);
    return index === arrayOfObjects?.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
    });
  });
  return uniqueArray;
};

export const setSideBarUI = () => {
  let toc = document.querySelector(`.nextra-toc`);
  let tocMinimized = JSON.parse(localStorage.getItem(`tocMinimized`));
  if (toc) {
    if (tocMinimized) {
      toc.classList.add(`minimized`);
    } else {
      toc.classList.remove(`minimized`);
    };
  }
}

export const dev = (item, source) => {
  if (window && window.location.host.includes(`local`)) {
    if (item) {
      console.log(`Dev Log`, item);
    } else if (item && source) {
      console.log(`Dev Log`, item, `From`, source);
    }
    return true;
  } else {
    return false;
  }
}

export const getAllPlays = (players) => {
  const playUUIDs = new Set();
  let allPlays = players.map(player => player.plays).reduce((acc, curr) => acc.concat(curr), []).filter(play => {
    if (!playUUIDs.has(play.uuid)) {
      playUUIDs.add(play.uuid);
      return true;
    }
    return false;
  }).sort((a, b) => parseDate(b.date) - parseDate(a.date));
  return allPlays;
}

export const defaultPlayerRoles = [
  {
    name: `Player`,
    level: 1,
  },
  {
    name: `User`,
    level: 2,
  },
  {
    name: `Admin`,
    level: 3,
  },
  {
    name: `Developer`,
    level: 4,
  },
  {
    name: `Owner`,
    level: 5,
  },
];

export const getCurrentUser = (userCredential, players) => {
  let currentUser = userCredential;
  // dev() && console.log(`Current Players`, players);
  let name = capitalizeAllWords(userCredential?.email?.split(`@`)[0]);
  let providerID = userCredential && userCredential?.providerData && userCredential?.providerData[0]?.providerId;
  let provider = providerID && providerID?.includes(`.`) ? providerID?.split(`.`)[0] : providerID;
  let type = capitalizeAllWords(provider);
  let constructedUser = new User(createUserFromFirebaseData(userCredential, type, name));
  constructedUser = { ...userCredential, ...constructedUser };
  if (players && getActivePlayers(players) && getActivePlayers(players)?.length > 0 && getActivePlayers(players).some(plyr => plyr?.uid)) {
    currentUser = getActivePlayers(players).find(plyr => plyr?.uid == userCredential?.uid);
  } else {
    currentUser = constructedUser;
  }
  return currentUser;
}

export const generateUniqueID = (existingIDs) => {
  const generateID = () => {
    let id = Math.random().toString(36).substr(2, 9);
    return Array.from(id).map(char => {
      return Math.random() > 0.5 ? char.toUpperCase() : char;
    }).join(``);
  };
  let newID = generateID();
  if (existingIDs && existingIDs.length > 0) {
    while (existingIDs.includes(newID)) {
      newID = generateID();
    }
  }
  return newID;
};

export const countPropertiesInObject = (obj) => {
  let count = 0;
  // Base condition to check if the input is an object
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      count++; // Count the current key
      count += countPropertiesInObject(obj[key]); // Recursively count keys in nested objects
    }
    // If the object is an array, iterate over its elements
    if (Array.isArray(obj)) {
      obj.forEach(item => {
          count += countPropertiesInObject(item); // Recursively count keys in nested objects within the array
      });
    }
  }
  return count;
}

export const capitalizeAllWords = (string, underScores) => {
  let newString;
  if (underScores) {
    if (string != null || string != undefined) {
      const words = string.replace(/_/g, ` `).split(` `);
      const capitalizedWords = words.map((word) => {
        newString = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        return newString;
      });
      newString = capitalizedWords.join(`_`);
      return newString;
    }
  } else {
    if (string != null || string != undefined) {
      newString = string.split(` `).map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1).toLowerCase()).join(` `);
      return newString;
    }
  }
};

export const formatDate = (date, specificPortion) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? `PM` : `AM`;
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour `0` should be `12`
  minutes = minutes < 10 ? `0` + minutes : minutes;
  let strTime = hours + `:` + minutes + ` ` + ampm;
  let strTimeNoSpaces = hours + `-` + minutes + `-` + ampm;
  let completedDate = strTime + ` ` + (date.getMonth() + 1) + `/` + date.getDate() + `/` + date.getFullYear();
  let timezone = getTimezone(date);

  if (specificPortion == `time`) {
    completedDate = strTime;
  } else if (specificPortion == `date`) {
    completedDate = (date.getMonth() + 1) + `-` + date.getDate() + `-` + date.getFullYear();
  } else if (specificPortion == `timezone`) {
    completedDate = strTime + ` ` + (date.getMonth() + 1) + `-` + date.getDate() + `-` + date.getFullYear() + ` ` + timezone;
  } else if (specificPortion == `timezoneNoSpaces`) {
    completedDate = strTimeNoSpaces + `_` + (date.getMonth() + 1) + `-` + date.getDate() + `-` + date.getFullYear() + `_` + timezone;
  } else {
    completedDate = strTime + ` ` + (date.getMonth() + 1) + `-` + date.getDate() + `-` + date.getFullYear() + ` ` + timezone;
  }

  return completedDate;
};

export const getRGBAColorFromHue = (hue, alpha) => {
  const saturation = 1;
  const lightness = 0.5;

  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lightness - chroma / 2;

  let r, g, b;
  if (hue >= 0 && hue < 60) {
    r = chroma;
    g = x;
    b = 0;
  } else if (hue >= 60 && hue < 120) {
    r = x;
    g = chroma;
    b = 0;
  } else if (hue >= 120 && hue < 180) {
    r = 0;
    g = chroma;
    b = x;
  } else if (hue >= 180 && hue < 240) {
    r = 0;
    g = x;
    b = chroma;
  } else if (hue >= 240 && hue < 300) {
    r = x;
    g = 0;
    b = chroma;
  } else if (hue >= 300 && hue < 360) {
    r = chroma;
    g = 0;
    b = x;
  } else {
    r = 0;
    g = 0;
    b = 0;
  }

  const red = Math.round((r + m) * 255);
  const green = Math.round((g + m) * 255);
  const blue = Math.round((b + m) * 255);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export const showAlert = async (title, component, width, height) => {
  let isAlertOpen = JSON.parse(localStorage.getItem(`alertOpen`)) == true;
  if (isAlertOpen) return;
  let overlay = document.createElement(`div`);
  overlay.className = `overlay`;
  document.body.appendChild(overlay);

  let alertDialog = document.createElement(`div`);
  alertDialog.className = `alert`;

  // Add transition styles for smooth fade-in/out
  overlay.style.opacity = 0;
  // overlay.style.transform = `translateY(-50px)`;
  overlay.style.transition = `opacity 240ms ease-out, transform 240ms ease-out`;
  alertDialog.style.opacity = 0;
  if (width) alertDialog.style.width = `${width}`;
  if (height) alertDialog.style.height = `${height}`;
  alertDialog.style.transform = `translateY(-50px)`;
  alertDialog.style.transition = `opacity 240ms ease-out, transform 240ms ease-out`;

  ReactDOM.createRoot(alertDialog).render(<>
    <h2 className={`alertTitle`}>{title}</h2>
    <div className={`inner`}>
      {component}
    </div>
    <button onClick={(e) => {
      overlay.style.opacity = 0;
      // overlay.style.transform = `translateY(-50px)`;
      alertDialog.style.opacity = 0;
      alertDialog.style.transform = `translateY(-50px)`;

      // Remove the alert and overlay from the DOM after the animation is complete
      setTimeout(() => {
        document.body.removeChild(overlay);
        localStorage.setItem(`alertOpen`, false);
      }, 240);
    }} className={`alertButton iconButton`}>
      <span>X</span>
    </button>
  </>);

  overlay.appendChild(alertDialog);
  localStorage.setItem(`alertOpen`, true);

  // Trigger reflow to ensure the styles are applied before animating
  void alertDialog.offsetWidth;

  // Fade in the alert
  overlay.style.opacity = 1;
  // overlay.style.transform = `translateY(0)`;
  alertDialog.style.opacity = 1;
  alertDialog.style.transform = `translateY(0)`;

  // Add a click event listener to the overlay that dismisses the alert if clicked outside the alert content
  overlay.addEventListener(`click`, (e) => {
    if (!alertDialog.contains(e.target) && !e.target.classList.contains(`alertActionButton`)) {
      // Click occurred outside the alert content
      // Fade out the alert and overlay
      alertDialog.style.opacity = 0;
      alertDialog.style.transform = `translateY(-50px)`;
      overlay.style.opacity = 0;

      // Remove the alert and overlay from the DOM after the animation is complete
      setTimeout(() => {
        document.body.removeChild(overlay);
        localStorage.setItem(`alertOpen`, false);
      }, 240);
    }
  });
}

export const defaultPlayers = [];

export default function Xuruko({ Component, pageProps, router }) {
    let brwser = ``;
    let loaded = useRef(false);
    let mobileMenuBreakPoint = 697;
    let [IDs, setIDs] = useState([]);
    let [rte, setRte] = useState(``);
    let [page, setPage] = useState(``);
    let [qotd, setQotd] = useState(``);
    let [width, setWidth] = useState(0);
    let [color, setColor] = useState(``);
    let [users, setUsers] = useState([]);
    let [plays, setPlays] = useState([]);
    let [user, setUser] = useState(null);
    let [dark, setDark] = useState(false);
    let [height, setHeight] = useState(0);
    let [boards, setBoards] = useState([]);
    let [updates, setUpdates] = useState(0);
    let [onMac, setOnMac] = useState(false);
    let [focus, setFocus] = useState(false);
    let [browser, setBrowser] = useState(``);
    let [players, setPlayers] = useState([]);
    let [devEnv, setDevEnv] = useState(false);
    let [mobile, setMobile] = useState(false);
    let [loading, setLoading] = useState(true);
    let [iPhone, set_iPhone] = useState(false);
    let [highScore, setHighScore] = useState(0);
    let [platform, setPlatform] = useState(null);
    let [anim, setAnimComplete] = useState(false);
    let [categories, setCategories] = useState([]);
    let [colorPref, setColorPref] = useState(user);
    let [alertOpen, setAlertOpen] = useState(false);
    let [authState, setAuthState] = useState(`Next`);
    let [bodyClasses, setBodyClasses] = useState(``);
    let [mobileMenu, setMobileMenu] = useState(false);
    let [gameFormStep, setGameFormStep] = useState(1);
    let [emailField, setEmailField] = useState(false);
    let [systemStatus, setSystemStatus] = useState(``);
    let [buttonText, setButtonText] = useState(`Next`);
    let [rearranging, setRearranging] = useState(false);
    let [content, setContent] = useState(`defaultContent`)
    let [commands, setCommands] = useState(defaultCommands);
    let [year, setYear] = useState(new Date().getFullYear());
    let [playersToSelect, setPlayersToSelect] = useState([]);
    let [databasePlayers, setDatabasePlayers] = useState([]);
    let [playersLoading, setPlayersLoading] = useState(true);
    let [command, setCommand] = useState(defaultCommands.Update);
    let [filteredPlayers, setFilteredPlayers] = useState(players);
    let [deleteCompletely, setDeleteCompletely] = useState(false);
    let [sameNamePlayeredEnabled, setSameNamePlayeredEnabled] = useState(false);
    let [noPlayersFoundMessage, setNoPlayersFoundMessage] = useState(`No Players Found`);
    let [commandsToNotInclude, setCommandsToNotInclude] = useState([`!com`, `!add`, `!res`, `!set`, `!giv`]);

    let [useLazyLoad, setUseLazyLoad] = useState(false);
    let [useDatabase, setUseDatabase] = useState(useDB());
    let [useLocalStorage, setUseLocalStorage] = useState(true);

    const setBrowserUI = () => {
      if (brwser == `` && (navigator.userAgent.match(/edg/i) || navigator.userAgent.includes(`edg`) || navigator.userAgent.includes(`Edg`))) {
        brwser = `edge`;
        setBrowser(`edge`);
      } if (brwser == `` && navigator.userAgent.match(/chrome|chromium|crios/i)) {
        brwser = `chrome`;
        setBrowser(`chrome`);
      } else if (brwser == `` && navigator.userAgent.match(/firefox|fxios/i)) {
        brwser = `firefox`;
        setBrowser(`firefox`);
      } else if (brwser == `` && navigator.userAgent.match(/safari/i)) {
        brwser = `safari`;
        setBrowser(`safari`);
      } else if (brwser == `` && navigator.userAgent.match(/opr\//i)) {
        brwser = `opera`;
        setBrowser(`opera`);
      }
    }

    const setCommandsToShow = (players) => {
      if (getActivePlayersJSON(players, false, plays).length < 2) {
        setCommand(defaultCommands.Delete);
        setCommandsToNotInclude([`!com`, `!add`, `!res`, `!upd`, `!set`, `!giv`]);
      } else {
        setCommand(defaultCommands.Update);
        setCommandsToNotInclude([`!com`, `!add`, `!res`, `!set`, `!giv`]);
      }
    }

    // Catch User Updates
    useEffect(() => {
      localStorage.setItem(`user`, JSON.stringify(user));
      setBodyClasses(prevBodyClasses => {
        if (prevBodyClasses.includes(`userIsNotSignedIn`)) {
          prevBodyClasses = prevBodyClasses.replace(new RegExp(`userIsNotSignedIn`, `g`), ``);
        } else if (prevBodyClasses.includes(`userIsSignedIn`)) {
          prevBodyClasses = prevBodyClasses.replace(new RegExp(`userIsSignedIn`, `g`), ``);
        }
        return `${prevBodyClasses} ${user ? `userIsSignedIn` : `userIsNotSignedIn`}`
      })
    }, [user])

    // Catch Player Updates
    useEffect(() => {
      setCommandsToShow(players);
      if (useDB() == false) {
        logPlayers(players, useDatabase, plays);
      } else {
        if (user) {
          let currentUser = getCurrentUser(user, players);
          dev() && console.log(`Current User`, currentUser);
          setUser(currentUser);
        }
      }
    }, [players])

    // Catch Plays Updates
    useEffect(() => {
      if (plays?.length > 0) {
        localStorage.setItem(`plays`, JSON.stringify(plays));
      };
    }, [plays])

    // App and User Updater
    useEffect(() => {
      // App
      setLoading(true);
      setAnimComplete(false);
      setSystemStatus(`Page Loading!`);
      if (loaded.current) return;
      loaded.current = true;
      
      setDevEnv(dev());
      setUpdates(updates);
      setPlatform(navigator?.userAgent);
      setYear(new Date().getFullYear());
      setSystemStatus(`System Status Ok.`);
      setRte(replaceAll(router.route, `/`, `_`));
      setOnMac(navigator.platform.includes(`Mac`));
      set_iPhone(/iPhone/.test(navigator.userAgent));
      setPage(window.location.pathname.replace(`/`,``));
      setMobile((typeof window.orientation !== `undefined`) || (navigator.userAgent.indexOf(`IEMobile`) !== -1));
      
      setThemeUI();
      setBrowserUI();
      setSideBarUI();

      setBodyClasses(`${rte = `` ? rte : `Index`} pageWrapContainer ${page != `` ? page?.toUpperCase() : `Home`} ${devEnv ? `devMode` : `prodMode`} ${onMac ? `isMac` : `isWindows`} ${mobile ? `mobile` : `desktop`} ${useDB() == true ? `useDB` : `noDB`} ${iPhone ? `on_iPhone` : `notOn_iPhone`}`);
      
      setLoading(false);
      setSystemStatus(`${getPage()} Loaded.`);
      setTimeout(() => setLoading(false), 1500);

      // User
      if (useDatabase == true) {
        const unsubscribeFromAuthStateListener = onAuthStateChanged(auth, userCredential => {
          if (userCredential) {
            let currentUser = getCurrentUser(userCredential, players);
            setUser(currentUser);
            setAuthState(`Sign Out`);
          } else {
            setUser(null);
            setAuthState(`Next`);
          }
        })
        return () => {
          unsubscribeFromAuthStateListener();
        }
      }

    }, [rte, user, users, authState, dark])

    // Player & Plays Updater
    useEffect(() => {
      if (useDatabase == true) {
        // Players
        const unsubscribeFromDatabasePlayersListener = onSnapshot(collection(db, usePlayersDatabase), (querySnapshot) => {
          const playersFromDatabase = [];
          querySnapshot.forEach((doc) => playersFromDatabase.push({...doc.data(), expanded: false}));
          setPlayersLoading(false);
          setPlayers(playersFromDatabase);
          setDatabasePlayers(playersFromDatabase);
          setFilteredPlayers(getActivePlayersJSON(playersFromDatabase, false, plays));
          setCommandsToShow(playersFromDatabase);
          localStorage.setItem(`players`, JSON.stringify(playersFromDatabase));
          logPlayers(playersFromDatabase, useDatabase, plays);
        });
        
        // Plays
        const playsCollection = collection(db, usePlaysDatabase);
        const playsQuery = query(playsCollection, orderBy(`date`));
        const unsubscribeFromDatabasePlaysListener = onSnapshot(playsQuery, (querySnapshot) => {
          const playsFromDatabase = [];
          querySnapshot.forEach((doc) => playsFromDatabase.push(doc.data()));
          setPlays(playsFromDatabase);
          localStorage.setItem(`plays`, JSON.stringify(playsFromDatabase));
          dev() && plays && playsFromDatabase?.length > 0 && console.log(`All Active ${renderLogMessage(`Play(s)`, useDatabase)}`, playsFromDatabase.map(ply => new Play(ply)));
        });
  
        return () => {
          unsubscribeFromDatabasePlayersListener();
          unsubscribeFromDatabasePlaysListener();
        };
      } else {
        let storedPlays = JSON.parse(localStorage.getItem(`plays`)) || [];
        let storedPlayers = JSON.parse(localStorage.getItem(`players`));
        if (storedPlayers && storedPlays && useLocalStorage) {
          setPlays(storedPlays);
          setPlayersLoading(false); 
          setPlayers(storedPlayers);
          setCommandsToShow(storedPlayers);
          setFilteredPlayers(getActivePlayersJSON(storedPlayers, false, plays));
        } else {
          setPlayersLoading(false); 
          setPlayers(defaultPlayers);
          setCommandsToShow(defaultPlayers);
          setFilteredPlayers(getActivePlayersJSON(defaultPlayers, false, plays));
        }
      }
    }, [])

    return <StateContext.Provider value={{ router, rte, setRte, updates, setUpdates, content, setContent, width, setWidth, user, setUser, page, setPage, mobileMenu, setMobileMenu, users, setUsers, authState, setAuthState, emailField, setEmailField, devEnv, setDevEnv, mobileMenuBreakPoint, platform, setPlatform, focus, setFocus, highScore, setHighScore, color, setColor, dark, setDark, colorPref, setColorPref, qotd, setQotd, alertOpen, setAlertOpen, mobile, setMobile, systemStatus, setSystemStatus, loading, setLoading, anim, setAnimComplete, IDs, setIDs, categories, setCategories, browser, setBrowser, onMac, rearranging, setRearranging, buttonText, setButtonText, gameFormStep, setGameFormStep, players, setPlayers, filteredPlayers, setFilteredPlayers, useLocalStorage, setUseLocalStorage, command, setCommand, commands, setCommands, playersToSelect, setPlayersToSelect, databasePlayers, setDatabasePlayers, useDatabase, setUseDatabase, commandsToNotInclude, setCommandsToNotInclude, sameNamePlayeredEnabled, setSameNamePlayeredEnabled, deleteCompletely, setDeleteCompletely, noPlayersFoundMessage, setNoPlayersFoundMessage, useLazyLoad, setUseLazyLoad, playersLoading, setPlayersLoading, iPhone, set_iPhone, plays, setPlays }}>
      {(browser != `chrome` || onMac && browser != `chrome`) ? <div className={bodyClasses}>
        <AnimatePresence mode={`wait`}>
          <motion.div className={bodyClasses} key={router.route} initial="pageInitial" animate="pageAnimate" exit="pageExit" transition={{ duration: 0.35 }} variants={{
            pageInitial: {
              opacity: 0,
              clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
            },
            pageAnimate: {
              opacity: 1,
              clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
            },
            pageExit: {
              opacity: 0,
              clipPath: `polygon(50% 0, 50% 0, 50% 100%, 50% 100%)`,
            },
          }}>
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </div> : <div className={bodyClasses}>
        <Component {...pageProps} />
      </div>}
    </StateContext.Provider>
}