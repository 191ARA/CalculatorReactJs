function Calculator() {
    // состояние для хранения текущего ввода пользователя
    const [input, setInput] = React.useState("");

    // добавляет обработчик событий клавиатуры
    React.useEffect(() => {
        const handleKeyPress = (event) => {
            const validKeys = "0123456789+-*/.^=BackspaceEnter";
            if (!validKeys.includes(event.key)) return;

            if (event.key === "Enter") {
                handleClick("="); // Вычисляем результат при нажатии Enter
            } else if (event.key === "Backspace") {
                setInput((prev) => prev.slice(0, -1)); // Удаляем последний символ
            } else {
                handleClick(event.key); // Добавляем символ к вводу
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [input]);

    // Функция проверки ввода
    const isValidInput = (value) => {
        const lastChar = input.slice(-1);
        const operators = ["+", "-", "*", "/", ".", "^"];
        
        // Проверяем не начинается ли ввод с оператора и не идет ли два оператора подряд
        if (operators.includes(value) && (input === "" || operators.includes(lastChar))) {
            return false;
        }
        return true;
    };

    // Функция обработки нажатий на кнопки
    const handleClick = (value) => {
        if (value === "C") {
            setInput(""); // Очистка экрана
        } else if (value === "=") {
            try {
                let expression = input.replace(/\^/g, "**"); // Заменяем ^ на ** для степени
                const result = eval(expression); // Вычисляем выражение
                if (!isFinite(result)) {
                    setInput("0"); // Если результат не число, устанавливаем 0
                } else {
                    setInput(result.toString()); // Устанавливаем результат
                }
            } catch {
                setInput("0"); // В случае ошибки устанавливаем 0
            }
        } else if (value === "x²") {
            setInput((prev) => (prev ? (Math.pow(parseFloat(prev), 2)).toString() : "")); // Квадрат числа
        } else if (value === "x³") {
            setInput((prev) => (prev ? (Math.pow(parseFloat(prev), 3)).toString() : "")); // Куб числа
        } else if (value === "1/x") {
            setInput((prev) => (prev ? (1 / parseFloat(prev)).toString() : "")); // Обратное число
        } else if (isValidInput(value)) {
            setInput(input + value); // Добавляем вводимый символ
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-800 p-6 rounded-2xl shadow-lg w-72">
            <h1 className="text-2xl font-bold mb-4">Калькулятор</h1>
            {/* Дисплей для отображения текущего ввода */}
            <div className="mb-4 p-4 bg-black rounded text-right text-2xl h-16 flex items-center justify-end">
                {input || "0"}
            </div>
            {/* Кнопки калькулятора */}
            <div className="grid grid-cols-4 gap-2">
                {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+", "x²", "x³", "1/x", "^"]
                    .map((btn) => (
                    <button
                        key={btn}
                        className="bg-gray-700 p-4 rounded-lg text-white text-xl hover:bg-gray-600"
                        onClick={() => handleClick(btn)}
                    >
                        {btn}
                    </button>
                ))}
                {/* Кнопка очистки */}
                <button
                    className="col-span-4 bg-red-600 p-4 rounded-lg text-white text-xl hover:bg-red-500"
                    onClick={() => handleClick("C")}
                >
                    C
                </button>
            </div>
        </div>
    );
}

// Рендеринг калькулятора в DOM
ReactDOM.createRoot(document.getElementById("root")).render(<Calculator />);
