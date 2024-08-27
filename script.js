document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('stopwatch');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const resetBtn = document.getElementById('reset-btn');

    let startTime;
    let updatedTime;
    let difference;
    let tInterval;
    let running = false;

    function formatTime(ms) {
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const seconds = Math.floor((ms / 1000) % 60);
        const hoursStr = (hours < 10) ? "0" + hours : hours;
        const minutesStr = (minutes < 10) ? "0" + minutes : minutes;
        const secondsStr = (seconds < 10) ? "0" + seconds : seconds;
        return `${hoursStr}:${minutesStr}:${secondsStr}`;
    }

    function startTimer() {
        if (running) return; // Prevent multiple intervals
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(() => {
            updatedTime = new Date().getTime();
            difference = updatedTime - startTime;
            display.textContent = formatTime(difference);
        }, 1000);
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = false;
    }

    function stopTimer() {
        clearInterval(tInterval);
        running = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }

    function resetTimer() {
        clearInterval(tInterval);
        display.textContent = '00:00:00';
        running = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = true;
    }

    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);

    // Initialize button states
    stopBtn.disabled = true;
    resetBtn.disabled = true;
});
