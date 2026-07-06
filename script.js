

const SUPABASE_URL = "https://heyizeitobzwkdkbzjjz.supabase.co";

const SUPABASE_KEY = "sb_publishable_pRp6Ux55HQoLko_EizrIhA_wwgaVmDo";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
/*=====================================================
    SOPHIA'S CLINIC
    BOOKING SYSTEM
    PART 1
======================================================*/

/* ===========
   MODALS
=========== */

const bookingModal = document.getElementById("bookingModal");
const receiptModal = document.getElementById("receiptModal");

/* ===========
   BUTTONS
=========== */

const serviceButtons = document.querySelectorAll(".book-service");

const closeModal = document.querySelector(".close-modal");

const closeBooking = document.getElementById("closeBooking");

/* ===========
   FORM
=========== */

const bookingForm = document.getElementById("bookingForm");

const serviceName = document.getElementById("serviceName");
const serviceDuration = document.getElementById("serviceDuration");
const servicePrice = document.getElementById("servicePrice");

const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");
const customerEmail = document.getElementById("customerEmail");

const bookingDate = document.getElementById("bookingDate");
const bookingTime = document.getElementById("bookingTime");

const sessions = document.getElementById("sessions");

const medicalNotes = document.getElementById("medicalNotes");
const pressure = document.getElementById("pressure");

/* ===========
   SUMMARY
=========== */

const summaryService = document.getElementById("summaryService");
const summaryDuration = document.getElementById("summaryDuration");
const summaryPrice = document.getElementById("summaryPrice");
const summarySessions = document.getElementById("summarySessions");
const summaryDate = document.getElementById("summaryDate");
const summaryTime = document.getElementById("summaryTime");
const summaryTotal = document.getElementById("summaryTotal");
const summaryDeposit = document.getElementById("summaryDeposit");
const summaryBalance = document.getElementById("summaryBalance");

/* ===========
   PRICE
=========== */

let currentPrice = 0;

/*=====================================================
    OPEN BOOKING WINDOW
======================================================*/

serviceButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".service-card");

        const service = card.dataset.service;
        const duration = card.dataset.duration;
        const price = Number(card.dataset.price);

        currentPrice = price;

        serviceName.value = service;
        serviceDuration.value = duration;
        servicePrice.value = "$" + price;

        summaryService.textContent = service;
        summaryDuration.textContent = duration;
        summaryPrice.textContent = "$" + price;

        updateSummary();

        bookingModal.style.display = "block";

    });

});

/*=====================================================
    CLOSE BOOKING WINDOW
======================================================*/

closeModal.onclick = () => {

    bookingModal.style.display = "none";

};

closeBooking.onclick = () => {

    bookingModal.style.display = "none";

};

window.onclick = function(event){

    if(event.target === bookingModal){

        bookingModal.style.display = "none";

    }

};

/*=====================================================
    UPDATE SUMMARY
======================================================*/

function updateSummary(){

    const qty = Number(sessions.value) || 1;

    let price = currentPrice;

    // Mobile Massage adds 20%
    if (appointmentType && appointmentType.value === "mobile"){

        price = currentPrice * 1.20;

    }

    const total = price * qty;

    const deposit = total * 0.80;

    const balance = total - deposit;

    summarySessions.textContent = qty;

    summaryDate.textContent = bookingDate.value || "--";

    summaryTime.textContent = bookingTime.value || "--";

    summaryPrice.textContent = "$" + price.toFixed(2);

    summaryTotal.textContent = "$" + total.toFixed(2);
    summaryDeposit.textContent = "$" + deposit.toFixed(2);

    summaryBalance.textContent = "$" + balance.toFixed(2);

    console.log("Total:", total);

    console.log("Deposit:", deposit);

    console.log("Balance:", balance);

}

/*=====================================================
    LIVE UPDATES
======================================================*/

sessions.addEventListener("input", updateSummary);

bookingDate.addEventListener("change", updateSummary);

bookingTime.addEventListener("change", updateSummary);

appointmentType.addEventListener("change", updateSummary);
/*=====================================================
    PART 2
    BOOKING REFERENCE & RECEIPT
======================================================*/

/* ===========
   RECEIPT FIELDS
=========== */

const receiptReference = document.getElementById("receiptReference");
const receiptNumber = document.getElementById("receiptNumber");
const receiptCustomer = document.getElementById("receiptCustomer");
const receiptPhone = document.getElementById("receiptPhone");
const receiptEmail = document.getElementById("receiptEmail");

const receiptService = document.getElementById("receiptService");
const receiptDuration = document.getElementById("receiptDuration");
const receiptPrice = document.getElementById("receiptPrice");
const receiptSessions = document.getElementById("receiptSessions");
const receiptTotal = document.getElementById("receiptTotal");
const receiptDeposit = document.getElementById("receiptDeposit");
const receiptBalance = document.getElementById("receiptBalance");

const receiptDate = document.getElementById("receiptDate");
const receiptTime = document.getElementById("receiptTime");
const receiptBookingDate = document.getElementById("receiptBookingDate");

/* ===========
   BOOKING NUMBERS
=========== */

let bookingReference = "";
let bookingNumber = "";

/*=====================================================
    GENERATE BOOKING REFERENCE
======================================================*/

function generateBookingReference() {

    const now = new Date();

    const year = now.getFullYear();

    const month = String(now.getMonth() + 1).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");

    const random = Math.floor(Math.random() * 999999)
        .toString()
        .padStart(6, "0");

    return `SCM-${year}${month}${day}-${random}`;

}

/*=====================================================
    GENERATE BOOKING NUMBER
======================================================*/

function generateBookingNumber() {

    const random = Math.floor(Math.random() * 900000) + 100000;

    return `BK-${random}`;

}

/*=====================================================
    BUILD RECEIPT
======================================================*/

function buildReceipt() {

    bookingReference = generateBookingReference();
    bookingNumber = generateBookingNumber();

    let price = currentPrice;

    // Add 20% for Mobile Massage
    if (appointmentType.value === "mobile") {
        price = currentPrice * 1.20;
    }

    const qty = Number(sessions.value) || 1;

    const total = price * qty;

    const deposit = total * 0.80;

    const balance = total - deposit;

    receiptReference.textContent = bookingReference;
    receiptNumber.textContent = bookingNumber;

    receiptCustomer.textContent = customerName.value;
    receiptPhone.textContent = customerPhone.value;
    receiptEmail.textContent = customerEmail.value;

    receiptService.textContent = serviceName.value;
    receiptDuration.textContent = serviceDuration.value;

    receiptPrice.textContent = "$" + price.toFixed(2);

    receiptSessions.textContent = qty;

    receiptTotal.textContent = "$" + total.toFixed(2);

    receiptDeposit.textContent = "$" + deposit.toFixed(2);

    receiptBalance.textContent = "$" + balance.toFixed(2);

    receiptDate.textContent = bookingDate.value;

    receiptTime.textContent = bookingTime.value;

    receiptBookingDate.textContent =
        new Date().toLocaleString();

}

/*=====================================================
    COPY BOOKING NUMBER
======================================================*/

const copyBooking = document.getElementById("copyBooking");

copyBooking.addEventListener("click", function(){

    navigator.clipboard.writeText(bookingNumber);

    alert(
        "Booking Number copied!\n\n" +
        bookingNumber
    );

});
/*=====================================================
    PART 3
    EMAILJS, PRINT, PDF & RESET
======================================================*/

/* ===========
   BUTTONS
=========== */

const printReceipt = document.getElementById("printReceipt");
const downloadPDF = document.getElementById("downloadPDF");
const bookAgain = document.getElementById("bookAgain");

/*=====================================================
    SEND EMAIL USING EMAILJS
======================================================*/
async function sendBookingEmail() {

    const templateParams = {
        name: customerName.value,
        email: customerEmail.value,

        booking_reference: bookingReference,

        service: serviceName.value,

        booking_date: bookingDate.value,

        booking_time: bookingTime.value,

        total: receiptTotal.textContent,

        deposit: receiptDeposit.textContent,

        balance: receiptBalance.textContent
    };

    try {

        await emailjs.send(
            "service_of6914s",
            "template_c7h9ljs",
            templateParams
        );

        console.log("Booking email sent successfully.");

    } catch (error) {

        console.error("Email Error:", error);

    }

}

/*=====================================================
    UPDATE BOOKING FORM
======================================================*/

/*
Delete the bookingForm.addEventListener(...)
from Part 2 and replace it with THIS ONE.
*/


bookingForm.onsubmit = function(event){

    event.preventDefault();

    const paymentOption =
        document.querySelector('input[name="paymentOption"]:checked').value;

    const qty = Number(sessions.value) || 1;

    let price = currentPrice;

    if (appointmentType.value === "mobile") {

        price = currentPrice * 1.20;

    }

    const total = price * qty;

    let amountToPay = total;

    if (paymentOption === "deposit") {

        amountToPay = total * 0.80;

    }

    payWithFlutterwave(amountToPay);

};
/*=====================================================
    PRINT RECEIPT
======================================================*/

printReceipt.addEventListener("click", function(){

    window.print();

});

/*=====================================================
    DOWNLOAD RECEIPT PDF
======================================================*/

downloadPDF.addEventListener("click", function(){

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    let y = 20;

    pdf.setFontSize(20);

    pdf.text("Sophia's Clinic",20,y);

    y += 10;

    pdf.setFontSize(12);

    pdf.text("Massage & Wellness Receipt",20,y);

    y += 15;

    const lines = [

        ["Booking Reference", bookingReference],

        ["Booking Number", bookingNumber],

        ["Customer", customerName.value],

        ["Phone", customerPhone.value],

        ["Email", customerEmail.value],

        ["Service", serviceName.value],

        ["Duration", serviceDuration.value],

        ["Sessions", sessions.value],

        ["Price", servicePrice.value],

        ["Total Service Price", receiptTotal.textContent],
        ["80% Deposit", receiptDeposit.textContent],
        ["Remaining Balance", receiptBalance.textContent],

        ["Preferred Date", bookingDate.value],

        ["Preferred Time", bookingTime.value],

        ["Booking Date",
        new Date().toLocaleString()]

    ];

    lines.forEach(function(item){

        pdf.text(item[0] + ":",20,y);

        pdf.text(String(item[1]),90,y);

        y += 10;

    });

    pdf.save("Sophias_Clinic_Receipt.pdf");

});

/*=====================================================
    BOOK ANOTHER SESSION
======================================================*/

bookAgain.addEventListener("click", function(){

    receiptModal.style.display = "none";

    bookingForm.reset();

    summaryDate.textContent = "--";

    summaryTime.textContent = "--";

    summarySessions.textContent = "1";

    summaryTotal.textContent = "$0";

});

/*=====================================================
    CLOSE RECEIPT MODAL
======================================================*/

window.addEventListener("click", function(event){

    if(event.target === receiptModal){

        receiptModal.style.display = "none";

    }

});

/*=====================================================
    MINIMUM DATE
======================================================*/

bookingDate.min = new Date().toISOString().split("T")[0];

console.log("Sophia's Clinic Booking System Ready");

/*====================================
    Floating Contact Button
====================================*/

const contactToggle = document.getElementById("contactToggle");
const contactMenu = document.getElementById("contactMenu");

contactToggle.addEventListener("click", function () {

    if (contactMenu.style.display === "block") {

        contactMenu.style.display = "none";

    } else {

        contactMenu.style.display = "block";

    }

});
/*=========================================
    FLUTTERWAVE PAYMENT
=========================================*/

function payWithFlutterwave(amount) {

    FlutterwaveCheckout({

        public_key: "FLWPUBK_TEST-11fef7fdc53d36f28efb2d8cb5092a5d-X",

        tx_ref: "SCM-" + Date.now(),

        amount: amount,

        currency: "USD",

        payment_options: "card, ussd, banktransfer",

        customer: {

            email: customerEmail.value,

            phone_number: customerPhone.value,

            name: customerName.value

        },

        customizations: {

            title: "Sophia's Mobile Massage & Wellness",

            description: "Massage Appointment Deposit",

            logo: ""

        },
        callback: async function (response) {

            if (!response.transaction_id) {
                alert("Your payment was not successful. No booking has been created. Please try again.");
                return;
            }

            try {

                const verify = await fetch("http://localhost:3000/verify-payment", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        transaction_id: response.transaction_id
                    })

                });

                const result = await verify.json();

                console.log("VERIFY RESULT:");
                console.log(result);

                console.log(result.success);
                alert("VERIFY = " + result.success);

                if (result.success) {

                    // Check if appointment is already booked
                    const { data: existingBooking, error: checkError } = await db
                        .from("bookings")
                        .select("*")
                        .eq("booking_date", bookingDate.value)
                        .eq("booking_time", bookingTime.value)
                        .maybeSingle();

                    if (checkError) {
                        console.error(checkError);
                        alert("Unable to check booking availability.");
                        return;
                    }

                    if (existingBooking) {
                        alert("This appointment time has already been booked.");
                        return;
                    }

                    // Save booking
                    const bookingData = {
                        booking_reference: bookingReference,
                        
                        customer_name: customerName.value,
                        customer_phone: customerPhone.value,
                        customer_email: customerEmail.value,
                        service: serviceName.value,
                        
                        appointment_type: appointmentType.value,
                        sessions: Number(sessions.value),
                        booking_date: bookingDate.value,
                        booking_time: bookingTime.value,
                        
                        
                        amount_paid: Number(receiptDeposit.textContent.replace("$","")),
                        total_amount: Number(receiptTotal.textContent.replace("$","")),
                        balance: Number(receiptBalance.textContent.replace("$","")),
                        payment_status: "Paid",
                        transaction_id: response.transaction_id
                    };

                    console.log("Saving booking:", bookingData);

                    const { data, error } = await db
                        .from("bookings")
                        .insert([bookingData])
                        .select();

                    console.log("Inserted Data:", data);
                    console.log("Insert Error:", error);

                    if (error) {
                        console.error(error);
                        alert("Booking could not be saved.");
                        return;
                    }

                    await sendBookingEmail();

                    buildReceipt();

                    bookingModal.style.display = "none";
                    receiptModal.style.display = "block";
                }

            } catch (error) {

                console.error(error);

                alert("Unable to verify payment.");

            }

        },

        onclose: function () {

            console.log("Payment window closed.");

        }

    });

}