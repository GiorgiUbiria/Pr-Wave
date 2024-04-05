import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
	darkThemeIcon,
	blueThemeIcon,
} from './icons.js';

const themes = [
 {
    name: 'dark',
    icon: darkThemeIcon,
    label: 'Dark',
 },
 {
    name: 'ocean',
    icon: blueThemeIcon,
    label: 'Ocean',
 },
]

@customElement('theme-switcher')
export class ThemeSwitcher extends LitElement {
	static styles = [
		css`
@import url('https://fonts.googleapis.com/css?family=Nunito:800i&display=swap');

#hide-checkbox {
  opacity: 0;
  height: 0;
  width: 0;
}

#hide-checkbox {
 opacity: 0;
 height: 0;
 width: 0;
}

.toggle {
 margin-top: 17.5px;
right: 19.5px;
 position: relative;
 cursor: pointer;
 display: inline-block;
 width: 100px; /* Reduced from 200px */
 height: 50px; /* Reduced from 100px */
 background: #211042;
 border-radius: 25px; /* Reduced from 50px */
 transition: 500ms;
 overflow: hidden;
}

.toggle-button {
 position: absolute;
 display: inline-block;
 top: 3.5px; /* Reduced from 7px */
 left: 3px; /* Reduced from 6px */
 width: 43px; /* Reduced from 86px */
 height: 43px; /* Reduced from 86px */
 border-radius: 50%;
 background: #FAEAF1;
 overflow: hidden;
 box-shadow: 0 0 17.5px 2px rgba(255, 255, 255); /* Reduced from 35px 4px */
 transition: all 500ms ease-out;
}

.crater {
 position: absolute;
 display: inline-block;
 background: #FAEAF1;
 border-radius: 50%;
 transition: 500ms;
}

.crater-1 {
 background: #FFFFF9;
 width: 43px; /* Reduced from 86px */
 height: 43px; /* Reduced from 86px */
 left: 5px; /* Reduced from 10px */
 bottom: 5px; /* Reduced from 10px */
}

.crater-2 {
 width: 10px; /* Reduced from 20px */
 height: 10px; /* Reduced from 20px */
 top: -3.5px; /* Reduced from -7px */
 left: 22px; /* Reduced from 44px */
}

.crater-3 {
 width: 8px; /* Reduced from 16px */
 height: 8px; /* Reduced from 16px */
 top: 10px; /* Reduced from 20px */
 right: -2px; /* Reduced from -4px */
}

.crater-4 {
 width: 5px; /* Reduced from 10px */
 height: 5px; /* Reduced from 10px */
 top: 12px; /* Reduced from 24px */
 left: 15px; /* Reduced from 30px */
}

.crater-5 {
 width: 7.5px; /* Reduced from 15px */
 height: 7.5px; /* Reduced from 15px */
 top: 20px; /* Reduced from 40px */
 left: 24px; /* Reduced from 48px */
}

.crater-6 {
 width: 5px; /* Reduced from 10px */
 height: 5px; /* Reduced from 10px */
 top: 20px; /* Reduced from 48px */
 left: 10px; /* Reduced from 20px */
}

.crater-7 {
 width: 6px; /* Reduced from 12px */
 height: 6px; /* Reduced from 12px */
 bottom: 2.5px; /* Reduced from 5px */
 left: 17.5px; /* Reduced from 35px */
}

.star {
 position: absolute;
 display: inline-block;
 border-radius: 50%;
 background: #FFF;
 box-shadow: 0.5px 0 1px 1px rgba(255, 255, 255); /* Reduced from 1px 0 2px 2px */
}

.star-1 {
 width: 3px; /* Reduced from 6px */
 height: 3px; /* Reduced from 6px */
 right: 45px; /* Reduced from 90px */
 bottom: 20px; /* Reduced from 40px */
}

.star-2 {
 width: 4px; /* Reduced from 8px */
 height: 4px; /* Reduced from 8px */
 right: 35px; /* Reduced from 70px */
 top: 5px; /* Reduced from 10px */
}

.star-3 {
 width: 2.5px; /* Reduced from 5px */
 height: 2.5px; /* Reduced from 5px */
 right: 30px; /* Reduced from 60px */
 bottom: 7.5px; /* Reduced from 15px */
}

.star-4 {
 width: 1.5px; /* Reduced from 3px */
 height: 1.5px; /* Reduced from 3px */
 right: 20px; /* Reduced from 40px */
 bottom: 10px; /* Reduced from 50px */
}

.star-5 {
 width: 2px; /* Reduced from 4px */
 height: 2px; /* Reduced from 4px */
 right: 5px; /* Reduced from 10px */
 bottom: 17.5px; /* Reduced from 35px */
}

.star-6, .star-7, .star-8 {
 width: 5px; /* Reduced from 10px */
 height: 1px; /* Reduced from 2px */
 border-radius: 0.5px; /* Reduced from 2px */
 transform: rotate(-45deg);
 box-shadow: 2.5px 0px 2px 0.5px #FFF; /* Reduced from 5px 0px 4px 1px */
 animation-name: travel;
 animation-duration: 1.5s;
 animation-timing-function: ease-out;
 animation-iteration-count: infinite;
}

.star-6 {
 right: 15px; /* Reduced from 30px */
 bottom: 15px; /* Reduced from 30px */
 animation-delay: -1s; /* Reduced from -2s */
}

.star-7 {
 right: 25px; /* Reduced from 50px */
 bottom: 30px; /* Reduced from 60px */
}

.star-8 {
 right: 45px; /* Reduced from 90px */
 top: 5px; /* Reduced from 10px */
 animation-delay: -2s; /* Reduced from -4s */
}

@keyframes travel {
  0% {
    transform: rotate(-45deg) translateX(35px); /* Reduced from 70px */
 }

  50% {
    transform: rotate(-45deg) translateX(-10px); /* Reduced from -20px */
    box-shadow: 2.5px 0px 3px 0.5px #FFF; /* Reduced from 5px 0px 6px 1px */
 }

  100% {
    transform: rotate(-45deg) translateX(-15px); /* Reduced from -30px */
    width: 1px; /* Reduced from 2px */
    height: 1px; /* Reduced from 2px */
    opacity: 0;
    box-shadow: none;
 }
}

#hide-checkbox:checked + .toggle {
 background: #24D7F7;
}

#hide-checkbox:checked + .toggle .toggle-button {
 background: #F7FFFF;
 transform: translateX(51px); /* Reduced from 102px */
 box-shadow: 0 0 17.5px 2.5px rgba(255, 255, 255); /* Reduced from 35px 5px */
}

#hide-checkbox:checked + .toggle .toggle-button .crater {
 transform: rotate(-45deg) translateX(35px); /* Reduced from 70px */
}

#hide-checkbox:checked + .toggle .star {
 animation: move 2s infinite;
 transform: none;
 box-shadow: none;
}

#hide-checkbox:checked + .toggle .star-1 {
 width: 20px; /* Reduced from 40px */
 height: 5px; /* Reduced from 10px */
border-radius: 5px; /* Reduced from 10px */
background: #FFF;
left: 10px; /* Reduced from 20px */
top: 12.5px; /* Reduced from 25px */
box-shadow: none;
}

#hide-checkbox:checked + .toggle .star-2 {
 width: 6px; /* Reduced from 12px */
 height: 6px; /* Reduced from 12px */
 background: #FFF;
 left: 13px; /* Reduced from 26px */
 top: 11.5px; /* Reduced from 23px */
 box-shadow: -0.5px 0 1px 0 rgba(0, 0 , 0, 0.1); /* Reduced from -1px 0 2px 0 rgba(0, 0 , 0, 0.1) */
}

#hide-checkbox:checked + .toggle .star-3 {
 width: 8px; /* Reduced from 16px */
 height: 8px; /* Reduced from 16px */
 background: #FFF;
 left: 17.5px; /* Reduced from 35px */
 top: 14.5px; /* Reduced from 19px */
 box-shadow: -0.5px 0 1px 0 rgba(0, 0 , 0, 0.1); /* Reduced from -1px 0 2px 0 rgba(0, 0 , 0, 0.1) */
}

#hide-checkbox:checked + .toggle .star-4 {
 width: 7px; /* Reduced from 14px */
 height: 7px; /* Reduced from 14px */
 background: #FFF;
 left: 23px; /* Reduced from 46px */
 top: 10.5px; /* Reduced from 21px */
 box-shadow: -0.5px 0 1px 0 rgba(0, 0 , 0, 0.1); /* Reduced from -1px 0 2px 0 rgba(0, 0 , 0, 0.1) */
}

#hide-checkbox:checked + .toggle .star-5 {
 width: 30px; /* Reduced from 60px */
 height: 7.5px; /* Reduced from 15px */
 border-radius: 3.75px; /* Reduced from 15px */
 background: #FFF;
 left: 15px; /* Reduced from 30px */
 bottom: 10px; /* Reduced from 20px */
 box-shadow: none;
}

#hide-checkbox:checked + .toggle .star-6 {
 width: 9px; /* Reduced from 18px */
 height: 9px; /* Reduced from 18px */
 background: #FFF;
 border-radius: 50%;
 left: 19px; /* Reduced from 38px */
 bottom: 10px; /* Reduced from 20px */
 box-shadow: -0.5px 0 1px 0 rgba(0, 0 , 0, 0.1);
}

#hide-checkbox:checked + .toggle .star-7 {
 width: 12px; /* Reduced from 24px */
 height: 12px; /* Reduced from 24px */
 background: #FFF;
 border-radius: 50%;
 left: 26px; /* Reduced from 52px */
 bottom: 10px; /* Reduced from 20px */
 box-shadow: -0.5px 0 1px 0 rgba(0, 0 , 0, 0.1); /* Reduced from -1px 0 2px 0 rgba(0, 0 , 0, 0.1) */
}

#hide-checkbox:checked + .toggle .star-8 {
 width: 10.5px; /* Reduced from 21px */
 height: 10.5px; /* Reduced from 21px */
 background: #FFF;
 border-radius: 50%;
 left: 35px; /* Reduced from 70px */
 top: 5.9px; /* Reduced from 59px */
 box-shadow: -0.5px 0 1px 0 rgba(0, 0 , 0, 0.1); /* Reduced from -1px 0 2px 0 rgba(0, 0 , 0, 0.1) */
}

@keyframes move {
  0% {
    transform: none;
 }

  25% {
    transform: translateX(1px); /* Reduced from 2px */
 }

  100% {
    transform: translateX(-1px); /* Reduced from -2px */
 }
}

p {
 text-align: center;
 letter-spacing: 7.5px; /* Reduced from 15px */
 background: #34495e;
 color: #FFF;
}

p.morning {
 background: #e67e22;
}
		`,
	];

	private _doc = document.firstElementChild;

	@property({ type: String })
	theme: string | null = null;

	private _getCurrentTheme() {
		const localStorageTheme = localStorage.getItem('theme');
		if (localStorageTheme !== null) {
			this._setTheme(localStorageTheme);
		} else {
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				this._setTheme('dark');
			} else {
				this._setTheme('ocean');
			}
		}
	}

	firstUpdated() {
		this._getCurrentTheme();
	}

	private _setTheme(theme) {
		this._doc.setAttribute('data-theme', theme);
		const _heroImage = document.querySelector('#home-hero-image') as HTMLImageElement;
		if (theme === 'dark') {
			_heroImage.src = './src/images/dark-hero.jpg';
		}
		if (theme === 'ocean') {
			_heroImage.src = './src/images/ocean-hero.jpg';
		}
		localStorage.setItem('theme', theme);
		this.theme = theme;
	}

	private _toggleTheme() {
		this.theme = this.theme === 'dark' ? 'ocean' : 'dark';
		this._setTheme(this.theme);
	}

	render() {
		return html`
            <div class="wrapper">
              <input type="checkbox" id="hide-checkbox" ?checked=${this.theme === 'ocean'} @change=${this._toggleTheme}>
              <label for="hide-checkbox" class="toggle">
                <span class="toggle-button">
                  <span class="crater crater-1"></span>
                  <span class="crater crater-2"></span>
                  <span class="crater crater-3"></span>
                  <span class="crater crater-4"></span>
                  <span class="crater crater-5"></span>
                  <span class="crater crater-6"></span>
                  <span class="crater crater-7"></span>
                </span>
                <span class="star star-1"></span>
                <span class="star star-2"></span>
                <span class="star star-3"></span>
                <span class="star star-4"></span>
                <span class="star star-5"></span>
                <span class="star star-6"></span>
                <span class="star star-7"></span>
                <span class="star star-8"></span>
              </label>
            </div>
		`;
	}
}
