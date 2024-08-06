import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-firestore.js";

// Firebaseの設定
const firebaseConfig = {
    apiKey: "AIzaSyDN9KQ50hwjlzFNc26aMOCS0H06JwggY68",
  authDomain: "honkoku-hiroba-21400.firebaseapp.com",
  projectId: "honkoku-hiroba-21400",
  storageBucket: "honkoku-hiroba-21400.appspot.com",
  messagingSenderId: "909469448032",
  appId: "1:909469448032:web:8c62f7f2a978c711cd9005",
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.login = async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Firestore でユーザーの管理者フラグを確認
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists() && docSnap.data().isAdmin) {
            // 管理者認証成功
            window.location.href = 'admin.html'; 
        } else {
            document.getElementById('error-message').textContent = '管理者権限がありません';
        }
    } catch (error) {
        document.getElementById('error-message').textContent = 'ログイン失敗: ' + error.message;
    }
}
