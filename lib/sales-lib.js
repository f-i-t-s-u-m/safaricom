export function calculateTotals(data) {
  const totals = {};

  data?.forEach(item => {
    for (let key in item) {
      if (key !== 'date') {
        if (!totals[key]) {
          totals[key] = 0;
        }
        totals[key] += item[key];
      }
    }
  });

  return totals;
}

export function thisMonthSales(data) {
  // Assuming the page context is stored in a variable called data
// and it is an array of objects with the following properties:
// id, quantity, shop_id, user_id, product_type, revenue, user


// Create an empty object to store the results
const results = {};

// Loop through each item in the data array
for (let item of data) {
  // Get the date of the current item
  // console.log(data);
  let date = item.date;


    // Get the category of the current item
    let category = item.product_type;

  
    // Check if the category already exists in the results object
    if (!results[date]) {
      results[date] = {};
      // results.push(date = {})
    }
    if (!results[date][`${category}`]) {
      results[date][`${category}`] = 0;
    }

    if (!results[date]['total']) {
      results[date]['total'] = 0
      results[date]['date'] = date

    }
    
    // Add the revenue of the current item to the total revenue for the category
    results[date][`${category}`] += item.revenue;
    results[date]['total'] +=  item.revenue;

    
  }
  
  // Return the results object

  
 
  return Object.values(results)

}