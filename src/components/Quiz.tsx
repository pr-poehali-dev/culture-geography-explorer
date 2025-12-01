import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { countries, Country } from '@/data/countries';

type QuizMode = 'flag' | 'landmark' | 'cuisine';

interface QuizQuestion {
  country: Country;
  options: Country[];
  mode: QuizMode;
}

export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<QuizMode>('flag');
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalQuestions = 10;

  const generateQuestion = (): QuizQuestion => {
    const correctCountry = countries[Math.floor(Math.random() * countries.length)];
    const wrongCountries = countries
      .filter(c => c.id !== correctCountry.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    const options = [correctCountry, ...wrongCountries].sort(() => 0.5 - Math.random());
    
    return {
      country: correctCountry,
      options,
      mode
    };
  };

  const startQuiz = (selectedMode: QuizMode) => {
    setMode(selectedMode);
    setStarted(true);
    setQuestionNumber(1);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setCurrentQuestion(generateQuestion());
  };

  const handleAnswer = (countryId: string) => {
    if (answered) return;
    
    setSelectedAnswer(countryId);
    setAnswered(true);
    
    if (countryId === currentQuestion?.country.id) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const nextQuestion = () => {
    if (questionNumber < totalQuestions) {
      setQuestionNumber(questionNumber + 1);
      setAnswered(false);
      setSelectedAnswer(null);
      setCurrentQuestion(generateQuestion());
    } else {
      setStarted(false);
    }
  };

  const getQuestionPrompt = () => {
    if (!currentQuestion) return '';
    
    switch (mode) {
      case 'flag':
        return `Какой стране принадлежит этот флаг?`;
      case 'landmark':
        return `В какой стране находится: ${currentQuestion.country.landmarks[0]}?`;
      case 'cuisine':
        return `В какой стране готовят: ${currentQuestion.country.cuisine[0]}?`;
    }
  };

  const getQuestionContent = () => {
    if (!currentQuestion) return null;
    
    switch (mode) {
      case 'flag':
        return <div className="text-9xl mb-8 animate-scale-in">{currentQuestion.country.flag}</div>;
      case 'landmark':
        return (
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <Icon name="Landmark" size={48} className="text-vivid-purple" />
            <span className="text-4xl font-bold">{currentQuestion.country.landmarks[0]}</span>
          </div>
        );
      case 'cuisine':
        return (
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <Icon name="UtensilsCrossed" size={48} className="text-bright-orange" />
            <span className="text-4xl font-bold">{currentQuestion.country.cuisine[0]}</span>
          </div>
        );
    }
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-vivid-purple/10 via-ocean-blue/10 to-bright-orange/10 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 animate-scale-in">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-vivid-purple via-ocean-blue to-bright-orange bg-clip-text text-transparent">
              Викторина: Проверь свои знания!
            </h2>
            <p className="text-muted-foreground text-lg">
              Выбери режим игры и проверь, как хорошо ты знаешь страны мира
            </p>
          </div>

          {questionNumber === 0 && score === 0 ? (
            <div className="space-y-4">
              <Button
                onClick={() => startQuiz('flag')}
                className="w-full h-24 text-xl hover:scale-105 transition-transform"
                variant="outline"
              >
                <Icon name="Flag" className="mr-3" size={32} />
                Угадай страну по флагу
              </Button>
              <Button
                onClick={() => startQuiz('landmark')}
                className="w-full h-24 text-xl hover:scale-105 transition-transform"
                variant="outline"
              >
                <Icon name="Landmark" className="mr-3" size={32} />
                Угадай страну по достопримечательности
              </Button>
              <Button
                onClick={() => startQuiz('cuisine')}
                className="w-full h-24 text-xl hover:scale-105 transition-transform"
                variant="outline"
              >
                <Icon name="UtensilsCrossed" className="mr-3" size={32} />
                Угадай страну по блюду
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="text-7xl mb-4">
                {score >= 8 ? '🏆' : score >= 5 ? '🎉' : '👍'}
              </div>
              <h3 className="text-3xl font-bold">
                Результат: {score} из {totalQuestions}
              </h3>
              <p className="text-xl text-muted-foreground">
                {score >= 8 ? 'Отлично! Ты настоящий знаток!' : 
                 score >= 5 ? 'Хорошо! Продолжай изучать мир!' :
                 'Неплохо! Есть куда расти!'}
              </p>
              <Button
                onClick={() => {
                  setQuestionNumber(0);
                  setScore(0);
                }}
                className="w-full h-16 text-xl"
                size="lg"
              >
                <Icon name="RotateCcw" className="mr-2" size={24} />
                Попробовать еще раз
              </Button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vivid-purple/10 via-ocean-blue/10 to-bright-orange/10 p-4">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-8xl animate-scale-in">🎊</div>
        </div>
      )}
      
      <div className="container mx-auto max-w-3xl py-8">
        <div className="mb-6 flex justify-between items-center">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Вопрос {questionNumber} / {totalQuestions}
          </Badge>
          <Badge className="text-lg px-4 py-2 bg-vivid-purple">
            <Icon name="Trophy" className="mr-2" size={18} />
            Счёт: {score}
          </Badge>
        </div>

        <Progress value={(questionNumber / totalQuestions) * 100} className="mb-8 h-3" />

        <Card className="p-8 animate-fade-in">
          <h3 className="text-2xl font-bold text-center mb-6">{getQuestionPrompt()}</h3>
          
          <div className="flex justify-center mb-8">
            {getQuestionContent()}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion?.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.id === currentQuestion.country.id;
              const showResult = answered;

              const buttonVariant: 'default' | 'outline' | 'destructive' = 'outline';
              let buttonClass = 'h-20 text-xl transition-all hover:scale-105';

              if (showResult) {
                if (isCorrect) {
                  buttonClass += ' bg-green-500 hover:bg-green-600 text-white border-green-500';
                } else if (isSelected && !isCorrect) {
                  buttonClass += ' bg-red-500 hover:bg-red-600 text-white border-red-500';
                }
              }

              return (
                <Button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  variant={buttonVariant}
                  className={buttonClass}
                  disabled={answered}
                >
                  <span className="text-3xl mr-3">{option.flag}</span>
                  <span>{option.name}</span>
                  {showResult && isCorrect && <Icon name="Check" className="ml-auto" size={24} />}
                  {showResult && isSelected && !isCorrect && <Icon name="X" className="ml-auto" size={24} />}
                </Button>
              );
            })}
          </div>

          {answered && (
            <div className="mt-8 text-center space-y-4 animate-fade-in">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-lg">
                  {selectedAnswer === currentQuestion?.country.id ? (
                    <span className="text-green-600 font-bold">✓ Правильно!</span>
                  ) : (
                    <span className="text-red-600 font-bold">✗ Неправильно</span>
                  )}
                </p>
                <p className="text-muted-foreground mt-2">
                  Столица: {currentQuestion?.country.capital} | Население: {currentQuestion?.country.population}
                </p>
              </div>
              <Button onClick={nextQuestion} size="lg" className="w-full h-16 text-xl">
                {questionNumber < totalQuestions ? (
                  <>
                    Следующий вопрос
                    <Icon name="ArrowRight" className="ml-2" size={24} />
                  </>
                ) : (
                  <>
                    Показать результаты
                    <Icon name="Trophy" className="ml-2" size={24} />
                  </>
                )}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
