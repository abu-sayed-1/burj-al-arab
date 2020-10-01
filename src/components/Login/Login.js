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
            verifyEmail()
            history.replace(from)
            // console.log(result)

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
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;