const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 40){

        navbar?.classList.add("scrolled");

    }else{

        navbar?.classList.remove("scrolled");

    }

});

const toggle = document.getElementById("menuToggle");

const mobile = document.getElementById("mobileMenu");

toggle?.addEventListener("click", () => {

    mobile.classList.toggle("active");

});
