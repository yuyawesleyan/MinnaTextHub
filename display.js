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
    const foldersContainer = document.getElementById('folders');

    const listRef = ref(storage, 'uploads/');
    listAll(listRef)
        .then((res) => {
            res.prefixes.forEach((folderRef) => {
                const folderDiv = document.createElement('div');
                folderDiv.className = 'folder';
                folderDiv.dataset.folderPath = folderRef.fullPath;

                const folderTitle = document.createElement('div');
                folderTitle.className = 'folder-title';
                folderTitle.textContent = folderRef.name;
                folderDiv.appendChild(folderTitle);

                const folderImage = document.createElement('img');
                folderDiv.appendChild(folderImage);

                folderDiv.onclick = function() {
                    window.location.href = `folder.html?path=${encodeURIComponent(folderRef.fullPath)}`;
                };

                foldersContainer.appendChild(folderDiv);

                listAll(folderRef).then((folderRes) => {
                    if (folderRes.items.length > 0) {
                        getDownloadURL(folderRes.items[0]).then((url) => {
                            folderImage.src = url;
                            folderImage.alt = 'Folder Image';
                        });
                    }
                });
            });
        })
        .catch((error) => {
            console.error('フォルダーリスト取得失敗:', error);
        });
}
