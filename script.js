var loader = document.querySelector(".preloader");

window.addEventListener("load", function(){
    loader.style.display = "none";
})


const wrapper = document.querySelector(".wrapper");

const carousal = document.querySelector(".carousal");

const arrowBtns = document.querySelectorAll(".wrapper i");

const firstCardWidth = carousal.querySelector(".card").offsetWidth;

const carousalChildrens = [...carousal.children];

let cardPerView = Math.round(carousal.offsetWidth / firstCardWidth);


let isDragging = false, startX, startScrollLeft, timeoutId;

carousalChildrens.slice(-cardPerView).reverse().forEach(card = () => {
    carousal.insertAdjacentHTML("afterbegin", card.outerHTML);
})

carousalChildrens.slice(0, cardPerView).reverse().forEach(card = () => {
    carousal.insertAdjacentHTML("beforeend", card.outerHTML);
})

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousal.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

const dragStart = (e) => {
    isDragging = true;
    carousal.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousal.scrollLeft;
}

const dragging = (e) => {
if(!isDragging) return;
carousal.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousal.classList.remove("dragging");
}


const autoPlay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carousal.scrollLeft += firstCardWidth, 2500);
}

autoPlay();

const infiniteScroll = () => {
    if(carousal.scrollLeft === 0) {
        carousal.classList.add("no-transition");
        carousal.scrollLeft = carousal.scrollWidth - (2 * carousal.offsetWidth);
        carousal.classList.remove("no-transition");
    }else if(Math.ceil(carousal.scrollLeft) === carousal.scrollWidth - carousal.offsetWidth){
        carousal.classList.add("no-transition");
        carousal.scrollLeft = carousal.offsetWidth;
        carousal.classList.remove("no-transition");
    }
    clearTimeout(timeoutId);
    if(!wrapper.matched(":hover")) autoPlay();
}

carousal.addEventListener("mousemove", dragging);
carousal.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup", dragStop);
carousal.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);