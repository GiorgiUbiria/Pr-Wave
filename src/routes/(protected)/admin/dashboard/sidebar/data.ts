import HomeIcon from './icons/HomeIcon.svelte';
import StatusIcon from './icons/StatusIcon.svelte';
import CreditsIcon from './icons/CreditsIcon.svelte';
import ArchivesIcon from './icons/ArchivesIcon.svelte';
import SettingsIcon from './icons/SettingsIcon.svelte';
import DocumentationIcon from './icons/DocumentationIcon.svelte';

export const data = [
    {
        title: 'სახლი',
        icon: HomeIcon,
        link: '/admin/dashboard'
    },
    {
        title: 'სერვისები',
        icon: StatusIcon,
        link: '/admin/dashboard/services'
    },
    {
        title: 'კურსები',
        icon: ArchivesIcon,
        link: '/admin/dashboard/courses'
    },
    {
        title: 'მომხმარებლები',
        icon: CreditsIcon,
        link: '/admin/dashboard/users'
    },
    {
        title: 'პარამეტრები',
        icon: SettingsIcon,
        link: '/admin/dashboard/settings'
    },
    {
        title: 'სტატუსი',
        icon: StatusIcon,
        link: '/admin/dashboard/status'
    },
    {
        title: 'მთავარი',
        icon: DocumentationIcon,
        link: '/'
    },
];
