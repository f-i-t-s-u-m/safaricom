export function TotalSales(data) {
    // Assuming the page context is stored in a variable called data
// and it is an array of objects with the following properties:
// id, quantity, shop_id, user_id, product_type, revenue, user

// Define the three categories to group the data by
const categories = ["air_time", "device", "sim_card"];

// Create an empty array to store the results
const results = {};

// Loop through each category
for (let category of categories) {
    // Filter the data by the current category
    let filteredData = data.filter(item => item.product_type === category);

  
    // Calculate the total revenue for the current category
    let totalRevenue = filteredData?.length && filteredData?.reduce((sum, item) => sum + item.revenue, 0);
  
    // Add the category and the total revenue to the results object
    results[category] = totalRevenue;
  }

  results['total'] = results.sim_card + results.air_time + results.device

// results.push(total)
// Return the results array
return results;

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