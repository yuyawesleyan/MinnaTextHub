import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Firebase の設定
const firebaseConfig = {
    apiKey: "AIzaSyDN9KQ50hwjlzFNc26aMOCS0H06JwggY68",
    authDomain: "honkoku-hiroba-21400.firebaseapp.com",
    projectId: "honkoku-hiroba-21400",
    storageBucket: "honkoku-hiroba-21400.appspot.com",
    messagingSenderId: "909469448032",
    appId: "1:909469448032:web:8c62f7f2a978c711cd9005",
};

// Firebase の初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ページロード時にお知らせを読み込む
async function loadNotice() {
    const docRef = doc(db, 'notices', 'latest');
    try {
        const docSnap = await getDoc(docRef);
        const noticeContent = docSnap.exists() ? docSnap.data().content : 'お知らせはありません。';
        document.getElementById('notification-box').innerHTML = `<p>${noticeContent}</p>`;
    } catch (error) {
        console.error("お知らせの読み込みに失敗しました: ", error);
        document.getElementById('notification-box').innerHTML = '<p>お知らせの読み込みに失敗しました。</p>';
    }
}

loadNotice();
