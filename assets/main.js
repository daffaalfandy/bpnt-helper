const settings = require('electron-settings');

// Import section
const links = document.querySelectorAll('link[rel="import"]');
Array.prototype.forEach.call(links, (link) => {
    let template = link.import.querySelector('.task-template');
    let clone = document.importNode(template.content, true);
    if (link.href.match('main.html')) {
        document.querySelector('#main').appendChild(clone);
        document.querySelector('.section').classList.add('is-shown');
    } else {
        document.querySelector('#main').appendChild(clone);
    }
});
// End

// Handle event listener
document.body.addEventListener('click', (event) => {
    if (event.target.dataset.section) {
        handleSectionTrigger(event);
        event.target.classList.add('sidenav-active');
    }
});

function handleSectionTrigger(event) {
    hideAllSectionsAndDeselectButtons();

    // Display the current section
    const sectionId = `${event.target.dataset.section}-section`;
    document.getElementById(sectionId).classList.add('is-shown');

    // Save currently active button in localStorage
    const buttonId = event.target.getAttribute('id');
    settings.set('activeSectionButtonId', buttonId);

}

function hideAllSectionsAndDeselectButtons() {
    const sections = document.querySelectorAll('.section.is-shown');
    Array.prototype.forEach.call(sections, (section) => {
        section.classList.remove('is-shown');
    });

    const navs = document.querySelectorAll('.sidenav-active');
    Array.prototype.forEach.call(navs, (nav) => {
        nav.classList.remove('sidenav-active')
    });
}

function handleInputTrigger(section) {
    hideAllSectionsAndDeselectButtons()

    const inputId = `${section}-section`;
    document.getElementById(inputId).classList.add('is-shown');
}
// End
module.exports.handleInputTrigger = handleInputTrigger;