
document.getElementById("formAgendamento").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const servico = document.getElementById("servico").value;
    const unidade = document.getElementById("unidade").value;
    const dataInput = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const lista = document.getElementById("listaAgendamento");

    /* =========================
       VALIDAR DATA (domingo)
    ========================== */
    const dataObj = new Date(dataInput + "T00:00");
    if (dataObj.getDay() === 0) {
        alert("Não realizamos atendimentos aos domingos.");
        return;
    }

    /* =========================
       VALIDAR HORÁRIO (08–19)
    ========================== */
    const [h, m] = hora.split(":").map(Number);
    const minutos = h * 60 + m;

    if (minutos < 480 || minutos > 1140) {
        alert("Horário inválido. Atendimento das 08:00 às 19:00.");
        return;
    }

    /* =========================
       FORMATAR DATA
    ========================== */
    const dataFormatada = dataObj.toLocaleDateString("pt-BR");

    /* =========================
       CONFIRMAÇÃO
    ========================== */
    const confirmar = confirm(
        `Confirma o agendamento?\n\n` +
        `Nome: ${nome}\n` +
        `Serviço: ${servico}\n` +
        `Unidade: ${unidade}\n` +
        `Data: ${dataFormatada}\n` +
        `Hora: ${hora}`
    );

    if (!confirmar) return;

    /* =========================
       MOSTRAR NA TELA
    ========================== */
    lista.innerHTML = "<h2>Agendamento:</h2>";
    lista.innerHTML += `
        <p>
            <strong>Nome:</strong> ${nome}<br>
            <strong>Serviço:</strong> ${servico}<br>
            <strong>Unidade:</strong> ${unidade}<br>
            <strong>Data:</strong> ${dataFormatada}<br>
            <strong>Hora:</strong> ${hora}
        </p>
    `;

    /* =========================
       SALVAR NO LOCALSTORAGE
    ========================== */
    const agendamento = {
        nome,
        servico,
        unidade,
        data: dataFormatada,
        hora
    };

    localStorage.setItem("ultimoAgendamento", JSON.stringify(agendamento));

    /* =========================
       WHATSAPP
    ========================== */
    const mensagem = `
📅 *Novo Agendamento*
👤 Nome: ${nome}
✂️ Serviço: ${servico}
📍 Unidade: ${unidade}
📆 Data: ${dataFormatada}
⏰ Hora: ${hora}
    `;

    const telefoneWhatsApp = "5521969592169"; // coloque o número real aqui
    const url = `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");

    document.getElementById("formAgendamento").reset();
});

/* =========================
   CARREGAR AGENDAMENTO SALVO
========================== */
window.onload = function() {
    const salvo = localStorage.getItem("ultimoAgendamento");
    if (salvo) {
        const a = JSON.parse(salvo);
        const lista = document.getElementById("listaAgendamento");

        lista.innerHTML = "<h2>Agendamento:</h2>";
        lista.innerHTML += `
            <p>
                <strong>Nome:</strong> ${a.nome}<br>
                <strong>Serviço:</strong> ${a.servico}<br>
                <strong>Unidade:</strong> ${a.unidade}<br>
                <strong>Data:</strong> ${a.data}<br>
                <strong>Hora:</strong> ${a.hora}
            </p>
        `;
    }
};


