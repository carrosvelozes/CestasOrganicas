// Cadastro de Consuimdor
document.getElementById('cadastroPessoaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nomePessoa').value;
    const email = document.getElementById('emailPessoa').value;
    const endereco = document.getElementById('enderecoPessoa').value;

    const pessoa = {
        nome: nome,
        email: email,
        endereco: endereco
    };

    console.log("Pessoa cadastrada:", JSON.stringify(pessoa));
    alert("Cadastro de pessoa realizado com sucesso!");
});

// Cadastro de Produto
document.getElementById('cadastroProdutoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeProduto').value;
    const descricao = document.getElementById('descricaoProduto').value;
    const preco = document.getElementById('precoProduto').value;

    const produto = {
        nome: nome,
        descricao: descricao,
        preco: preco
    };

    console.log("Produto cadastrado:", JSON.stringify(produto));
    alert("Cadastro de produto realizado com sucesso!");
});

// Cadastro de Pedido
document.getElementById('cadastroPedidoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cliente = document.getElementById('clientePedido').value;
    const produto = document.getElementById('produtoPedido').value;
    const quantidade = document.getElementById('quantidadePedido').value;

    const pedido = {
        cliente: cliente,
        produto: produto,
        quantidade: quantidade
    };

    console.log("Pedido realizado:", JSON.stringify(pedido));
    alert("Pedido concluído com sucesso!");
});
