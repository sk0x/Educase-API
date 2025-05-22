import connectDatabase from "../db/index.js";
import ApiError from "../utils/ApiError.js";
import ApiRespone from "../utils/ApiResponse.js";
import asyncHandler from "../utils/async_handler.js";

// @desc add new school to database
// @POST /addSchool
// @access public
const addNewSchool = asyncHandler(async( req, res ) => {
    const { name, address, longitude, latitude } = req.body;
    const pool = await connectDatabase();
    const [result] = await pool.query(`INSERT INTO schools (name, address, longitude, latitude) VALUES (?, ?, ?, ?)`,
        [name, address, longitude, latitude])
    if(!result) return res.status(500).json(new  ApiError("Something went wrong"));
    const [rows]= await pool.query(`SELECT id, name, address, longitude, latitude FROM schools WHERE id = ?`, [result.insertId])
    return res.status(201).json(
        new ApiRespone(201, "School added successfully", rows)
    );

})


// @desc list schools sorted by proximity
// @POST /listSchools
// @access public
const listSchools = asyncHandler(async(req, res) => {
    const { longitude, latitude } = req.query;
    const pool = await connectDatabase();
    // x , y  = latitude, longitude
    // longitude, latitude = schools latitude and longitude
    // calculating square root of (longitude - x power 2 + longitude - y power 2)
    const [rows]= await pool.query(`SELECT id, name, address, longitude, latitude FROM schools
                                    ORDER BY SQRT(POW(longitude - ?, 2) + POW(latitude - ?, 2)) ASC`,
                                    [longitude,latitude])
    if(rows.length <= 0 ) return res.status(404).json(new  ApiError("Not Found"));
    return res.status(200).json(
        new ApiRespone(200, "Schools fetched successfully", rows)
    );
})

export {
    addNewSchool,
    listSchools
}
