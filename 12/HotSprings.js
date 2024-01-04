function getData(path) {
    const fs = require("fs")
    const text = fs.readFileSync(path).toString("utf-8")
    return text.split("\r\n")
};


function parseRow(row) {
    const [spring, groupString] = row.split(" ")
    // const group = groupString.split(",").map(string => parseInt(string))

    return [spring, groupString]
}


function groupSpring(spring) {
    const matches = spring.match(/(#+)/g)
    if (matches === null) {
        return ""
    }
    const groups = matches.map(string => string.length)
    return groups.join(",")
}


function getPossibleConfigurations(spring) {
    let combinations = []
    if (spring.includes("?")) {
        springOperational = spring.replace("?", ".")
        combinations = combinations.concat(getPossibleConfigurations(springOperational))
        
        springBroken = spring.replace("?", "#")
        combinations = combinations.concat(getPossibleConfigurations(springBroken))
    } else {
        combinations.push(spring)
    }

    return combinations
}


function partOne() {
    const rows = getData("./12/input.txt").map(parseRow)
    // const springs = rows.map(row => row[0])
    // const groups = rows.map(row => row[1])

    const springConfigurations = rows.map(([spring, groups]) => getPossibleConfigurations(spring, groups))
    const validSpringConfigurations = springConfigurations.map((configuration, i) => {
        return configuration.filter(spring => groupSpring(spring) === groups[i])
    })

    console.log(validSpringConfigurations.map(config => config.length).reduce((partialSum, a) => partialSum + a, 0))
}


function partTwo() {
    for (let len=3; len < 10; len++) {
        const spring = new Array(len + 1).join( "?" );
        const combinations = getPossibleConfigurations(spring)
        console.log(len, combinations.length)
    }
}


partOne()
// partTwo()
