document.addEventListener('DOMContentLoaded', function() {
    // Элементы навигации
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Переменные для отслеживания прокрутки
    let lastScrollTop = 0;
    const navbarHeight = navbar.offsetHeight;
    
    // Функция для скрытия/показа навигационной панели при прокрутке
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            // Прокрутка вниз - скрываем навигацию
            navbar.classList.add('hidden');
        } else {
            // Прокрутка вверх - показываем навигацию
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Функция переключения вкладок
    function switchTab(tabName) {
        // Убираем активный класс у всех вкладок и ссылок
        navLinks.forEach(link => link.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Добавляем активный класс к выбранной вкладке и ссылке
        const activeLink = document.querySelector(`.nav-link[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(`${tabName}-content`);
        
        if (activeLink) activeLink.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
        
        // Прокручиваем к началу контента
        window.scrollTo({
            top: document.querySelector('.main-content').offsetTop - 100,
            behavior: 'smooth'
        });
    }
    
    // Обработчик прокрутки
    window.addEventListener('scroll', handleScroll);
    
    // Обработчики кликов по вкладкам
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Обработчики для кнопок "Вернуться в Био"
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Инициализация - активируем вкладку "Био" по умолчанию
    switchTab('bio');
    
    // Добавляем анимацию появления элементов при загрузке
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.bio-card, .construction-section, .hero-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Устанавливаем начальные стили для анимации
    document.querySelectorAll('.bio-card, .construction-section').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Вызываем анимацию при загрузке и прокрутке
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Добавляем интерактивность для аватара
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});