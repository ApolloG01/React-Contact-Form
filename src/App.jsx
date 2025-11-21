import { useState } from "react";
import emailjs from "@emailjs/browser";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[ #8ceac8] px-4">
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

  // EmailJS Id's
  const serviceId = "service_gehhvvd";
  const templateId = "template_wqkvu5k";
  const publicKey = "eoeSFcobd5hwyxB9p";

  // Handler Functions

  function handleSubmit(e) {
    e.preventDefault();

    // Check if consent is given
    if (!consent) {
      alert("Please consent to being contacted");
      return;
    }

    // Object with dynamic template params.

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

  const boxClasses =
    " w-full px-2 py-2 border border-grey-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1 text-black";

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 py-4 ">
          <span className="w-full mb-2">
            <label htmlFor="firstName">
              First Name <span className="text-green-500">*</span>
            </label>
            <input
              className={boxClasses}
              type="text"
              name="firstName"
              id="firstName"
              minLength="4"
              required
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </span>
          <span className="w-full mb-2">
            <label htmlFor="lastName">
              Last Name <span className="text-green-500">*</span>
            </label>
            <input
              className={boxClasses}
              type="text"
              nam="lastName"
              id="lastName"
              minLength="4"
              required
              placeholder="Wick"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </span>
        </div>
        <div className="mb-2 py-4 ">
          <label htmlFor="email">
            Email Address <span className="text-green-500">*</span>
          </label>
          <input
            className={boxClasses}
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
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
            ></input>
            <label className="text-white" htmlFor="general-enquiry ">
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
            ></input>
            <label className="text-white" htmlFor="support-request">
              Support request
            </label>
          </span>
        </div>
        <div className="mb-2 pt-4">
          <label className="flex" htmlFor="message">
            Message <span className="text-green-500">*</span>
          </label>
          <textarea
            className={`${boxClasses} w-full h-44 mt-1`}
            id="message"
            name="message"
            placeholder="Your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="flex item-center gap-2">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          ></input>
          <label htmlFor="consent" className="text-xs my-4">
            I consent to being contacted by the team*
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="flex justify-center w-full md:w-auto bg-green-600 rounded-3xl px-6 py-2 my-4 mx-auto hover:bg-green-700 transition-colors"
            // onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
