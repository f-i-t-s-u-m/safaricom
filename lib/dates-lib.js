import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addWeeks, format, addDays } from 'date-fns';
// Function to get days of the week
export function getDaysOfWeek2(weeks) {
   
         // Get the current date
         const currentDate = new Date();

         // Calculate the start of the week (Monday)
         const startOfWeek = new Date(currentDate);
         const dayOfWeek = startOfWeek.getDay();
         const diff = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Adjust for Sunday start
         startOfWeek.setDate(currentDate.getDate() - diff);
       
         // Array to store the days of the week
         const daysOfWeek = [];
       
         // Loop to get days based on the number of weeks
         for (let week = 0; week < weeks; week++) {
           if (week === weeks - 1) {
             // For the last week, add all days
             for (let i = 0; i < 7; i++) {
               const day = new Date(startOfWeek);
               day.setDate(startOfWeek.getDate() + i + week * 7);
               daysOfWeek.push(day.toISOString().slice(0, 10)); // Format as YYYY-MM-DD
             }
           } else {
             // For previous weeks, add only the first day
             const day = new Date(startOfWeek);
             day.setDate(startOfWeek.getDate() - week * 7);
             daysOfWeek.push(day.toISOString().slice(0, 10)); // Format as YYYY-MM-DD
           }
         }
       
         return daysOfWeek;
      
  }


function getWeeksInMonth2(year, month) {
  const firstDayOfMonth = startOfMonth(new Date(year, month - 1));
  const lastDayOfMonth = endOfMonth(new Date(year, month - 1));

  let currentWeekStart = startOfWeek(firstDayOfMonth);
  let currentWeekEnd = endOfWeek(currentWeekStart);

  const weeks = [];

  while (currentWeekStart <= lastDayOfMonth) {
    weeks.push({
      start: format(currentWeekStart, 'yyyy-MM-dd'),
      end: format(currentWeekEnd, 'yyyy-MM-dd'),
    });

    currentWeekStart = addWeeks(currentWeekStart, 1);
    currentWeekEnd = endOfWeek(currentWeekStart);
  }

  return weeks;
}



export function getWeeksInMonth(year, month) {
  const weeks = [];

  // Find the first and last day of the month
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  // Start from the first day of the week of the first day of the month
  let currentDay = startOfWeek(firstDayOfMonth);

  // Iterate through each week until the last day of the month
  while (currentDay <= lastDayOfMonth) {
    const weekStartDate = currentDay;
    const weekEndDate = endOfWeek(currentDay);

    // Ensure the week end date does not go beyond the last day of the month
    if (weekEndDate > lastDayOfMonth) {
      weekEndDate.setDate(lastDayOfMonth.getDate());
    }

    weeks.push({
      start: format(weekStartDate, 'yyyy-MM-dd'),
      end: format(weekEndDate, 'yyyy-MM-dd'),
    });

    // Move to the next week
    currentDay = addDays(weekEndDate, 1);
  }

  return weeks;
}

export function getWeeksListWithFormat(year, month) {
  const weeksInMonth = getWeeksInMonth(year, month);

  const result = weeksInMonth.map((week, index) => ({
    [`week ${index + 1} of the month`]: week,
  }));

  return result;
}
  
  // Accept the number of weeks as a command line argument
//   const weeks = process.argv[2] || 1;
  
//   // Validate if the argument is a positive integer
//   if (!(/^\d+$/.test(weeks)) || weeks < 1) {
//     console.error("Please provide a valid positive integer for the number of weeks.");
//     process.exit(1);
//   }
  
//   // Get the days of the week based on the input
//   const daysOfWeek = getDaysOfWeek(parseInt(weeks, 10));
  
//   // Print the days of the week
//   console.log(`Days of the week for the next ${weeks} week(s):`);
//   daysOfWeek.forEach(day => {
//     console.log(day);
//   });
  