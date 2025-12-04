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
      const res: Test[] = await tests.filter(String(id));
      const filtered = res.filter((t) => t.subjectId === String(id));
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
      <div className="p-5 flex flex-col items-center justify-center h-[80vh] text-center">
        <h1 className="text-3xl font-extrabold mb-4 text-purple-700 drop-shadow-md">
          Testga tayyormisiz ?
        </h1>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-9 py-3 rounded-full shadow-md text-lg"
          onClick={() => setStarted(true)}
        >
          Boshlash
        </button>
      </div>
    );

  // LOADING
  if (!currentTest)
    return (
      <div className="flex items-center justify-center gap-2 h-[80vh]">
        <div className="w-1 h-5 bg-purple-600/50 rounded-full animate-[scaleUp_1s_ease-in-out_infinite]"></div>
        <div className="w-1 h-9 bg-purple-600 rounded-full animate-[scaleUp_1s_ease-in-out_infinite_0.2s]"></div>
        <div className="w-1 h-5 bg-purple-600/50 rounded-full animate-[scaleUp_1s_ease-in-out_infinite_0.4s]"></div>
      </div>
    );
  // FINISHED PAGE
  if (finished)
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center mt-16 min-h-[70vh]">
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
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-md"
        >
          <Home size={20} />
          Bosh sahifaga qaytish
        </button>
      </div>
    );

  // TEST PAGE
  return (
    <div className="p-6 mx-auto min-h-[80vh] w-full flex flex-col items-center justify-center">
      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-2 text-purple-700">
          Savol {currentIndex + 1} / {allTests.length}
        </h2>
        <p className="text-lg font-medium">{currentTest.question}</p>
      </div>

      <div className="space-y-3 w-full sm:w-1/2">
        {currentTest.Option.map((op) => {
          const isSelected = selected === op.id;

          const base =
            "w-full text-left border px-5 py-3 rounded-xl transition-all duration-300 shadow-md font-medium text-lg focus:outline-none focus:ring-2 focus:ring-purple-500";

          const color = isSelected
            ? op.isCorrect
              ? "bg-green-500 text-white border-green-600 shadow-lg scale-105"
              : "bg-red-500 text-white border-red-600 shadow-lg scale-105"
            : "bg-white hover:bg-purple-50 border-gray-200 hover:shadow-lg";

          return (
            <button
              key={op.id}
              className={`${base} ${color} transform`}
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
