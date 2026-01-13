import pool from "../utils/db.js";


const fetchclass = async (req, res) => {
    const { class_name, section } = req.body;
    if (!class_name || !section) {
        return res.json({ success: false, message: "Somthing is missing" })
    }
    try {
        const class_id = await pool.query("SELECT * FROM classes WHERE class_name=$1 AND section=$2", [class_name, section])

        const Students = await pool.query("SELECT * FROM students WHERE class_id=$1 ORDER BY rollno", [class_id.rows[0].class_id])

        if (Students.rowCount === 0) {
            return res.json({ success: false, message: "Students not awailable in this class" })
        }

        res.status(200).json({ success: true, data: Students.rows })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export { fetchclass }
