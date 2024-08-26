import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';

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


document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Login realizado com sucesso!");
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error("Erro no login:", error);
            document.getElementById('loginMessage').textContent = error.message;
        });
});
