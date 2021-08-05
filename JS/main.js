// --------------- Navigation Menu ----------------
(() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavBtn = navMenu.querySelector(".close-nav-menu");
    
    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);
    
    function showNavMenu() {
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }
    function hideNavMenu() {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }
    function fadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        },300)
    }

    // Attach an Event Handler to Document 
    document.addEventListener("click", (event)=> {
        if (event.target.classList.contains('link-item')) {
            if (event.target.hash !== "") {
                // Prevent defult anchor click behavior
                event.preventDefault();
                const hash = event.target.hash;
                // deactivate exisiting active 'section'
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // Activate New 'Section'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                // deactivate exisiting active navigation menu 'link-item'
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
                // If Clicked 'link-item' is contained withing the nav menu 
                if (navMenu.classList.contains("open")) {
                    // active new navigation menu "link-item"
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    // hide new navigation menu 
                    hideNavMenu();
                } else {
                    let navItem = navMenu.querySelectorAll(".link-item");
                    navItem.forEach((item) => {
                        if (hash === item.hash) {
                            // Active new Nav Menu 'link-item'
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                // add hash (#) To url
                window.location.hash = hash;
            }
        }
    })

})();



// ====== About Section Tab ======
(() => {
    //immediatly invoked function expression - using arrow function
    const aboutsection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        /*if event.target contains  'tab-item' class and not contains 
                'active' class */
        if (
            event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")
        ) {
            const target = event.target.getAttribute("data-target");
            console.log(target);
            // Deactive exiting active 'tab-item'
            tabsContainer
                .querySelector(".active")
                .classList.remove("outer-shadow", "active");
            // To Active new tab-item
            event.target.classList.add("active", "outer-shadow");
            // Deactive exiting active 'tab-contemt'
            aboutsection
                .querySelector(".tab-content.active")
                .classList.remove("active");
            // Active new 'tab-content
            aboutsection.querySelector(target).classList.add("active");
        }
    });
})();

function bodyScrollingToggle(){
    document.body.classList.toggle("hidden-scrolling");
}

// ====== Portfolio Filter And Popup =========
(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBt = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    // Filter Porfolio Item
    filterContainer.addEventListener("click", (event) => {
        if (
            event.target.classList.contains("filter-item") &&
            !event.target.classList.contains("active")
        ) {
            // Deactive Existing Active 'filter-item'
            filterContainer
                .querySelector(".active")
                .classList.remove("outer-shadow", "active");
            // Active New 'filter-item'
            event.target.classList.add("active", "outer-shadow");

            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if (
                    target === item.getAttribute("data-category") ||
                    target === "all" ||
                    target === item.getAttribute("for")
                ) {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner")
                .parentElement;

        // Get The Portfolio Index 
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img")
                .getAttribute("data-screenshot");
            
            // Convert Screenshots Into Array
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
            else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })
    //  Close Btn Active
    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }
    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        // Active Loader Untill The PopupImg Loaded
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            // Deactive Loader after The popupImg Load 
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) +
            " of " + screenshots.length;
    }
    // Next Slide
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        popupSlideshow();
    })

    // Prev Slide
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length-1
        }
        else {
            slideIndex--;
        }
        popupSlideshow();
    })

    function popupDetails() {
        // IF pp-project-details Not Exsist
        if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
            projectDetailsBt.style.display = "none";
            return; // End Function Execution
        }
        projectDetailsBt.style.display = "block";
        // Get The Project  Details 
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        // Set The Project title
        popup.querySelector(".pp-project-details").innerHTML = details;
        // Get The Project Title 
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        // Set The Project category
        popup.querySelector(".pp-title h2").innerHTML = title;
        // Get The Project Category
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }

    // Show Project Details 
    projectDetailsBt.addEventListener("click", () => {
        popupDetailsToggle();
    })

    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBt.querySelector("i").classList.remove("fa-minus");
            projectDetailsBt.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px"
        }
        else {
            projectDetailsBt.querySelector("i").classList.remove("fa-plus");
            projectDetailsBt.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight =
                projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, portfolioItemsContainer.offsetTo);
        }
    }

})();

//  ======= Hide All Sections Expect Active ====== 
(() => {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    })
})();

window.addEventListener("load", () => {
    // preloader
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
    },600)
})