<script>
function agendar() {
  // Pega os valores dos campos
  const nome = document.getElementById('nome').value;
  const servico = document.getElementById('servico').value;
  const unidade = document.getElementById('unidade').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;

  // Verifica se todos os campos foram preenchidos
  if (!nome || !servico || !unidade || !data || !hora) {
    alert('⚠️ Por favor, preencha todos os campos antes de agendar.');
    return;
  }

  const lista = document.getElementById('listaAgendamnto');
  const timestamp = new Date(`${data}T${hora}`).getTime();

  const card = document.createElement('div');
  card.className = "agendamento-card";
  card.dataset.timestamp = timestamp;

  const partesData = data.split("-");
  const dataBR = `${parteData[2]}/${partesData[1]}/${partesData[0]}`;

  card.innerHTML = 


}
</script>
