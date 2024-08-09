// Cadastro de Produto
document.getElementById('cadastroProdutoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeProduto').value;
    const descricao = document.getElementById('descricaoProduto').value;
    const preco = document.getElementById('precoProduto').value;

    const produto = {
        nome: nome,
        descricao: descricao,
        preco: parseFloat(preco)
    };

    // Recuperar produtos existentes
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtos));

    console.log("Produto cadastrado:", JSON.stringify(produto));
    alert("Cadastro de produto realizado com sucesso!");
});
