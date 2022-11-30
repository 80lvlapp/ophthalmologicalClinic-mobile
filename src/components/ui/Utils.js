


//stringToDate("17/9/2014","dd/MM/yyyy","/");


export const stringToDate = (_date,_format,_delimiter) =>
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
}


export const dateToString = (_date) =>
{
    let yyyy = _date.getFullYear().toString();
    let mm = (_date.getMonth() + 101).toString().slice(-2);
    let dd = (_date.getDate() + 100).toString().slice(-2);
    return dd + "."  +  mm + "." + yyyy;
}