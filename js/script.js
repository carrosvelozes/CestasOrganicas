import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';
import { getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

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

let carrinho = [];

function atualizarLogin(user) {
    const loginArea = document.getElementById('loginArea');
    if (user) {
        localStorage.setItem('user', JSON.stringify({
            photoURL: user.photoURL || 'img/userimg.png',
            displayName: user.displayName || user.email
        }));
        loginArea.innerHTML = `
            <div class="user-info">
                <img src="${user.photoURL || 'img/userimg.png'}" alt="Avatar" class="user-avatar">
                <span>${user.displayName || user.email}</span>
                <button id="logoutButton">Sair</button>
            </div>
        `;

        document.getElementById('logoutButton').addEventListener('click', () => {
            signOut(auth).then(() => {
                localStorage.removeItem('user');
                window.location.href = "index.html";
            });
        });
    } else {
        localStorage.removeItem('user');
        loginArea.innerHTML = `<a href="login.html" id="loginLink">Login</a>`;
    }
}

onAuthStateChanged(auth, user => {
    atualizarLogin(user);
    if (user) {
        carregarCarrinho();
    }
});

async function carregarProdutos() {
    const listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = ''; 

    try {
        const querySnapshot = await getDocs(collection(db, 'produtos'));
        querySnapshot.forEach((doc) => {
            const produto = doc.data();
            const divProduto = document.createElement('div');
            divProduto.className = 'produto';
            divProduto.innerHTML = `
                ${produto.imagem ? `<img src="${produto.imagem}" alt="${produto.nome}">` : ''}
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco})">Adicionar ao Carrinho</button>
            `;
            listaProdutos.appendChild(divProduto);
        });
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

function atualizarCarrinho() {
    const itensCarrinho = document.getElementById('itensCarrinho');
    const totalCarrinho = document.getElementById('totalCarrinho');
    const carrinhoSection = document.getElementById('carrinho');

    itensCarrinho.innerHTML = '';

    let total = 0;

    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        itensCarrinho.appendChild(li);
        total += item.preco;
    });

    const taxaEntrega = 13.00;
    total += taxaEntrega;

    totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)} (incluindo R$ ${taxaEntrega.toFixed(2)} de entrega)`;

    carrinhoSection.style.display = carrinho.length > 0 ? 'block' : 'none';
}

async function carregarCarrinho() {
    const user = auth.currentUser;
    if (user) {
        const docSnap = await getDoc(doc(db, 'carrinhos', user.uid));
        if (docSnap.exists()) {
            carrinho = docSnap.data().itens;
            atualizarCarrinho();
        }
    }
}

function adicionarAoCarrinho(nome, preco) {
    const user = auth.currentUser;
    if (!user) {
        alert('Faça login para adicionar produtos ao carrinho.');
        return;
    }

    const produto = {
        nome: nome,
        preco: preco
    };

    carrinho.push(produto);
    atualizarCarrinho();
    console.log(`${nome} foi adicionado ao carrinho.`);
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    const taxaEntrega = 13.00;
    const valorTotal = total + taxaEntrega;

    alert(`Compra finalizada! Total a pagar: R$ ${valorTotal.toFixed(2)}`);

    carrinho = [];
    atualizarCarrinho();
}

window.adicionarAoCarrinho = adicionarAoCarrinho;
window.finalizarCompra = finalizarCompra;


function mostrarLoading() {
    document.getElementById('loading').style.display = 'flex';
}

function esconderLoading() {
    document.getElementById('loading').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card-apresentacao');
    const btnLoginApresentacao = document.getElementById('btn-login');
    let currentIndex = 0;

    function showCard(index) {
        cards.forEach((card, i) => {
            card.style.transform = `translateX(-${index * 100}%)`;
        });
    }

    function nextCard() {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    }

    setInterval(nextCard, 5000); 

    document.querySelector('.apresentacao-container').addEventListener('click', nextCard);

    btnLoginApresentacao.addEventListener('click', (event) => {
        event.preventDefault();
        const user = auth.currentUser;

        if (user) {
            alert('Você já está logado!');
        } else {
            window.location.href = "login.html";
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    mostrarLoading();
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        atualizarLogin({ photoURL: user.photoURL, displayName: user.displayName });
        esconderLoading();
    } else {
        onAuthStateChanged(auth, user => {
            atualizarLogin(user);
            if (user) {
                carregarCarrinho();
            }
            esconderLoading();
        });
    }
    carregarProdutos();
});


