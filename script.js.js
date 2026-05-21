let exercicios = ['Supino', 'Agachamento', 'Puxada', 'Rosca', 'Flexão', 'Barra Fixa', 'Levantamento Terra', 'Desenvolvimento de Ombros', 'Leg Press', 'Cadeira Extensora', 'Cadeira Flexora', 'Panturrilha', 'Abdominal', 'Prancha', 'Remada Curvada', 'Rosca Martelo', 'Tríceps Testa', 'Tríceps Corda', 'Elevação Lateral', 'Elevação Frontal', 'Stiff', 'Glúteo 4 Apoios', 'Abdução de Quadril', 'Addução de Quadril', 'Puxada na Polia Alta', 'Puxada na Polia Baixa', 'Remada Unilateral', 'Remada Baixa', 'Rosca Direta', 'Rosca Alternada', 'Tríceps Francês', 'Tríceps Coice', 'Elevação de Pernas', 'Abdominal Infra', 'Abdominal Supra', 'Prancha Lateral'];

let templates = [
    {
        id: 1,
        nome: 'Treino Segunda',
        exercicios: ['Supino', 'Agachamento']
    },
    {
        id: 2,
        nome: 'Treino Quarta',
        exercicios: ['Puxada', 'Rosca']
    }
];
let treinosReais = [];  // Histórico para o relatório.
let treinoDoDia = [];   // Exercícios cadastrado no dia.


document.addEventListener('DOMContentLoaded', function() {


    //  DOM
    
    const areaCadastroExercicio = document.getElementById('areaCadastroExercicio');
    const btnMostrarExercicio = document.getElementById('btnMostrarCadastroExercicio');
    const btnSalvarExercicio = document.getElementById('btnSalvarExercicio');
    const campoExercicioNome = document.getElementById('exercicioNome');
    
    const areaCadastroSerie = document.getElementById('areaCadastroSerie');
    const btnMostrarSerie = document.getElementById('btnMostrarCadastroSerie');
    const btnSalvarTemplate = document.getElementById('btnSalvarTemplate');
    const inputNomeSerie = document.getElementById('nomeSerie');
    
    const selectTemplate = document.getElementById('selectTemplate');
    const btnCarregarTemplate = document.getElementById('btnCarregarTemplate');
    const btnAdicionarManual = document.getElementById('btnAdicionarManual');
    const btnFinalizarTreino = document.getElementById('btnFinalizarTreino');
    const btnGerarRelatorio = document.getElementById('btnGerarRelatorio');
    
    const dataTreino = document.getElementById('dataTreino');
    const tempoTreino = document.getElementById('tempoTreino');
    
    
    if (dataTreino) {
        dataTreino.value = new Date().toISOString().split('T')[0];
    }

   
    // FUNÇÃO: ATUALIZAR CHECKBOXES DOS EXERCÍCIOS
  
    function atualizarCheckboxesExercicios() {
        const container = document.getElementById('listaCheckboxesExercicios');
        if (!container) return;
        
        if (exercicios.length === 0) {
            container.innerHTML = '<p>Nenhum exercício cadastrado.</p>';
            return;
        }
        
        let html = '';
        for (let i = 0; i < exercicios.length; i++) {
            html += `
                <div>
                    <input type="checkbox" id="check_${i}" value="${exercicios[i]}">
                    <label for="check_${i}">${exercicios[i]}</label>
                </div>
            `;
        }
        container.innerHTML = html;
    }
    
    // FUNÇÃO: ATUALIZAR SELECT DE TEMPLATES
    function atualizarSelectTemplates() {
        if (!selectTemplate) return;
        
        let html = '<option value="">-- Selecione uma série --</option>';
        for (let i = 0; i < templates.length; i++) {
            html += `<option value="${i}">${templates[i].nome}</option>`;
        }
        selectTemplate.innerHTML = html;
    }
    
    // FUNÇÃO: CARREGAR TEMPLATE (SÉRIE)
  
    function carregarTemplate(indice) {
        const template = templates[indice];
        if (!template) return;
        
        treinoDoDia = [];
        for (let i = 0; i < template.exercicios.length; i++) {
            treinoDoDia.push({
                nome: template.exercicios[i],
                peso: '',
                repeticoes: ''
            });
        }
        
        exibirExerciciosDoDia();
    }
    

    // FUNÇÃO: EXIBIR EXERCÍCIOS DO DIA
    
    function exibirExerciciosDoDia() {
        const container = document.getElementById('itensDoDia');
        if (!container) return;
        
        if (treinoDoDia.length === 0) {
            container.innerHTML = '<p>Nenhum exercício adicionado.</p>';
            return;
        }
        
        let html = '';
        for (let i = 0; i < treinoDoDia.length; i++) {
            const item = treinoDoDia[i];
            html += `
                <div class="item-treino">
                    <strong>${item.nome}</strong>
                    <label>Peso (kg):</label>
                    <input type="number" class="peso-item" data-index="${i}" value="${item.peso}" placeholder="50">
                    <label>Repetições:</label>
                    <input type="number" class="rep-item" data-index="${i}" value="${item.repeticoes}" placeholder="12">
                    <button class="remover-item" data-index="${i}">❌ Remover</button>
                </div>
            `;
        }
        
        container.innerHTML = html;
        
        // Adicionar eventos aos inputs de peso/rep
        document.querySelectorAll('.peso-item').forEach(input => {
            input.addEventListener('change', function() {
                const index = this.getAttribute('data-index');
                treinoDoDia[index].peso = this.value;
            });
        });
        
        document.querySelectorAll('.rep-item').forEach(input => {
            input.addEventListener('change', function() {
                const index = this.getAttribute('data-index');
                treinoDoDia[index].repeticoes = this.value;
            });
        });
        
        document.querySelectorAll('.remover-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                treinoDoDia.splice(index, 1);
                exibirExerciciosDoDia();
            });
        });
    }
    
    
    // BOTÕES OCULTOS - EXERCÍCIO
    
    if (btnMostrarExercicio && areaCadastroExercicio) {
        areaCadastroExercicio.style.display = 'none';
        btnMostrarExercicio.onclick = function() {
            areaCadastroExercicio.style.display = 
                areaCadastroExercicio.style.display === 'none' ? 'block' : 'none';
        }
    }
    
   
    // BOTÕES OCULTOS - SÉRIE
    
    if (btnMostrarSerie && areaCadastroSerie) {
        areaCadastroSerie.style.display = 'none';
        btnMostrarSerie.onclick = function() {
            const isHidden = areaCadastroSerie.style.display === 'none';
            areaCadastroSerie.style.display = isHidden ? 'block' : 'none';
            if (isHidden) {
                atualizarCheckboxesExercicios();
            }
        }
    }
    
  
    // SALVAR EXERCÍCIO
   
    if (btnSalvarExercicio && campoExercicioNome) {
        btnSalvarExercicio.onclick = function() {
            const nome = campoExercicioNome.value.trim();
            if (nome === '') {
                alert('Digite um nome para o exercício');
                return;
            }
            exercicios.push(nome);
            campoExercicioNome.value = '';
            atualizarCheckboxesExercicios();
            alert(`Exercício "${nome}" salvo!`);
            console.log('Exercícios:', exercicios);
        }
    }
    
    
    // SALVAR TEMPLATE (SÉRIE)
    
    if (btnSalvarTemplate && inputNomeSerie) {
        btnSalvarTemplate.onclick = function() {
            const nome = inputNomeSerie.value.trim();
            if (nome === '') {
                alert('Digite um nome para a série');
                return;
            }
            
            const checkboxes = document.querySelectorAll('#listaCheckboxesExercicios input[type="checkbox"]');
            const selecionados = [];
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selecionados.push(checkboxes[i].value);
                }
            }
            
            if (selecionados.length === 0) {
                alert('Selecione pelo menos um exercício');
                return;
            }
            
            const novoTemplate = {
                id: Date.now(),
                nome: nome,
                exercicios: selecionados
            };
            
            templates.push(novoTemplate);
            inputNomeSerie.value = '';
            
            // Desmarcar checkboxes
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
            
            areaCadastroSerie.style.display = 'none';
            atualizarSelectTemplates();
            alert(`Série "${nome}" salva com ${selecionados.length} exercícios!`);
            console.log('Templates:', templates);
        }
    }
    
    
    // CARREGAR TEMPLATE
   
    if (btnCarregarTemplate && selectTemplate) {
        btnCarregarTemplate.onclick = function() {
            const indice = selectTemplate.value;
            if (indice === '') {
                alert('Selecione uma série primeiro');
                return;
            }
            carregarTemplate(parseInt(indice));
        }
    }
    
   
    // ADICIONAR EXERCÍCIO MANUAL
    
    if (btnAdicionarManual) {
        const manualExercicio = document.getElementById('manualExercicio');
        const manualPeso = document.getElementById('manualPeso');
        const manualRep = document.getElementById('manualRep');
        
        btnAdicionarManual.onclick = function() {
            const nome = manualExercicio.value.trim();
            const peso = manualPeso.value;
            const rep = manualRep.value;
            
            if (nome === '') {
                alert('Digite o nome do exercício');
                return;
            }
            
            treinoDoDia.push({
                nome: nome,
                peso: peso,
                repeticoes: rep
            });
            
            manualExercicio.value = '';
            manualPeso.value = '';
            manualRep.value = '';
            
            exibirExerciciosDoDia();
        }
    }
    
    
    // FINALIZAR TREINO (SALVAR NO HISTÓRICO)
  
    if (btnFinalizarTreino) {
        btnFinalizarTreino.onclick = function() {
            if (treinoDoDia.length === 0) {
                alert('Adicione pelo menos um exercício ao treino');
                return;
            }
            
            // Verificar se todos os campos de peso/rep foram preenchidos
            let incompletos = false;
            for (let i = 0; i < treinoDoDia.length; i++) {
                if (treinoDoDia[i].peso === '' || treinoDoDia[i].repeticoes === '') {
                    incompletos = true;
                    break;
                }
            }
            
            if (incompletos) {
                alert('Preencha peso e repetições de todos os exercícios');
                return;
            }
            
            const data = dataTreino.value || new Date().toLocaleDateString();
            const tempo = tempoTreino.value;
            
            if (tempo === '') {
                alert('Digite o tempo total do treino');
                return;
            }
            
            const novoTreino = {
                id: Date.now(),
                data: data,
                tempo: Number(tempo),
                exercicios: [...treinoDoDia]  // Copia do array
            };
            
            treinosReais.push(novoTreino);
            
            // Limpar o treino do dia
            treinoDoDia = [];
            exibirExerciciosDoDia();
            
            tempoTreino.value = '';
            
            alert('Treino finalizado e salvo com sucesso!');
            console.log('Histórico de treinos:', treinosReais);
        }
    }
    
    
    // GERAR RELATÓRIO
   
    if (btnGerarRelatorio) {
        btnGerarRelatorio.onclick = function() {
            const area = document.getElementById('areaRelatorio');
            
            if (treinosReais.length === 0) {
                area.innerHTML = '<p>Nenhum treino finalizado ainda. Complete um treino primeiro.</p>';
                return;
            }
            
            // Organizar dados por exercício para mostrar progressão
            let progressao = {};
            
            for (let i = 0; i < treinosReais.length; i++) {
                const treino = treinosReais[i];
                for (let j = 0; j < treino.exercicios.length; j++) {
                    const ex = treino.exercicios[j];
                    if (!progressao[ex.nome]) {
                        progressao[ex.nome] = [];
                    }
                    progressao[ex.nome].push({
                        data: treino.data,
                        peso: ex.peso,
                        repeticoes: ex.repeticoes,
                        tempo: treino.tempo
                    });
                }
            }
            
            // Gerar HTML do relatório
            let html = '<h3>📈 Relatório de Progressão</h3>';
            
            for (const exercicio in progressao) {
                html += `<h4>🏋️ ${exercicio}</h4>`;
                html += '<table>';
                html += '<tr><th>Data</th><th>Peso (kg)</th><th>Repetições</th><th>Tempo (min)</th></tr>';
                
                const dados = progressao[exercicio];
                for (let i = 0; i < dados.length; i++) {
                    html += `
                        <tr>
                            <td>${dados[i].data}</td>
                            <td>${dados[i].peso}</td>
                            <td>${dados[i].repeticoes}</td>
                            <td>${dados[i].tempo}</td>
                        </tr>
                    `;
                }
                html += '</table><br>';
            }
            
            area.innerHTML = html;
        }
    }
    

    // INICIALIZAR
    atualizarCheckboxesExercicios();
    atualizarSelectTemplates();
    exibirExerciciosDoDia();
    
    console.log('Sistema pronto!');
    console.log('Exercícios iniciais:', exercicios);
    console.log('Templates iniciais:', templates);
    
});