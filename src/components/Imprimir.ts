const Imprimir = document.getElementById("Imprimir")

Imprimir.addEventListener("click", function () {
    const printContent = document.getElementById("extrato-pedido_div").innerHTML;

    const printFrame = document.getElementById("printFrame");
    const doc = printFrame.contentWindow.document;

    doc.open();
    doc.write(
        `
        <html>
        <head>
            <title></title>
        </head>
        <body>
            <header class="text-center my-3">
            <h1>Cléo Nogueira</h1>
            <p>Prédio NN Center - Av. Acre - Turu, São Luís - MA</p>
            <p>(98) 9 1111-1111</p>
            <p>CEP: 65066-620</p>
            </header>
            <hr>
            <section class="text-center my-3">
            <h2>Lanchone CLéo Nogueira Lanches</h2>
            <p>Mostrar data e hora</p>
            <p>Não é um Documento Fiscal</p>

            <div class="text-left mt-3">
                <p>Nome do Cliente</p>
                <p>Telefone</p>
            </div>

                <span>(Pedido N.: 185)</span>

            <div>
                ${printContent}
            </div>
            </section>
            <hr>
        <footer class="text-center mt-3">
            <p class="text-left">Atendente: Nome da Funcionaria</p>
            <p>Frase da Bíblia</p>
            <p>:) Obrigado pela Preferencia <br> * Volte Sempre! *</p>
            </footer>
        </body>
        </html>
        `
        // posso separar em outra parte e chamar pronto junto com o printContent
    );
    doc.close();

    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();
}); 