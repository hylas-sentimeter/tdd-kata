export function greeting(): string {
    const time = new Date().getHours();
    if (time >= 6 && time < 12) return 'Good morning!';
    if (time >= 12 && time < 18) return 'Good afternoon!';
    if (time >= 18 && time < 22) return 'Good evening!';
    if (time < 6 || time >= 22) return 'Good night!';
}