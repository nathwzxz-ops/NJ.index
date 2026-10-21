
document.addEventListener('DOMContentLoaded', () => {

    // 1. Alternador de Tema (Light / Dark Mode)
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.querySelector('.icon').textContent = '☀️';
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';
        
        if (currentTheme !== 'dark') {
            newTheme = 'dark';
            themeToggleBtn.querySelector('.icon').textContent = '☀️';
        } else {
            themeToggleBtn.querySelector('.icon').textContent = '🌙';
        }

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 2. Filtros de Seção
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cardSections = document.querySelectorAll('.card-section');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            cardSections.forEach(section => {
                const category = section.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });

    // 3. Busca em Tempo Real
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        cardSections.forEach(section => {
            const textContent = section.textContent.toLowerCase();
            if (textContent.includes(query)) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    });

    // 4. Animação de Contadores de Estatística
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounters = () => {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 50;

            const updateCount = () => {
                const count = +counter.innerText;
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    animateCounters();
});
