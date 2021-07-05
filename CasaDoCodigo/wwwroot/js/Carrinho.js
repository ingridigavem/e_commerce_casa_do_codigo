
class Carrinho {

    clickIncremento(btn) {
        let data = this.getData(btn);
        data.Quantidade++;
        this.postQuantidade(data);
    }

    clickDecremento(btn) {
        let data = this.getData(btn);
        data.Quantidade--;
        this.postQuantidade(data);
    }

    updateQuantidade(input) {
        let data = this.getData(input);
        
        this.postQuantidade(data);
    }

    getData(elemento) {
        const jqElemento = $(elemento);
        const linhaDoItem = jqElemento.parents('[item-id]');
        const itemId = $(linhaDoItem).attr("item-id");
        const novaQtd = $(linhaDoItem).find('input').val();

        return {
            Id: itemId,
            Quantidade: novaQtd
        };

    }

    postQuantidade(data) {
        $.ajax({
            url: '/pedido/updatequantidade',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        })
    }
}


var carrinho = new Carrinho();

