import "react-toastify/dist/ReactToastify.css";
import "../App.css";
const About = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto min-h-[70vh]">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-4">What is SecretSpace?</h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          SecretSpace is your private digital sanctuary. Designed with privacy at its core,
          our sleek note management app allows you to securely store, manage, and organize
          your thoughts. End-to-end encryption ensures that only you can access what matters most.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">🔑 Key Features:</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 text-base">
          <li>🧠 Secure note-taking with end-to-end privacy.</li>
          <li>🎨 Light and dark theme toggle support.</li>
          <li>🚀 Smooth and responsive user interface.</li>
          <li>🔐 JWT-based login & signup authentication.</li>
          <li>📝 Add, view, and organize your personal notes.</li>
          <li>📱 Mobile-friendly, fully responsive design.</li>
          <li>✨ Modern glassmorphism-styled note form.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;