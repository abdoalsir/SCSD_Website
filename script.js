const sidebar = document.getElementById('sidebar');
const toggleSidebarButton = document.getElementById('toggleSidebar');
const mainHeader = document.querySelector('header');
const fadeInElements = document.querySelectorAll('.fade-in'); // Select all elements with fade-in class

let lastScrollTop = 0; // Keep track of the last scroll position
let isScrolling; // Variable to track if the user is scrolling
// Toggle the sidebar when the button is clicked
toggleSidebarButton.addEventListener('click', () => {
  const isOpen = sidebar.style.left === '0px';
  sidebar.style.left = isOpen ? '-250px' : '0px'; // Hide or show sidebar
  document.getElementById('content').style.marginLeft = isOpen ? '0' : '250px'; // Adjust content margin
});

window.addEventListener('load', () => {
  const disappearingText = document.querySelector('.disappearing-text');
  setTimeout(() => {
    disappearingText.style.opacity = '0'; // Makes the text disappear after 2 seconds
  }, 2000); // Delay of 2 seconds before disappearing
});

window.addEventListener('scroll', function() {
  const overlayText = document.querySelector('.overlay-text');
  const overlayText1 = document.querySelector('.overlay-text1');
  const scrollPosition = window.scrollY;

  // Adjust the opacity based on scroll position
  const fadeOutStart = 100; // Start fading out after 100px
  const fadeOutEnd = 300; // Fully fade out by 300px

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

// Example function to add an event with an image
function addEvent(title, description, link, imageUrl) {
  const eventMessage = document.getElementById('eventMessage');
  const eventCards = document.getElementById('eventCards');

  // Hide the message and show the event cards
  eventMessage.style.display = 'none';
  eventCards.style.display = 'block';

  // Create a new event card
  const newCard = document.createElement('div');
  newCard.className = 'col-md-6 mb-4';
  newCard.innerHTML = `
    <div class="card text-center">
      <img src="${imageUrl}" class="card-img-top" alt="Event Image"> <!-- Add the image here -->
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <a href="${link}" class="btn btn-primary">Learn More</a>
      </div>
    </div>
  `;
  eventCards.appendChild(newCard);
}

// Reveal on scroll
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

// Header hide/show
let lastScroll = 0;
let headerElement = document.querySelector('.header');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        headerElement.classList.remove('header--hidden');
        return;
    }

    if (currentScroll > lastScroll && !headerElement.classList.contains('header--hidden')) {
        // Scrolling down
        header.classList.add('header--hidden');
    } else if (currentScroll < lastScroll && headerElement.classList.contains('header--hidden')) {
        // Scrolling up
        header.classList.remove('header--hidden');
    }

    lastScroll = currentScroll;
});

// List of vacancies (this will be dynamically added)
// Initial vacancies array (empty at the moment, future vacancies will go here)
// Array to hold vacancy data
let vacancies = [];

// Function to update the UI with vacancy cards
function displayVacancyCards() {
  const vacancyCardsContainer = document.getElementById('vacancy-cards');
  const noVacanciesMessage = document.getElementById('no-vacancies-message');

  // Clear the container before adding new cards
  vacancyCardsContainer.innerHTML = '';

  // Check if there are vacancies
  if (vacancies.length > 0) {
    // Hide the "No Vacancies" message
    noVacanciesMessage.style.display = 'none';

    // Create a card for each vacancy
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
  } else {
    // If no vacancies, show the "No Vacancies" message
    noVacanciesMessage.style.display = 'block';
  }
}

// Function to add a new vacancy
function addVacancy(title, description, link, imageUrl) {
  const newVacancy = {
    title: title,
    description: description,
    link: link,
    image: imageUrl
  };

  // Add the new vacancy to the vacancies array
  vacancies.push(newVacancy);

  // Update the display
  displayVacancyCards();
}

// Event listener for the form submission
document.getElementById('vacancy-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get form data
  const title = document.getElementById('vacancy-title').value;
  const description = document.getElementById('vacancy-description').value;
  const link = document.getElementById('vacancy-link').value;
  const imageUrl = document.getElementById('vacancy-image').value;

  // Call the function to add the vacancy
  addVacancy(title, description, link, imageUrl);

  // Reset the form fields after submission
  document.getElementById('vacancy-form').reset();
});

// Initialize the display on page load
window.onload = displayVacancyCards;

// JavaScript to manage events
const currentEvents = []; // Array to hold current events
const upcomingEvents = []; // Array to hold upcoming events

// Function to render current events
function renderCurrentEvents() {
    const currentEventsContainer = document.getElementById('current-events');
    const noCurrentEventsMessage = document.getElementById('no-current-events');

    currentEventsContainer.innerHTML = ''; // Clear existing content

    if (currentEvents.length === 0) {
        noCurrentEventsMessage.style.display = 'block'; // Show no events message
    } else {
        noCurrentEventsMessage.style.display = 'none'; // Hide no events message
        currentEvents.forEach(event => {
            const eventCard = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text">Location: ${event.location}</p>
                            <p class="card-text">Date: ${event.date}</p>
                        </div>
                    </div>
                </div>
            `;
            currentEventsContainer.innerHTML += eventCard; // Add event card to container
        });
    }
}

// Function to render upcoming events
function renderUpcomingEvents() {
    const upcomingEventsContainer = document.getElementById('upcoming-events');
    const noUpcomingEventsMessage = document.getElementById('no-upcoming-events');

    upcomingEventsContainer.innerHTML = ''; // Clear existing content

    if (upcomingEvents.length === 0) {
        noUpcomingEventsMessage.style.display = 'block'; // Show no upcoming events message
    } else {
        noUpcomingEventsMessage.style.display = 'none'; // Hide no upcoming events message
        upcomingEvents.forEach(event => {
            const eventCard = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text">Location: ${event.location}</p>
                            <p class="card-text">Date: ${event.date}</p>
                        </div>
                    </div>
                </div>
            `;
            upcomingEventsContainer.innerHTML += eventCard; // Add event card to container
        });
    }
}

// Example of adding events (you can replace this with actual data)
currentEvents.push({ name: 'Current Event 1', location: 'Location 1', date: '2025-01-01' });
upcomingEvents.push({ name: 'Upcoming Event 1', location: 'Location 2', date: '2025-02-01' });

// Render events on page load
renderCurrentEvents();
renderUpcomingEvents();