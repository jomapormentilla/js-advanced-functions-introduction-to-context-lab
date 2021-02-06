// Your code here

function createEmployeeRecord( arr ) {
    const employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords( arr ) {
    let result = []
    arr.map((record) => {
        result.push(createEmployeeRecord( record ))
    })
    return result
}

function createTimeInEvent( obj, datestamp ) {
    let employee = obj
    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt(datestamp.split(" ")[1]),
        date: datestamp.split(" ")[0]
    }
    employee["timeInEvents"].push(timeInEvent)
    return employee
}

function createTimeOutEvent( obj, datestamp ) {
    let employee = obj
    let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(datestamp.split(" ")[1]),
        date: datestamp.split(" ")[0]
    }
    employee["timeOutEvents"].push(timeOutEvent)
    return employee
}

function hoursWorkedOnDate( obj, datestamp ) {
    let timeOut = obj["timeOutEvents"].find(el => el["date"] === datestamp)
    let timeIn = obj["timeInEvents"].find(el => el["date"] === datestamp)
    
    let hours = timeOut["hour"] - timeIn["hour"]
    return hours/100
}

function wagesEarnedOnDate( obj, datestamp ) {
    let hours = hoursWorkedOnDate( obj, datestamp )
    return hours * obj["payPerHour"]
}

function allWagesFor( obj ) {
    let total = 0
    obj["timeOutEvents"].forEach(record => {
        total += wagesEarnedOnDate( obj, record["date"] )
    })
    return total
}

function findEmployeeByFirstName( srcArray, firstName ) {
    return srcArray.find(record => record["firstName"] === firstName)
}

function calculatePayroll( arr ) {
    let totals = 0
    arr.map(record => {
        totals += allWagesFor(record)
    })
    return totals
}