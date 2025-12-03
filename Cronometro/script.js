let inicio = null;
        let intervalo = null;
        let pausado = false;
        let tempoAnterior = 0;
        let pausas = [];

        // FORMATAR TEMPO
        function formatar(ms) {
            let horas = Math.floor(ms / 3600000);
            let minutos = Math.floor((ms % 3600000) / 60000);
            let segundos = Math.floor((ms % 60000) / 1000);
            let milesimos = ms % 1000;

            return (
                String(horas).padStart(2, '0') + ":" +
                String(minutos).padStart(2, '0') + ":" +
                String(segundos).padStart(2, '0') + "." +
                String(milesimos).padStart(3, '0')
            );
        }

        // INICIAR O CRONÔMETRO
        function iniciar() {
            if (!intervalo) {
                inicio = new Date().getTime() - tempoAnterior;

                intervalo = setInterval(() => {
                    let agora = new Date().getTime();
                    let decorrido = agora - inicio;
                    tempoAnterior = decorrido;
                    document.getElementById("display").textContent = formatar(decorrido);
                }, 50);
            }
        }

        // PAUSAR
        function pausar() {
            if (intervalo) {
                clearInterval(intervalo);
                intervalo = null;

                pausas.push(tempoAnterior);
                atualizarListaPausas();
            }
        }

        // PARAR
        function parar() {
            clearInterval(intervalo);
            intervalo = null;

            inicio = null;
            tempoAnterior = 0;
            pausas = [];

            document.getElementById("display").textContent = "00:00:00.000";
            atualizarListaPausas();
        }

        // ATUALIZAR LISTA DE PAUSAS
        function atualizarListaPausas() {
            let div = document.getElementById("listaPausas");
            div.innerHTML = "";

            pausas.forEach((tempo, index) => {
                let item = document.createElement("div");
                item.className = "pausa-item";
                item.textContent = `Pausa ${index + 1}: ${formatar(tempo)}`;
                div.appendChild(item);
            });
        }

        // ATALHOS DE TECLADO
        document.addEventListener("keydown", function(e) {
            if (e.code === "Space") iniciar(); 
            if (e.key === "p") pausar();
            if (e.key === "s") parar();
        });