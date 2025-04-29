function criarAmbientes() {
  const quantidade = document.getElementById("quantidadeAmbientes").value;
  const formulario = document.getElementById("formularioAmbientes");

  formulario.innerHTML = "";

  for (let i = 1; i <= quantidade; i++) {
    const ambienteDiv = document.createElement("div");
    ambienteDiv.className = "mb-3 p-3 border rounded bg-light";
    ambienteDiv.innerHTML = `
        <h5>Ambiente ${i}</h5>

        <!-- Nome do Ambiente -->
        <div class="mb-2">
          <label class="form-label" for="ambienteNome${i}">Nome do ambiente:</label>
          <input type="text" class="form-control" name="ambienteNome${i}" id="ambienteNome${i}">
        </div>

        <!-- Circuitos de Iluminação -->
        <div class="mb-2">
          <label class="form-label" for="circuitos${i}">Circuitos de iluminação:</label>
          <input type="number" class="form-control" name="circuitos${i}" id="circuitos${i}">
        </div>

         <!-- Circuitos de Iluminação Dimer-->
        <div class="mb-2">
          <label class="form-label" for="circuitos${i}">Circuitos de dimerizáveis:</label>
          <input type="number" class="form-control" name="circuitosdimer${i}" id="circuitosdimer${i}">
        </div>

        <!-- Aparelhos IR -->
        <div class="mb-2">
          <label class="form-label" for="ir${i}">Aparelhos IR:</label>
          <input type="number" class="form-control" name="ir${i}" id="ir${i}">
        </div>

        <!-- Cortinas -->
        <div class="mb-2">
          <label class="form-label" for="cortina${i}">Cortinas:</label>
          <input type="number" class="form-control" name="cortina${i}" id="cortina${i}">
        </div>

        <div class="mb-2">
          <label class="form-label">Som:</label><br>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="som${i}" id="somSim${i}" value="Sim">
            <label class="form-check-label" for="somSim${i}">Sim</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="som${i}" id="somNao${i}" value="Não">
            <label class="form-check-label" for="somNao${i}">Não</label>
          </div>
        </div>

        <div class="mb-2">
          <label class="form-label" for="observacoes${i}">Observações:</label>
          <textarea class="form-control" name="observacoes${i}" id="observacoes${i}" rows="4" placeholder="Detalhes importantes"></textarea>
        </div>
    `;
    formulario.appendChild(ambienteDiv);
  }
}

function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nomeCliente = document.getElementById("nomeCliente").value;
  const quantidade = document.getElementById("quantidadeAmbientes").value;

  let y = 20; // Começar mais abaixo para o título

  // Título
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Levantamento de Ambientes", 105, y, { align: "center" });

  y += 15;

  // Nome do Cliente
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text(`Cliente: ${nomeCliente}`, 10, y);

  y += 10;

  doc.setLineWidth(0.5);
  doc.line(10, y, 200, y); // Linha horizontal
  y += 10;

  for (let i = 1; i <= quantidade; i++) {
    const ambienteNome = document.querySelector(
      `input[name="ambienteNome${i}"]`
    ).value;
    const circuitos = document.querySelector(
      `input[name="circuitos${i}"]`
    ).value;
    const circuitosdimer = document.querySelector(
      `input[name="circuitosdimer${i}"]`
    ).value;
    const ir = document.querySelector(`input[name="ir${i}"]`).value;
    const cortina = document.querySelector(`input[name="cortina${i}"]`).value;
    const som =
      document.querySelector(`input[name="som${i}"]:checked`)?.value || "Não";
    const observacoes = document.querySelector(
      `textarea[name="observacoes${i}"]`
    ).value;

    // Título do Ambiente
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Ambiente ${i}: ${ambienteNome}`, 10, y);
    y += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text(`- Circuitos de iluminação: ${circuitos}`, 15, y);
    y += 7;

    doc.text(`- Circuitos dimerizáveis: ${circuitosdimer}`, 15, y);
    y += 7;

    doc.text(`- Aparelhos IR: ${ir}`, 15, y);
    y += 7;

    doc.text(`- Cortinas: ${cortina}`, 15, y);
    y += 7;

    doc.text(`- Som: ${som}`, 15, y);
    y += 7;

    if (observacoes.trim() !== "") {
      doc.text(`- Observações: ${observacoes}`, 15, y);
      y += 7;
    }

    y += 5;

    doc.setLineWidth(0.2);
    doc.line(10, y, 200, y); // Linha separadora entre ambientes
    y += 10;

    // Se passar da altura da página, adicionar uma nova página
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  }

  // Salvar o PDF
  doc.save(`levantamento_${nomeCliente}.pdf`);
}
