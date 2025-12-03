"use client";

import tests from "@/app/api/service/tests.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import { CheckCircle, XCircle, Home } from "lucide-react";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  testId: string;
}

interface Test {
  id: string;
  question: string;
  subjectId: string;
  Option: Option[];
}

const Page = () => {
  const { id } = useParams();
  const router = useRouter();

  const [allTests, setAllTests] = useState<Test[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentTest = allTests[currentIndex];

  // FETCH DATA
  useEffect(() => {
    async function fetchData() {
      const res: Test[] = await tests.filter("salom");
      const filtered = res.filter((t) => t.subjectId === id);
      setAllTests(filtered);
    }
    fetchData();
  }, [id]);

  // ANSWER HANDLER
  function handleAnswer(op: Option) {
    if (finished) return;

    setSelected(op.id);

    if (op.isCorrect) {
      setCorrectCount((p) => p + 1);
      toast.success("To‘g‘ri javob!");
    } else {
      toast.error("Noto‘g‘ri javob!");
    }

    setTimeout(() => nextQuestion(), 900);
  }

  // NEXT QUESTION
  function nextQuestion() {
    setSelected(null);

    if (currentIndex < allTests.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishTest();
    }
  }

  // FINISH TEST
  function finishTest() {
    setFinished(true);

    const total = allTests.length;

    if (correctCount + 1 === total) {
      confetti({
        particleCount: 250,
        spread: 75,
        origin: { y: 0.6 },
      });

      toast.success("Barakalla! 100% natija!");
    } else {
      toast("Test tugadi!");
    }
  }

  // START PAGE
  if (!started)
    return (
      <div className="p-5 flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-extrabold mb-4 text-purple-700 drop-shadow-md">
          Testga tayyormisan?
        </h1>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-md text-lg"
          onClick={() => setStarted(true)}
        >
          Boshlash
        </button>
      </div>
    );

  // LOADING
  if (!currentTest) return <div>Yuklanmoqda...</div>;

  // FINISHED PAGE
  if (finished)
    return (
      <div className="p-6 flex flex-col items-center text-center mt-16">
        <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
        <h2 className="text-3xl font-bold mb-2">Test tugadi!</h2>
        <p className="text-lg mb-6">
          Natijangiz:{" "}
          <span className="font-semibold">
            {correctCount}/{allTests.length}
          </span>
        </p>

        <button
          onClick={() => router.push("/")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md"
        >
          <Home size={20} />
          Bosh sahifaga qaytish
        </button>
      </div>
    );

  // TEST PAGE
  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-2 text-purple-700">
          Savol {currentIndex + 1} / {allTests.length}
        </h2>
        <p className="text-lg font-medium">{currentTest.question}</p>
      </div>

      <div className="space-y-3">
        {currentTest.Option.map((op) => {
          const isSelected = selected === op.id;

          const base =
            "w-full text-left border px-4 py-3 rounded-lg transition-all duration-200 shadow-sm";

          const color = isSelected
            ? op.isCorrect
              ? "bg-green-500 text-white border-green-600 shadow-lg"
              : "bg-red-500 text-white border-red-600 shadow-lg"
            : "hover:bg-purple-50";

          return (
            <button
              key={op.id}
              className={`${base} ${color}`}
              onClick={() => !selected && handleAnswer(op)}
              disabled={!!selected}
            >
              {op.text}
            </button>
          );
        })}
      </div>

      <div className="text-sm text-gray-500 mt-4 text-center">
        To‘g‘ri javoblar: {correctCount}/{allTests.length}
      </div>
    </div>
  );
};

export default Page;
