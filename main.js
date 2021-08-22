var vol = 1;
var interval = 100; //ms
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

musicPath = '';
var music = new Audio(musicPath);

function parseHour(_hour) {
  if (_hour>12) {
    _hour-=12
    return String(_hour)+"pm";
  } else {
    return String(_hour)+"am";
  }
}
async function start() {
  hour = new Date().getHours();
  _hour = hour
  musicPath = 'resources/music/nl/'+parseHour(hour)+'.mp3';
  music = new Audio(musicPath);
  music.loop = true;
  music.play();
  
  for(;;) {
    phour = hour; // Previous hour
    hour = new Date().getHours();
    console.log("h:"+hour+" | ph:"+phour);
    if (hour!=phour) {
      while (vol>=0) { // Fadeout (vol must be a multiple of 0.05)
        vol -= 0.01
        music.volume = Math.max(vol,0);
        await sleep(interval);
      }
      await sleep(3000);
      music.pause();
      vol = 1;
      musicPath = 'resources/music/nl/'+parseHour(hour)+'.mp3';
      music = new Audio(musicPath);
      music.loop = true;
      music.play();
      
    }
    await sleep(1000);
  }
}