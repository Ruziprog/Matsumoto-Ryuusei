// Тексты для перевода
const translations = {
    en: {
        title: "ECLIPSE OF WILL",
        noctisTitle: "IMPERIUM NOCTIS",
        noctisRuler: "Ruler: ",
        noctisHeir: "Heir: ",
        noctisDomain: "Domain: ",
        noctisPhilosophy: "Philosophy: ",
        noctisAbilities: "Signature Abilities: ",
        noctisDesc: "The empire of eternal night, where power is born from pain and shadows hold dominion over light.",
        lumenTitle: "IMPERIUM LUMEN",
        lumenLeader: "Leader: ",
        lumenTeacher: "Master Teacher: ",
        lumenDomain: "Domain: ",
        lumenPhilosophy: "Philosophy: ",
        lumenAbilities: "Signature Abilities: ",
        lumenDesc: "The empire of boundless light, where true power comes from inner peace and spiritual awakening."
    },
    ja: {
        title: "意志の蝕",
        noctisTitle: "ノクティス帝国",
        noctisRuler: "統治者: ",
        noctisHeir: "後継者: ",
        noctisDomain: "領域: ",
        noctisPhilosophy: "哲学: ",
        noctisAbilities: "特有能力: ",
        noctisDesc: "永遠の夜の帝国。苦痛から力が生まれ、影が光を支配する場所。",
        lumenTitle: "ルーメン帝国",
        lumenLeader: "指導者: ",
        lumenTeacher: "師匠: ",
        lumenDomain: "領域: ",
        lumenPhilosophy: "哲学: ",
        lumenAbilities: "特有能力: ",
        lumenDesc: "果てしない光の帝国。真の力は内なる平和と精神的目覚めから来る。"
    }
};

// Функция перевода
function translatePage(lang) {
    const t = translations[lang];
    
    // Обновляем заголовок
    document.querySelector('h1').textContent = t.title;
    
    // Обновляем атрибут lang у html
    document.documentElement.lang = lang;
    
    // Обновляем заголовки империй
    document.getElementById('noctis-title').textContent = t.noctisTitle;
    document.getElementById('lumen-title').textContent = t.lumenTitle;
    
    // Обновляем тексты для Noctis
    const noctisElements = document.querySelectorAll('.empire-card--noctis p');
    noctisElements[0].innerHTML = `<strong>${t.noctisRuler}</strong>Queen Amilla & King Rein`;
    noctisElements[1].innerHTML = `<strong>${t.noctisHeir}</strong>Freia Noctis`;
    noctisElements[2].innerHTML = `<strong>${t.noctisDomain}</strong>Realm of Shadows`;
    noctisElements[3].innerHTML = `<strong>${t.noctisPhilosophy}</strong>Power through Sacrifice`;
    noctisElements[4].innerHTML = `<strong>${t.noctisAbilities}</strong>Eidolon Evolution`;
    noctisElements[5].textContent = t.noctisDesc;
    
    // Обновляем тексты для Lumen
    const lumenElements = document.querySelectorAll('.empire-card--lumen p');
    lumenElements[0].innerHTML = `<strong>${t.lumenLeader}</strong>The Enlightened Council`;
    lumenElements[1].innerHTML = `<strong>${t.lumenTeacher}</strong>Rudzi`;
    lumenElements[2].innerHTML = `<strong>${t.lumenDomain}</strong>Realm of Eternal Dawn`;
    lumenElements[3].innerHTML = `<strong>${t.lumenPhilosophy}</strong>Power through Enlightenment`;
    lumenElements[4].innerHTML = `<strong>${t.lumenAbilities}</strong>Absolute Enlightenment, Lumen Arts`;
    lumenElements[5].textContent = t.lumenDesc;
    
    // Сохраняем язык в localStorage
    localStorage.setItem('preferredLanguage', lang);
}

// При загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем переключатель языков, если его нет
    if (!document.querySelector('.language-switcher')) {
        const header = document.querySelector('header');
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn active" data-lang="en">EN</button>
            <button class="lang-btn" data-lang="ja">日本語</button>
        `;
        header.appendChild(switcher);
    }
    
    // Проверяем сохраненный язык
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    
    // Устанавливаем язык
    translatePage(savedLang);
    
    // Обновляем активную кнопку
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === savedLang);
    });
    
    // Обработчики для кнопок переключения
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.dataset.lang;
            
            // Убираем активный класс у всех кнопок
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Переводим страницу
            translatePage(lang);
            
            // Анимация перехода
            document.body.style.opacity = '0.7';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '1';
            }, 100);
        });
    });
});