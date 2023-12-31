 function calculatePercentage(part = 0, whole = 0) {
    return (part / whole) * 100;
}


function refactorTarget(data) {
    let result = {
        airtime:0,
        sim_card:0,
        device:0
    }
    data.forEach(item => {
        result.airtime += item.airtime ?? 0 
        result.sim_card += item.sim_card ?? 0 
        result.device += item.device ?? 0 
    })

    return result
}


function roundToPercentage(percentage) {
    return percentage > 100 ? 100 : percentage
}


export function generateAchievement(target, achievement) {


  const newTarget = refactorTarget(target)
  console.log(newTarget);


    const airtime = calculatePercentage(achievement.airtime, newTarget.airtime)
    const sim_card = calculatePercentage(achievement.sim_card, newTarget.sim_card)
    const device = calculatePercentage(achievement.device, newTarget.device)

    const total =( roundToPercentage(airtime)  + roundToPercentage(sim_card) + roundToPercentage(device) ) /3

    return {airtime, sim_card, device, total:total.toFixed()}
}

