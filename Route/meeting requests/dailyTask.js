const Express = require("express");
const MyRouter = Express.Router();

const appointment = require("../../Models/Appointment/Appointment");
const appointmentSchema = require("../../Schema/Appointment/Appointment");

const { sendSms2 } = require("./SMSto");

// dailyTask.js
const dailyTask = async () => {
    console.log("I am running the daily task");
    try {
        // Find all appointments with status "New"
        const newAppointments = await appointment.find({ status: "New" });

        // Update status to "Due"
        const updatePromises = newAppointments.map(appt => {
            appt.status = "";
            return appt.save();
        });

        // Wait for all updates to complete
        await Promise.all(updatePromises);



        try {
            const today = new Date();
            const formattedToday = today.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY

            // Find all appointments scheduled for today
            const todaysAppointments = await appointment.find({ sessionDate: formattedToday });

            if (todaysAppointments.length > 0) {
                // Send SMS to each appointment
                const smsPromises = todaysAppointments.map(appt => sendSms2(appt));

                // Wait for all SMS send operations to complete
                await Promise.all(smsPromises);

                console.log(`${todaysAppointments.length} SMS messages sent to today's appointments.`);
            } else {
                console.log("No appointments scheduled for today.");
            }

            // Calculate the date 30 days ago
            const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
            const formattedThirtyDaysAgo = thirtyDaysAgo.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY

            // Find all appointments older than 30 days
            const oldAppointments = await appointment.find({
                sessionDate: { $lte: formattedThirtyDaysAgo },
                tempdelete: false
            });

            if (oldAppointments.length > 0) {
                // Update tempdelete to true
                const updatePromises = oldAppointments.map(appt => {
                    appt.tempdelete = true;
                    return appt.save();
                });

                // Wait for all updates to complete
                await Promise.all(updatePromises);

                console.log(`${oldAppointments.length} appointments marked as tempdelete.`);
            } else {
                console.log("No old appointments to mark as tempdelete.");
            }
        } catch (error) {           
            console.error("Error processing appointments:", error);
        }

        console.log("All new appointments have been updated to due.");
    } catch (error) {
        console.error("Error updating appointments:", error);
    }
};

module.exports = dailyTask;
