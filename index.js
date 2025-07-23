// Access all buttons as a list using querySelectorAll
const buttons = document.querySelectorAll('.drum');

// Function to play sound according to the key/button pressed
function playSound(key) {
  let audio;
  switch (key) {
    case 'w':
      audio = new Audio('./sounds/crash.mp3');
      break;
    case 'a':
      audio = new Audio('./sounds/kick-bass.mp3');
      break;
    case 's':
      audio = new Audio('./sounds/snare.mp3');
      break;
    case 'd':
      audio = new Audio('./sounds/tom-1.mp3');
      break;
    case 'j':
      audio = new Audio('./sounds/tom-2.mp3');
      break;
    case 'k':
      audio = new Audio('./sounds/tom-3.mp3');
      break;
    case 'l':
      audio = new Audio('./sounds/tom-4.mp3');
      break;
    default:
      console.log('Invalid key:', key);
      return; // Exit if an invalid key is pressed
  }
  audio.play();
}

// Function to add animation to the button
function buttonAnimation(currentKey) {
  const activeButton = document.querySelector(`.${currentKey}`);
  if (activeButton) {
    activeButton.classList.add('pressed');
    // Create ripple effect
    createRipple(activeButton);
    // Remove the animation class after 300 milliseconds
    setTimeout(() => {
      activeButton.classList.remove('pressed');
    }, 300);
  }
}

// Function to create ripple effect
function createRipple(button, event) {
  const ripple = document.createElement('div');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(255, 255, 255, 0.6)';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'ripple-effect 0.6s linear';
  ripple.style.left = '50%';
  ripple.style.top = '50%';
  ripple.style.marginLeft = -size / 2 + 'px';
  ripple.style.marginTop = -size / 2 + 'px';
  ripple.style.width = size + 'px';
  ripple.style.height = size + 'px';
  ripple.style.pointerEvents = 'none';
  ripple.style.zIndex = '1000';

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add event listener to each button using a loop
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    const buttonKey = this.getAttribute('data-key').toLowerCase(); // Get the data-key attribute
    playSound(buttonKey); // Play sound according to the button
    buttonAnimation(buttonKey); // Add animation to the button
  });
});

// Add keydown event listener to the document for keyboard presses
document.addEventListener('keydown', (event) => {
  playSound(event.key); // Play sound based on the key pressed
  buttonAnimation(event.key); // Add animation to the key press
});
