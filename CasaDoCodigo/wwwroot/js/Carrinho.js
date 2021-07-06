
class Carrinho {

    clickIncremento(button) {
        let data = this.getData(button);
        data.Quantidade++;
        this.postQuantidade(data);
    }

    clickDecremento(button) {
        let data = this.getData(button);
        data.Quantidade--;
        this.postQuantidade(data);
    }

    updateQuantidade(input) {
        let data = this.getData(input);
        
        this.postQuantidade(data);
    }

    getData(elemento) {
        var jqElemento = $(elemento);
        var linhaDoItem = jqElemento.parents('[item-id]');
        var itemId = $(linhaDoItem).attr("item-id");
        var novaQuantidade = $(linhaDoItem).find('input').val();

        return {
            Id: itemId,
            Quantidade: novaQuantidade
        };

    }

    postQuantidade(data) {

        let token = $('[name = __RequestVerificationToken]').val();

        let headers = {};
        headers['RequestVerificationToken'] = token;

        $.ajax({
            url: '/pedido/updatequantidade',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers: headers
        }).done((response) => {
            let itemPedido = response.itemPedido;
            let linhaDoItem = $('[item-id=' + itemPedido.id + ']');
            linhaDoItem.find('input').val(itemPedido.quantidade);
            linhaDoItem.find('[subtotal]').html((itemPedido.subtotal).toFixed(2).replace('.', ','));

            let carrinhoViewModel = response.carrinhoViewModel;
            $('[numero-itens]').html('Total: ' + carrinhoViewModel.itens.length + ' itens');
            $('[total]').html((carrinhoViewModel.total).toFixed(2).replace('.', ','));

            if (itemPedido.quantidade == 0) {
                linhaDoItem.remove();
            }
        });
    }
}


var carrinho = new Carrinho();
