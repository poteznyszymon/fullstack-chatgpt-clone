import { TypeAnimation } from "react-type-animation";

function App() {
  return (
    <div className="h-screen bg-black flex justify-center items-center">
      <h1 className="text-white">
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Help me debug why the linked list appears empty after I've reversed it",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "Give me ideas for a customer loyalty program in a small bookstore",
            1000,
            "Brainstorm names for an orange cat we're adopting from the shelter",
            1000,
            "Suggest fun activities for a team-building day with remote employees",
            1000,
          ]}
          speed={70}
          repeat={Infinity}
        />
      </h1>
    </div>
  );
}

export default App;
