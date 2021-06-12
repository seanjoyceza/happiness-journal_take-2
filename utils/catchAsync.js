module.exports = func => { //function passed in
    return (req, res, next) => { //which returns another function
        func(req, res, next).catch(next) //the new function passes the initial function to next if there is an error 
    }
}