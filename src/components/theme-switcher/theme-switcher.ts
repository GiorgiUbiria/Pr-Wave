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
			:host {
				display: block;
			}
			.switch {
				position: relative;
				display: inline-block;
				width: 60px;
				height: 34px;
                margin-top: 15px;
			}
			.switch input {
				opacity: 0;
				width: 0;
				height: 0;
			}
			.slider {
				position: absolute;
				cursor: pointer;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: #ccc;
				-webkit-transition: .4s;
				transition: .4s;
			}
			.slider:before {
				position: absolute;
				content: "";
				height: 26px;
				width: 26px;
				left: 4px;
				bottom: 4px;
				background-color: white;
				-webkit-transition: .4s;
				transition: .4s;
			}
			input:checked + .slider {
				background-color: #2196F3;
			}
			input:focus + .slider {
				box-shadow: 0 0 1px #2196F3;
			}
			input:checked + .slider:before {
				-webkit-transform: translateX(26px);
				-ms-transform: translateX(26px);
				transform: translateX(26px);
			}
			.slider.round {
				border-radius: 34px;
			}
			.slider.round:before {
				border-radius: 50%;
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
			<label class="switch">
				<input type="checkbox" ?checked=${this.theme === 'ocean'} @change=${this._toggleTheme}>
				<span class="slider round"></span>
			</label>
		`;
	}
}
