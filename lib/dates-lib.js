import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addWeeks, format, addDays } from 'date-fns';
// Function to get days of the week


export function getFirstLastDaysOfMon() {
  
// Get the current date
const currentDate = new Date();

// Get the first date of the current month
const firstDateOfMonth = startOfMonth(currentDate);

// Get the last date of the current month
const lastDateOfMonth = endOfMonth(currentDate);

// Format the dates if needed (optional)
const firstDate = format(firstDateOfMonth, 'yyyy-MM-dd');
const lastDate = format(lastDateOfMonth, 'yyyy-MM-dd');

return [firstDate, lastDate]
}



 