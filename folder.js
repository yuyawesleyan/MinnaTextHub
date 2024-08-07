import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

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

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const folderPath = urlParams.get('path');
    const gallery = document.getElementById('gallery');

    if (folderPath) {
        const listRef = ref(storage, folderPath);
        listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    getDownloadURL(itemRef).then((url) => {
                        const img = document.createElement('img');
                        img.src = url;
                        img.alt = 'Folder Image';

                        const div = document.createElement('div');
                        div.className = 'gallery-item';
                        div.appendChild(img);

                        gallery.appendChild(div);
                    });
                });
            })
            .catch((error) => {
                console.error('フォルダー内画像リスト取得失敗:', error);
            });
    }
}
