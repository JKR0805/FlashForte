import { REGISTRATION_FIELDS, SUBMISSION_FIELDS, FEEDBACK_FIELDS } from "./commonFields.js";

const APP_SCRIPT_REGISTER = "https://script.google.com/macros/s/AKfycbztzUKFGYsPBoYMux7686qC9vCw-XIQUxNMXpfhJU0dCa6xyvlD0iwSDwrvZmSnmzcZ/exec";
const APP_SCRIPT_SUBMIT = "https://script.google.com/macros/s/AKfycbxuvJYLCRHeXTU67PpJM_8sdCdTt6Rk5mRoMtOK5KOtD53psvluI2zhetOW9u6tBDIyag/exec";
const APP_SCRIPT_FEEDBACK = "URL_PLACEHOLDER_IDEATHON_FEEDBACK";

const IS_ACCEPTING = true;

const titleNode = () => (
  <span style={{ whiteSpace: "nowrap" }}>
    IDEA<span style={{ color: "#f5c518" }}>THON</span>
  </span>
);

export const ideathonConfig = {
  themeColor: "#EAB308",
  register: {
    appScriptUrl: APP_SCRIPT_REGISTER,
    titleNode: () => <>{titleNode()} Registration</>,
    subtitle: "Ignite ideas. Inspire change.",
    submitText: "Register Now",
    successTitle: "Registration Confirmed.",
    successSubtitle: "Your innovation journey begins.",
    allowFileUpload: false,
    fields: [
      ...REGISTRATION_FIELDS.filter(
        (field) => field.name !== "heardAboutUs"
      ),
      {
        name: "domain",
        label: "Select Domain",
        type: "select",
        required: true,
        options: [
          "Sustainability & Environment",
          "Smart Logistics Solutions",
          "Digital Governance",
          "Disaster Management",
          "Gaming for Impact",
          "Digital Trust & Integrity"
        ]
      },
      {
        name: "heardAboutUs", 
        label: "How did you hear about us?", 
        type: "select", required: false, 
        options: ["Social Media", "Friend", "Senior", "Other"] 
      }
    ],
    isAccepting: IS_ACCEPTING,
    showOtherEventsOnSuccess: true,
    forteId: "ideathon",
  },
  submit: {
    appScriptUrl: APP_SCRIPT_SUBMIT,
    titleNode: () => <>{titleNode()} Submission</>,
    subtitle: "Upload your idea pitch deck",
    submitText: "Submit Pitch",
    successTitle: "Submission Received.",
    successSubtitle: "Your pitch deck has been recorded.",
    infoText: "If you'd like to resubmit, please fill the form again with the new file.",
    allowFileUpload: true,
    acceptedTypes: ".pdf,.ppt,.pptx",
    acceptedMimeTypes: ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    fields: [
      ...SUBMISSION_FIELDS,
      {
        name: "domain",
        label: "Select Domain",
        type: "select",
        required: true,
        options: [
          "Sustainability & Environment",
          "Smart Logistics Solutions",
          "Digital Governance",
          "Disaster Management",
          "Gaming for Impact",
          "Digital Trust & Integrity"
        ]
      }
    ],
    isAccepting: IS_ACCEPTING,
  },
  feedback: {
    appScriptUrl: APP_SCRIPT_FEEDBACK,
    titleNode: () => <>{titleNode()} Feedback</>,
    subtitle: "Share your innovation experience",
    submitText: "Submit Feedback",
    successTitle: "Feedback Received.",
    successSubtitle: "Thank you for sharing your thoughts.",
    allowFileUpload: false,
    fields: FEEDBACK_FIELDS,
    isAccepting: IS_ACCEPTING,
  }
};