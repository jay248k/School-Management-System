import pool from "../utils/db.js";

/* ================= Fee Structure ================= */
const FeesStructure = async (req, res) => {
  const { class_id, fee_type, amount } = req.body;

  if (!class_id || !fee_type || !amount) {
    return res.status(400).json({
      success: false,
      message: "Required data is missing",
    });
  }

  try {
    const structure = await pool.query(
      `INSERT INTO fees (class_id, fee_type, amount)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [class_id, fee_type, amount]
    );

    if (structure.rows.length === 0) {
      return res.status(500).json("Failed to create fee structure");
    }

    res.status(201).json({
      success: true,
      data: structure.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

/* ================= Fee Payment ================= */
const FeesApplication = async (req, res) => {
  const { class_id,amount_paid, sid,fee_id, mode } = req.body;

  if (!class_id || !sid||!amount_paid || !mode||!fee_id) {
    return res.status(400).json({
      success: false,
      message: "Required data is missing",
    });
  }

  try {
    // 1️⃣ Check fee structure
    const classDetails = await pool.query(
      "SELECT amount FROM fees WHERE class_id = $1",
      [class_id]
    );

    if (classDetails.rows.length === 0) {
      return res.status(404).json({
        message: "Fee structure not found for this class",
      });
    }

    const totalAmount = classDetails.rows[0].amount;
    if(totalAmount===amount_paid){
        return res.json({success:false,message:`Please enter valid amount ${totalAmount}`});
    }
    // 2️⃣ Insert payment
    const payment = await pool.query(
      `INSERT INTO fee_payments (student_id,fee_id, amount_paid, mode)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [ sid,fee_id, amount_paid, mode]
    );

    res.status(201).json({
      success: true,
      total_fee: totalAmount,
      payment: payment.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

export { FeesApplication, FeesStructure };
