import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-firestore.js";

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

window.register = async function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const adminKey = document.getElementById('adminKey').value;

    const correctAdminKey = "63162211"; // 管理者パスフレーズ

    if (adminKey !== correctAdminKey) {
        document.getElementById('error-message').textContent = '管理者パスナンバーが間違っています';
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Firestore に管理者フラグを設定
        await setDoc(doc(db, "users", user.uid), {
            isAdmin: true
        });

        document.getElementById('success-message').textContent = '管理者登録成功';
    } catch (error) {
        document.getElementById('error-message').textContent = '登録失敗: ' + error.message;
    }
}
