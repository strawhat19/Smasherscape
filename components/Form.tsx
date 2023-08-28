import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { capitalizeAllWords, StateContext, showAlert, countPropertiesInObject, formatDate } from '../pages/_app';
import { useContext, useEffect, useRef, useState } from 'react';
import { addPlayerToDB, addUserToDB, createPlayer } from './PlayerForm';
import { auth, googleProvider } from '../firebase';
import PasswordRequired from './PasswordRequired';
import GoogleButton from 'react-google-button';
import User from '../models/User';
import Role from '../models/Role';
import Player from '../models/Player';

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
  const firebaseUser = userCredential.user;
  let currentDateTimeStamp = formatDate(new Date());
  let { uid, email, emailVerified, photoURL } = firebaseUser;
  let { creationTime, lastSignInTime } = firebaseUser.metadata;
  let { lastRefreshAt, passwordHash, passwordUpdatedAt, validSince } = firebaseUser.reloadUserInfo;
  let createdUser: User = {
    uid,
    type,
    email,
    id: uid,
    uuid: uid,
    source: type,
    emailVerified,
    // firebaseUser,
    playerLink: true,
    // userCredential,
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
    }),
  }
  return createdUser;
}

export const signInWithGoogle = async (databasePlayers, setUser, setAuthState) => {
  try {
    let createdGoogleUserFromFirebaseData = null;
    let userCredential = await signInWithPopup(auth, googleProvider);
    if (userCredential) createdGoogleUserFromFirebaseData = createUserFromFirebaseData(userCredential, `Google`);
    
    if (createdGoogleUserFromFirebaseData != null) {
      console.log(`Pre User Signed In With Google`, {userCredential, createdGoogleUserFromFirebaseData});
      let name = capitalizeAllWords(createdGoogleUserFromFirebaseData?.email.split(`@`)[0]);
      let namesToAdd = [name];
      namesToAdd.forEach((usr, usrIndex) => {
        let userPlayerData = createPlayer(usr, usrIndex, databasePlayers);
        let { uid, email, image, firebaseUserData, playerLink, emailVerified, source, type, validSince, lastRefresh, lastSignIn } = createdGoogleUserFromFirebaseData;

        let playerUserData: any = {
          ...userPlayerData,
          uid,
          type,
          email,
          image,
          source,
          validSince,
          playerLink,
          lastSignIn,
          lastRefresh,
          emailVerified,
          firebaseUserData,
          roles: userPlayerData.roles.filter((rol: Role) => rol.level == 2).length > 0 ? userPlayerData.roles : [
            ...userPlayerData.roles, {
              level: 2,
              name: `User`,
              promoted: userPlayerData.created,
            }
          ],
        };

        playerUserData.properties = countPropertiesInObject(playerUserData);

        createdGoogleUserFromFirebaseData = {
          ...createdGoogleUserFromFirebaseData,
          uniqueIndex: playerUserData?.uniqueIndex,
          roles: playerUserData?.roles,
          uuid: playerUserData?.uuid,
          ID: playerUserData?.ID,
          id: playerUserData?.id,
        }

        createdGoogleUserFromFirebaseData.properties = countPropertiesInObject(createdGoogleUserFromFirebaseData);

        console.log(`User`, {player: playerUserData, user: createdGoogleUserFromFirebaseData});
        addPlayerToDB(playerUserData);
        addUserToDB(createdGoogleUserFromFirebaseData);
        setAuthState(`Sign Out`);
        setUser(createdGoogleUserFromFirebaseData);
      })
    }
  } catch (error) {
    if (error.code === `auth/popup-closed-by-user`) {
      console.log(`User closed Google sign in popup`);
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
  const { user, setUser, updates, setUpdates, authState, setAuthState, emailField, setEmailField, users, setFocus, mobile, databasePlayers } = useContext<any>(StateContext);

  const authForm = (e?: any) => {
    console.log(`Pre User`, user);
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
          signInWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
            let existingUser = createUserFromFirebaseData(userCredential, `Firebase`);
            console.log(`User Signed In`, existingUser);
            setFocus(false);
            setAuthState(`Sign Out`);
            setUser(existingUser);
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
            const errorMessage = error.message;
            if (errorMessage) {
              if (errorMessage.includes(`email-already-in-use`)) {
                setAuthState(`Sign In`);
              } else {
                showAlert(`<div class="loadingMessage"><h3>${errorMessage}</h3></div>`, `50%`, `35%`);
              }                  
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
  <form id={props.id} onSubmit={authForm} className={`flex authForm ${props.className} ${authState == `Sign Up` || authState == `Sign In` ? `threeInputs` : ``} ${user ? `userSignedIn` : `userSignedOut`}`} style={style}>
    {!user && <div className={`authStateForm`}>
      <span className={`authFormLabel`}>
        <span className={`authFormPhrase`}>{authState == `Next` ? `Sign Up or Sign In` : authState}</span>
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
    <input className={(user && window?.location?.href?.includes(`profile`) || (authState == `Sign In` || authState == `Sign Up`)) ? `submit half` : `submit full`} type="submit" name="authFormSubmit" value={user ? `Sign Out` : authState} />
    {/* {(authState == `Sign In` || authState == `Sign Up`) && <input id={`back`} className={`back`} type="submit" name="authFormBack" value={`Back`} />} */}
    {!user && <div title={`Sign In With Google`} className={`customUserSection`}>
      <GoogleButton onClick={(e) => signInWithGoogle(databasePlayers, setUser, setAuthState)} type="dark" />
    </div>}
    {user && <div title={`Sign In With Google`} className={`customUserSection`}>
      {user?.image ? <img alt={user?.email} src={user?.image}  className={`googleImage`} /> : user?.name?.split[``][0].toUpperCase()}
    </div>}
    {user && window?.location?.href?.includes(`profile`) && <input id={user?.id} className={`save`} type="submit" name="authFormSave" style={{padding: 0}} value={`Save`} />}
    </form>
  </>
}