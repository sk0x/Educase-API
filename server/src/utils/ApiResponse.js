export default class ApiRespone {
    constructor(statusCode, message="Success", data){
        this.success = statusCode < 400
        this.message = message
        this.data = data
    }
}
