import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Firebase の設定
const firebaseConfig = {
    apiKey: "AIzaSyDN9KQ50hwjlzFNc26aMOCS0H06JwggY68",
  authDomain: "honkoku-hiroba-21400.firebaseapp.com",
  projectId: "honkoku-hiroba-21400",
  storageBucket: "honkoku-hiroba-21400.appspot.com",
  messagingSenderId: "909469448032",
  appId: "1:909469448032:web:8c62f7f2a978c711cd9005",
};

// Firebase 初期化
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

// 認証チェック
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "admin.html"; // ログインしていない場合、ログインページにリダイレクト
    }
});

// ファイルアップロード
window.uploadFile = function () {
    const file = document.getElementById('file').files[0];
    const path = document.getElementById('path').value.trim();

    if (!file) {
        document.getElementById('message').innerText = "ファイルを選択してください。";
        document.getElementById('message').className = "error-message";
        return;
    }

    if (!path) {
        document.getElementById('message').innerText = "保存先パスを指定してください。";
        document.getElementById('message').className = "error-message";
        return;
    }

    const storageRef = ref(storage, `${path}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            // 進行中の状態（プログレスバーの実装などが可能）
        }, 
        (error) => {
            // エラー処理
            document.getElementById('message').innerText = "アップロードに失敗しました: " + error.message;
            document.getElementById('message').className = "error-message";
        }, 
        () => {
            // アップロード成功
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                document.getElementById('message').innerText = "アップロードに成功しました: " + downloadURL;
                document.getElementById('message').className = "success-message";
            });
        }
    );
}
