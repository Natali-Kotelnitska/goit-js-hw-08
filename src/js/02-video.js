import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onTimeUpdate, 1000));
setCurrentTime();

function onTimeUpdate(data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}

function setCurrentTime() {
  const currentTime = localStorage.getItem('videoplayer-current-time');

  player
    .setCurrentTime(currentTime)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
