export const formattedNumber = (value: number) =>
    new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

export const formattedCurrency = (value: number) =>
    new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

export const formattedDateFromSeconds = (seconds: number) =>
    seconds <= 0 ? 'N/A' : formattedDate(new Date(seconds * 1000));

export const formattedDate = (date?: Date) =>
    date?.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) ??
    'N/A';

export const withLeadingZeros = (value: number, targetLength: number) =>
    value.toString().padStart(targetLength, '0');
