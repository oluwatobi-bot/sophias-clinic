const SUPABASE_URL = "https://heyizeitobzwkdkbzjjz.supabase.co";

const SUPABASE_KEY = "sb_publishable_pRp6Ux55HQoLko_EizrIhA_wwgaVmDo";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// Protect Admin Page
(async () => {

    const { data } = await db.auth.getSession();

    if (!data.session) {

        window.location.href = "login.html";
        return;

    }

    loadBookings();

})();
async function loadBookings() {

    const search = document.getElementById("search").value.toLowerCase();
    const selectedDate = document.getElementById("filterDate").value;

    let { data, error } = await db
        .from("bookings")
        .select("*");

    if (error) {
        alert("Error loading bookings");
        console.error(error);
        return;
    }

    if (search) {
        data = data.filter(b =>
            (b.customer_name || "").toLowerCase().includes(search) ||
            (b.customer_phone || "").includes(search)
        );
    }

    if (selectedDate) {
        data = data.filter(b => b.booking_date === selectedDate);
    }

    console.log(data);

    const table = document.getElementById("bookingTable");

    table.innerHTML = "";

    if (!data || data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="9" style="text-align:center;">
                    No bookings found
                </td>
            </tr>
        `;

        return;
    }

// Dashboard cards
document.getElementById("totalBookings").textContent = data.length;

const today = new Date().toISOString().split("T")[0];

const todayBookings = data.filter(b => b.booking_date === today);
document.getElementById("todayBookings").textContent = todayBookings.length;

const revenue = data.reduce((sum, b) => {
    return sum + Number(b.total_amount || 0);
}, 0);

document.getElementById("totalRevenue").textContent = "$" + revenue;

const pending = data.filter(b =>
    (b.payment_status || "Pending") !== "Completed"
);
document.getElementById("pendingBookings").textContent = pending.length;


// Table
data.forEach((booking) => {

    table.innerHTML += `
    <tr>

        <td>${booking.customer_name}</td>

        <td>${booking.customer_phone}</td>

        <td>${booking.customer_email}</td>

        <td>${booking.service}</td>

        <td>${booking.booking_date}</td>

        <td>${booking.booking_time}</td>

        <td>$${booking.total_amount}</td>

        <td>
            <span class="${booking.payment_status === "Completed" ? "completed" : "pending"}">
                ${booking.payment_status || "Pending"}
            </span>
        </td>

        <td>

        <button onclick="viewBooking(${booking.id})">
        View
        </button>

        <button class="completeBtn" data-id="${booking.id}">
        Complete
        </button>

        <button class="deleteBtn" data-id="${booking.id}">
        Delete
        </button>

        </td>

    </tr>
    `;
});

}

loadBookings();

document.getElementById("search").addEventListener("input", loadBookings);

document.getElementById("filterDate").addEventListener("change", loadBookings);

document.getElementById("refreshBtn").addEventListener("click", () => {
    document.getElementById("search").value = "";
    document.getElementById("filterDate").value = "";
    loadBookings();
});
// Complete & Delete Buttons
document.addEventListener("click", async (e) => {

    // Complete booking
    if (e.target.classList.contains("completeBtn")) {

        const id = e.target.dataset.id;

        const { error } = await db
            .from("bookings")
            .update({
                payment_status: "Completed"
            })
            .eq("id", id);

        if (error) {
            alert("Unable to update booking.");
            console.error(error);
            return;
        }

        loadBookings();
    }

    // Delete booking
    if (e.target.classList.contains("deleteBtn")) {

        const id = e.target.dataset.id;

        if (!confirm("Delete this booking?")) return;

        const { error } = await db
            .from("bookings")
            .delete()
            .eq("id", id);

        if (error) {
            alert("Unable to delete booking.");
            console.error(error);
            return;
        }

    
    }

});
async function viewBooking(id){

const { data,error } = await db
.from("bookings")
.select("*")
.eq("id",id)
.single();

if(error){
console.error(error);
return;
}

document.getElementById("bookingDetails").innerHTML=`

<p><b>Reference:</b> ${data.booking_reference}</p>

<p><b>Name:</b> ${data.customer_name}</p>

<p><b>Phone:</b> ${data.customer_phone}</p>

<p><b>Email:</b> ${data.customer_email}</p>

<p><b>Service:</b> ${data.service}</p>

<p><b>Date:</b> ${data.booking_date}</p>

<p><b>Time:</b> ${data.booking_time}</p>

<p><b>Amount Paid:</b> $${data.amount_paid}</p>

<p><b>Total:</b> $${data.total_amount}</p>

<p><b>Balance:</b> $${data.balance}</p>

<p><b>Status:</b> ${data.payment_status}</p>

<p><b>Transaction:</b> ${data.transaction_id}</p>

`;

document.getElementById("bookingModal").style.display="block";

}
function exportExcel() {

    const table = document.querySelector("table");

    const workbook = XLSX.utils.table_to_book(table, {
        sheet: "Bookings"
    });

    XLSX.writeFile(workbook, "Sophias_Clinic_Bookings.xlsx");

}
document.getElementById("logoutBtn").addEventListener("click", async () => {

    await db.auth.signOut();

    window.location.href = "login.html";

});