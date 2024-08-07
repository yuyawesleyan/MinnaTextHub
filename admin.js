import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js';
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js';

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

// ユーザー名を取得して表示する関数
function displayUserName(user) {
    const userName = user.displayName || 'ユーザー';
    document.querySelector('.user-info').textContent = `ようこそ、${userName}`;
}

// 認証状態の変更に対応
onAuthStateChanged(auth, (user) => {
    if (user) {
        displayUserName(user);
    } else {
        document.querySelector('.user-info').textContent = 'ログインしていません';
    }
});

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
    
    if (!notificationContent.trim()) {
        alert('お知らせ内容が空です。');
        return;
    }

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
