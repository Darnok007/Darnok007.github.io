images = [...document.getElementsByClassName('slide-element-wrapper')];
imgCount = images.length;
let slideTransitionRunning = false;

function nextImg() {
    if (slideTransitionRunning) return;
    for (let i = 0; i < imgCount; i++) {
        if (images[i].classList.contains('slide-active')) {
            // slide out to the left
            images[i].classList.add('slide-out');
            images[i].classList.remove('slide-active');
            // slide in from the right
            let newActiveImage = images[(i + 1) % imgCount];
            newActiveImage.classList.add('slide-active');
            activateDot((i + 1) % imgCount);
            // make sure no other transition is running
            newActiveImage.addEventListener('transitionend', (_) => {
                slideTransitionRunning = false;
            }, {once: true});
            slideTransitionRunning = true;
            // prepare image to slide in from the right (to loop)
            _prepareNextImage((i + 1) % imgCount);
            break
        }
    }
}

function previousImg() {
    if (slideTransitionRunning) return;
    for (let i = 0; i < imgCount; i++) {
        if (images[i].classList.contains('slide-active')) {
            // slide out to the right (because no slide-out class)
            images[i].classList.remove('slide-active');
            // slide in from the left
            let newActiveImage = images[(i - 1 + imgCount) % imgCount];
            newActiveImage.classList.remove('slide-out');
            newActiveImage.classList.add('slide-active');
            activateDot((i - 1 + imgCount) % imgCount);
            // make sure no other transition is running
            newActiveImage.addEventListener('transitionend', (_) => {
                slideTransitionRunning = false;
            }, {once: true});
            slideTransitionRunning = true;
            // prepare image to slide in from the left
            _prepareLastImage((i - 1 + imgCount) % imgCount);
            break
        }
    }
}

function showImg(id) {
    if (slideTransitionRunning || id + 1 > imgCount) return;
    let activeIndex = images.indexOf(images.find((img) => img.classList.contains('slide-active')));
    if (activeIndex === id) return;
    if (activeIndex < id) {
        // make sure the image slide in from the right
        if (images[id].classList.contains('slide-out')) {
            images[id].style.transition = 'none';
            images[id].classList.remove('slide-out');
            void images[id].offsetHeight
            images[id].style.transition = null;
        }
        // slide out to the left
        images[activeIndex].classList.add('slide-out');
        images[activeIndex].classList.remove('slide-active');
        // slide in from the right
        images[id].classList.add('slide-active');
    } else {
        // make sure the image slide in from the right
        if (!images[id].classList.contains('slide-out')) {
            images[id].style.transition = 'none';
            images[id].classList.add('slide-out');
            void images[id].offsetHeight
            images[id].style.transition = null;
        }
        // slide out to the right
        images[activeIndex].classList.remove('slide-active');
        // slide in from the left
        images[id].classList.remove('slide-out');
        images[id].classList.add('slide-active');
    }
    // make sure no other transition is running
    activateDot(id);
    images[id].addEventListener('transitionend', (_) => {
        // prepare images to slide in from right or left
        _prepareNextImage(id);
        _prepareLastImage(id);
        slideTransitionRunning = false;
    }, {once: true});
    slideTransitionRunning = true;
}

function _prepareNextImage(newActiveID) {
    let nextImage = images[(newActiveID + 1) % imgCount];
    if (nextImage.classList.contains('slide-out')) {
        nextImage.style.transition = 'none';
        nextImage.classList.remove('slide-out');

        void nextImage.offsetHeight;
        nextImage.style.transition = null;
    }
}

function _prepareLastImage(newActiveID) {
    let lastImage = images[(newActiveID - 1 + imgCount) % imgCount];
    if (!lastImage.classList.contains('slide-out')) {
        lastImage.style.transition = 'none';
        lastImage.classList.add('slide-out');

        void lastImage.offsetHeight;
        lastImage.style.transition = null;
    }
}


function activateDot(id) {
    let dots = document.getElementsByClassName('slide-dot');
    for (let i = 0; i < dots.length; i++) {
        if (i === id) {
            dots[i].classList.add('slide-dot-active');
        } else {
            dots[i].classList.remove('slide-dot-active');
        }
    }
}