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