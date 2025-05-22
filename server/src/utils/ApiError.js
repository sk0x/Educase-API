export default class ApiError extends Error{
    constructor(message, errors){
        super()
        this.success = false
        this.message = message
        this.errors = errors
    }
}
