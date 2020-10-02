import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import 'firebase/auth';
import firebaseConfig from './firebase.config'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';




const Login = () => {

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation()
    let {from} = location.state || {form:{pathname:"/"}}
      if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
      }
    const provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(provider).then(function(result) {
            const {displayName,email,photoURL} = result.user;
            const isSignedInUser = {
                // isSignIn:false,
                name:displayName,
                email:email,
                // photo:photoURL
            }
            setLoggedInUser(isSignedInUser)
            storeAuthToken();
       // token ^^ ta ei khane call korchi zeno login hobar por token e tar info diye de 
            verifyEmail()
            }).catch ( error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;

          });



          const verifyEmail = () => {
            var user = firebase.auth().currentUser;
      
          user.sendEmailVerification().then(function() {
            // Email sent.
          }).catch(function(error) {
            // An error happened.
          });
      }
    }
    const storeAuthToken = () => {
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(function(idToken) {
        sessionStorage.setItem('token', idToken)
    //ei code diye ^^ amra vrefication idToken sessionStorage padai diche
    //kon pathai chi zeno amra ze kono components theke idToken read korte pari
        history.replace(from)

      }).catch(function(error) {
        // Handle error
      });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;