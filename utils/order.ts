export function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

export function getStatusColor(status: string){
    switch (status.toLowerCase()) {
        case 'pendiente':
            return 'bg-yellow-200 text-yellow-800';
        case 'pagado':
            return 'bg-blue-200 text-blue-800';
        case 'enviado':
            return 'bg-indigo-200 text-indigo-800';
        case 'cancelado':
            return 'bg-red-200 text-red-800';
        default:
            return 'bg-gray-200 text-gray-800';
    }
};