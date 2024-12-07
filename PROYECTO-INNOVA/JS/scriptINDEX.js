// Test empieza aqui 
console.log("se enlaza");

let currentQuestion = 0;
const totalQuestions = document.querySelectorAll('.question-container').length;

function updateProgress() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

function showQuestion(index) {
    document.querySelectorAll('.question-container').forEach(q => {
        q.classList.remove('active');
    });
    document.querySelectorAll('.question-container')[index].classList.add('active');
    
    // Boton de siguiente, el de anterior y el de terminar
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
    nextBtn.style.display = index === totalQuestions - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = index === totalQuestions - 1 ? 'inline-block' : 'none';
    
    updateProgress();
}

// Los eventlistenners para revisar los clicks y mostrar la ventana
const testModal = document.getElementById('testModal');
const modalTrigger = document.querySelector('[data-bs-target="#testModal"]');
const closeBtn = document.querySelector('.btn-close');

modalTrigger.onclick = () => {
    testModal.style.display = 'block';
    testModal.classList.add('show');
    document.body.style.overflow = 'hidden';
};

closeBtn.onclick = () => {
    testModal.style.display = 'none';
    testModal.classList.remove('show');
    document.body.style.overflow = 'auto';
};

window.onclick = (e) => {
    if (e.target === testModal) {
        testModal.style.display = 'none';
        testModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
};

//funcionalidad de los botones
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
});

// completar el formulario y crear el objeto con las puntuaciones y guardar
document.getElementById('innovationTest').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const dimensions = {
        talento: 0,
        ideas: 0,
        impacto: 0,
        ecosistema: 0
    };
    
    // el calculo de los pntuos en la barrita y en porcentaje
    let q = 1;
    for (let pair of formData.entries()) {
        const score = parseInt(pair[1]);
        if (q <= 2) dimensions.talento += score;
        else if (q <= 4) dimensions.ideas += score;
        else if (q <= 6) dimensions.impacto += score;
        else dimensions.ecosistema += score;
        q++;
    }
    
    
    const maxScorePorDimension = 8;
    const porcentajes = {
        talento: (dimensions.talento / maxScorePorDimension) * 100,
        ideas: (dimensions.ideas / maxScorePorDimension) * 100,
        impacto: (dimensions.impacto / maxScorePorDimension) * 100,
        ecosistema: (dimensions.ecosistema / maxScorePorDimension) * 100
    };
    
    const promedioTotal = Object.values(porcentajes).reduce((a, b) => a + b) / 4;
    
    // estos ya serian los resultados
    const result = document.getElementById('testResult');
    result.style.display = 'block';
    result.innerHTML = `
            <h4 class="mb-4">Resultados de tu Potencial Innovador</h4>
            <div class="alert alert-info">
                <strong>Puntuación Global: ${promedioTotal.toFixed(1)}%</strong>
            </div>
            <div class="dimension-score">
                <h5>Talento e Innovación</h5>
                <div class="progress">
                    <div class="progress-bar bg-success" style="width: ${porcentajes.talento}%">${porcentajes.talento.toFixed(1)}%</div>
                </div>
            </div>
            <div class="dimension-score">
                <h5>Gestión de Ideas</h5>
                <div class="progress">
                    <div class="progress-bar bg-warning" style="width: ${porcentajes.ideas}%">${porcentajes.ideas.toFixed(1)}%</div>
                </div>
            </div>
            <div class="dimension-score">
                <h5>Impacto y Transformación</h5>
                <div class="progress">
                    <div class="progress-bar bg-info" style="width: ${porcentajes.impacto}%">${porcentajes.impacto.toFixed(1)}%</div>
                </div>
            </div>
            <div class="dimension-score">
                <h5>Ecosistema de Innovación</h5>
                <div class="progress">
                    <div class="progress-bar bg-primary" style="width: ${porcentajes.ecosistema}%">${porcentajes.ecosistema.toFixed(1)}%</div>
                </div>
            </div>
            <div class="mt-4">
                <h5>Recomendaciones:</h5>
                <ul>
                    <li>Fortalece tus redes de colaboración con personas talentosas</li>
                    <li>Implementa un sistema para capturar y gestionar ideas innovadoras</li>
                    <li>Busca oportunidades para generar impacto transformador</li>
                    <li>Desarrolla un ecosistema que fomente la innovación constante</li>
                </ul>
            </div>
    `;
});


showQuestion(0);