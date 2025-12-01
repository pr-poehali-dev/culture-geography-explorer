import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Country {
  id: string;
  name: string;
  flag: string;
  region: string;
  capital: string;
  population: string;
  language: string;
  currency: string;
  landmarks: string[];
  cuisine: string[];
  culture: string[];
  geography: string;
}

const countries: Country[] = [
  {
    id: 'japan',
    name: 'Япония',
    flag: '🇯🇵',
    region: 'Восточная Азия',
    capital: 'Токио',
    population: '125 млн',
    language: 'Японский',
    currency: 'Иена',
    landmarks: ['Гора Фуджи', 'Храм Сэнсо-дзи', 'Замок Химэдзи', 'Токийская башня'],
    cuisine: ['Суши', 'Рамен', 'Темпура', 'Якитори', 'Онигири'],
    culture: ['Чайная церемония', 'Икебана', 'Каллиграфия', 'Оригами', 'Кимоно'],
    geography: 'Островное государство, состоящее из 4 крупных и тысяч малых островов. Горный рельеф, активная вулканическая деятельность.'
  },
  {
    id: 'italy',
    name: 'Италия',
    flag: '🇮🇹',
    region: 'Южная Европа',
    capital: 'Рим',
    population: '60 млн',
    language: 'Итальянский',
    currency: 'Евро',
    landmarks: ['Колизей', 'Пизанская башня', 'Венецианские каналы', 'Ватикан'],
    cuisine: ['Пицца', 'Паста', 'Ризотто', 'Джелато', 'Тирамису'],
    culture: ['Опера', 'Мода', 'Архитектура Ренессанса', 'Карнавал', 'Виноделие'],
    geography: 'Полуостров в форме сапога. Альпы на севере, Апеннины вдоль всей страны. Омывается тремя морями.'
  },
  {
    id: 'brazil',
    name: 'Бразилия',
    flag: '🇧🇷',
    region: 'Южная Америка',
    capital: 'Бразилиа',
    population: '215 млн',
    language: 'Португальский',
    currency: 'Реал',
    landmarks: ['Статуя Христа-Искупителя', 'Водопады Игуасу', 'Амазонка', 'Копакабана'],
    cuisine: ['Фейжоада', 'Шураско', 'Акарахе', 'Бригадейро', 'Кайпиринья'],
    culture: ['Самба', 'Карнавал', 'Капоэйра', 'Футбол', 'Босса-нова'],
    geography: 'Крупнейшая страна Южной Америки. Бассейн реки Амазонки, тропические леса, саванны и горные плато.'
  },
  {
    id: 'egypt',
    name: 'Египет',
    flag: '🇪🇬',
    region: 'Северная Африка',
    capital: 'Каир',
    population: '104 млн',
    language: 'Арабский',
    currency: 'Фунт',
    landmarks: ['Пирамиды Гизы', 'Сфинкс', 'Луксор', 'Абу-Симбел'],
    cuisine: ['Кошари', 'Фуль', 'Таамия', 'Молохия', 'Кунафа'],
    culture: ['Древние иероглифы', 'Танец живота', 'Папирус', 'Кальян', 'Базары'],
    geography: 'Пустынная страна с оазисами. Река Нил пересекает всю территорию. Красное и Средиземное моря.'
  },
  {
    id: 'australia',
    name: 'Австралия',
    flag: '🇦🇺',
    region: 'Океания',
    capital: 'Канберра',
    population: '26 млн',
    language: 'Английский',
    currency: 'Доллар',
    landmarks: ['Сиднейский оперный театр', 'Большой Барьерный риф', 'Улуру', '12 апостолов'],
    cuisine: ['Мясные пироги', 'Веджимайт', 'Ламингтон', 'Павлова', 'Барбекю'],
    culture: ['Культура аборигенов', 'Сёрфинг', 'Крикет', 'Диджериду', 'Буш'],
    geography: 'Континент-остров с разнообразными ландшафтами: пустыни, тропические леса, горы и побережья.'
  },
  {
    id: 'india',
    name: 'Индия',
    flag: '🇮🇳',
    region: 'Южная Азия',
    capital: 'Нью-Дели',
    population: '1.4 млрд',
    language: 'Хинди, Английский',
    currency: 'Рупия',
    landmarks: ['Тадж-Махал', 'Красный форт', 'Ворота Индии', 'Джайпур'],
    cuisine: ['Карри', 'Бирьяни', 'Тандури', 'Самоса', 'Наан'],
    culture: ['Йога', 'Болливуд', 'Классические танцы', 'Дивали', 'Мехенди'],
    geography: 'Разнообразный рельеф: Гималаи на севере, плато Декан в центре, прибрежные равнины.'
  }
];

export default function Index() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [activeSection, setActiveSection] = useState<string>('all');

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleCloseDetail = () => {
    setSelectedCountry(null);
  };

  const filteredCountries = activeSection === 'all' 
    ? countries 
    : countries.filter(c => c.region.toLowerCase().includes(activeSection.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-vivid-purple/10 via-ocean-blue/10 to-bright-orange/10">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-vivid-purple via-ocean-blue to-bright-orange bg-clip-text text-transparent">
            🌍 Мир культур
          </h1>
          <p className="text-xl text-muted-foreground">
            Исследуй культуры и географию стран мира
          </p>
        </header>

        <div className="mb-8 flex flex-wrap gap-3 justify-center animate-scale-in">
          <Button
            onClick={() => setActiveSection('all')}
            variant={activeSection === 'all' ? 'default' : 'outline'}
            className="rounded-full transition-all hover:scale-105"
          >
            <Icon name="Globe" className="mr-2" size={18} />
            Все страны
          </Button>
          <Button
            onClick={() => setActiveSection('азия')}
            variant={activeSection === 'азия' ? 'default' : 'outline'}
            className="rounded-full transition-all hover:scale-105"
          >
            Азия
          </Button>
          <Button
            onClick={() => setActiveSection('европа')}
            variant={activeSection === 'европа' ? 'default' : 'outline'}
            className="rounded-full transition-all hover:scale-105"
          >
            Европа
          </Button>
          <Button
            onClick={() => setActiveSection('америка')}
            variant={activeSection === 'америка' ? 'default' : 'outline'}
            className="rounded-full transition-all hover:scale-105"
          >
            Америка
          </Button>
          <Button
            onClick={() => setActiveSection('африка')}
            variant={activeSection === 'африка' ? 'default' : 'outline'}
            className="rounded-full transition-all hover:scale-105"
          >
            Африка
          </Button>
          <Button
            onClick={() => setActiveSection('океания')}
            variant={activeSection === 'океания' ? 'default' : 'outline'}
            className="rounded-full transition-all hover:scale-105"
          >
            Океания
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCountries.map((country, index) => (
            <Card
              key={country.id}
              onClick={() => handleCountryClick(country)}
              className="p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {country.flag}
                </div>
                <h3 className="text-2xl font-bold mb-2">{country.name}</h3>
                <Badge variant="secondary" className="mb-3">
                  {country.region}
                </Badge>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Icon name="MapPin" size={16} />
                    <span>{country.capital}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Icon name="Users" size={16} />
                    <span>{country.population}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedCountry && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={handleCloseDetail}
          >
            <Card
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl">{selectedCountry.flag}</span>
                    <div>
                      <h2 className="text-4xl font-bold mb-1">{selectedCountry.name}</h2>
                      <Badge variant="secondary" className="text-base">
                        {selectedCountry.region}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={handleCloseDetail}
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-destructive/10"
                  >
                    <Icon name="X" size={24} />
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-vivid-purple/10 rounded-lg">
                    <Icon name="MapPin" className="mx-auto mb-2" size={24} />
                    <div className="text-sm text-muted-foreground">Столица</div>
                    <div className="font-semibold">{selectedCountry.capital}</div>
                  </div>
                  <div className="text-center p-4 bg-ocean-blue/10 rounded-lg">
                    <Icon name="Users" className="mx-auto mb-2" size={24} />
                    <div className="text-sm text-muted-foreground">Население</div>
                    <div className="font-semibold">{selectedCountry.population}</div>
                  </div>
                  <div className="text-center p-4 bg-bright-orange/10 rounded-lg">
                    <Icon name="MessageCircle" className="mx-auto mb-2" size={24} />
                    <div className="text-sm text-muted-foreground">Язык</div>
                    <div className="font-semibold">{selectedCountry.language}</div>
                  </div>
                  <div className="text-center p-4 bg-magenta-pink/10 rounded-lg">
                    <Icon name="DollarSign" className="mx-auto mb-2" size={24} />
                    <div className="text-sm text-muted-foreground">Валюта</div>
                    <div className="font-semibold">{selectedCountry.currency}</div>
                  </div>
                </div>

                <Tabs defaultValue="geography" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="geography" className="gap-2">
                      <Icon name="Mountain" size={16} />
                      География
                    </TabsTrigger>
                    <TabsTrigger value="landmarks" className="gap-2">
                      <Icon name="Landmark" size={16} />
                      Места
                    </TabsTrigger>
                    <TabsTrigger value="cuisine" className="gap-2">
                      <Icon name="UtensilsCrossed" size={16} />
                      Кухня
                    </TabsTrigger>
                    <TabsTrigger value="culture" className="gap-2">
                      <Icon name="Sparkles" size={16} />
                      Культура
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="geography" className="space-y-4">
                    <div className="p-6 bg-gradient-to-br from-vivid-purple/5 to-ocean-blue/5 rounded-lg">
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Icon name="Map" size={20} />
                        Географическое положение
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedCountry.geography}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="landmarks" className="space-y-3">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Camera" size={20} />
                      Главные достопримечательности
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedCountry.landmarks.map((landmark, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-gradient-to-br from-bright-orange/5 to-magenta-pink/5 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-bright-orange/20 flex items-center justify-center font-bold text-bright-orange">
                              {idx + 1}
                            </div>
                            <span className="font-medium">{landmark}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="cuisine" className="space-y-3">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Icon name="ChefHat" size={20} />
                      Национальная кухня
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedCountry.cuisine.map((dish, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-gradient-to-br from-ocean-blue/5 to-vivid-purple/5 rounded-lg text-center hover:scale-105 transition-transform"
                        >
                          <div className="text-3xl mb-2">🍽️</div>
                          <span className="font-medium">{dish}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="culture" className="space-y-3">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Theater" size={20} />
                      Культурные особенности
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedCountry.culture.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-gradient-to-br from-magenta-pink/5 to-bright-orange/5 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-3">
                            <Icon name="Sparkle" size={20} className="text-magenta-pink" />
                            <span className="font-medium">{item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
