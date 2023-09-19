const TodaysDateComponent = () => {
    const date: Date = new Date();
    const days: Array<string> = new Array(
        "Søndag",
        "Mandag",
        "Tirsdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lørdag"
    );
    const months: Array<string> = new Array(
        "Jan",
        "Feb",
        "Mars",
        "Apr",
        "Mai",
        "Juni",
        "Juli",
        "Aug",
        "Sept",
        "Okt",
        "Nov",
        "Des"
    );

    const curDayOfWeek: string = days[date.getDay()];
    const curMonth: string = months[date.getMonth()];
    const curDayDate: string = date.getDate().toString();

    return (
        <p>
            {curDayOfWeek} {curDayDate}. {curMonth}
        </p>
    );
};

export default TodaysDateComponent;
