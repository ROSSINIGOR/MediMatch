const searchInput = document.getElementById('searchInput');
const medicamentosList = document.getElementById('medicamentosList');
let medicamentos = [];

function loadMedicamentos() {
    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            medicamentos = data.medicamentos;
            updateMedicamentosList();
        })
        .catch(error => console.error(error));
}

function createMedicamentoItem(medicamento) {
    const listItem = document.createElement('li');
    listItem.classList.add('resultado-pesquisa');

    for (const key in medicamento) {
        if (medicamento.hasOwnProperty(key)) {
            const para = document.createElement('p');
            para.textContent = `${key}: ${medicamento[key]}`;
            listItem.appendChild(para);
        }
    }

    return listItem;
}

function updateMedicamentosList() {
    const searchTerm = searchInput.value.toLowerCase();
    medicamentosList.innerHTML = '';

    const filteredMedicamentos = medicamentos.filter(medicamento => {
        return Object.values(medicamento)
            .some(value => value.toLowerCase().includes(searchTerm));
    });

    if (filteredMedicamentos.length === 0) {
        medicamentosList.innerHTML = '<li>Nenhum medicamento encontrado</li>';
    } else {
        filteredMedicamentos.forEach(medicamento => {
            medicamentosList.appendChild(createMedicamentoItem(medicamento));
        });
    }
}

searchInput.addEventListener('input', updateMedicamentosList);

loadMedicamentos();