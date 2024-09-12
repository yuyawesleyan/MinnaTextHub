import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js';

const firebaseConfig = {
    apiKey: "AIzaSyDN9KQ50hwjlzFNc26aMOCS0H06JwggY68",
    authDomain: "honkoku-hiroba-21400.firebaseapp.com",
    projectId: "honkoku-hiroba-21400",
    storageBucket: "honkoku-hiroba-21400.appspot.com",
    messagingSenderId: "909469448032",
    appId: "1:909469448032:web:8c62f7f2a978c711cd9005",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadTimeline() {
    try {
        const timelineContainer = document.getElementById('timeline');
        if (timelineContainer) {
            const querySnapshot = await getDocs(collection(db, 'timeline'));
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const entryDiv = document.createElement('div');
                entryDiv.classList.add('timeline-entry');
                entryDiv.innerHTML = `
                    <div class="timeline-content">
                        <div class="timeline-title">${data.title}</div>
                        <div class="timeline-date">${data.date}</div>
                        <div class="timeline-description">${data.description}</div>
                    </div>
                `;
                timelineContainer.appendChild(entryDiv);
            });
        }
    } catch (error) {
        console.error("データ取得エラー: ", error);
    }
}

loadTimeline();
