import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB05Sco7F9vSENoaXUs49wFa0Q-mknOiUs",
  authDomain: "blood-donation-57115.firebaseapp.com",
  projectId: "blood-donation-57115",
  storageBucket: "blood-donation-57115.appspot.com",
  messagingSenderId: "203482166104",
  appId: "1:203482166104:web:1aa75a46cf2ce61086eb2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to find donors
document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const bloodGroup = document.getElementById('bloodGroup').value;
  const donorList = document.getElementById('donorList');
  donorList.innerHTML = ''; // Clear previous results

  try {
    const donorsRef = collection(db, 'theuserlist'); // 🔹 Correct collection name
    const q = query(donorsRef, where('BloodGroup', '==', bloodGroup)); // 🔹 Match field name exactly

    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log("No donors found with blood group:", bloodGroup);
      donorList.innerHTML = "<li>No donors found</li>";
    } else {
      querySnapshot.forEach((doc) => {
        const donor = doc.data();
        console.log("Found donor:", donor); // Debugging output
        const donorCard = document.createElement('div');
        donorCard.classList.add('donor-card');

        // Fill in donor details
        donorCard.innerHTML = `
            <strong>${donor.Username}</strong>
            <p>Blood Group: ${donor.BloodGroup}</p>
            <p>Contact: ${donor.Contact}</p>
            <p>Location: ${donor.Location}</p>
        `;

        donorList.appendChild(donorCard);
      });
    }
  } catch (error) {
    console.error("Error fetching donors:", error.message);
    donorList.innerHTML = `<li>Error fetching donors: ${error.message}</li>`;
  }
});

