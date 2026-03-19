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

// State
let cart = [];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const cartOpenBtn = document.getElementById('cartOpenBtn');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotal = document.getElementById('cartTotal');
const cartCountElements = document.querySelectorAll('.cart-count');

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
                <button class="btn-add" onclick="addToCart(${painting.id})">
                    <i class="ph ph-shopping-cart-simple"></i>
                    Ajouter au panier
                </button>
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

// Cart functionality
window.addToCart = (id) => {
    const painting = paintings.find(p => p.id === id);
    if (!painting) return;
    
    // Check if item already in cart
    const existingItem = cart.find(item => item.id === id);
    if (!existingItem) {
        cart.push(painting);
        updateCartUI();
        
        // Show notification or bounce effect on cart icon
        cartOpenBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartOpenBtn.style.transform = 'scale(1)';
        }, 300);
    } else {
        alert("Cette œuvre unique est déjà dans votre panier.");
    }
};

window.removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
};

function updateCartUI() {
    // Update count
    cartCountElements.forEach(el => el.textContent = cart.length);
    
    // Update items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Votre panier est vide.</p>';
        cartTotal.textContent = '0 €';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">${item.price} €</div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="ph ph-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotal.textContent = `${total} €`;
}

// Sidebar toggles
cartOpenBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

const closeCart = () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
};

cartCloseBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

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

    // Handle checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert("Votre panier est vide.");
            } else {
                alert("Redirection vers la page de paiement sécurisé...");
            }
        });
    }

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
