import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

// Firebase setup
const firebaseConfig = {
    apiKey: "AIzaSyB05Sco7F9vSENoaXUs49wFa0Q-mknOiUs",
    authDomain: "blood-donation-57115.firebaseapp.com",
    projectId: "blood-donation-57115",
    storageBucket: "blood-donation-57115.firebasestorage.app",
    messagingSenderId: "203482166104",
    appId: "1:203482166104:web:1aa75a46cf2ce61086eb2d"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const patientName = document.getElementById('patientName').value.trim();
    const bloodGroup = document.getElementById('bloodGroup').value;
    const hospitalLocation = document.getElementById('hospitalLocation').value.trim();
    const urgency = document.getElementById('urgency').value;
    const contact = document.getElementById('contact').value.trim();
    const bloodunit = document.getElementById('bloodunit').value.trim();
    const additional = document.getElementById('additional').value.trim();

    if (!patientName || !bloodGroup || !hospitalLocation || !urgency || !contact) {
        alert("Fill all required fields.");
        return;
    }

    if (!/^[0-9]{10}$/.test(contact)) {
        alert("Enter a valid 10-digit phone number.");
        return;
    }

    if (bloodunit && (isNaN(bloodunit) || bloodunit <= 0)) {
        alert("Enter a valid number of blood units.");
        return;
    }

    try {
        await addDoc(collection(db, "bloodrequest"), {
            patientName, bloodGroup, hospitalLocation, urgency, contact,
            bloodunit: bloodunit ? parseInt(bloodunit) : null, additional
        });

        alert("Request submitted!");
        e.target.reset();
    } catch (err) {
        alert("Error submitting request. Try again.");
        console.error(err);
    }
});
