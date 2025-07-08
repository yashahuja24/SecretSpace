import Notes from "./Notes";
import AddNote from "./AddNote";
const Home = () => {
  return (
    <>
     <div className="flex flex-col items-center justify-center gap-4 px-4 mt-6">
        <div className="text-center max-w-xl">
          <h2 className="text-3xl font-bold mb-2">Welcome to SecretSpace</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            A modern note-taking solution with end-to-end privacy, dark mode support,
            and a smooth user experience. Login or Signup to begin your journey.
          </p>
        </div>
      </div>
      <AddNote/>
      <Notes/>
    </>
  );
};

export default Home;