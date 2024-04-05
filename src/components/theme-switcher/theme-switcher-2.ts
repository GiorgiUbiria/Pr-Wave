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
.toggle {
  margin-top: 13.125px; /* 17.5px reduced by 25% */
  right: 14.625px; /* 19.5px reduced by 25% */
  position: relative;
  cursor: pointer;
  display: inline-block;
  width: 75px; /* 100px reduced by 25% */
  height: 37.5px; /* 50px reduced by 25% */
  background: #211042;
  border-radius: 18.75px; /* 25px reduced by 25% */
  transition: 375ms; /* 500ms reduced by 25% */
  overflow: hidden;
}

.toggle-button {
  position: absolute;
  display: inline-block;
  top: 2.625px; /* 3.5px reduced by 25% */
  left: 2.25px; /* 3px reduced by 25% */
  width: 32.25px; /* 43px reduced by 25% */
  height: 32.25px; /* 43px reduced by 25% */
  border-radius: 50%;
  background: #FAEAF1;
  overflow: hidden;
  box-shadow: 0 0 13.125px 1.5px rgba(255, 255, 255); /* 17.5px 2px reduced by 25% */
  transition: all 375ms ease-out; /* 500ms reduced by 25% */
}

.crater {
  position: absolute;
  display: inline-block;
  background: #FAEAF1;
  border-radius: 50%;
  transition: 375ms; /* 500ms reduced by 25% */
}

.crater-1 {
  background: #FFFFF9;
  width: 32.25px; /* 43px reduced by 25% */
  height: 32.25px; /* 43px reduced by 25% */
  left: 3.75px; /* 5px reduced by 25% */
  bottom: 3.75px; /* 5px reduced by 25% */
}

.crater-2 {
  width: 7.5px; /* 10px reduced by 25% */
  height: 7.5px; /* 10px reduced by 25% */
  top: -2.625px; /* -3.5px reduced by 25% */
  left: 16.5px; /* 22px reduced by 25% */
}

.crater-3 {
  width: 6px; /* 8px reduced by 25% */
  height: 6px; /* 8px reduced by 25% */
  top: 7.5px; /* 10px reduced by 25% */
  right: -1.5px; /* -2px reduced by 25% */
}

/* Remaining styles omitted for brevity */
.crater-4 {
  width: 3.75px; /* 5px reduced by 25% */
  height: 3.75px; /* 5px reduced by 25% */
  top: 9px; /* 12px reduced by 25% */
  left: 11.25px; /* 15px reduced by 25% */
}

.crater-5 {
  width: 5.625px; /* 7.5px reduced by 25% */
  height: 5.625px; /* 7.5px reduced by 25% */
  top: 15px; /* 20px reduced by 25% */
  left: 18px; /* 24px reduced by 25% */
}

.crater-6 {
  width: 3.75px; /* 5px reduced by 25% */
  height: 3.75px; /* 5px reduced by 25% */
  top: 15px; /* 20px reduced by 25% */
  left: 7.5px; /* 10px reduced by 25% */
}

.crater-7 {
  width: 4.5px; /* 6px reduced by 25% */
  height: 4.5px; /* 6px reduced by 25% */
  bottom: 1.875px; /* 2.5px reduced by 25% */
  left: 13.125px; /* 17.5px reduced by 25% */
}

.star {
  position: absolute;
  display: inline-block;
  border-radius: 50%;
  background: #FFF;
  box-shadow: 0.375px 0 0.75px 0.75px rgba(255, 255, 255); /* 0.5px 0 1px 1px reduced by 25% */
}

.star-1 {
  width: 2.25px; /* 3px reduced by 25% */
  height: 2.25px; /* 3px reduced by 25% */
  right: 33.75px; /* 45px reduced by 25% */
  bottom: 15px; /* 20px reduced by 25% */
}

/* Remaining star styles omitted for brevity */
.star-2 {
  width: 3px; /* 4px reduced by 25% */
  height: 3px; /* 4px reduced by 25% */
  right: 26.25px; /* 35px reduced by 25% */
  top: 3.75px; /* 5px reduced by 25% */
}

.star-3 {
  width: 1.875px; /* 2.5px reduced by 25% */
  height: 1.875px; /* 2.5px reduced by 25% */
  right: 22.5px; /* 30px reduced by 25% */
  bottom: 5.625px; /* 7.5px reduced by 25% */
}

.star-4 {
  width: 1.125px; /* 1.5px reduced by 25% */
  height: 1.125px; /* 1.5px reduced by 25% */
  right: 15px; /* 20px reduced by 25% */
  bottom: 7.5px; /* 10px reduced by 25% */
}

.star-5 {
  width: 1.5px; /* 2px reduced by 25% */
  height: 1.5px; /* 2px reduced by 25% */
  right: 3.75px; /* 5px reduced by 25% */
  bottom: 13.125px; /* 17.5px reduced by 25% */
}

.star-6,
.star-7,
.star-8 {
  width: 3.75px; /* 5px reduced by 25% */
  height: 0.75px; /* 1px reduced by 25% */
  border-radius: 0.375px; /* 0.5px reduced by 25% */
  transform: rotate(-45deg);
  box-shadow: 1.875px 0px 1.5px 0.375px #FFF; /* 2.5px 0 2px 0.5px reduced by 25% */
}

.star-6 {
  right: 11.25px; /* 15px reduced by 25% */
  bottom: 7.5px; /* 10px reduced by 25% */
}

/* Remaining star styles omitted for brevity */
.star-7 {
  right: 18.75px; /* 25px reduced by 25% */
  bottom: 22.5px; /* 30px reduced by 25% */
}

.star-8 {
  right: 33.75px; /* 45px reduced by 25% */
  top: 3.75px; /* 5px reduced by 25% */
}

@keyframes travel {
  0% {
    transform: rotate(-45deg) translateX(26.25px); /* 35px reduced by 25% */
 }

  50% {
    transform: rotate(-45deg) translateX(-7.5px); /* -10px reduced by 25% */
    box-shadow: 1.875px 0px 2.25px 0.375px #FFF; /* 2.5px 0px 3px 0.5px reduced by 25% */
 }

  100% {
    transform: rotate(-45deg) translateX(-11.25px); /* -15px reduced by 25% */
    width: 0.75px; /* 1px reduced by 25% */
    height: 0.75px; /* 1px reduced by 25% */
    opacity: 0;
    box-shadow: none;
 }
}

/* Remaining styles omitted for brevity */
#hide-checkbox:checked + .toggle {
  background: #24D7F7;
}

#hide-checkbox:checked + .toggle .toggle-button {
  background: #F7FFFF;
  transform: translateX(38.25px); /* 51px reduced by 25% */
  box-shadow: 0 0 13.125px 1.875px rgba(255, 255, 255); /* 17.5px 2.5px reduced by 25% */
}

#hide-checkbox:checked + .toggle .toggle-button .crater {
  transform: rotate(-45deg) translateX(26.25px); /* 35px reduced by 25% */
}

#hide-checkbox:checked + .toggle .star {
  animation: move 1.5s infinite; /* 2s reduced by 25% */
  transform: none;
  box-shadow: none;
}

#hide-checkbox:checked + .toggle .star-1 {
  width: 15px; /* 20px reduced by 25% */
  height: 3.75px; /* 5px reduced by 25% */
  border-radius: 3.75px; /* 5px reduced by 25% */
  background: #FFF;
  left: 7.5px; /* 10px reduced by 25% */
  top: 9.375px; /* 12.5px reduced by 25% */
  box-shadow: none;
}

/* Remaining styles omitted for brevity */
#hide-checkbox:checked + .toggle .star-2 {
  width: 4.5px; /* 6px reduced by 25% */
  height: 4.5px; /* 6px reduced by 25% */
  background: #FFF;
  left: 9.75px; /* 13px reduced by 25% */
  top: 8.625px; /* 11.5px reduced by 25% */
  box-shadow: -0.375px 0 0.75px 0 rgba(0, 0 , 0, 0.1); /* -0.5px 0 1px 0 rgba(0, 0 , 0, 0.1) reduced by 25% */
}

#hide-checkbox:checked + .toggle .star-3 {
  width: 3.375px; /* 4.5px reduced by 25% */
  height: 3.375px; /* 4.5px reduced by 25% */
  background: #FFF;
  left: 13.125px; /* 17.5px reduced by 25% */
  top: 11.625px; /* 15.5px reduced by 25% */
  box-shadow: -0.375px 0 0.75px 0 rgba(0, 0 , 0, 0.1); /* -0.5px 0 1px 0 rgba(0, 0 , 0, 0.1) reduced by 25% */
}

#hide-checkbox:checked + .toggle .star-4 {
  width: 2.625px; /* 3.5px reduced by 25% */
  height: 2.625px; /* 3.5px reduced by 25% */
  background: #FFF;
  left: 17.25px; /* 23px reduced by 25% */
  top: 10.125px; /* 13.5px reduced by 25% */
  box-shadow: -0.375px 0 0.75px 0 rgba(0, 0 , 0, 0.1); /* -0.5px 0 1px 0 rgba(0, 0 , 0, 0.1) reduced by 25% */
}

#hide-checkbox:checked + .toggle .star-5 {
  width: 22.5px; /* 30px reduced by 25% */
  height: 5.625px; /* 7.5px reduced by 25% */
  border-radius: 2.8125px; /* 3.75px reduced by 25% */
  background: #FFF;
  left: 11.25px; /* 15px reduced by 25% */
  bottom: 7.5px; /* 10px reduced by 25% */
  box-shadow: none;
}

#hide-checkbox:checked + .toggle .star-6 {
  width: 6.75px; /* 9px reduced by 25% */
  height: 6.75px; /* 9px reduced by 25% */
  background: #FFF;
  border-radius: 37.5%; /* 50% reduced by 25% */
  left: 14.25px; /* 19px reduced by 25% */
  bottom: 7.5px; /* 10px reduced by 25% */
  box-shadow: -0.375px 0 0.75px 0 rgba(0, 0 , 0, 0.1);
}

/* Remaining styles omitted for brevity */
#hide-checkbox:checked + .toggle .star-7 {
  width: 9px; /* 12px reduced by 25% */
  height: 9px; /* 12px reduced by 25% */
  background: #FFF;
  border-radius: 50%;
  left: 13.125px; /* 17.5px reduced by 25% */
  bottom: 7.5px; /* 10px reduced by 25% */
  box-shadow: -0.375px 0 0.75px 0 rgba(0, 0 , 0, 0.1);
}

#hide-checkbox:checked + .toggle .star-8 {
  width: 7.875px; /* 10.5px reduced by 25% */
  height: 7.875px; /* 10.5px reduced by 25% */
  background: #FFF;
  border-radius: 50%;
  left: 17.625px; /* 23.5px reduced by 25% */
  top: 4.6875px; /* 6.25px reduced by 25% */
  box-shadow: -0.375px 0 0.75px 0 rgba(0, 0 , 0, 0.1);
}

@keyframes move {
  0% {
    transform: none;
  }

  25% {
    transform: translateX(0.75px); /* 1px reduced by 25% */
  }

  100% {
    transform: translateX(-0.75px); /* -1px reduced by 25% */
  }
}

p {
  text-align: center;
  letter-spacing: 5.625px; /* 7.5px reduced by 25% */
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
			_heroImage.src = '/src/images/ocean-hero.jpg';
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
