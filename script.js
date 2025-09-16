// 국기 데이터 (나라 이름과 국기 이미지 URL)
const flagData = {
    // Level 1: 유명한 나라들 (10개)
    level1: [
        { name: '대한민국', flag: 'https://flagcdn.com/w320/kr.png' },
        { name: '미국', flag: 'https://flagcdn.com/w320/us.png' },
        { name: '일본', flag: 'https://flagcdn.com/w320/jp.png' },
        { name: '중국', flag: 'https://flagcdn.com/w320/cn.png' },
        { name: '영국', flag: 'https://flagcdn.com/w320/gb.png' },
        { name: '프랑스', flag: 'https://flagcdn.com/w320/fr.png' },
        { name: '독일', flag: 'https://flagcdn.com/w320/de.png' },
        { name: '이탈리아', flag: 'https://flagcdn.com/w320/it.png' },
        { name: '캐나다', flag: 'https://flagcdn.com/w320/ca.png' },
        { name: '호주', flag: 'https://flagcdn.com/w320/au.png' },
    ],
    
    // Level 2: 다양한 대륙의 나라들 (15개)
    level2: [
        { name: '브라질', flag: 'https://flagcdn.com/w320/br.png' },
        { name: '인도', flag: 'https://flagcdn.com/w320/in.png' },
        { name: '러시아', flag: 'https://flagcdn.com/w320/ru.png' },
        { name: '스페인', flag: 'https://flagcdn.com/w320/es.png' },
        { name: '멕시코', flag: 'https://flagcdn.com/w320/mx.png' },
        { name: '인도네시아', flag: 'https://flagcdn.com/w320/id.png' },
        { name: '터키', flag: 'https://flagcdn.com/w320/tr.png' },
        { name: '태국', flag: 'https://flagcdn.com/w320/th.png' },
        { name: '이집트', flag: 'https://flagcdn.com/w320/eg.png' },
        { name: '남아프리카 공화국', flag: 'https://flagcdn.com/w320/za.png' },
        { name: '아르헨티나', flag: 'https://flagcdn.com/w320/ar.png' },
        { name: '스웨덴', flag: 'https://flagcdn.com/w320/se.png' },
        { name: '스위스', flag: 'https://flagcdn.com/w320/ch.png' },
        { name: '네덜란드', flag: 'https://flagcdn.com/w320/nl.png' },
        { name: '벨기에', flag: 'https://flagcdn.com/w320/be.png' },
    ],
    
    // Level 3: 모든 나라 포함 (20개)
    level3: [
        { name: '노르웨이', flag: 'https://flagcdn.com/w320/no.png' },
        { name: '덴마크', flag: 'https://flagcdn.com/w320/dk.png' },
        { name: '핀란드', flag: 'https://flagcdn.com/w320/fi.png' },
        { name: '포르투갈', flag: 'https://flagcdn.com/w320/pt.png' },
        { name: '그리스', flag: 'https://flagcdn.com/w320/gr.png' },
        { name: '폴란드', flag: 'https://flagcdn.com/w320/pl.png' },
        { name: '체코', flag: 'https://flagcdn.com/w320/cz.png' },
        { name: '헝가리', flag: 'https://flagcdn.com/w320/hu.png' },
        { name: '오스트리아', flag: 'https://flagcdn.com/w320/at.png' },
        { name: '아일랜드', flag: 'https://flagcdn.com/w320/ie.png' },
        { name: '뉴질랜드', flag: 'https://flagcdn.com/w320/nz.png' },
        { name: '싱가포르', flag: 'https://flagcdn.com/w320/sg.png' },
        { name: '말레이시아', flag: 'https://flagcdn.com/w320/my.png' },
        { name: '베트남', flag: 'https://flagcdn.com/w320/vn.png' },
        { name: '필리핀', flag: 'https://flagcdn.com/w320/ph.png' },
        { name: '사우디아라비아', flag: 'https://flagcdn.com/w320/sa.png' },
        { name: '아랍에미리트', flag: 'https://flagcdn.com/w320/ae.png' },
        { name: '이스라엘', flag: 'https://flagcdn.com/w320/il.png' },
        { name: '케냐', flag: 'https://flagcdn.com/w320/ke.png' },
        { name: '나이지리아', flag: 'https://flagcdn.com/w320/ng.png' },
    ]
};

// DOM 요소들
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const levelCards = document.querySelectorAll('.level-card');
const flagImage = document.getElementById('flag-image');
const optionsContainer = document.querySelector('.options');
const optionButtons = document.querySelectorAll('.option-btn');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const currentQuestionElement = document.getElementById('current-question');
const finalScoreElement = document.getElementById('final-score');
const scoreMessageElement = document.getElementById('score-message');
const restartButton = document.getElementById('restart-btn');
const quitButton = document.getElementById('quit-btn');

// 게임 변수들
let currentLevel = 1;
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft;
let questions = [];
let isAnswerSelected = false;

// 레벨 선택 이벤트 리스너
levelCards.forEach(card => {
    card.addEventListener('click', () => {
        // 모든 카드에서 selected 클래스 제거
        levelCards.forEach(c => c.classList.remove('selected'));
        // 선택한 카드에 selected 클래스 추가
        card.classList.add('selected');
        
        // 선택한 레벨 저장
        currentLevel = parseInt(card.dataset.level);
    });
});

// 시작 버튼 클릭 이벤트
startScreen.addEventListener('click', (e) => {
    // 레벨 카드가 아닌 다른 요소를 클릭한 경우 무시
    if (!e.target.closest('.level-card')) return;
    
    // 레벨을 선택하지 않은 경우 경고
    if (!currentLevel) {
        alert('레벨을 선택해주세요!');
        return;
    }
    
    playStartSound();
    setTimeout(() => startGame(), 500); // 사운드 재생 후 게임 시작
});

// 나가기 버튼 클릭 이벤트
quitButton.addEventListener('click', () => {
    if (confirm('정말로 게임을 종료하시겠습니까? 진행 상황은 저장되지 않습니다.')) {
        resetGame();
        showScreen('start-screen');
    }
});

// 다시 시작 버튼 클릭 이벤트
restartButton.addEventListener('click', () => {
    resetGame();
    showScreen('start-screen');
});

// 게임 시작 함수
function startGame() {
    // 게임 변수 초기화
    score = 0;
    currentQuestion = 0;
    
    // 선택한 레벨에 따른 문제 설정
    const levelKey = `level${currentLevel}`;
    const allQuestions = [...flagData[levelKey]];
    
    // 문제 섞기
    questions = [];
    const questionCount = currentLevel === 1 ? 10 : currentLevel === 2 ? 15 : 20;
    
    for (let i = 0; i < questionCount; i++) {
        const randomIndex = Math.floor(Math.random() * allQuestions.length);
        questions.push(allQuestions.splice(randomIndex, 1)[0]);
    }
    
    // 점수 표시 업데이트
    updateScore();
    
    // 퀴즈 화면으로 전환
    showScreen('quiz-screen');
    
    // 첫 번째 문제 표시
    showQuestion();
}

// 문제 표시 함수
function showQuestion() {
    // 현재 문제가 없으면 결과 화면으로
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }
    
    // 현재 문제 정보
    const question = questions[currentQuestion];
    
    // 국기 이미지 설정
    flagImage.src = question.flag;
    flagImage.alt = `${question.name} 국기`;
    
    // 보기 생성
    const options = generateOptions(question.name);
    
    // 보기 버튼에 텍스트 설정
    optionButtons.forEach((button, index) => {
        button.textContent = options[index];
        button.className = 'option-btn';
        button.disabled = false;
    });
    
    // 현재 문제 번호 업데이트
    currentQuestionElement.textContent = currentQuestion + 1;
    
    // 타이머 시작
    startTimer();
    
    // 답변 선택 상태 초기화
    isAnswerSelected = false;
    
    // 보기 버튼에 이벤트 리스너 추가
    optionButtons.forEach(button => {
        button.removeEventListener('click', handleAnswer);
        button.addEventListener('click', handleAnswer);
    });
}

// 보기 생성 함수
function generateOptions(correctAnswer) {
    const levelKey = `level${currentLevel}`;
    const allCountries = [];
    
    // 모든 국가 데이터를 하나의 배열로 합치기
    Object.keys(flagData).forEach(level => {
        flagData[level].forEach(country => {
            allCountries.push(country.name);
        });
    });
    
    const options = [correctAnswer];
    
    // 중복되지 않는 보기 3개 추가
    while (options.length < 4) {
        const randomIndex = Math.floor(Math.random() * allCountries.length);
        const randomCountry = allCountries[randomIndex];
        
        if (!options.includes(randomCountry)) {
            options.push(randomCountry);
        }
    }
    
    // 보기 섞기
    return shuffleArray(options);
}

// 사운드 효과 함수들
function playCorrectSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.3);
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
}

function playWrongSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.3);
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
}

function playClickSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
}

function playStartSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
    osc2.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.5);
    osc2.stop(ctx.currentTime + 0.5);
}

// 배열 섞기 함수
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 답변 처리 함수
function handleAnswer(e) {
    if (isAnswerSelected) return;
    
    playClickSound();
    
    const selectedButton = e.target;
    const selectedAnswer = selectedButton.textContent;
    const correctAnswer = questions[currentQuestion].name;
    
    // 타이머 정지
    clearInterval(timer);
    
    // 정답 확인
    const isCorrect = selectedAnswer === correctAnswer;
    
    // 정답/오답 스타일 적용 및 사운드 재생
    optionButtons.forEach(button => {
        button.disabled = true;
        
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        } else if (button === selectedButton && !isCorrect) {
            button.classList.add('incorrect');
        }
    });
    
    // 점수 업데이트 및 사운드 재생
    if (isCorrect) {
        score += Math.max(1, Math.floor(timeLeft / 2)); // 남은 시간에 따라 점수 부여
        updateScore();
        playCorrectSound();
    } else {
        playWrongSound();
    }
    
    isAnswerSelected = true;
    
    // 다음 문제로 이동 (1.5초 후)
    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1500);
}

// 타이머 시작 함수
function startTimer() {
    timeLeft = 10; // 10초 제한
    updateTimer();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeOut();
        }
    }, 1000);
}

// 타이머 업데이트 함수
function updateTimer() {
    timerElement.textContent = timeLeft;
    
    // 5초 이하일 때 경고 스타일 적용
    if (timeLeft <= 5) {
        timerElement.classList.add('warning');
    } else {
        timerElement.classList.remove('warning');
    }
}

// 시간 초과 처리 함수
function timeOut() {
    // 모든 버튼 비활성화
    optionButtons.forEach(button => {
        button.disabled = true;
    });
    
    // 정답 표시
    const correctAnswer = questions[currentQuestion].name;
    optionButtons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        }
    });
    
    // 1초 후 다음 문제로
    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1500);
}

// 점수 업데이트 함수
function updateScore() {
    scoreElement.textContent = score;
}

// 결과 화면 표시 함수
function showResult() {
    const totalQuestions = questions.length;
    const percentage = Math.round((score / (totalQuestions * 5)) * 100);
    
    // 최종 점수 표시
    finalScoreElement.textContent = `${score} / ${totalQuestions * 5}`;
    
    // 결과 메시지
    let message = '';
    if (percentage >= 90) {
        message = '훌륭해요! 국기 박사가 되셨네요! 🎉';
    } else if (percentage >= 70) {
        message = '잘 하셨어요! 거의 다 맞추셨네요! 👍';
    } else if (percentage >= 50) {
        message = '괜찮아요! 조금 더 연습하면 더 잘할 수 있어요! 😊';
    } else {
        message = '조금 아쉽네요. 다시 도전해보세요! 💪';
    }
    
    scoreMessageElement.textContent = message;
    
    // 결과 화면으로 전환
    showScreen('result-screen');
}

// 화면 전환 함수
function showScreen(screenId) {
    // 모든 화면 숨기기
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // 선택한 화면 표시
    document.getElementById(screenId).classList.add('active');
}

// 게임 리셋 함수
function resetGame() {
    // 타이머 정지
    clearInterval(timer);
    
    // 게임 변수 초기화
    currentQuestion = 0;
    score = 0;
    timeLeft = 10;
    isAnswerSelected = false;
    
    // UI 초기화
    updateScore();
    timerElement.textContent = timeLeft;
    timerElement.classList.remove('warning');
    
    // 선택된 레벨 카드 초기화
    levelCards.forEach(card => card.classList.remove('selected'));
    currentLevel = 0;
}

// 초기화
resetGame();
