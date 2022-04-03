const dateFormat = (newDate) => {
    const month = newDate.getMonth() + 1;
    const actualMonth = month / 10 < 1 ? `0${month}` : month;
    const day = newDate.getDate();
    const actualDay = day / 10 < 1 ? `0${day}` : day;
    const year = newDate.getFullYear();
    const hour = newDate.getHours();
    const actualHour = hour / 10 < 1 ? `0${hour}` : hour;
    const minute = newDate.getMinutes();
    const actualMinute = minute / 10 < 1 ? `0${minute}` : minute;
    return `${year}-${actualMonth}-${actualDay}T${actualHour}:${actualMinute}`;
};

export { dateFormat }