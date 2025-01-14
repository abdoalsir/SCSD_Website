const sidebar = document.getElementById('sidebar');
const toggleSidebarButton = document.getElementById('toggleSidebar');
const mainHeader = document.querySelector('header');
const fadeInElements = document.querySelectorAll('.fade-in');

document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');

    if(togglePassword && password) {
        togglePassword.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
});

let lastScrollTop = 0;
let isScrolling;

toggleSidebarButton.addEventListener('click', () => {
    const isOpen = sidebar.style.left === '0px';
    sidebar.style.left = isOpen ? '-250px' : '0px';
    document.getElementById('content').style.marginLeft = isOpen ? '0' : '250px';
});

window.addEventListener('load', () => {
    const disappearingText = document.querySelector('.disappearing-text');
    setTimeout(() => {
        disappearingText.style.opacity = '0';
    }, 2000);
});

window.addEventListener('scroll', function() {
    const overlayText = document.querySelector('.overlay-text');
    const overlayText1 = document.querySelector('.overlay-text1');
    const scrollPosition = window.scrollY;

    const fadeOutStart = 100;
    const fadeOutEnd = 300;

    if (scrollPosition > fadeOutStart && scrollPosition < fadeOutEnd) {
        const opacity = 1 - (scrollPosition - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        overlayText.style.opacity = opacity;
        overlayText1.style.opacity = opacity;
    } else if (scrollPosition >= fadeOutEnd) {
        overlayText.style.opacity = 0;
        overlayText1.style.opacity = 0;
    } else {
        overlayText.style.opacity = 1;
        overlayText1.style.opacity = 1;
    }
});

function addEvent(title, description, link, imageUrl) {
    const eventMessage = document.getElementById('eventMessage');
    const eventCards = document.getElementById('eventCards');

    eventMessage.style.display = 'none';
    eventCards.style.display = 'block';

    const existingCards = eventCards.getElementsByClassName('card-title');
    for (let i = 0; i < existingCards.length; i++) {
        if (existingCards[i].innerText === title) {
            console.log('Event already exists.');
            return;
        }
    }

    const newCard = document.createElement('div');
    newCard.className = 'col-md-6 mb-4';
    newCard.innerHTML = `
        <div class="card text-center">
            <img src="${imageUrl}" class="card-img-top" alt="Event Image">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <a href="${link}" class="btn btn-primary">Learn More</a>
            </div>
        </div>
    `;
    eventCards.appendChild(newCard);
}

window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if(revealTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

let lastScroll = 0;
let headerElement = document.querySelector('.header');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        headerElement.classList.remove('header--hidden');
        return;
    }

    if (currentScroll > lastScroll && !headerElement.classList.contains('header--hidden')) {
        header.classList.add('header--hidden');
    } else if (currentScroll < lastScroll && headerElement.classList.contains('header--hidden')) {
        header.classList.remove('header--hidden');
    }

    lastScroll = currentScroll;
});

const vacancies = [
    { title: "Position 1", description: "Description for position 1", link: "application_form_1.html", image: "path_to_image_1.jpg" },
    { title: "Position 2", description: "Description for position 2", link: "application_form_2.html", image: "path_to_image_2.jpg" }
];

function displayVacancyCards() {
    const vacancyCardsContainer = document.getElementById('vacancy-cards');
    vacancyCardsContainer.innerHTML = '';

    if (vacancies.length > 0) {
        vacancies.forEach(vacancy => {
            const card = document.createElement('div');
            card.className = 'card m-2';
            card.innerHTML = `
                <div class="image">
                    <img src="${vacancy.image}" alt="Position Image" class="img-fluid">
                </div>
                <div class="title">${vacancy.title}</div>
                <div class="text">${vacancy.description}</div>
                <a href="${vacancy.link}" class="apply-button">Apply Now</a>
            `;
            vacancyCardsContainer.appendChild(card);
        });
    }
}

class ActivitySlideshow {
    constructor(container, activities) {
        this.container = container;
        this.activities = activities;
        this.currentSlide = 0;
        this.slidesContainer = container.querySelector('.slides');
        this.dotsContainer = container.querySelector('.dots-container');

        this.init();
        this.showSlide(0);

        container.querySelector('.prev').addEventListener('click', () => this.changeSlide(-1));
        container.querySelector('.next').addEventListener('click', () => this.changeSlide(1));
    }

    init() {
        this.activities.forEach((activity, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `
                <img src="${activity.image}" alt="${activity.title}">
                <h3>${activity.title}</h3>
                <p>${activity.description}</p>
            `;
            this.slidesContainer.appendChild(slide);

            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.addEventListener('click', () => this.showSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }

    showSlide(n) {
        this.currentSlide = n;
        const slides = this.slidesContainer.children;
        const dots = this.dotsContainer.children;

        Array.from(slides).forEach((slide, index) => {
            slide.style.display = index === n ? 'block' : 'none';
        });

        Array.from(dots).forEach((dot, index) => {
            dot.classList.toggle('active', index === n);
        });
    }

    changeSlide(direction) {
        let newSlide = this.currentSlide + direction;
        if (newSlide >= this.activities.length) newSlide = 0;
        if (newSlide < 0) newSlide = this.activities.length - 1;
        this.showSlide(newSlide);
    }
}

const activitiesData = [
    {
        title: 'Activity 1',
        description: 'Description of activity 1',
        image: 'path/to/image1.jpg'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.querySelector('.activities-slideshow');
    if (slideshowContainer) {
        new ActivitySlideshow(slideshowContainer, activitiesData);
    }

    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            fetch('auth.php', {
                method: 'POST',
                body: new FormData(this)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'admin-dashboard.html';
                } else {
                    alert('Invalid credentials');
                }
            });
        });
    }
});
