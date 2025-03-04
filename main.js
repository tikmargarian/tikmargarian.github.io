document.addEventListener("DOMContentLoaded", function() {
    const services = document.querySelectorAll(".service");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.5 });
    
    services.forEach(service => observer.observe(service));

    // Galerie Lightbox
    const galleryImages = document.querySelectorAll(".gallery-img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    
    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightbox.style.display = "flex";
        });
    });
    
    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
});

const avatars = document.querySelectorAll(".avatar");
avatars[0].style.backgroundColor = "#d62f2f";
avatars[1].style.backgroundColor = "#8dc63f";
avatars[2].style.backgroundColor = "#ffce40";
avatars[3].style.backgroundColor = "#044944";
avatars[4].style.backgroundColor = "#8bc24a";
avatars[5].style.backgroundColor = "#254bdd";

const container = document.querySelector('.reviews');
        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');
        
next.addEventListener('click', () => {
    container.scrollBy({ left: 320, behavior: 'smooth' });
});
        
prev.addEventListener('click', () => {
    container.scrollBy({ left: -320, behavior: 'smooth' });
});