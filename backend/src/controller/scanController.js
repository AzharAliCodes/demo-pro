const {entry,logScan, exitScan} = require('../model/scanModel')

const scanEntery = async(req, res) =>{
  try{
    const {ticket_id, user_id, scan_type} = req.body
    const check =await entry(ticket_id)
        if (!check || check.error) {
      return res.status(400).json({ error: check?.error || "Invalid ticket" });
    }
    await logScan(ticket_id, user_id, scan_type);

    res.status(200).json({ message: "Scan successful", ticket: check });
  }  catch (err){
    console.error(err)
    res.status(500).json({error : "Internal server error"})
  }
} 

const scanExit = async(req, res) =>{
  try{    
    const {ticket_id, scan_type} = req.body
    console.log(ticket_id, scan_type)
    await exitScan(ticket_id, scan_type)
    res.status(200).json({ message: "exit successful"});
  }  catch (err){
    console.error(err)
    res.status(500).json({error : "Internal server error"})
  }
} 


module.exports = {
    scanEntery,
    scanExit
}