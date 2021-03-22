const KEY_COLLECTION = document.querySelectorAll('.piano-key');

document.addEventListener('keydown', (event) => {
  const key = document.querySelector(`.piano-key[data-key="${event.which}"]`);
  if (!key) return;
  const noteAudio = document.querySelector(`.audio-note[data-key="${event.which}"]`);
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add('piano-key-active');
  setTimeout(function () {
    key.classList.remove('piano-key-active');
  }, 100);
})

const mouseNotePlay = (event) => {
  const noteAudio = document.querySelector(`.audio-note[data-note="${event.target.dataset.note}"]`);
  noteAudio.currentTime = 0;
  noteAudio.play();
}
const startSound = (event) => {
  event.target.classList.add('piano-key-active');
  mouseNotePlay(event);
}
const stopSound = (event) => {
  event.target.classList.remove('piano-key-active');
}
const startReactToMouse = (event) => {
  event.target.classList.add('piano-key-active');
  mouseNotePlay(event);
  KEY_COLLECTION.forEach((elem) => {
    elem.addEventListener('mouseover', startSound);
    elem.addEventListener('mouseout', stopSound);
  });
}
const endReactToMouse = (event) => {
  event.target.classList.remove('piano-key-active');
  KEY_COLLECTION.forEach((elem) => {
    elem.removeEventListener('mouseover', startSound);
    elem.removeEventListener('mouseout', stopSound);
  });
}
document.querySelector('.piano').addEventListener('mousedown', startReactToMouse);
document.querySelector('.piano').addEventListener('mouseup', endReactToMouse);

const LETTERS = document.querySelector('.btn-letters');
const NOTES = document.querySelector('.btn-notes');

NOTES.addEventListener('click', () => {
  NOTES.classList.add('btn-active');
  LETTERS.classList.remove('btn-active');
  KEY_COLLECTION.forEach((btn) => {
    btn.classList.remove('letter');
  });
})
LETTERS.addEventListener('click', () => {
  LETTERS.classList.add('btn-active');
  NOTES.classList.remove('btn-active');
  KEY_COLLECTION.forEach((btn) => {
    btn.classList.add('letter');
  });
})

let fullscreen;
document.querySelector('.fullscreen').addEventListener('click', function (event) {
  event.preventDefault();
  if (!fullscreen) {
    fullscreen = true;
    document.documentElement.requestFullscreen();
  } else {
    fullscreen = false;
    document.exitFullscreen();
  }
})