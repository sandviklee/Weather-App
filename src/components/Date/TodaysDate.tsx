/**
 * Date component used by the MET API.
 * @returns date in a specific format
 *
 * "curDayOfWeek" CHANGED AFTER DELIVERY DATE BECAUSE OF BUG. APPROVAL FROM COURSE INSTRUCTOR.
 */
const TodaysDate = () => {
    const date: Date = new Date();
    const curDayOfWeek: string =
        date.getDate().toString().length == 2
            ? date.getDate().toString()
            : "0" + date.getDate().toString();
    const curMonth: string =
        (date.getMonth() + 1).toString().length == 2
            ? (date.getMonth() + 1).toString()
            : "0" + (date.getMonth() + 1).toString();
    const curYear: string = date.getFullYear().toString();
    console.log(curDayOfWeek);
    return `${curYear}-${curMonth}-${curDayOfWeek}`;
};

export default TodaysDate;
