let carrinho = [];
const itensCarrinho = document.getElementById('itensCarrinho');
const totalCarrinho = document.getElementById('totalCarrinho');

function adicionarAoCarrinho(nome, preco) {
    const item = carrinho.find(item => item.nome === nome);
    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    atualizarCarrinho();
}

function atualizarCarrinho() {
    itensCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}`;
        itensCarrinho.appendChild(li);
        total += item.preco * item.quantidade;
    });

    totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }

    alert('Compra finalizada com sucesso!');
    carrinho = [];
    atualizarCarrinho();
}
