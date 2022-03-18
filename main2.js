document.querySelector(".control-button span").addEventListener("click", () => {
  let Name = document.querySelector(".name"),
    inputName = prompt("Write ur name");
  if (inputName === null || inputName === "") {
    Name.innerHTML = `Hello:UKnown`;
  } else {
    Name.innerHTML = `Hello:${inputName}`;
  }
  document.querySelector(".control-button ").remove();
});
let duration = 1000,
  mainContainer = document.querySelector(".container"),
  blocks = Array.from(mainContainer.children),
  orderRange = [...Array(blocks.length).keys()];

Shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", () => {
    flipped(block);
  });
});

function CheckMatchedBlocks(FirstBlock, SecondBlock) {
  let tries = document.querySelector(".scroll span");

  if (FirstBlock.dataset.animal === SecondBlock.dataset.animal) {
    FirstBlock.classList.remove("is-flipped");
    SecondBlock.classList.remove("is-flipped");
    FirstBlock.classList.add("has-matched");
    SecondBlock.classList.add("has-matched");
    document.getElementById("succses").play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      FirstBlock.classList.remove("is-flipped");
      SecondBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}

function StopClicking() {
  mainContainer.classList.add("no-clicking");
  setTimeout(() => {
    mainContainer.classList.remove("no-clicking");
  }, duration);
}

function flipped(selectedBlocks) {
  selectedBlocks.classList.add("is-flipped");

  let allSelectedBlocks = blocks.filter((flippedBlocks) =>
    flippedBlocks.classList.contains("is-flipped")
  );

  if (allSelectedBlocks.length === 2) {
    StopClicking();
    CheckMatchedBlocks(allSelectedBlocks[0], allSelectedBlocks[1]);
  }
}

function Shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);

    current--;

    temp = array[random];

    array[random] = array[current];

    array[current] = temp;
  }
  return array;
}
