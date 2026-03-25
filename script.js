// Data for paintings
const paintings = [
    {
        id: 1,
        title: "Paix (Salam)",
        price: 70,
        size: "50x70 cm - Béton ciré sur toile",
        description: "Une ode visuelle à la sérénité. Modulée entièrement en béton ciré sur toile, la texture brute de l'œuvre donne à la calligraphie « Salam » (Paix) une dimension tactile et un relief saisissant, invitant à la contemplation et au calme intérieur.",
        image: "assets/media__1774410225146.jpg"
    },
    {
        id: 2,
        title: "Harmonie Divine",
        price: 65,
        size: "50x70 cm - Peinture et béton ciré sur toile",
        description: "Cette création marie l'élégance de la calligraphie à la puissance de la matière. La silhouette noire de l'inscription sacrée contraste harmonieusement avec des vagues subtiles en béton ciré qui encadrent la toile, apportant lumière et profondeur absolue.",
        image: "assets/media__1774410225153.jpg"
    },
    {
        id: 3,
        title: "Composition Libre",
        price: 40,
        size: "50x70 cm - Acrylique sur toile",
        description: "Une œuvre mariant l'esthétique contemporaine et l'art des lettres arabes. Travaillée à l'acrylique sur un fond délicatement nuancé, elle offre une dynamique asymétrique audacieuse qui capte le regard et s'intègre parfaitement dans les espaces modernes.",
        image: "assets/media__1774410225164.jpg"
    },
    {
        id: 4,
        title: "Élégance Encadrée",
        price: 50,
        size: "20x30 cm (encadré) - Bois, béton ciré et acrylique",
        description: "Une présentation raffinée où l'utilisation du bois et de la peinture acrylique est sublimée par une finition au béton ciré. Une seule lettre calligraphiée en noir intense devient la pièce maîtresse intemporelle pour habiller élégamment vos murs.",
        image: "assets/media__1774410225169.jpg"
    },
    {
        id: 5,
        title: "Force Géométrique",
        price: 35,
        size: "30x40 cm (encadré) - Peinture sur bois",
        description: "Empruntant les codes géométriques du style Kufic, cette pièce peinte sur bois et présentée dans son cadre offre un contraste chaleureux grâce à son fond nuancé et ocre. Une composition épurée qui ancre spirituellement et esthétiquement votre décoration.",
        image: "assets/media__1774410682782.jpg"
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
                <p class="art-description">${painting.description}</p>
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
