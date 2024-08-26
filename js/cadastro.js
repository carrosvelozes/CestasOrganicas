import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';
import { doc, setDoc, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyAXZ9cv0SxLiahjdOjArRtlAO_O1tEa5Bk",
    authDomain: "aulaweb-f4d36.firebaseapp.com",
    projectId: "aulaweb-f4d36",
    storageBucket: "aulaweb-f4d36.appspot.com",
    messagingSenderId: "792554501068",
    appId: "1:792554501068:web:90f6950d8c4fc0ab962369"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

auth.onAuthStateChanged(user => {
    const usuarioNome = document.getElementById('usuarioNome');
    const usuarioFoto = document.getElementById('usuarioFoto');

    if (user && usuarioNome && usuarioFoto) {
        usuarioNome.textContent = user.displayName;
        usuarioFoto.src = user.photoURL || 'img/userimg.png';
    } else {
        console.warn('Elementos de usuário não encontrados no DOM.');
    }
});

document.getElementById('cadastroPessoaForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nomePessoa').value;
    const email = document.getElementById('emailPessoa').value;
    const senha = document.getElementById('senhaPessoa').value;

    createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            const user = userCredential.user;

            return user.updateProfile({
                displayName: nome,
                photoURL: 'img/default-profile.png' 
            });
        })
        .then(() => {
            return setDoc(doc(db, "usuarios", auth.currentUser.uid), {
                nome: nome,
                email: email,
                senha: senha
            });
        })
        .then(() => {
            console.log("Cadastro de pessoa realizado com sucesso!");
        })
        .catch((error) => {
            console.error("Erro no cadastro:", error);
        });
});

document.getElementById('cadastroProduto').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const imagem = document.getElementById('imagem').value;

    try {
        await setDoc(doc(db, 'produtos', nome), {
            nome,
            descricao,
            preco,
            imagem: imagem || ''
        });
        alert('Produto cadastrado com sucesso!');
        document.getElementById('cadastroProduto').reset();
    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
    }
});