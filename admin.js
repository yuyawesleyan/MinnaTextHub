// admin.js

import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js';
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js';
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
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('logout-button').addEventListener('click', async () => {
    try {
        await signOut(auth);
        alert('ログアウトしました！');
        window.location.href = 'index2.html';
    } catch (error) {
        alert(`ログアウト中にエラーが発生しました: ${error.message}`);
    }
});

document.getElementById('notification-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const notificationContent = document.getElementById('notification-content').value;
    
    try {
        await addDoc(collection(db, 'announcements'), {
            content: notificationContent,
            timestamp: new Date(),
        });
        alert('お知らせが投稿されました！');
        document.getElementById('notification-content').value = '';
    } catch (error) {
        alert(`投稿中にエラーが発生しました: ${error.message}`);
    }
});
