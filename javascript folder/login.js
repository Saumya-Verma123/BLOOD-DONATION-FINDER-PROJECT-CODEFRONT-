import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyB05Sco7F9vSENoaXUs49wFa0Q-mknOiUs",
  authDomain: "blood-donation-57115.firebaseapp.com",
  projectId: "blood-donation-57115",
  storageBucket: "blood-donation-57115.firebasestorage.app",
  messagingSenderId: "203482166104",
  appId: "1:203482166104:web:1aa75a46cf2ce61086eb2d"
};
console.log("Email:", email);
console.log("Password:", password);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//submit button 
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault()
  //inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert("Loggin in....")
      window.location.href="signup_donor.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });

})