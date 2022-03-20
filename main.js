let tries = document.querySelector(".scroll span"),
  min = document.querySelector(".min"),
  sec = document.querySelector(".sec"),
  counter,
  but = document.createElement("button"),
  Name = prompt("What's Your Name");
but.innerHTML = "Play Again";

document.querySelector(".control-button").appendChild(but);
but.addEventListener("click", Reload);

document.querySelector(".control-button span").addEventListener("click", () => {
  Timmer();
  let UserName = document.querySelector(".name");

  if (window.sessionStorage.getItem(Name)) {
    if (
      window.sessionStorage.getItem(Name) != null ||
      window.sessionStorage.getItem(Name) != undefined
    ) {
      UserName.innerHTML = `Hello :${window.sessionStorage.getItem(Name)}`;
    } else {
      UserName.innerHTML = `Hello :Unknown`;
    }

    document.querySelector(".control-button").style.display = "none";
  } else {
    if (Name === null || Name === "") {
      UserName.innerHTML = `Hello :Unknown`;
    } else {
      UserName.innerHTML = `Hello :${Name}`;
    }
    document.querySelector(".control-button").style.display = "none";
    document.querySelectorAll(".game-block").forEach((block) => {
      block.classList.add("is-flipped");
    });
    setTimeout(() => {
      document.querySelectorAll(".game-block").forEach((block) => {
        block.classList.remove("is-flipped");
      });
    }, duration);
    window.sessionStorage.setItem("Name", Name);
  }
});

let mainContainer = document.querySelector(".container"),
  ContainerBlocks = Array.from(mainContainer.children),
  RandomNumber = Array.from(Array(ContainerBlocks.length).keys()),
  duration = 3000;
GetRandomNum(RandomNumber);

ContainerBlocks.forEach((Block, Index) => {
  Block.style.order = RandomNumber[Index];
  Block.addEventListener("click", () => {
    flipped(Block);
  });
});

// Function TO get RandomNumber

function GetRandomNum(selected) {
  let current = selected.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    // sort random in temp

    temp = selected[random];

    // replace num random within current

    selected[random] = selected[current];

    // replace num current within temp

    selected[current] = temp;
  }
  return selected;
}

function flipped(block) {
  block.classList.add("is-flipped");
  let ALLFlipped = ContainerBlocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (ALLFlipped.length === 2) {
    //   stop clicking on main Element
    NoClick();
    // check if ALLFlipped are similar

    CheckMatchedBlocks(ALLFlipped[0], ALLFlipped[1]);
  }
}
function NoClick() {
  mainContainer.classList.add("no-clicking");
  setTimeout(() => {
    mainContainer.classList.remove("no-clicking");
  }, duration);
}
function CheckMatchedBlocks(FirstBlock, SecondBlock) {
  if (FirstBlock.dataset.animal === SecondBlock.dataset.animal) {
    FirstBlock.classList.remove("is-flipped");

    FirstBlock.classList.add("has-matched");

    SecondBlock.classList.remove("is-flipped");

    SecondBlock.classList.add("has-matched");

    document.querySelector("#success").play();
    document.querySelector(".container").classList.add("no-clicking");
    setTimeout(() => {
      document.querySelector(".container").classList.remove("no-clicking");
    }, 3500);
    let ALLMatched = ContainerBlocks.filter((flippedMatched) =>
      flippedMatched.classList.contains("has-matched")
    );
    if (ALLMatched.length === ContainerBlocks.length) {
      document.querySelector(".control-button").style.display = "block";
      document.querySelector(".control-button span").innerHTML = `${
        Name != null || "" ? Name : ""
      } you are winner `;
      clearInterval(counter);

      document.getElementById("winner").play();
      but.style.cssText = `display: block;`;
    }
  } else {
    tries.innerHTML++;
    document.querySelector("#fail").play();
    setTimeout(() => {
      FirstBlock.classList.remove("is-flipped");
      SecondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

// Reload Items

function Reload() {
  document.querySelector(".control-button").style.display = "none";

  ContainerBlocks.forEach((block) => {
    block.classList.remove("has-matched");
    block.classList.add("is-flipped");
    setTimeout(() => {
      block.classList.remove("is-flipped");
    }, duration);
  });
  GetRandomNum(RandomNumber);
  ContainerBlocks.forEach((Block, Index) => {
    Block.style.order = RandomNumber[Index];
  });
  tries.innerHTML = 0;
  min.innerHTML = "00";
  sec.innerHTML = "00";
  Timmer();
}
function Timmer() {
  counter = setInterval(() => {
    sec.innerHTML++;
    if (sec.innerHTML < 10 && sec.innerHTML != 60) {
      sec.innerHTML = `0${sec.innerHTML}`;
    }
    if (sec.innerHTML === "60") {
      min.innerHTML++;
      sec.innerHTML = 0;
      if (min.innerHTML < 10) {
        min.innerHTML = `0${min.innerHTML}`;
        if (min.innerHTML === "04") {
          clearInterval(counter);
          Looser();
        }
      } else {
        min.innerHTML = `${min.innerHTML}`;
      }
    } else {
      sec.innerHTML = `${sec.innerHTML}`;
    }
  }, 1000);
}

function Looser() {
  document.querySelector(".control-button").style.display = "block";
  document.querySelector(".control-button span").innerHTML = `${
    Name != null || "" ? Name : ""
  } you loose `;
  but.style.cssText = `display:block`;
  document.getElementById("loser").play();
}
