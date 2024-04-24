export default function calculateDaysUntilBirthday(birthday: string) {
    const today = new Date();
    const [day, month] = birthday.split('/').map(Number);
    console.log(day, month)
    const nextBirthday = new Date(today.getFullYear(), month - 1, day);
    const diff = nextBirthday.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};