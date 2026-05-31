function FlowDemo() {
    const [step, setStep] = useState(1);  // Bắt đầu từ bước 1

    return (
        <div>
            <p>Bước hiện tại: {step}</p>

            <button onClick={() => setStep(step + 1)}>
                Bước tiếp theo →        {/* step: 1→2→3→4 */}
            </button>

            <button onClick={() => setStep(1)}>
                Quay lại đầu            {/* step: luôn về 1 */}
            </button>

            {/* Render có điều kiện */}
            {step === 1 && <p>👋 Bước 1: Xin chào!</p>}
            {step === 2 && <p>📖 Bước 2: Đang học React</p>}
            {step === 3 && <p>🎯 Bước 3: Hiểu useState</p>}
            {step === 4 && <p>🎉 Bước 4: Hoàn thành!</p>}
        </div>
    );
}
