
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
  // ⚠️ ដាក់ values របស់ Ro នៅទីនេះ
  const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← Account → Public Key
  const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← Email Services → Service ID
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← Email Templates → Template ID

  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  function sendEmail() {
    const name    = document.getElementById('from_name').value.trim();
    const email   = document.getElementById('from_email').value.trim();
    const message = document.getElementById('message').value.trim();
    const btn     = document.getElementById('send-btn');
    const status  = document.getElementById('form-status');

    // Validate
    if (!name || !email || !message) {
      showStatus('⚠ សូមបំពេញព័ត៌មានឱ្យគ្រប់!', '#f5b84a');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('⚠ Email មិនត្រឹមត្រូវ!', '#f5b84a');
      return;
    }

    // Loading state
    btn.disabled = true;
    btn.textContent = 'Sending...';

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name:  name,
      from_email: email,
      message:    message,
    })
    .then(() => {
      showStatus('✓ បានផ្ញើដោយជោគជ័យ! សូមអរគុណ 🙏', '#5dd9b8');
      document.getElementById('from_name').value  = '';
      document.getElementById('from_email').value = '';
      document.getElementById('message').value    = '';
      btn.textContent = 'Send Message →';
      btn.disabled = false;
    })
    .catch((err) => {
      showStatus('✗ មានបញ្ហា! សូមព្យាយាមម្ដងទៀត', '#f09595');
      console.error('EmailJS error:', err);
      btn.textContent = 'Send Message →';
      btn.disabled = false;
    });
  }

  function showStatus(msg, color) {
    const status = document.getElementById('form-status');
    status.textContent = msg;
    status.style.color = color;
    status.style.display = 'block';
    setTimeout(() => { status.style.display = 'none'; }, 5000);
  }

