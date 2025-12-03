let notas = [];
        let notaAtual = null;

        // 🔹 Carregar notas do LocalStorage
        function carregarNotas() {
            const dados = localStorage.getItem("notas");
            notas = dados ? JSON.parse(dados) : [];
        }
        // 🔹 Carrega notas ao iniciar
        window.onload = function() {
            carregarNotas();
            listarNotas();
        };

        

        // 🔹 Salvar notas no LocalStorage
        function salvarLocal() {
            localStorage.setItem("notas", JSON.stringify(notas));
        }

        // 🔹 Mostrar lista lateral
        function listarNotas() {
            const container = document.getElementById("notasContainer");
            const semNotas = document.getElementById("semNotas");

            container.innerHTML = "";

            if (notas.length === 0) {
                semNotas.innerHTML = "Nenhuma nota cadastrada.";
                return;
            }

            semNotas.innerHTML = "";

            notas.forEach((nota, index) => {
                const div = document.createElement("div");
                div.className = "notaItem";
                div.textContent = nota.texto.substring(0, 30) + "...";
                div.onclick = () => abrirNota(index);
                container.appendChild(div);
            });
        }

        // 🔹 Criar nova nota
        function novaNota() {
            notaAtual = null;
            document.getElementById("textoNota").value = "";
            document.getElementById("labelTitulo").innerText = "Nova Nota";
        }

        // 🔹 Salvar nota (nova ou editando)
        function salvarNota() {
            const texto = document.getElementById("textoNota").value;

            if (texto.trim() === "") {
                alert("A nota não pode ser vazia!");
                return;
            }

            if (notaAtual === null) {
                notas.push({ texto: texto });
            } else {
                notas[notaAtual].texto = texto;
            }

            salvarLocal();
            listarNotas();
            alert("Nota salva com sucesso!");
        }

        // 🔹 Abrir nota clicada na lista
        function abrirNota(index) {
            notaAtual = index;
            document.getElementById("textoNota").value = notas[index].texto;
            document.getElementById("labelTitulo").innerText = "Editando Nota";
        }

        // 🔹 Excluir nota com confirmação
        function excluirNota() {
            if (notaAtual === null) {
                alert("Nenhuma nota selecionada!");
                return;
            }

            if (confirm("Tem certeza que deseja excluir esta nota?")) {
                notas.splice(notaAtual, 1);
                salvarLocal();
                listarNotas();
                novaNota();
                alert("Nota excluída.");
            }
        }