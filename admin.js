import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

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
const auth = getAuth(app);

// お知らせを投稿する機能
document.getElementById('notification-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const content = document.getElementById('notification-content').value.trim();
    
    if (content) {
        try {
            await setDoc(doc(db, 'notices', 'latest'), {
                content: content,
                timestamp: new Date()
            });
            alert('お知らせを投稿しました。');
            document.getElementById('notification-content').value = '';
            await loadNotice(); // 投稿後にお知らせを再読み込み
        } catch (error) {
            alert('お知らせの投稿に失敗しました: ' + error.message);
        }
    } else {
        alert('お知らせの内容を入力してください。');
    }
});

// ログアウト機能
document.getElementById('logout-button').addEventListener('click', async () => {
    try {
        await signOut(auth);
        alert('ログアウト成功');
        window.location.href = 'index.html'; // ログインページへリダイレクト
    } catch (error) {
        alert('ログアウト失敗: ' + error.message);
    }
});

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
