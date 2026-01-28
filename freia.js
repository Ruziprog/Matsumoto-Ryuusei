document.addEventListener('DOMContentLoaded', function() {
    const tocWrapper = document.getElementById('tocWrapper');
    const pageToc = document.getElementById('pageToc');
    const tocToggle = document.getElementById('tocToggle');
    const tocShowBtn = document.getElementById('tocShowBtn');
    const tocLinks = document.querySelectorAll('.toc-link');
    const mainContainer = document.querySelector('.container');

    // Функция скрытия TOC
    function hideTOC() {
        pageToc.classList.add('hidden');
        tocWrapper.classList.add('hidden');
        mainContainer.classList.add('toc-hidden');
        localStorage.setItem('tocHidden', 'true');
    }

    // Функция показа TOC
    function showTOC() {
        pageToc.classList.remove('hidden');
        tocWrapper.classList.remove('hidden');
        mainContainer.classList.remove('toc-hidden');
        localStorage.setItem('tocHidden', 'false');
    }

    // Проверяем состояние в localStorage
    if (localStorage.getItem('tocHidden') === 'true') {
        hideTOC();
    }

    // Обработчики кнопок
    tocToggle.addEventListener('click', hideTOC);
    tocShowBtn.addEventListener('click', showTOC);

    // Плавная прокрутка к секциям
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Подсвечиваем активную ссылку
                tocLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Подсветка активного раздела при скролле
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('.content-section');
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });

    // Закрытие TOC при клике вне его (опционально)
    document.addEventListener('click', function(e) {
        if (!pageToc.contains(e.target) && !tocShowBtn.contains(e.target) && 
            !pageToc.classList.contains('hidden') && window.innerWidth < 768) {
            hideTOC();
        }
    });
});




class EmpireStatus {
    constructor() {
        this.metrics = {
            powerLevel: this.randomInt(85, 100),
            unrest: this.randomInt(5, 25),
            shadowReach: this.randomInt(70, 95),
            eeCandidates: this.randomInt(500, 1500)
        };
    }
    
    updateMetrics() {
        // Каждые 30 секунд обновлять показатели
        setInterval(() => {
            this.metrics.powerLevel += this.randomInt(-2, 3);
            this.updateUI();
        }, 30000);
    }
}




class VisitorProfile {
    constructor() {
        this.allegiance = localStorage.getItem('allegiance') || 'unaffiliated';
        this.visitedSections = JSON.parse(localStorage.getItem('visitedSections')) || [];
        this.timeSpent = 0;
    }
    
    trackVisit(sectionId) {
        if (!this.visitedSections.includes(sectionId)) {
            this.visitedSections.push(sectionId);
            // Разблокировать достижение
            this.unlockAchievement(`Explored: ${sectionId}`);
        }
    }
}




        document.addEventListener('DOMContentLoaded', function() {
            const backButton = document.querySelector('.back-button');
            
            if (backButton) {
                backButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    const href = this.href;
                    
                    document.body.style.transition = 'all 0.5s ease-in-out';
                    document.body.style.opacity = '0';
                    document.body.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                });
            }
            
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.6s ease-out';
                document.body.style.opacity = '1';
            }, 100);
        });


class PowerCostCalculator {
    constructor() {
        this.costs = {
            eidolon: { humanity: 80, pain: 95, memory: 60 },
            silentium: { humanity: 40, pain: 70, memory: 30 },
            heir: { humanity: 100, pain: 100, memory: 100 }
        };
    }
    
    calculate(ability, frequency) {
        return {
            remainingHumanity: 100 - (this.costs[ability].humanity * frequency),
            riskLevel: this.costs[ability].pain > 90 ? 'CRITICAL' : 'HIGH'
        };
    }
}




class ScarAnimation {
    trigger() {
        const eye = document.querySelector('.scarred-eye');
        eye.style.animation = 'scarBleed 3s ease-out';
        
        // После 4х активаций за 48 часов
        if (this.activations >= 4) {
            eye.style.filter = 'brightness(0)';
            // Звук ломающегося стекла
        }
    }
}



class MirrorTransformation {
    constructor() {
        this.milestones = [
            { scroll: 10, crack: 1 },
            { scroll: 30, crack: 2 },
            { scroll: 60, crack: 3 },
            { scroll: 90, transform: true }
        ];
    }
    
    update(scrollPercent) {
        // Добавлять трещины к зеркалу
        // Постепенно заменять отражение
    }
}



// === СОСТОЯНИЕ ===
let state = {
    pain: 0,
    heirActivations: 0,
    scarActivations: [],
    lastChoice: null
};

// === ИНИЦИАЛИЗАЦИЯ ===
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем сохранённое состояние
    loadState();
    
    // Настройка кнопок
    document.getElementById('addPainBtn').addEventListener('click', addPain);
    document.getElementById('simulateHeirBtn').addEventListener('click', simulateHeir);
    document.getElementById('triggerScarBtn').addEventListener('click', triggerScar);
    
    // Анимация при загрузке
    setTimeout(() => {
        document.body.style.opacity = '1';
        addPain(); // Начальная боль
    }, 300);
    
    // Анимация при скролле
    window.addEventListener('scroll', onScroll);
});

// === ФУНКЦИИ ===
function loadState() {
    const saved = localStorage.getItem('freiaState');
    if (saved) {
        try {
            state = JSON.parse(saved);
            updateUI();
        } catch(e) {
            console.log('Could not load state');
        }
    }
}

function saveState() {
    localStorage.setItem('freiaState', JSON.stringify(state));
}

function updateUI() {
    // Шкала боли
    const painFill = document.getElementById('painFill');
    const painValue = document.getElementById('painValue');
    
    painFill.style.width = `${state.pain}%`;
    painValue.textContent = `${state.pain}%`;
    
    // Цвет шкалы в зависимости от уровня
    if (state.pain > 80) {
        painFill.style.background = 'linear-gradient(90deg, #1a0b2e, #8B0000)';
        painFill.style.boxShadow = '0 0 20px rgba(139, 0, 0, 0.5)';
    } else if (state.pain > 50) {
        painFill.style.background = 'linear-gradient(90deg, #1a0b2e, #FF6B6B)';
    }
    
    // Счётчик Наследницы
    const currentCount = document.getElementById('currentCount');
    const dots = document.querySelectorAll('.counter-dots .dot');
    const warning = document.getElementById('counterWarning');
    
    currentCount.textContent = state.heirActivations;
    
    dots.forEach((dot, index) => {
        if (index < state.heirActivations) {
            dot.classList.add('active');
            
            // Красные точки для последних активаций
            if (index >= 3) {
                dot.style.background = '#FF6B6B';
                dot.style.borderColor = '#FF6B6B';
            }
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Предупреждения
    if (state.heirActivations >= 5) {
        warning.innerHTML = '<i class="fas fa-skull"></i> PERSONALITY EXTINCTION ACHIEVED';
        warning.style.color = '#FF0000';
        warning.style.animation = 'pulse 1s infinite';
        document.getElementById('simulateHeirBtn').disabled = true;
    } else if (state.heirActivations >= 4) {
        warning.innerHTML = '<i class="fas fa-exclamation-triangle"></i> FINAL WARNING: Next activation causes EXTINCTION';
        warning.style.color = '#FF6B6B';
    } else if (state.heirActivations >= 3) {
        warning.innerHTML = `<i class="fas fa-exclamation-triangle"></i> DANGER: ${5 - state.heirActivations} activations until extinction`;
        warning.style.color = '#FFA500';
    }
    
    // Счётчик шрама
    const scarCount = document.getElementById('scarCount');
    const scarWarning = document.getElementById('scarWarning');
    
    const recentScars = getRecentScarActivations();
    scarCount.textContent = recentScars;
    
    if (recentScars >= 4) {
        scarWarning.innerHTML = '<i class="fas fa-eye-slash"></i> BLINDNESS IMMINENT';
        scarWarning.style.color = '#FF0000';
    } else if (recentScars >= 3) {
        scarWarning.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${4 - recentScars} more = Blindness`;
        scarWarning.style.color = '#FF6B6B';
    } else if (recentScars >= 2) {
        scarWarning.innerHTML = `<i class="fas fa-exclamation-circle"></i> High risk of blindness`;
        scarWarning.style.color = '#FFA500';
    }
    
    saveState();
}

function getRecentScarActivations() {
    const now = Date.now();
    const fortyEightHours = 48 * 60 * 60 * 1000;
    return state.scarActivations.filter(time => now - time < fortyEightHours).length;
}

function addPain() {
    if (state.pain < 100) {
        state.pain += Math.floor(Math.random() * 10) + 5;
        state.pain = Math.min(state.pain, 100);
        
        // Анимация
        const painValue = document.getElementById('painValue');
        painValue.style.animation = 'shake 0.3s';
        setTimeout(() => painValue.style.animation = '', 300);
        
        updateUI();
    }
}

function simulateHeir() {
    if (state.heirActivations < 5) {
        state.heirActivations++;
        
        // Анимация
        const btn = document.getElementById('simulateHeirBtn');
        btn.style.animation = 'pulse 0.5s';
        setTimeout(() => btn.style.animation = '', 500);
        
        // Звуковой эффект (опционально)
        playSound('heir');
        
        updateUI();
        
        // Предупреждение на 5 активации
        if (state.heirActivations === 5) {
            setTimeout(() => {
                alert('PERSONALITY EXTINCTION: Freia\'s consciousness has been absorbed by Bellona. The transformation is complete.');
            }, 500);
        }
    }
}

function triggerScar() {
    const now = Date.now();
    state.scarActivations.push(now);
    
    // Анимация шрама
    const scarMark = document.querySelector('.scar-mark');
    const scarEye = document.getElementById('scarEye');
    
    scarMark.style.opacity = '1';
    scarMark.style.animation = 'bleed 1s ease-out';
    scarEye.style.animation = 'shake 0.5s';
    
    setTimeout(() => {
        scarMark.style.animation = '';
        scarEye.style.animation = '';
    }, 1000);
    
    // Звуковой эффект
    playSound('scar');
    
    // Предупреждение о слепоте
    const recentScars = getRecentScarActivations();
    if (recentScars >= 4) {
        setTimeout(() => {
            const eye = document.querySelector('.eye-iris');
            eye.style.filter = 'brightness(0)';
            eye.style.transition = 'filter 1s';
            
            alert('PERMANENT BLINDNESS: The Cursed Scar has claimed Freia\'s left eye. She can no longer see the world that caused her so much pain.');
        }, 1500);
    }
    
    updateUI();
}

function onScroll() {
    // Добавляем боль при скролле (механика "воспоминания боли")
    if (Math.random() > 0.97) { // 3% шанс при каждом скролле
        addPain();
    }
    
    // Анимация элементов при скролле
    const chapters = document.querySelectorAll('.chapter');
    chapters.forEach(chapter => {
        const rect = chapter.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
            chapter.style.opacity = '1';
            chapter.style.transform = 'translateY(0)';
        }
    });
}

function playSound(type) {
    // Базовые звуки через Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (type === 'heir') {
            // Тёмный магический звук
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(55, audioContext.currentTime + 1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 1);
            
        } else if (type === 'scar') {
            // Звук ломающегося стекла
            const bufferSize = audioContext.sampleRate * 0.5;
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const output = buffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            
            const whiteNoise = audioContext.createBufferSource();
            whiteNoise.buffer = buffer;
            
            const bandpass = audioContext.createBiquadFilter();
            bandpass.type = 'bandpass';
            bandpass.frequency.value = 1000;
            
            const gainNode = audioContext.createGain();
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            whiteNoise.connect(bandpass);
            bandpass.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            whiteNoise.start();
            whiteNoise.stop(audioContext.currentTime + 0.5);
        }
    } catch (e) {
        console.log('Audio not supported');
    }
}

// === НАЧАЛЬНЫЕ СТИЛИ ДЛЯ АНИМАЦИИ ===
document.head.insertAdjacentHTML('beforeend', `
<style>
    body {
        opacity: 0;
        transition: opacity 0.8s ease;
    }
    
    .chapter {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .timeline-item {
        transition: transform 0.3s ease;
    }
    
    .timeline-item:hover {
        transform: translateX(5px);
    }
    
    .ability-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(147, 112, 219, 0.3) !important;
    }
    
    .weakness-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3) !important;
    }
</style>
`);



// В конец freia.js добавь:
function forceTOCPosition() {
    const tocWrapper = document.getElementById('tocWrapper');
    const pageToc = document.getElementById('pageToc');
    
    if (!tocWrapper || !pageToc) return;
    
    // Принудительно ставим в правый верхний угол
    tocWrapper.style.position = 'fixed';
    tocWrapper.style.top = '120px';
    tocWrapper.style.right = '30px';
    tocWrapper.style.bottom = 'auto';
    tocWrapper.style.left = 'auto';
    
    // Убеждаемся, что не в потоке документа
    tocWrapper.style.float = 'none';
    tocWrapper.style.margin = '0';
    
    console.log('TOC position forced:', {
        top: tocWrapper.style.top,
        right: tocWrapper.style.right,
        computed: getComputedStyle(tocWrapper).position
    });
}

// Вызываем после загрузки и при ресайзе
window.addEventListener('load', forceTOCPosition);
window.addEventListener('resize', forceTOCPosition);
setTimeout(forceTOCPosition, 1000); // На всякий случай