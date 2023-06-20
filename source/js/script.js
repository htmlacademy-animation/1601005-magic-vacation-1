// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import {slider} from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import loadPage from './modules/load-page.js';
import initScreenAnimation from './modules/screen-animation.js';
import {bodyColorClass} from './modules/body-color-class.js';
import { screenBottom } from './modules/screen-bottom.js';
import { screenPrizes } from './modules/screen-prizes.js';
import game from './modules/game.js';

// init modules
loadPage();
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
initScreenAnimation();
bodyColorClass();
screenBottom();
screenPrizes();
game();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

