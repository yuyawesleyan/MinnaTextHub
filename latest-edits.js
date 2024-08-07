import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyDN9KQ50hwjlzFNc26aMOCS0H06JwggY68",
    authDomain: "honkoku-hiroba-21400.firebaseapp.com",
    projectId: "honkoku-hiroba-21400",
    storageBucket: "honkoku-hiroba-21400.appspot.com",
    messagingSenderId: "909469448032",
    appId: "1:909469448032:web:8c62f7f2a978c711cd9005",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

window.onload = function() {
    const latestEditsRef = ref(database, 'timeline');

    onValue(latestEditsRef, (snapshot) => {
        const data = snapshot.val();
        const latestEditsSection = document.getElementById('latest-edits');
        latestEditsSection.innerHTML = '';

        if (data) {
            const posts = Object.values(data).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                
                const userNameElement = document.createElement('p');
                userNameElement.textContent = `投稿者: ${post.userName || '不明'}`;
                postElement.appendChild(userNameElement);

                const imgElement = document.createElement('img');
                imgElement.src = post.imageUrl;
                imgElement.alt = 'Post Image';
                imgElement.style.width = '100%'; // 画像をコンテナの幅に合わせる
                postElement.appendChild(imgElement);

                const textElement = document.createElement('p');
                textElement.textContent = post.text;
                postElement.appendChild(textElement);

                latestEditsSection.appendChild(postElement);
            });
        } else {
            latestEditsSection.innerHTML = '<p>最新の編集がありません。</p>';
        }
    });
}
