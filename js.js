//TEXT ANIMATION VARIABLES
let allTextElements = document.querySelectorAll(".text");
let animationDelay = 60;
// SCROLL PARALLAX OF IMAGES

let scrollElement = document.querySelector(".wrapper");
let contentElements = document.querySelectorAll(".content");
let windowHeight = window.innerHeight;

// VARIABLES FOR SIDE SMOOTH SCROLLING OF IMAGES

let section3 = document.querySelector(".section3");

let track = document.getElementById("image-track");

//   VARIABLES FOR IMAGE CHANGING

let spanElOfImg = document.querySelectorAll(".fullImgCont span");

//FOREACH FUNCTION FOR PARALAX IN IMAGES

// Function to calculate distance percentage and animate images
function calculateDistancePercentage() {
  contentElements.forEach((content) => {
    const divElement = content;
    const divPosition = divElement.getBoundingClientRect();
    const distanceFromWindowTop = divPosition.top;
    const percentage = (distanceFromWindowTop / (windowHeight + 100)) * 100;

    // Select images within the content element
    const imagesWhosePositionHasToBeChanged =
      divElement.querySelectorAll(".descImg");

    // Check if the distance percentage is within a desired range (0 to 100)
    if (percentage > 0 && percentage < 101) {
      // Animate each image
      imagesWhosePositionHasToBeChanged.forEach((img) => {
        // Log the image for debugging (optional)

        // Animate the background position of the image
        img.animate(
          {
            backgroundPosition: `center ${percentage}%`,
          },
          {
            duration: 500,
            fill: "forwards",
            easing: "ease-out",
          }
        );
      });
    }
  });
}

// FUNCTION FOR IMAGE CHANGING

spanElOfImg.forEach(function (span) {
  span.addEventListener("click", function () {
    let dataValue = this.getAttribute("data-div");
    let linkedImgParentDiv = this.parentElement.previousElementSibling;
    let linkedImg = linkedImgParentDiv.querySelector(`.${dataValue}`);
    let allSpanElementsOfParent = this.parentElement.querySelectorAll("span");

    removeClass(linkedImgParentDiv, "clipAll");
    removeActiveClassFromDivs(linkedImgParentDiv.querySelectorAll("div"));

    linkedImgParentDiv.classList.add("clipAll");
    linkedImg.classList.add("active");

    // this will remove the active class from all span
    allSpanElementsOfParent.forEach((span) => {
      removeActiveClassFromSpans(span);
    });
    this.classList.add("active");
  });
});

function removeClass(el, classOfEl) {
  if (el.classList.contains(classOfEl)) {
    el.classList.remove(classOfEl);
  }
}

function removeActiveClassFromDivs(divs) {
  divs.forEach((el) => {
    el.classList.remove("active");
  });
}

function removeActiveClassFromSpans(spans) {
  spans.classList.remove("active");
}

// FUNCTIONS FOR SIDE SMOOTH SCROLLING OF IMAGES

let handleOnDown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
  console.log(e.clientX);
};

let handleOnUp = () => {
  track.dataset.mouseDownAt = "0";

  track.dataset.prevPercentage = track.dataset.percentage;
};

let handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  let mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  console.log(e.clientX);

  let percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnletrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnletrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -35%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (let image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

// TEXT ANIMATION FUNCTIONS

function startAnimation() {
  let headingDiv = document.querySelectorAll(".heading");
  let contentDiv = document.querySelectorAll(".content");

  headingDiv.forEach((el) => {
    let parentDivDistance = el.parentElement.getBoundingClientRect().top;
    let headingDistanceFromTop = el.getBoundingClientRect().top;
    // console.log(el.parentElement.className);
    if (el.parentElement.className != `section1 section`) {
      if (parentDivDistance > 0 && parentDivDistance < 100) {
        el.querySelector("h2.text").style.opacity = 1;
        el.classList.add("startAnimation");
        // console.log(el);
      }
    }
  });

  contentDiv.forEach((el) => {
    let contentDistanceFromTop = el.getBoundingClientRect().top;
    if (el.parentElement.className != `section1 section`) {
      if (
        contentDistanceFromTop > 0 &&
        contentDistanceFromTop < window.innerHeight / 2
      ) {
        setTimeout(() => {
          el.querySelector("p.text").style.opacity = 1;
          el.classList.add("startAnimation");
        }, 1200);
      }
    }
  });
}

function generateNewDom(text) {
  let newDom = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] == `br`) {
      newDom += `<br>`;
    } else {
      newDom += `<span class="char">${text[i]}&nbsp;</span>`;
    }
  }
  return newDom;
}

function setAnimationDelay(elements, delay) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style["animation-delay"] = delay * i + "ms";
  }
}

// Function to remove <br> tags
function removeBrTags(container) {
  const brTags = container.querySelectorAll("br");
  brTags.forEach((br) => {
    br.remove();
  });
}

// Check window size and remove <br> tags initially
function checkWindowSize() {
  const windowWidth = window.innerWidth;
  const headingContainer = document.querySelectorAll("h2.text");
  const paraContainer = document.querySelectorAll("p.text");

  if (windowWidth < 1200) {
    headingContainer.forEach((container) => {
      removeBrTags(container);
    });

    paraContainer.forEach((container) => {
      removeBrTags(container);
    });
  }
}

//EVENTS FOR SIDE and SMOOTH SCROLLING OF IMAGES

/* -- Had to add extra lines for touch events -- */

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

// Attach scroll event listener to trigger the calculation
scrollElement.addEventListener("scroll", calculateDistancePercentage);
scrollElement.addEventListener("scroll", startAnimation);

window.addEventListener("DOMContentLoaded", () => {
  //convert all words into html elements
  allTextElements.forEach((el) => {
    let words = el.innerText.split(" ");
    let newDom = generateNewDom(words);
    el.innerHTML = newDom;
    setAnimationDelay(el.children, animationDelay);
  });

  let section1Heading = document.querySelector(".section1 .heading");
  let section1Content = document.querySelector(".section1 .content");

  section1Heading.querySelector("h2.text").style.opacity = 1;
  section1Heading.classList.add("startAnimation");
  setTimeout(() => {
    section1Content.querySelector("p.text").style.opacity = 1;
    section1Content.classList.add("startAnimation");
  }, 1000);

  //remove br tag on loading
  checkWindowSize();
});
