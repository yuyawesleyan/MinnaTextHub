// メンバーページの JavaScript
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js';
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

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = 'login.html';
    } else {
        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.textContent = `ようこそ、${user.displayName || '会員様'}さん！`;

       // お知らせの取得
try {
    const announcementList = document.getElementById('announcement-list');
    announcementList.innerHTML = ''; // 既存のリストをクリア
    const querySnapshot = await getDocs(collection(db, 'announcements'));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data); // データをログに表示
        const listItem = document.createElement('li');
        listItem.textContent = data.content;
        announcementList.appendChild(listItem);
    });
} catch (error) {
    console.error("データ取得エラー: ", error);
}

    }
});
