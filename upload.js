import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDN9KQ50hwjlzFNc26aMOCS0H06JwggY68",
    authDomain: "honkoku-hiroba-21400.firebaseapp.com",
    projectId: "honkoku-hiroba-21400",
    storageBucket: "honkoku-hiroba-21400.appspot.com",
    messagingSenderId: "909469448032",
    appId: "1:909469448032:web:8c62f7f2a978c711cd9005",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "admin.html";
    }
});

window.uploadFile = function () {
    const file = document.getElementById('file').files[0];
    const folderName = document.getElementById('folderName').value.trim();
    const selectedFolder = document.getElementById('folderSelect').value;

    if (!file) {
        document.getElementById('message').innerText = "ファイルを選択してください。";
        document.getElementById('message').className = "error-message";
        return;
    }

    const folderPath = folderName || selectedFolder;

    if (!folderPath) {
        document.getElementById('message').innerText = "フォルダーを選択または新規作成してください。";
        document.getElementById('message').className = "error-message";
        return;
    }

    const storageRef = ref(storage, `uploads/${folderPath}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            // 進行中の状態
        },
        (error) => {
            document.getElementById('message').innerText = "アップロードに失敗しました: " + error.message;
            document.getElementById('message').className = "error-message";
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                document.getElementById('message').innerText = "アップロードに成功しました: " ;
                document.getElementById('message').className = "success-message";
            });
        }
    );
}

// フォルダー一覧の取得と表示
window.onload = function() {
    const folderSelect = document.getElementById('folderSelect');

    const listRef = ref(storage, 'uploads/');
    listAll(listRef)
        .then((res) => {
            res.prefixes.forEach((folderRef) => {
                const option = document.createElement('option');
                option.value = folderRef.name;
                option.textContent = folderRef.name;
                folderSelect.appendChild(option);
            });
        })
        .catch((error) => {
            console.error('フォルダーリスト取得失敗:', error);
        });
}
