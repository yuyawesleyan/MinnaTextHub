import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-firestore.js";

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

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const adminKey = document.getElementById('adminKey').value; // adminKeyを取得

    const correctAdminKey = "63162211"; 

    if (adminKey !== correctAdminKey) {
        document.getElementById('error-message').textContent = '管理者招待コードが間違っています';
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await updateProfile(user, { displayName: `${name} (管理者)` });
        
        await setDoc(doc(db, "users", user.uid), {
            isAdmin: true
        });

        document.getElementById('success-message').textContent = '管理者登録認証されました';
        alert('管理者登録認証されました！運営にご協力ください');
        window.location.href = 'admin.html';
    } catch (error) {
        document.getElementById('error-message').textContent = '認証失敗: ' + error.message;
    }
});


