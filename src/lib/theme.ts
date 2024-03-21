import { writable } from 'svelte/store'
import { browser } from '$app/environment'

type Theme = 'light' | 'dark'

const userTheme = (browser && localStorage.getItem('color-scheme')) || 'dark'

export const theme = writable(userTheme ?? 'dark')

if (browser) {
    document.documentElement.setAttribute('color-scheme', userTheme ?? 'dark')
}

export function toggleTheme() {
    theme.update((currentTheme) => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

        document.documentElement.setAttribute('color-scheme', newTheme)
        localStorage.setItem('color-scheme', newTheme)
        document.body.className = newTheme

        return newTheme
    })
}

export function setTheme(newTheme: Theme) {
    theme.set(newTheme)
    document.documentElement.setAttribute('color-scheme', newTheme)
    localStorage.setItem('color-scheme', newTheme)
    document.body.className = newTheme
}
