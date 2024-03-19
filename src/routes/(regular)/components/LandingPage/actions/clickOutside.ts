export function clickOutside(node: HTMLElement): { destroy: () => void } {
    const handleClick = (event: MouseEvent) => {
        if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
            const detail = { event };
            node.dispatchEvent(new CustomEvent('clickOutside', { detail }));
        }
    };
    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        },
    };
}
