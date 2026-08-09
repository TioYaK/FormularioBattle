document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recruitment-form');
    const submitBtn = document.getElementById('submit-btn');
    const statusMessage = document.getElementById('status-message');

    // INSTRUÇÕES PARA O GOOGLE SHEETS:
    // 1. Crie uma Planilha no Google Sheets.
    // 2. Vá em Extensões -> Apps Script.
    // 3. Cole o código que está no arquivo walkthrough.md
    // 4. Salve e clique em "Implantar" -> "Nova implantação"
    // 5. Escolha "App da Web", defina "Qualquer pessoa" em Quem pode acessar, e implante.
    // 6. Cole a URL do aplicativo da web (Web App URL) abaixo, substituindo "URL_DO_SEU_APPS_SCRIPT_AQUI":
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxAwtjajuIMbiXXpHiauoquAklf1wQD9u9ISwrXNpuov1cQPUjILBMTN-lEky6QV3gc/exec';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (SCRIPT_URL === 'URL_DO_SEU_APPS_SCRIPT_AQUI') {
            showMessage('Erro: A URL do Google Sheets não foi configurada no script.js.', 'error');
            return;
        }

        // Desabilita botão e mostra estado de carregamento
        submitBtn.disabled = true;
        submitBtn.querySelector('span').innerText = 'Enviando...';
        statusMessage.classList.add('hidden');
        statusMessage.className = '';

        // Coleta os dados do formulário
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Para evitar problemas de CORS no Google Apps Script, geralmente enviamos POST
        // O fetch abaixo está formatado para o padrão do Google Apps Script
        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // O Google Apps script geralmente exige no-cors para não bloquear o frontend
                headers: {
                    'Content-Type': 'application/json',
                },
                // O Google Scripts pode processar form-data ou JSON, o payload JSON stringified é comum
                body: JSON.stringify(data)
            });

            // Como usamos no-cors, o status da response é sempre opaco (0), mas assumimos sucesso se a requisição não falhar
            form.reset();
            showMessage('Sua aplicação foi enviada aos líderes da BattleStorm com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao enviar form:', error);
            showMessage('Ocorreu um erro mágico ao enviar a aplicação. Tente novamente mais tarde.', 'error');
        } finally {
            // Restaura botão
            submitBtn.disabled = false;
            submitBtn.querySelector('span').innerText = 'Enviar Aplicação';
        }
    });

    function showMessage(msg, type) {
        statusMessage.innerText = msg;
        statusMessage.className = type; // 'success' ou 'error'
        statusMessage.classList.remove('hidden');
    }
});
