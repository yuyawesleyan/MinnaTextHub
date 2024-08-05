import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const listRef = ref(storage, 'uploads/');

listAll(listRef)
    .then((res) => {
        const filesDiv = document.getElementById('files');
        res.items.forEach((itemRef) => {
            getDownloadURL(itemRef)
                .then((url) => {
                    const a = document.createElement('a');
                    a.href = url;
                    a.textContent = itemRef.name;
                    a.target = '_blank';
                    filesDiv.appendChild(a);
                    filesDiv.appendChild(document.createElement('br'));
                });
        });
    })
    .catch((error) => {
        console.error('ファイルリスト取得失敗:', error);
    });
