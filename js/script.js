// Global variables
let selectedAmount = 10;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAmountButtons();
    initializeCustomAmount();
    updateImpactText();
    animateStats();
});

// Amount button functionality
function initializeAmountButtons() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    
    // Set first button as active by default
    if (amountButtons.length > 0) {
        amountButtons[0].classList.add('active');
    }
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update selected amount
            selectedAmount = parseInt(this.dataset.amount);
            
            // Clear custom amount input
            document.getElementById('custom-amount').value = '';
            
            // Update impact text
            updateImpactText();
        });
    });
}

// Custom amount functionality
function initializeCustomAmount() {
    const customAmountInput = document.getElementById('custom-amount');
    
    customAmountInput.addEventListener('input', function() {
        const value = parseInt(this.value);
        
        if (value && value > 0) {
            // Remove active class from all amount buttons
            document.querySelectorAll('.amount-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Update selected amount
            selectedAmount = value;
            
            // Update impact text
            updateImpactText();
        }
    });
}

// Update impact text based on selected amount
function updateImpactText() {
    const impactText = document.getElementById('impact-text');
    const selectedAmountSpan = document.getElementById('selected-amount');
    
    selectedAmountSpan.textContent = selectedAmount;
    
    let impactMessage = '';
    
    if (selectedAmount >= 250) {
        impactMessage = `Con ${selectedAmount} USDT puedes alimentar a 5 familias por una semana completa`;
    } else if (selectedAmount >= 100) {
        impactMessage = `Con ${selectedAmount} USDT puedes proporcionar medicinas esenciales a 10 personas`;
    } else if (selectedAmount >= 50) {
        impactMessage = `Con ${selectedAmount} USDT puedes alimentar a 2 familias por 5 días`;
    } else if (selectedAmount >= 25) {
        impactMessage = `Con ${selectedAmount} USDT puedes alimentar a una familia por una semana`;
    } else if (selectedAmount >= 10) {
        impactMessage = `Con ${selectedAmount} USDT puedes alimentar a una familia por 3 días`;
    } else {
        impactMessage = `Con ${selectedAmount} USDT puedes proporcionar alimentos básicos por un día`;
    }
    
    impactText.innerHTML = impactMessage;
}

// Animate statistics counters
function animateStats() {
    const stats = [
        { id: 'total-donations', target: 1247, suffix: '' },
        { id: 'families-helped', target: 3891, suffix: '' }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            animateCounter(element, stat.target, stat.suffix);
        }
    });
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 20);
}

// Scroll to section functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// FAQ functionality
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Copy address functionality
function copyAddress() {
    const address = 'TTCqsvXNhPN9Dn3pyb5jD5oCwJ7BKntz8M';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(address).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopyAddress(address);
        });
    } else {
        fallbackCopyAddress(address);
    }
}

function fallbackCopyAddress(address) {
    const textArea = document.createElement('textarea');
    textArea.value = address;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('Error copying address:', err);
        alert('Error al copiar la dirección. Por favor, cópiala manualmente.');
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess() {
    // Create temporary success message
    const successMsg = document.createElement('div');
    successMsg.textContent = '¡Dirección copiada!';
    successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
    `;
    
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        document.body.removeChild(successMsg);
    }, 2000);
}

// Modal functionality
function showDonationModal() {
    const modal = document.getElementById('donation-modal');
    const modalAmount = document.getElementById('modal-amount');
    
    modalAmount.textContent = selectedAmount;
    modal.style.display = 'block';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeDonationModal() {
    const modal = document.getElementById('donation-modal');
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function confirmDonation() {
    // Here you would typically integrate with a payment processor
    // For now, we'll show a success message
    
    closeDonationModal();
    
    const successMsg = document.createElement('div');
    successMsg.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 3rem;
            border-radius: 16px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            z-index: 3000;
            text-align: center;
            max-width: 400px;
            width: 90%;
        ">
            <div style="
                width: 60px;
                height: 60px;
                background: #10b981;
                border-radius: 50%;
                margin: 0 auto 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 2rem;
            ">✓</div>
            <h3 style="color: #1e3a8a; margin-bottom: 1rem;">¡Gracias por tu donación!</h3>
            <p style="color: #6b7280; margin-bottom: 2rem;">
                Tu donación de ${selectedAmount} USDT está siendo procesada. 
                Recibirás una confirmación por email en breve.
            </p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #1e3a8a;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
            ">Cerrar</button>
        </div>
    `;
    
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        if (successMsg.parentElement) {
            successMsg.remove();
        }
    }, 10000);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('donation-modal');
    if (event.target === modal) {
        closeDonationModal();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.impact-card, .step, .testimonial, .benefit');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-open');
}

// Update donation progress (simulated)
function updateDonationProgress() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const currentProgress = Math.random() * 100;
        progressBar.style.width = currentProgress + '%';
    }
}

// Initialize progress update
setInterval(updateDonationProgress, 30000); // Update every 30 seconds

