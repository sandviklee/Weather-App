const TodaysDate = () => {
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

    return (
        <p>
            {curDayOfWeek} {date.getDate().toString()}. {curMonth}
        </p>
    );
};

export default TodaysDate;
