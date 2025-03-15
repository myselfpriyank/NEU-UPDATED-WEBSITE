function sendMail() {
    // Get the form element
    const form = document.getElementById('appointmentForm');
    if (!form) {
        alert('Form not found!');
        return;
    }

    // Collect form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'date', 'time'];
    for (const field of requiredFields) {
        if (!data[field]) {
            alert(`Please fill in the required field: ${field}`);
            return;
        }
    }

    // Construct the email body
    const emailBody = `
        Appointment Booking Details:

        Full Name: ${data.fullName}
        Email: ${data.email}
        Phone Number: ${data.phone}
        Preferred Date: ${data.date}
        Preferred Time: ${data.time}
        Reason for Visit: ${data.reason || 'N/A'}
        Additional Information: ${data.notes || 'N/A'}
    `;

    // Initialize EmailJS (make sure EmailJS is correctly integrated)
    emailjs.init('v9RcZpEIgg2g0ac0n'); // Replace 'YOUR_USER_ID' with your EmailJS user ID

    // Send email via EmailJS
    emailjs.send('service_1aric3n', 'template_0vdf7ft', {
        to_email: 'myselfpriyankv@gmail.com', // Replace with your email address
        reply_to: data.email,
        subject: 'New Appointment Booking Request',
        message: emailBody
    })
        .then(response => {
            console.log('Email sent successfully:', response);
            alert('Your appointment request has been sent successfully.');
            form.reset(); // Reset the form on success
        })
        .catch(error => {
            console.error('Error sending email:', error);
            alert('There was an error sending your request. Please try again.');
        });

/*Validate date and time*/
document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    const phoneInput = document.getElementById("phone");

    // Disable all dates before the next day
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];
    dateInput.setAttribute("min", minDate);

    // Enable only times at least 2 hours from now if today's date is selected
    dateInput.addEventListener("change", () => {
        const selectedDate = new Date(dateInput.value);
        const currentDate = new Date();

        if (selectedDate.toDateString() === currentDate.toDateString()) {
            // If the selected date is today, restrict time to 2 hours later
            const minTime = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);
            const hours = String(minTime.getHours()).padStart(2, "0");
            const minutes = String(minTime.getMinutes()).padStart(2, "0");
            timeInput.setAttribute("min", `${hours}:${minutes}`);
        } else {
            // If the selected date is not today, allow all times
            timeInput.removeAttribute("min");
        }
    });

    // Allow only numeric values in the phone field
    phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/[^0-9]/g, "");
    });
});

}
