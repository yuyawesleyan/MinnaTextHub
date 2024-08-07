import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
import { getDatabase, ref as dbRef, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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
const database = getDatabase(app);

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const folderPath = urlParams.get('path');
    const gallery = document.getElementById('gallery');

    if (folderPath) {
        const listRef = ref(storage, folderPath);

        listAll(listRef)
            .then((res) => {
                if (res.items.length === 0) {
                    gallery.innerHTML = '<p>フォルダー内に画像がありません。</p>';
                } else {
                    res.items.forEach((itemRef) => {
                        getDownloadURL(itemRef).then((url) => {
                            const img = document.createElement('img');
                            img.src = url;
                            img.alt = 'Folder Image';

                            const div = document.createElement('div');
                            div.className = 'gallery-item';
                            div.appendChild(img);

                            img.onclick = function() {
                                openTextInput(url);
                            };

                            gallery.appendChild(div);
                        }).catch(error => {
                            console.error('画像のURL取得に失敗しました:', error);
                        });
                    });
                }
            })
            .catch((error) => {
                console.error('フォルダー内画像リスト取得失敗:', error);
            });
    } else {
        gallery.innerHTML = '<p>フォルダーのパスが指定されていません。</p>';
    }
}

function openTextInput(imageUrl) {
    const container = document.getElementById('text-input-container');
    container.style.display = 'flex';
    const img = document.getElementById('zoom-image');
    img.src = imageUrl;
    img.style.transform = 'scale(1)'; // Reset zoom scale
    document.getElementById('text-input').dataset.imageUrl = imageUrl;
}

function closeTextInput() {
    const container = document.getElementById('text-input-container');
    container.style.display = 'none';
}

function zoomIn() {
    const img = document.getElementById('zoom-image');
    const currentScale = parseFloat(img.style.transform.replace('scale(', '').replace(')', '')) || 1;
    img.style.transform = `scale(${currentScale + 0.1})`;
}

function zoomOut() {
    const img = document.getElementById('zoom-image');
    const currentScale = parseFloat(img.style.transform.replace('scale(', '').replace(')', '')) || 1;
    img.style.transform = `scale(${Math.max(currentScale - 0.1, 0.1)})`;
}

function sendText() {
    const textArea = document.getElementById('text-input');
    const imageUrl = textArea.dataset.imageUrl;
    const text = textArea.value.trim();

    if (text && imageUrl) {
        // 管理者画面と会員画面のタイムラインに送信する処理
        const timelineRef = dbRef(database, 'timeline');
        const newPostRef = timelineRef.push();
        newPostRef.set({
            imageUrl: imageUrl,
            text: text,
            timestamp: new Date().toISOString()
        })
        .then(() => {
            console.log('投稿が成功しました。');
            closeTextInput();
        })
        .catch(error => {
            console.error('投稿に失敗しました:', error);
        });
    } else {
        alert('テキストを入力してください。');
    }
}

// イベントリスナーの設定
document.getElementById('send-button').addEventListener('click', sendText);
document.getElementById('close-button').addEventListener('click', closeTextInput);
document.getElementById('zoom-in-button').addEventListener('click', zoomIn);
document.getElementById('zoom-out-button').addEventListener('click', zoomOut);
