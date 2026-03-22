// Data for paintings
const paintings = [
    {
        id: 1,
        title: "Calligraphie Dorée",
        price: 70,
        size: "Cadre blanc - Peinture dorée",
        image: "assets/media__1773932371421.jpg"
    },
    {
        id: 2,
        title: "Mouvement Fluide",
        price: 70,
        size: "Acrylique avec texture",
        image: "assets/media__1773932371450.jpg"
    },
    {
        id: 3,
        title: "L'Essence Minimaliste",
        price: 70,
        size: "Calligraphie encadrée",
        image: "assets/media__1773932371453.jpg"
    },
    {
        id: 4,
        title: "Élévation",
        price: 70,
        size: "Texture blanche",
        image: "assets/media__1773932371466.jpg"
    },
    {
        id: 5,
        title: "Connexion Artistique",
        price: 70,
        size: "Technique mixte",
        image: "assets/media__1773932371492.jpg"
    }
];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');

// Initialize Gallery
function initGallery() {
    galleryGrid.innerHTML = '';
    
    paintings.forEach((painting, index) => {
        const card = document.createElement('div');
        card.className = 'art-card';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="art-image-wrapper">
                <img src="${painting.image}" alt="${painting.title}" class="art-image" loading="lazy">
            </div>
            <div class="art-info">
                <h3 class="art-title">${painting.title}</h3>
                <div class="art-details">
                    <span class="art-size">${painting.size}</span>
                    <span class="art-price">${painting.price} €</span>
                </div>
            </div>
        `;
        
        galleryGrid.appendChild(card);
    });

    // Setup intersection observer for animate on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.art-card').forEach(card => {
        observer.observe(card);
    });
}



// Init
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    
    // Add simple scroll effect on navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(253, 251, 247, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.boxShadow = 'none';
        }
    });



    // Mobile Menu toggles
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenuOverlay && mobileMenuCloseBtn) {
        const openMobileMenu = () => {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeMobileMenu = () => {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        mobileMenuBtn.addEventListener('click', openMobileMenu);
        mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
});
