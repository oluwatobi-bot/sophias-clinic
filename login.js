const SUPABASE_URL = "https://heyizeitobzwkdkbzjjz.supabase.co";
const SUPABASE_KEY = "sb_publishable_pRp6Ux55HQoLko_EizrIhA_wwgaVmDo";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// If already logged in, go straight to admin
db.auth.getSession().then(({ data }) => {
    if (data.session) {
        window.location.href = "admin.html";
    }
});

async function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    document.getElementById("error").textContent = "";

    if (!email || !password) {
        document.getElementById("error").textContent =
            "Please enter your email and password.";
        return;
    }

    const { error } = await db.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        document.getElementById("error").textContent = error.message;
        return;
    }

    window.location.href = "admin.html";
}