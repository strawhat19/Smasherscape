import { capitalizeAllWords, StateContext, showAlert, countPropertiesInObject, formatDate, signUpOrSignIn, dev } from '../pages/_app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useContext, useEffect, useRef, useState } from 'react';
import { addPlayerToDB, createPlayer } from './PlayerForm';
import { auth, googleProvider } from '../firebase';
import { getActivePlayers } from './smasherscape';
import PasswordRequired from './PasswordRequired';
import GoogleButton from 'react-google-button';
import LoadingSpinner from './LoadingSpinner';
import { signOut } from "firebase/auth";
import User from '../models/User';

export const formatDateFromFirebase = (timestamp) => {
  let date;
  if (typeof timestamp === `number`) {
    date = new Date(timestamp * 1000);
  } else {
    date = new Date(timestamp);
  }
  date.setHours(date.getHours() - 5);
  const options = { weekday: `short`, year: `numeric`, month: `short`, day: `numeric`, hour: `2-digit`, minute: `2-digit`, second: `2-digit`, hour12: true };
  const formattedDate = date.toLocaleString(`en-US`, options);
  return `${formattedDate} EST`;
}

export const createUserFromFirebaseData = (userCredential, type?, name?) => {
  const providerId = userCredential?.providerId;
  let currentDateTimeStamp = formatDate(new Date());
  const operationType = userCredential?.operationType;
  const firebaseUser = userCredential?.user || userCredential;
  let creationTime = firebaseUser && firebaseUser?.metadata && firebaseUser?.metadata?.creationTime;
  let lastSignInTime = firebaseUser && firebaseUser?.metadata && firebaseUser?.metadata?.lastSignInTime;
  let { uid, email, emailVerified, photoURL, displayName, phoneNumber } = firebaseUser;
  let lastRefreshAt = firebaseUser && firebaseUser?.reloadUserInfo && firebaseUser?.reloadUserInfo?.lastRefreshAt;
  let passwordHash = firebaseUser && firebaseUser?.reloadUserInfo && firebaseUser?.reloadUserInfo?.passwordHash;
  let passwordUpdatedAt = firebaseUser && firebaseUser?.reloadUserInfo && firebaseUser?.reloadUserInfo?.passwordUpdatedAt;
  let validSince = firebaseUser && firebaseUser?.reloadUserInfo && firebaseUser?.reloadUserInfo?.validSince;
  let createdUser: User = {
    uid,
    type,
    email,
    id: uid,
    uuid: uid,
    providerId,
    displayName, 
    phoneNumber,
    source: type,
    emailVerified,
    operationType,
    playerLink: true,
    updated: currentDateTimeStamp,
    lastUpdated: currentDateTimeStamp,
    created: formatDateFromFirebase(creationTime),
    validSince: formatDateFromFirebase(validSince),
    lastRefresh: formatDateFromFirebase(lastRefreshAt),
    lastSignIn: formatDateFromFirebase(lastSignInTime),
    ...(type == `Firebase` && {
      name,
      password: passwordHash,
      passwordUpdatedAt: formatDateFromFirebase(passwordUpdatedAt),
    }),
    ...(type == `Google` && {
      image: photoURL,
      name: capitalizeAllWords(email.split(`@`)[0]),
    }),
    roles: firebaseUser?.customClaims?.roles || firebaseUser?.roles,
  }
  return createdUser;
}

export const signInWithGoogle = async (databasePlayers, setUser, setAuthState, plays) => {
  try {
    let createdGoogleUserFromFirebaseData = null;
    let userCredential = await signInWithPopup(auth, googleProvider);
    if (userCredential) createdGoogleUserFromFirebaseData = createUserFromFirebaseData(userCredential, `Google`);

    if (createdGoogleUserFromFirebaseData != null) {
      let dbPlayers = getActivePlayers(databasePlayers, true, plays);
      let nameToAdd = createdGoogleUserFromFirebaseData?.name;
      let lowerCaseName = nameToAdd.toLowerCase();
      let playerExists = dbPlayers.length > 0 && dbPlayers.find(plyr => plyr.name.toLowerCase() == lowerCaseName || plyr.name.toLowerCase().includes(lowerCaseName));

      if (playerExists) {
        setUser(playerExists);
        setAuthState(`Sign Out`);
      } else {
        let namesToAdd = [nameToAdd];
        namesToAdd.forEach((usr, usrIndex) => {
          let currentDateTimeStamp = formatDate(new Date());
          let userPlayerData = createPlayer(usr, usrIndex, databasePlayers);
          let { uid, email, image, playerLink, emailVerified, source, type, validSince, lastRefresh, lastSignIn, providerId, operationType } = createdGoogleUserFromFirebaseData;

          let playerUserData: any = {
            ...userPlayerData,
            uid,
            type,
            email,
            image,
            source,
            providerId,
            validSince,
            playerLink,
            lastSignIn,
            lastRefresh,
            operationType,
            emailVerified,
            roles: userPlayerData?.roles,
          };

          playerUserData.properties = countPropertiesInObject(playerUserData);

          createdGoogleUserFromFirebaseData = {
            ...createdGoogleUserFromFirebaseData,
            updated: currentDateTimeStamp,
            lastUpdated: currentDateTimeStamp,
            uniqueIndex: playerUserData?.uniqueIndex,
            roles: playerUserData?.roles,
            uuid: playerUserData?.uuid,
            ID: playerUserData?.ID,
            id: playerUserData?.id,
          }

          createdGoogleUserFromFirebaseData.properties = countPropertiesInObject(createdGoogleUserFromFirebaseData);

          let usersAndPlaysState = {player: playerUserData, user: createdGoogleUserFromFirebaseData}
          
          addPlayerToDB(usersAndPlaysState?.player);
          // if (dev()) console.log(`Add To DB`, usersAndPlaysState);
          // addUserToDB(usersAndPlaysState?.user);
          // if (dev() && userCredential.operationType != `signIn`) console.log(`Add To DB`, usersAndPlaysState);
          // if (userCredential.operationType != `signIn`) addPlayerToDB(usersAndPlaysState?.player);
          // if (userCredential.operationType != `signIn`) addUserToDB(usersAndPlaysState?.user);

          dev() && console.log(`User`, usersAndPlaysState);
          setUser(usersAndPlaysState?.user);
          setAuthState(`Sign Out`);
        })
      }
    }
  } catch (error) {
    if (error.code === `auth/popup-closed-by-user`) {
      dev() && console.log(`User closed Google sign in popup`);
    } else {
      console.log(`Error Signing into Google`, error);
    }
  }
}

export default function Form(props?: any) {
  const { style } = props;
  const loadedRef = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const { user, setUser, updates, setUpdates, authState, setAuthState, emailField, setEmailField, users, setFocus, mobile, databasePlayers, playersLoading, useDatabase, plays } = useContext<any>(StateContext);

  const authForm = (e?: any) => {
    e.preventDefault();
    let formFields = e.target.children;
    let clicked = e?.nativeEvent?.submitter;
    let email = formFields?.email?.value ?? `email`;
    let password = formFields?.password?.value ?? `password`;

    switch(clicked?.value) {
      default:
        console.log(clicked?.value);
        break;
      case `Next`:
        setEmailField(true);
        setAuthState(`Sign Up`);
        break;
      case `Back`:
        setUpdates(updates+1);
        setAuthState(`Next`);
        setEmailField(false);
        break;
      case `Sign Out`:
        if (useDatabase == true) signOut(auth);
        setUser(null);
        setAuthState(`Next`);
        setEmailField(false);
        setUpdates(updates+1);
        break;
      case `Save`:
        let emptyFields = [];
        let fieldsToUpdate = [];
        console.log(`Save`, formFields);
        for (let i = 0; i < formFields.length; i++) {
          const input = formFields[i];
          if (input?.classList?.contains(`userData`)) {
            if (input.value === ``) {
              emptyFields.push(input?.placeholder);
            } else {
              fieldsToUpdate.push(input);
            }
          }
        }
        if (fieldsToUpdate.length == 0) {
          showAlert(`The Form was NOT Saved.`, `You Can Fill`, emptyFields);
        } else {
          console.log(`Fields To Update`, fieldsToUpdate);
        }
        break;
      case `Sign In`:
        if (password == ``) {
          showAlert(`Password Required`, <PasswordRequired />, (mobile || window.innerWidth <= 768) ? `88%` : `55%`, (mobile || window.innerWidth <= 768) ? `60%` : `auto`);
          return;
        } else { // Sign User In
          if (useDatabase == true) {
            signInWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
              let existingUser = createUserFromFirebaseData(userCredential, `Firebase`);
              console.log(`User Signed In`, existingUser);
              setFocus(false);
              // setAuthState(`Sign Out`);
              // setUser(existingUser);
            }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              showAlert(`<div class="loadingMessage"><h3>${errorMessage}</h3></div>`, `50%`, `35%`);
              console.log(`Error Signing In`, {
                error,
                errorCode,
                errorMessage
              });
              return;
            });
          }
        }
        break;
      case `Sign Up`:
        let name = capitalizeAllWords(email.split(`@`)[0]);
        if (password == ``) {
          showAlert(`Password Required`, <PasswordRequired />, (mobile || window.innerWidth <= 768) ? `88%` : `55%`, (mobile || window.innerWidth <= 768) ? `60%` : `auto`);
          return;
        } else {
          console.log(`Sign Up Params`, {name, email, password});
          createUserWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
            let newUser = createUserFromFirebaseData(userCredential, `Firebase`);
            console.log(`User Signed Up`, newUser);

            setAuthState(`Signed Up`);
            setUser(newUser);
          }).catch((error) => {
            console.log(`Error Signing Up`, error);
            const errorMessage = error.message;
            console.log({errorMessage});
            if (errorMessage) {
              const renderErrorMessage = (erMsg) => {
                if (erMsg.toLowerCase().includes(`invalid-email`)) {
                  return `Please use a valid email.`;
                } else if (erMsg.toLowerCase().includes(`email-already-in-use`)) {
                  return `Email is already in use.`;
                } {
                  return erMsg;
                }
              }

              showAlert(`Error Signing Up`, <div className="errorMessage loadingMessage">
                <i className="fas fa-exclamation-triangle"></i>
                <h3>{renderErrorMessage(errorMessage)}</h3>
              </div>, `50%`, `35%`);                 
            }
            return;
          });
        }
      break;
    };
  }

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    setLoaded(true);
  }, [user, users, authState]);

  return <>
    {playersLoading ? (
      <LoadingSpinner override={true} size={18} />
    ) : (
      <form id={props.id} onSubmit={authForm} className={`flex authForm ${props.className} ${authState == `Sign Up` || authState == `Sign In` ? `threeInputs` : ``} ${user ? `userSignedIn` : `userSignedOut`}`} style={style}>
        {!user && <div className={`authStateForm`}>
          <span className={`authFormLabel`}>
            <span className={`authFormPhrase`}>{authState == `Next` ? signUpOrSignIn : authState}</span>
          </span>
        </div>}
        {!user && <input placeholder="Email Address" type="email" name="email" autoComplete={`email`} required />}
        {!user && emailField && (
          <input placeholder="Password" type="password" name="password" autoComplete={`current-password`} />
        )}
        {user && window?.location?.href?.includes(`profile`) && <input id="name" className={`name userData`} placeholder="Name" type="text" name="status" />}
        {user && window?.location?.href?.includes(`profile`) && <input id="status" className={`status userData`} placeholder="Status" type="text" name="status" />}
        {user && window?.location?.href?.includes(`profile`) && <input id="bio" className={`bio userData`} placeholder="About You" type="text" name="bio" />}
        {user && window?.location?.href?.includes(`profile`) && <input id="number" className={`number userData`} placeholder="Favorite Number" type="number" name="number" />}
        {user && window?.location?.href?.includes(`profile`) && <input id="password" className={`editPassword userData`} placeholder="Edit Password" type="password" name="editPassword" autoComplete={`current-password`} />}
        <input title={user ? `Sign Out` : authState} className={`${(user && window?.location?.href?.includes(`profile`) || (authState == `Sign In` || authState == `Sign Up`)) ? `submit half` : `submit full`} ${user ? `userSignedInSubmit` : `userSignedOutSubmit`}`} type="submit" name="authFormSubmit" value={user ? `Sign Out` : authState} />
        {/* {(authState == `Sign In` || authState == `Sign Up`) && <input id={`back`} className={`back`} type="submit" name="authFormBack" value={`Back`} />} */}
        {!user && authState == `Next` && <div title={`${signUpOrSignIn} With Google`} className={`customUserSection`}>
          <GoogleButton onClick={(e) => signInWithGoogle(databasePlayers, setUser, setAuthState, plays)} type="dark" />
        </div>}
        {user && <div title={`Welcome, ${user?.name}`} className={`customUserSection`}>
          {user?.image ? <img alt={user?.email} src={user?.image}  className={`userImage`} /> : user?.name?.split[``][0].toUpperCase()}
          Welcome, {user?.name}
        </div>}
        {user && window?.location?.href?.includes(`profile`) && <input id={user?.id} className={`save`} type="submit" name="authFormSave" style={{padding: 0}} value={`Save`} />}
      </form>
    )}
  </>
}