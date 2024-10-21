let currentPageNumber = 0
let cooldownScrolling = false
let currentSpacing = 150

// Indien dit wordt getriggered wacht hij een bepaalde tijd tot hij de code verder laat gaan.
// number voor ms, dit geef je mee om te bepalen hoelang delay moet wachten.
const delay = ms => new Promise(res => setTimeout(res, ms));

// Wanneer de pagina laad wordt je altijd op de eersste sectie gescrolled om fouten te voorkomen.
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("begin").scrollIntoView({ behavior: "smooth" });
});

// Scroll naar bepaalde sectie op basis van welke section je zit
// Pagenum = naar welke sectie je moet scrollen
// Route = richting, up of down.
function scrollToSection(pageNum, route, nav) {
    if (nav === 'nav') {
        currentPageNumber = pageNum - 1
        updateSideBar(currentPageNumber)
    }
    activateCooldownScroll();
    if (pageNum === 0) {
        document.getElementById("ervaring").scrollIntoView({ behavior: "smooth" });
    } else if (pageNum === 1) {
        if (route === 'up') {
            document.getElementById("begin").scrollIntoView({ behavior: "smooth" });
        } else {
            document.getElementById("projecten").scrollIntoView({ behavior: "smooth" });
        }
    } else if (pageNum === 2) {
        if (route === 'up') {
            document.getElementById("ervaring").scrollIntoView({ behavior: "smooth" });
        } else {
            document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
        }
    } else if (pageNum === 3 && route === 'up') {
        document.getElementById("projecten").scrollIntoView({ behavior: "smooth" });
    }
}

// Deze functie wordt getriggerd als jij omhoog scrolled
function scrolledUp() {
    scrollToSection(currentPageNumber, 'up')
}

// Deze functie wordt getriggerd als jij omlaag scrolled
function scrolledDown() {
    scrollToSection(currentPageNumber, 'down')
}

// Zet een kleine cooldown op het scrollen
async function activateCooldownScroll() {
    cooldownScrolling = true
    await delay(500);
    cooldownScrolling = false
}

// Update de sidebar feedback waar je ziet op welke sectie je zit indien een scroll voltooid is
function updateSideBar(page) {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach((item, i) => {
        item.classList.toggle('active', i === page);
    });
}

// Default JS event die kijkt of jij scrolled
// Function 1: Scroll omhoog of omlaag functie wordt uitgevoerd indien er geen cooldown is.
// Function 2: Update de sidebar feedback.
window.addEventListener('wheel', function(event) {
    if (cooldownScrolling) { return; }
    if (event.deltaY < 0) {
        if (currentPageNumber === 0) { return; }
        scrolledUp();
        currentPageNumber = currentPageNumber - 1;
        updateSideBar(currentPageNumber);
    } else {
        if (currentPageNumber === 3) { return; }
        scrolledDown();
        currentPageNumber = currentPageNumber + 1;
        updateSideBar(currentPageNumber);
    }
});