import { useState } from "react";
import emailjs from "@emailjs/browser";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8ceac8] px-4">
      <div className="w-full max-w-md md:max-w-lg bg-black flex flex-col items-center p-4 rounded-lg">
        <h1 className="text-white text-4xl font-semibold mb-4 py-2">
          React Contact Form
        </h1>
        <Form />
      </div>
    </div>
  );
}

export default App;

function Form() {
  // State Variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [queryType, setQueryType] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});

  // EmailJS Id's
  const serviceId = "service_gehhvvd";
  const templateId = "template_wqkvu5k";
  const publicKey = "eoeSFcobd5hwyxB9p";

  // VALIDATION FUNCTION
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Query type validation
    if (!queryType) {
      newErrors.queryType = "Please select a query type";
    }

    // Message validation
    if (!message.trim()) {
      newErrors.message = "Message is required";
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  // SUBMIT HANDLER
  function handleSubmit(e) {
    e.preventDefault();

    // Run validation
    const newErrors = validateForm();

    // If there are errors, set them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if consent is given
    if (!consent) {
      alert("Consent must be given, in order to proceed");
      console.log(consent);

      return;
    }

    // Clear any previous errors
    setErrors({});

    // Object with dynamic template params
    const templateParams = {
      from_name: `${firstName} ${lastName}`,
      from_email: email,
      to_name: "ApolloG01",
      message: message,
      query_type: queryType,
    };

    // Send the email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
        alert("Message sent successfully!");
        // Reset form
        setFirstName("");
        setLastName("");
        setEmail("");
        setQueryType("");
        setMessage("");
        setConsent(false);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send message. Please try again.");
      });
  }

  // HANDLER FUNCTIONS
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    // Clear error when user starts typing
    if (errors.firstName) {
      setErrors({ ...errors, firstName: "" });
    }
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (errors.lastName) {
      setErrors({ ...errors, lastName: "" });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: "" });
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (errors.message) {
      setErrors({ ...errors, message: "" });
    }
  };

  const boxClasses =
    "w-full px-2 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 mt-1 bg-gray-800 text-white";

  return (
    <form className="my-0" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-4 py-4">
        <span className="w-full mb-2">
          <label htmlFor="firstName">
            First Name <span className="text-green-500">*</span>
          </label>
          <input
            className={`${boxClasses} ${
              errors.firstName ? "border-red-500" : ""
            }`}
            type="text"
            name="firstName"
            id="firstName"
            placeholder="John"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </span>
        <span className="w-full mb-2">
          <label htmlFor="lastName">
            Last Name <span className="text-green-500">*</span>
          </label>
          <input
            className={`${boxClasses} ${
              errors.lastName ? "border-red-500" : ""
            }`}
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Wick"
            value={lastName}
            onChange={handleLastNameChange}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </span>
      </div>

      <div className="mb-2 py-4">
        <label htmlFor="email">
          Email Address <span className="text-green-500">*</span>
        </label>
        <input
          className={`${boxClasses} ${errors.email ? "border-red-500" : ""}`}
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="mb-2 text-left">
        <label htmlFor="query">
          Query type <span className="text-green-500">*</span>
        </label>
      </div>

      <div className="flex flex-col md:flex-row gap-4 my-4">
        <span className={`${boxClasses} flex items-center gap-2`}>
          <input
            type="radio"
            id="general-enquiry"
            name="query"
            value="general-enquiry"
            checked={queryType === "general-enquiry"}
            onChange={(e) => setQueryType(e.target.value)}
          />
          <label className="text-white" htmlFor="general-enquiry">
            General enquiry
          </label>
        </span>
        <span className={`${boxClasses} flex items-center gap-2`}>
          <input
            type="radio"
            id="support-request"
            name="query"
            value="support-request"
            checked={queryType === "support-request"}
            onChange={(e) => setQueryType(e.target.value)}
          />
          <label className="text-white" htmlFor="support-request">
            Support request
          </label>
        </span>
      </div>
      {errors.queryType && (
        <p className="mt-1 text-sm text-red-600">{errors.queryType}</p>
      )}

      <div className="mb-2 pt-4">
        <label className="flex" htmlFor="message">
          Message <span className="text-green-500">*</span>
        </label>
        <textarea
          className={`${boxClasses} w-full h-44 mt-1 ${
            errors.message ? "border-red-500" : ""
          }`}
          id="message"
          name="message"
          placeholder="Your message here..."
          value={message}
          onChange={handleMessageChange}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <label htmlFor="consent" className="text-xs my-4">
          I consent to being contacted by the team*
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="flex justify-center w-full md:w-auto bg-green-600 rounded-3xl px-6 py-2 my-4 mx-auto hover:bg-green-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
