// Split because CSS files are split up
document.addEventListener("DOMContentLoaded", function() {
  let contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    var formData = new FormData(contactForm);
    alert("Thanks for your message, "+ formData.get("name")+". We will get back to you by emailing "+formData.get("email")+"!");
  });

  homeBtn.addEventListener("click", ()=>{
    window.location.href = "index.html";
  });
});