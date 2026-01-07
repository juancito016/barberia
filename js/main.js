// --- 1. Swiper Initialization ---
        const swiper = new Swiper(".mySwiper", {
            loop: true,
            effect: 'fade',
            speed: 1000,
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            on: {
                beforeSlideChangeStart: function() {
                    // Fade out content of current slide
                    const activeSlide = document.querySelector('.swiper-slide-active .slide-content');
                    if (activeSlide) {
                        activeSlide.style.opacity = '0';
                        activeSlide.style.transform = 'translateY(-20px)';
                        activeSlide.style.transition = 'all 0.6s ease-in';
                    }
                },
                slideChange: function() {
                    // Fade in content of new slide
                    const newActiveSlide = document.querySelector('.swiper-slide-active .slide-content');
                    if (newActiveSlide) {
                        newActiveSlide.style.opacity = '1';
                        newActiveSlide.style.transform = 'translateY(0)';
                        newActiveSlide.style.transition = 'all 0.8s ease-out';
                    }
                }
            }
        });

        // --- 2. Mobile Menu Logic ---
        const btnOpen = document.getElementById('mobile-menu-btn');
        const btnClose = document.getElementById('close-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const links = document.querySelectorAll('.mobile-link');

        function toggleMenu() {
            const isHidden = menu.classList.contains('translate-x-full');
            if (isHidden) {
                menu.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                menu.classList.add('translate-x-full');
                document.body.style.overflow = 'auto';
            }
        }

        if(btnOpen) btnOpen.addEventListener('click', toggleMenu);
        if(btnClose) btnClose.addEventListener('click', toggleMenu);
        
        // Close menu when clicking a link
        links.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });

        // --- 3. Navbar Scroll Effect ---
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // --- 4. Scroll Reveal Animation ---
        const revealElements = document.querySelectorAll('.reveal');

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));

        // --- 5. Gallery Modal Logic ---
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImg');

        function openModal(element) {
            const img = element.querySelector('img');
            modalImg.src = img.src;
            modal.classList.remove('hidden');
            
            // Small delay to allow display:block to apply before animating opacity
            setTimeout(() => {
                modalImg.classList.remove('scale-95', 'opacity-0');
                modalImg.classList.add('scale-100', 'opacity-100');
            }, 10);
            
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modalImg.classList.remove('scale-100', 'opacity-100');
            modalImg.classList.add('scale-95', 'opacity-0');
            
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 300);
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });