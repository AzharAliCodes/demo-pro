 const {createTicket, AddUrl,viewTicket, viewAllTicket,viewTicketUrl} = require('../model/ticketModel')

 const addTicket = async (req, res) => {
   try{
  req.body.members.map(member => {
  const { name, number, id } = member;
  
  console.log(name, number, id);
  
   if (!name , !number){
    return res.status(400).json({error:"ALL Fileds are required"})
   }

   const phoneRegex = /^[0-9]{10,15}$/;
   if(!phoneRegex.test(number)){
      return res.status(400).json({error:"phone number must be  10-15 digits"})
   }
  
   const user = await createTicket(name, number, id)  
   res.status(200).json({
    message:"Ticket created successfully",
    user,
   })
  })
  } catch (err){
    console.error(err)
    res.status(500).json({error : "Internal server error"})
  }
 }
 

 const updateUrl = async (req, res) => {
   try{
   const {ticket_url, id} = req.body
   const user = await AddUrl(ticket_url, id)
   res.status(200).json({
    message:"Ticket url added successfully",
    user
   })
  } catch (err){
    console.error(err)
    res.status(500).json({error : "Internal server error"})
  }
 }
 

 const viewTickets = async (req, res) => {
  try{
   const {user_id} = req.body  
   const user = await viewTicket(user_id)
   const totalCost = user.length * 20
   if (!user || user.length === 0 ){
    return res.status(404).json({message:"No tickets for this user"})
   }
   res.status(200).json({user,totalCost})
  } catch (err){
    console.error(err)
    res.status(500).json({error : "Internal server error"})
  }
 }

 const viewAllTickets = async (req, res) => {
  try{
   const user = await viewAllTicket()
   const totalCost = user.length * 20
   if (!user || user.length === 0 ){
    return res.status(404).json({message:"No tickets Created"})
   }
   res.status(200).json({user,totalCost})
  } catch (err){
    console.error(err)
    res.status(500).json({error : "Internal server error"})
  }
 }

  const viewTicketsUrl = async (req, res) => {
  try{
   const { id } = req.body
   const user = await viewTicketUrl(id)
   res.status(200).json({user})
  } catch (err){
    console.error(err)
    res.status(500).json({error : "Internal server error"})
  }
 }

 module.exports = {
  addTicket,
  updateUrl,
  viewTickets,
  viewAllTickets,
  viewTicketsUrl
 }