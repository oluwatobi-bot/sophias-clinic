const SUPABASE_URL="https://heyizeitobzwkdkbzjjz.supabase.co";

const SUPABASE_KEY="sb_publishable_pRp6Ux55HQoLko_EizrIhA_wwgaVmDo";

const db=window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

async function resetPassword(){

const email=document.getElementById("email").value;

const {error}=await db.auth.resetPasswordForEmail(email);

if(error){

alert(error.message);

return;

}

document.getElementById("message").textContent="Password reset email sent.";

}