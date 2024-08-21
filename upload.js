import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Firebaseの設定
const firebaseConfig = {
    apiKey: "AIzaSyDN9KQ50hwjlzFNc26aMOCS0H06JwggY68",
    authDomain: "honkoku-hiroba-21400.firebaseapp.com",
    projectId: "honkoku-hiroba-21400",
    storageBucket: "honkoku-hiroba-21400.appspot.com",
    messagingSenderId: "909469448032",
    appId: "1:909469448032:web:8c62f7f2a978c711cd9005",
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

// ユーザーの認証状態を監視
let userRole = "";
onAuthStateChanged(auth, (user) => {
    if (user) {
        userRole = user.email === "admin@example.com" ? "admin" : "user"; // 役割設定
    } else {
        window.location.href = "login.html"; // 未認証ユーザーをログインページにリダイレクト
    }
});

// ファイルアップロード処理
window.uploadFile = function () {
    const files = document.getElementById('file').files;
    const folderName = document.getElementById('folderName').value.trim();
    const selectedFolder = document.getElementById('folderSelect').value;

    if (files.length === 0) {
        displayMessage("ファイルを選択してください。", "error-message");
        return;
    }

    const folderPath = folderName || selectedFolder;

    if (!folderPath) {
        displayMessage("フォルダーを選択または新規作成してください。", "error-message");
        return;
    }

    let uploadedFiles = 0;
    const totalFiles = files.length;

    Array.from(files).forEach((file) => {
        const storageRef = ref(storage, `uploads/${folderPath}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // 進捗表示が必要な場合はここにコードを追加
            },
            (error) => {
                displayMessage("アップロードに失敗しました: " + error.message, "error-message");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(() => {
                    uploadedFiles++;
                    if (uploadedFiles === totalFiles) {
                        displayMessage("すべてのファイルがアップロードされました。", "success-message");
                    }
                });
            }
        );
    });
}

// メッセージ表示
function displayMessage(message, className) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = message;
    messageElement.className = className;
}

// ページ読み込み時にフォルダーのリストを取得
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

// コンテナを閉じる
function closeContainer() {
    document.getElementById('uploadContainer').classList.add('hidden');
}

// 戻るボタンの処理
function goBack() {
    if (userRole === "admin") {
        window.location.href = "admin.html";
    } else if (userRole === "user") {
        window.location.href = "user.html";
    } else {
        window.history.back(); // 役割が不明な場合はブラウザの履歴を一つ戻る
    }
}
