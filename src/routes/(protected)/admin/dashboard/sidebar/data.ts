import HomeIcon from './icons/HomeIcon.svelte';
import StatusIcon from './icons/StatusIcon.svelte';
import CreditsIcon from './icons/CreditsIcon.svelte';
import ArchivesIcon from './icons/ArchivesIcon.svelte';
import SettingsIcon from './icons/SettingsIcon.svelte';
import DocumentationIcon from './icons/DocumentationIcon.svelte';

export const data = [
    {
        title: 'Home',
        icon: HomeIcon,
        link: '/admin/dashboard'
    },
    {
        title: 'Services',
        icon: StatusIcon,
        link: '/admin/dashboard/status'
    },
    {
        title: 'Courses',
        icon: ArchivesIcon,
        link: '/admin/dashboard/archives'
    },
    {
        title: 'Users',
        icon: CreditsIcon,
        link: '/admin/dashboard/credits'
    },
    {
        title: 'Settings',
        icon: SettingsIcon,
        link: '/admin/dashboard/settings'
    },
    {
        title: 'Documentation',
        icon: DocumentationIcon,
        link: '/admin/dashboard/documentation'
    },
    {
        title: 'Site',
        icon: DocumentationIcon,
        link: '/'
    },
];
