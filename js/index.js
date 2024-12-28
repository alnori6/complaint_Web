const contactForm = document.getElementById("contact-form")

const email = document.getElementById("email")
const airline = document.getElementById("Airline")
const clander = document.getElementById("datePickerId")
const flight_Number = document.getElementById("flight_Number")


const today = new Date()
//onfocus="this.max = new Date().toISOString().split('T')[0]"
//today date
clander.setAttribute("max", today.toISOString().split('T')[0])
//5 days before today
today.setDate(today.getDate() - 5)
clander.setAttribute("min", (today.toISOString().split('T')[0]))



//auto fill
email.addEventListener("input", function() {

    if (email.value === "Abdul.Albulushi@flydubai.com") {
        document.getElementById("Airline").value = "Fly Dubai"
        document.getElementById("IATA").value = "FZ"
        document.getElementById("key").value = "Elyassin"
        document.getElementById("flight_Zip").value = "FZ-"
    }
});


flight_Number.addEventListener("input", function() {
    // Remove whitespace from input
    const value = this.value.trim(); 

    const isValid = /^\d{4,5}$/.test(value); // Test if value matches pattern

    if (!isValid) {
        this.setCustomValidity("Please enter a number with 4-5 digits"); // Show error message if input is invalid
    } else {
        this.setCustomValidity(""); // Clear error message if input is valid
    }
});

// contactForm.addEventListener("submit", (e) => {
document.getElementById('submitButton').addEventListener('click', function(e) {
    
    e.preventDefault()

    let errorMessage = ""

    if(email.value == ""){
        errorMessage += "Missing: Enter an Email\n"
    }
    else if (!email.value.match(/^\S+@\S+\.\S+$/)) {
        errorMessage += "Error: Email Format is not correct\n"
    }

    if(clander.value == ""){
        errorMessage += "Missing: Choose a Date\n"
    }

    if(flight_Number.value == ""){
        errorMessage += "Missing: Enter The Flight Number\n"
    }

    if (!errorMessage) {
        window.location.href = "../html/status.html";
        return;
    }

	alert(errorMessage)
    
})    
    // document.getElementById('submitButton').addEventListener('click', function() {
    //     window.location.href = "./html/status.html";
    //   });
    //window.location.href = "../html/status.html";
	// var msg = "Your Details: " + contactFullname.value + " Gender: " + gender.value +
	// "\nBirth Date: " + dateOfBirth.value + "Phone Number: " + contactPhone.value + 
	// "Email: " + contactEmail.value +"\n Prefered Language: " + language + "\nRequired Details: " +
	// detail.value;

	// window.alert(msg);




const toggle = () => {
    // alert("working");
    document.getElementById('nav').classList.toggle('navactive')
}
