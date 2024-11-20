import { useState } from "react";
import { Award, AlertCircle, Clock, Star } from "lucide-react";

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [history, setHistory] = useState([]);
    const [totalGames, setTotalGames] = useState(0);
    const [record, setRecord] = useState(0);
    const [answerFeedback, setAnswerFeedback] = useState(null);
    const [acertos, setAcertos] = useState(0);

    const handleAnswer = (optionIndex) => {
        const isCorrect = optionIndex === questions[currentQuestion].correct;

        if (isCorrect) {
            setScore(score + 1);
            setAcertos(acertos + 1);
            setAnswerFeedback({
                type: "success",
                message: "Correto! " + questions[currentQuestion].feedback,
            });
        } else {
            setAnswerFeedback({
                type: "error",
                message:
                    "Incorreto. A resposta correta é " +
                    questions[currentQuestion].options[
                        questions[currentQuestion].correct
                    ],
            });
        }

        setTimeout(() => {
            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1);
                setShowHint(false);
                setAnswerFeedback(null);
            } else {
                const newGame = {
                    date: new Date().toLocaleDateString(),
                    score: score + (isCorrect ? 1 : 0),
                    total: questions.length,
                };
                setHistory([newGame, ...history.slice(0, 9)]);
                setTotalGames(totalGames + 1);
                if (score + (isCorrect ? 1 : 0) > record) {
                    setRecord(score + (isCorrect ? 1 : 0));
                }
                setShowResult(true);
            }
        }, 2000);
    };

    if (showHistory) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white">
                            Histórico de Jogos
                        </h2>
                        <button
                            onClick={() => setShowHistory(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            Voltar
                        </button>
                    </div>
                    <div className="space-y-3">
                        {history.map((game, index) => (
                            <div
                                key={index}
                                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                            >
                                <div className="flex items-center gap-3">
                                    <Clock
                                        className="text-gray-400"
                                        size={20}
                                    />
                                    <span className="text-gray-300">
                                        {game.date}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star
                                        className={
                                            game.score === game.total
                                                ? "text-yellow-500"
                                                : "text-gray-400"
                                        }
                                        size={20}
                                    />
                                    <span className="text-white">
                                        {game.score}/{game.total}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {history.length === 0 && (
                            <p className="text-gray-400 text-center py-4">
                                Nenhum jogo registrado ainda
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-emerald-500">Quiz</h1>
                <div className="flex items-center gap-2">
                    <Award className="text-blue-500" />
                    <span className="font-bold text-white">
                        Recorde: {record}
                    </span>
                </div>
            </div>

            {!showResult ? (
                <>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300"
                            style={{
                                width: `${
                                    ((currentQuestion + 1) / questions.length) *
                                    100
                                }%`,
                            }}
                        />
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">
                                Questão {currentQuestion + 1} de{" "}
                                {questions.length}
                            </span>
                            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                                Acertos: {acertos}
                            </span>
                        </div>

                        <h2 className="text-xl text-white">
                            {questions[currentQuestion].question}
                        </h2>

                        <div className="grid gap-3">
                            {questions[currentQuestion].options.map(
                                (option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(index)}
                                        className="w-full text-left p-4 rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                                    >
                                        {index + 1}. {option}
                                    </button>
                                )
                            )}
                        </div>

                        {answerFeedback && (
                            <div
                                className={`p-4 rounded-lg ${
                                    answerFeedback.type === "success"
                                        ? "bg-green-500/10 border border-green-500/20 text-green-500"
                                        : "bg-red-500/10 border border-red-500/20 text-red-500"
                                }`}
                            >
                                {answerFeedback.message}
                            </div>
                        )}

                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setShowHint(true)}
                                className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors"
                            >
                                <AlertCircle size={20} />
                                Dica
                            </button>
                        </div>

                        {showHint && (
                            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 p-4 rounded-lg">
                                {questions[currentQuestion].hint}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="bg-gray-800 rounded-lg p-6 space-y-6 text-center">
                    <h2 className="text-2xl font-bold text-white">
                        Você acertou {score} de {questions.length} questões!
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-gray-400">Recorde</p>
                            <p className="text-2xl font-bold text-white">
                                {record}
                            </p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-gray-400">Total de Jogos</p>
                            <p className="text-2xl font-bold text-white">
                                {totalGames}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => {
                                setCurrentQuestion(0);
                                setScore(0);
                                setAcertos(0);
                                setShowResult(false);
                                setAnswerFeedback(null);
                            }}
                            className="px-6 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
                        >
                            Jogar Novamente
                        </button>
                        <button
                            onClick={() => setShowHistory(true)}
                            className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                        >
                            Ver Histórico
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
