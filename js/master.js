// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
    document.documentElement.style.setProperty("--main-color", mainColors);

    document.querySelectorAll(".colors-list li").forEach(el => {
        el.classList.remove("active");

        if (el.dataset.color === mainColors) {
            el.classList.add("active")
        }
    })
}

// Random Background Option 
let backgroundOption = true;

// Variable To Control The Interval
let theBackgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    document.querySelectorAll(".random-backgrounds span").forEach(el => {
        el.classList.remove("active")
    });

    if (backgroundLocalItem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active")
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active")
    }
}

// Toggle Spin Class On Icon
let btn = document.querySelector(".toggle-settings");
btn.onclick = () => {
    document.querySelector(".gear").classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
// Loop On All List Items
colorsLi.forEach(li => {
    // Click On Every List Items
    li.addEventListener("click", (e) => {
        // Set Color On Root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        // Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);
        
        handleActive(e)
    })
})

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// Loop On All Spans
randomBackEl.forEach(span => {
    // Click On Every Span
    span.addEventListener("click", (e) => {
        handleActive(e)

        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(theBackgroundInterval);
            localStorage.setItem("background_option", false)
        }
    })
})

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {
    if (backgroundOption === true) {
        theBackgroundInterval = setInterval(() => {
            // Get Random Number
            let randomnumber = Math.floor(Math.random() * imgsArray.length);
            // Change Background Imgs Url
            landingPage.style.backgroundImage = 'url("../imgs/' + imgsArray[randomnumber] + '")';
        }, 3000)
    }
}
randomizeImgs()


// Select Skills Selctor
let ourSkills = document.querySelector(".skills");

window.onscroll = () => {
    // Skills offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills outer Height 
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })
    }
}

// Creat Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        // Create Overlay Element
        let overlay = document.createElement("div");
        // Add Class To Overlay
        overlay.className = "popup-overlay";
        // Append Overlay To The Body
        document.body.appendChild(overlay);

        // Creat The Popup Box
        let popupBox = document.createElement("div");
        // Add Class To The Popup Box
        popupBox.className = "popup-box";

        // Creat The Close Span
        let CloseButton = document.createElement("span");
        // Creat The Close Button Text
        let closeButtonText = document.createTextNode("X");
        // Append Text To Close Button
        CloseButton.appendChild(closeButtonText);
        // Add Class To Close Button
        CloseButton.className = "close-button";
        // Add Close Button To The Popup Box
        popupBox.appendChild(CloseButton);

        if (img.alt !== null) {
            // Creat Heading
            let imgHeading = document.createElement("h3");
            // Creat Text For Heading
            let imgText = document.createTextNode(img.alt);
            // Append The Text To The Heading
            imgHeading.appendChild(imgText);
            // Append The Heading To The Popup Box
            popupBox.appendChild(imgHeading);
        }

        // Creat The Image
        let popupImage = document.createElement("img");
        // Set Image Source
        popupImage.src = img.src;
        // Add Image To The Popup Box
        popupBox.appendChild(popupImage);
        // Append The Popup Box To Body
        document.body.appendChild(popupBox);
    });
});

// Close Popup
document.addEventListener("click", (e) => {
    if (e.target.className == "close-button") {
        // Remove The Current Popup
        document.querySelector(".popup-box").remove();
        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(ele) {
    ele.forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        });
    })
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);


// Handle Active State
function handleActive(ev) {
    // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(el => {
        el.classList.remove("active")
    })
    // Add Active Class on Self
    ev.target.classList.add("active");
}


let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });

    if (bulletLocalItem === "block") {
        bulletsContainer.style.display = "block"
        document.querySelector(".bullets-option .yes").classList.add("active")
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block"
            localStorage.setItem("bullets_option", "block")
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets_option", "none")
        }

        handleActive(e)
    })
})

// Reset Button
document.querySelector(".reset-options").onclick = () => {
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");

    window.location.reload();
}

// Toggle Menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
}

tLinks.onclick = function (e) {
    e.stopPropagation();
}

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        if (tLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
});

