

// Funcionalidad para el Muro de la Esperanza
document.addEventListener('DOMContentLoaded', () => {
    const postMessageBtn = document.getElementById('post-message-btn');
    const messageText = document.getElementById('message-text');
    const messageName = document.getElementById('message-name');
    const messagesGrid = document.getElementById('messages-grid');

    if (postMessageBtn) {
        postMessageBtn.addEventListener('click', () => {
            const text = messageText.value.trim();
            const name = messageName.value.trim();

            if (text) {
                const messageCard = document.createElement('div');
                messageCard.classList.add('message-card');
                messageCard.innerHTML = `
                    <p>"${text}"</p>
                    <span>- ${name || 'Anónimo'}</span>
                `;
                messagesGrid.prepend(messageCard); // Añadir al principio para que los nuevos mensajes se vean primero
                messageText.value = '';
                messageName.value = '';
            } else {
                alert('Por favor, escribe un mensaje antes de publicar.');
            }
        });
    }

    // Funcionalidad para los videos de Historias de Vida (simulado)
    document.querySelectorAll('.historia-card .play-button').forEach(button => {
        button.addEventListener('click', () => {
            alert('Reproducción de video simulada. Aquí se integraría un reproductor de video real.');
            // En una implementación real, aquí se cargaría y reproduciría el video.
        });
    });
});




// Funcionalidad para el Explorador de Transacciones Blockchain
document.addEventListener("DOMContentLoaded", () => {
    const searchTransactionBtn = document.getElementById("search-transaction-btn");
    const transactionHashInput = document.getElementById("transaction-hash");
    const transactionResultsDiv = document.getElementById("transaction-results");

    if (searchTransactionBtn) {
        searchTransactionBtn.addEventListener("click", () => {
            const hash = transactionHashInput.value.trim();
            if (hash) {
                // Simulación de búsqueda en blockchain
                transactionResultsDiv.innerHTML = `
                    <p><strong>Hash de Transacción:</strong> ${hash}</p>
                    <p><strong>Estado:</strong> Confirmada</p>
                    <p><strong>Monto:</strong> 100 USDT</p>
                    <p><strong>Fecha:</strong> 2025-08-25</p>
                    <p><strong>Destino:</strong> Ayuda humanitaria en La Habana, Cuba</p>
                    <p><strong>Ver en explorador externo:</strong> <a href="#" target="_blank">Ver en Etherscan (simulado)</a></p>
                `;
                transactionResultsDiv.style.display = "block";
            } else {
                alert("Por favor, introduce un Hash de Transacción.");
                transactionResultsDiv.style.display = "none";
            }
        });
    }
});




// Funcionalidad para el Asistente Virtual de Donación
document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const sendMessageBtn = document.getElementById("send-message-btn");
    const chatbotMessages = document.getElementById("chatbot-messages");

    const appendMessage = (text, sender) => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", `${sender}-message`);
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll to bottom
    };

    const handleUserInput = () => {
        const text = userInput.value.trim();
        if (text) {
            appendMessage(text, "user");
            userInput.value = "";

            // Simular respuesta del bot
            setTimeout(() => {
                let botResponse = "Lo siento, no entendí tu pregunta. Por favor, intenta de nuevo.";
                if (text.toLowerCase().includes("donar")) {
                    botResponse = "Para donar, puedes seleccionar una cantidad en la sección de donación o ingresar una personalizada. Luego, envía USDT a nuestra dirección ERC-20.";
                } else if (text.toLowerCase().includes("usdt")) {
                    botResponse = "USDT es una criptomoneda estable vinculada al dólar estadounidense, ideal para donaciones sin fluctuaciones de precio.";
                } else if (text.toLowerCase().includes("impacto")) {
                    botResponse = "Tu donación se convierte en alimentos, medicinas y esperanza para familias en Cuba. Puedes ver historias de impacto en la sección 'Historias de Vida'.";
                }
                appendMessage(botResponse, "bot");
            }, 1000);
        }
    };

    if (sendMessageBtn) {
        sendMessageBtn.addEventListener("click", handleUserInput);
    }

    if (userInput) {
        userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handleUserInput();
            }
        });
    }
});




// Funcionalidad para la Visualización de Impacto Predictivo
document.addEventListener("DOMContentLoaded", () => {
    const impactSlider = document.getElementById("impact-slider");
    const sliderValueSpan = document.getElementById("slider-value");
    const simulatedAmountSpan = document.getElementById("simulated-amount");
    const simulatedImpactSpan = document.getElementById("simulated-impact");

    if (impactSlider) {
        impactSlider.addEventListener("input", () => {
            const amount = impactSlider.value;
            sliderValueSpan.textContent = amount;
            simulatedAmountSpan.textContent = amount;

            let impactText = "";
            if (amount >= 10 && amount < 50) {
                impactText = `alimentos para ${Math.floor(amount / 10)} familia(s) por ${Math.floor(amount / 10) * 3} días`;
            } else if (amount >= 50 && amount < 100) {
                impactText = `medicinas para ${Math.floor(amount / 25)} niño(s) durante ${Math.floor(amount / 25) * 7} días`;
            } else if (amount >= 100 && amount < 250) {
                impactText = `suministros básicos para ${Math.floor(amount / 50)} hogar(es) por ${Math.floor(amount / 50) * 15} días`;
            } else if (amount >= 250) {
                impactText = `apoyo integral para ${Math.floor(amount / 100)} comunidad(es) por ${Math.floor(amount / 100) * 30} días`;
            } else {
                impactText = `ayuda básica`;
            }
            simulatedImpactSpan.textContent = impactText;
        });
    }
});


