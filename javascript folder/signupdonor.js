// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";


//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB05Sco7F9vSENoaXUs49wFa0Q-mknOiUs",
  authDomain: "blood-donation-57115.firebaseapp.com",
  projectId: "blood-donation-57115",
  storageBucket: "blood-donation-57115.firebasestorage.app",
  messagingSenderId: "203482166104",
  appId: "1:203482166104:web:1aa75a46cf2ce61086eb2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


document.addEventListener("DOMContentLoaded", () => {
    let submitbutton = document.getElementById("submitbutton");
    async function addDonor() {
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let contact = document.getElementById("contact").value;
        let bloodgroup = document.getElementById("bloodgroup").value;
        let availability = document.getElementById("availability").checked ? "Yes" : "No";
        let location = document.getElementById("location").value;


        // Validate required fields
        if (!name || !age || !contact || !bloodgroup || !location) {
            alert("Please fill in all the fields.");
            return;
        }

        try {
            // Add document to Firestore with an auto-generated ID
            const docRef = await addDoc(collection(db, "theuserlist"), {
                Username: name,
                Age: age,
                Contact: contact,
                BloodGroup: bloodgroup,
                Availability: availability,
                Location: location
            });

            alert(`Donor added successfully! User ID: ${docRef.id}`);
        }
        catch (error) {
            alert("Error adding document: " + error);
            console.error(error);
        }
    }




    submitbutton.addEventListener("click",addDonor);
});
