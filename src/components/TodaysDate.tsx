const TodaysDate = () => {
    const date: Date = new Date();
    const curDayOfWeek: string = date.getDate().toString();
    const curMonth: string =
        date.getMonth().toString().length == 2
            ? date.getMonth().toString()
            : "0" + (date.getMonth() + 1).toString();
    const curYear: string = date.getFullYear().toString();
    return `${curYear}-${curMonth}-${curDayOfWeek}`;
};

export default TodaysDate;
