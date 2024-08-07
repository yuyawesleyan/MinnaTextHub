import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref as dbRef, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDN9KQ50hwjlzFNc26aMOCS0H06JwggY68",
    authDomain: "honkoku-hiroba-21400.firebaseapp.com",
    projectId: "honkoku-hiroba-21400",
    storageBucket: "honkoku-hiroba-21400.appspot.com",
    messagingSenderId: "909469448032",
    appId: "1:909469448032:web:8c62f7f2a978c711cd9005",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

window.onload = function() {
    const timeline = document.getElementById('timeline');
    const timelineRef = dbRef(database, 'timeline');

    onValue(timelineRef, (snapshot) => {
        timeline.innerHTML = ''; // Clear existing timeline items
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            const div = document.createElement('div');
            div.className = 'timeline-item';

            const img = document.createElement('img');
            img.src = data.imageUrl;
            img.alt = 'Timeline Image';
            img.onclick = function() {
                openZoomedImage(data.imageUrl, data.text);
            };

            const p = document.createElement('p');
            p.textContent = data.text;

            div.appendChild(img);
            div.appendChild(p);
            timeline.appendChild(div);
        });
    });
}

function openZoomedImage(imageUrl, text) {
    const win = window.open("", "ZoomedImage", "width=800,height=600");
    win.document.write(`<html><body><img src="${imageUrl}" style="width: 100%; height: auto;"><p>${text}</p></body></html>`);
}
