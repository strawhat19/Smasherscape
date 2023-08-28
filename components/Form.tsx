import { useContext, useEffect, useRef, useState } from 'react';
import { capitalizeAllWords, StateContext, showAlert } from '../pages/_app';

export default function Form(props?: any) {
  const { style } = props;
  const loadedRef = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false); 
  const { user, setUser, updates, setUpdates, authState, setAuthState, emailField, setEmailField, users, setFocus } = useContext<any>(StateContext);

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
        // getDocs(collection(db, `users`)).then((snapshot) => {
        //   let latestUsers = snapshot.docs.map((doc: any) => doc.data()).sort((a: any, b: any) => b?.highScore - a?.highScore);
        //   let macthingEmails = latestUsers.filter((usr: any) => usr?.email.toLowerCase() == email.toLowerCase());
        //   setUsers(latestUsers);
        // let arr = [];
        // setEmailField(true);
        // if (arr.length > 0) {
        //   // localStorage.setItem(`account`, JSON.stringify(macthingEmails[0]));
          // setAuthState(`Sign In`);
        // } else {
          setEmailField(true);
          setAuthState(`Sign Up`);
        // }
        // });
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
        // localStorage.removeItem(`user`);
        // localStorage.removeItem(`users`);
        // localStorage.removeItem(`lists`);
        // localStorage.removeItem(`score`);
        // localStorage.removeItem(`health`);
        // localStorage.removeItem(`account`);
        // localStorage.removeItem(`highScore`);
        break;
      case `Save`:
        let emptyFields = [];
        let fieldsToUpdate = [];

        console.log(formFields);

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
        //   let updatedUser = { ...user, updated: formatDate(new Date()) };
        //   Object.assign(updatedUser, ...([...fieldsToUpdate].map(input => {
        //     if (input?.classList?.contains(`userData`)) {
        //       if (input?.id == `bio`) setContent(formFields?.bio?.value);
        //       return {[input.id]: input.value}
        //     }
        //   })));
          // addOrUpdateUser(user?.id, updatedUser);
        }
        break;
      case `Sign In`:

        if (password == ``) {
          showAlert(`Password Required`);
        } else { // Successful Sign In
        //   if (password == existingAccount?.password) {
            setFocus(false);
            setAuthState(`Sign Out`);
            // setUser(existingAccount);
            // setColor((existingAccount?.color || `#000000`));
            // getDocs(collection(db, `users`)).then((snapshot) => setUsers(snapshot.docs.map((doc: any) => doc.data()).sort((a: any, b: any) => b?.highScore - a?.highScore)));
        //   } else {
            // showAlert(`Invalid Password`);
        //   }
        }
        break;
      case `Sign Up`:
        let name = capitalizeAllWords(email.split(`@`)[0]);
        console.log(`Sign Up Params`, {name, email, password});
        showAlert(`Whoah There!`, <div className={`formWarning`}>
          <h2 style={{fontSize: `1.5em`}}>
            Ok so, I haven't quite put user authentication in yet, I will soon! For now, this is not supported yet, apologies!
          </h2>
        </div>, `65%`, `auto`);
        setAuthState(`Next`);
        setEmailField(false);
        // setAuthState(`Signed Up`);

        // getDocs(collection(db, `users`)).then((snapshot) => {
        //   let latestUsers = snapshot.docs.map((doc: any) => doc.data());
        //   let macthingEmails = latestUsers.filter((usr: any) => usr?.email.toLowerCase() == email.toLowerCase());
        //   setUsers(latestUsers);
        //   if (macthingEmails.length > 0) {
        //     localStorage.setItem(`account`, JSON.stringify(macthingEmails[0]));
        //     setAuthState(`Sign In`);
        //   } else {
        //     setAuthState(`Sign Up`);
        //   }

        //   let password = formFields?.password?.value;
        //   if (password == ``) {
        //     showAlert(`Password Required`);
        //   } else {
        //     setFocus(false);
        //     let storedHighScore = JSON.parse(localStorage.getItem(`highScore`) as any);
        //     let potentialUser = { 
        //       id: users.length + 1, 
        //       bio: ``,
        //       color: ``, 
        //       number: 0,
        //       status: ``,
        //       name: name, 
        //       email: email,
        //       roles: [`user`],
        //       password: password, 
        //       lists: defaultLists,
        //       updated: formatDate(new Date()), 
        //       lastSignin: formatDate(new Date()), 
        //       registered: formatDate(new Date()), 
        //       highScore: Math.floor(storedHighScore) || 0,
        //     };
  
        //     let uuid = genUUID(latestUsers, potentialUser);
        //     // addOrUpdateUser(uuid, potentialUser);
        //     getDocs(collection(db, `users`)).then((snapshot) => setUsers(snapshot.docs.map((doc: any) => doc.data()).sort((a: any, b: any) => b?.highScore - a?.highScore)));
        //     setAuthState(`Sign Out`);
        //   }
        // });
        break;
    };
  }

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    setLoaded(true);
  }, [user, users, authState]);

  return <>
  <form id={props.id} onSubmit={authForm} className={`flex authForm ${props.className} ${authState == `Sign Up` || authState == `Sign In` ? `threeInputs` : ``}`} style={style}>
    <div className={`authStateForm`}>
      <span className={`authFormLabel`}>
        <span className={`authFormPhrase`}>{authState == `Next` ? `Sign Up or Sign In` : authState}</span>
      </span>
    </div>
    {!user && <input placeholder="Email Address" type="email" name="email" autoComplete={`email`} required />}
    {!user && emailField && <input placeholder="Password (Use a password that you dont care about, but its still easy to remember)" type="password" name="password" autoComplete={`current-password`} />}
    {user && window?.location?.href?.includes(`profile`) && <input id="name" className={`name userData`} placeholder="Name" type="text" name="status" />}
    {user && window?.location?.href?.includes(`profile`) && <input id="status" className={`status userData`} placeholder="Status" type="text" name="status" />}
    {user && window?.location?.href?.includes(`profile`) && <input id="bio" className={`bio userData`} placeholder="About You" type="text" name="bio" />}
    {user && window?.location?.href?.includes(`profile`) && <input id="number" className={`number userData`} placeholder="Favorite Number" type="number" name="number" />}
    {user && window?.location?.href?.includes(`profile`) && <input id="password" className={`editPassword userData`} placeholder="Edit Password" type="password" name="editPassword" autoComplete={`current-password`} />}
    <input className={(user && window?.location?.href?.includes(`profile`) || (authState == `Sign In` || authState == `Sign Up`)) ? `submit half` : `submit full`} type="submit" name="authFormSubmit" value={user ? `Sign Out` : authState} />
    {/* {(authState == `Sign In` || authState == `Sign Up`) && <input id={`back`} className={`back`} type="submit" name="authFormBack" value={`Back`} />} */}
    {user && window?.location?.href?.includes(`profile`) && <input id={user?.id} className={`save`} type="submit" name="authFormSave" style={{padding: 0}} value={`Save`} />}
    </form>
  </>
}