// src/App.jsx
import Quiz from "./components/Quiz/Quiz.jsx";
import { historyQuestions } from "./data/historyQuestions.jsx";

function App() {
    return (
        <div className="min-h-screen bg-gray-900">
            <Quiz questions={historyQuestions} />
        </div>
    );
}

export default App;
