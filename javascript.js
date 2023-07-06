//

const spanElOfImg = document.querySelectorAll(".img span");
const textEl = document.querySelectorAll(".text")[0];
const text = textEl.innerText.split(" ");
const newDom = generateNewDom(text);
const animationDelay = 60;

textEl.innerHTML = newDom;

document.addEventListener("mousemove", parallax);

spanElOfImg.forEach(function (span) {
  span.addEventListener("click", function () {
    const dataValue = this.getAttribute("data-div");
    const linkedImgParentDiv = this.parentElement.previousElementSibling;
    const linkedImg = linkedImgParentDiv.querySelector(`.${dataValue}`);
    const allSpanElementsOfParent = this.parentElement.querySelectorAll("span");

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

window.addEventListener("scroll", function () {
  var div = document.querySelector(".flex"); // Replace 'your-div-id' with the actual ID of your div
  var rect = div.getBoundingClientRect();
  var distance = rect.top;
  // console.log(distance);
  if (distance < -300) {
    // Perform your action here
    // console.log("The gap is less than 200px!");
    setAnimationDelay(textEl.children, animationDelay);
  }
});

function parallax(e) {
  document.querySelectorAll(".mouseMoveObject").forEach(function (move) {
    var moving_value = move.getAttribute("data-value");
    var x = (e.clientX * moving_value) / 250;

    var y = (e.clientY * moving_value) / 250;

    move.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}

function generateNewDom(text) {
  let newDom = "";
  for (let i = 0; i < text.length; i++) {
    newDom += `<span class="char">${text[i]}&nbsp;</span>`;
  }
  return newDom;
}

function setAnimationDelay(elements, delay) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style["animation-delay"] = delay * i + "ms";
  }
}

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
  // console.log(spans);
  spans.forEach((span) => {
    span.classList.remove("active");
  });
}
