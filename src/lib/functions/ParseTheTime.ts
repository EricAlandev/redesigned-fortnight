export const ParseTheTime = (data: string | Date) => {
    if (!data) return "";
    
    let date: Date | string = data
    if(!(data instanceof Date)){
        date = new Date(data);

        if(isNaN(date.getTime())){

            return "Invalid date";
        }
    }

    //native from javascript , bassicaly pick the database of the google. And with this, he convert instantly
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date)
}