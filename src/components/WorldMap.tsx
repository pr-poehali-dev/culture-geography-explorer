import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { countries } from '@/data/countries';

type Region = 'Восточная Азия' | 'Южная Азия' | 'Западная Азия' | 'Юго-Восточная Азия' | 'Южная Европа' | 'Западная Европа' | 'Центральная Европа' | 'Северная Америка' | 'Южная Америка' | 'Центральная Америка' | 'Северная Африка' | 'Южная Африка' | 'Океания';

export default function WorldMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const regionStats = countries.reduce((acc, country) => {
    acc[country.region] = (acc[country.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const regions = [
    { name: 'Восточная Азия', color: '#8B5CF6', x: 70, y: 30 },
    { name: 'Южная Азия', color: '#D946EF', x: 65, y: 45 },
    { name: 'Западная Азия', color: '#F97316', x: 55, y: 40 },
    { name: 'Юго-Восточная Азия', color: '#0EA5E9', x: 72, y: 50 },
    { name: 'Южная Европа', color: '#8B5CF6', x: 45, y: 35 },
    { name: 'Западная Европа', color: '#D946EF', x: 40, y: 30 },
    { name: 'Центральная Европа', color: '#F97316', x: 45, y: 28 },
    { name: 'Северная Америка', color: '#0EA5E9', x: 15, y: 25 },
    { name: 'Южная Америка', color: '#8B5CF6', x: 25, y: 60 },
    { name: 'Центральная Америка', color: '#D946EF', x: 18, y: 48 },
    { name: 'Северная Африка', color: '#F97316', x: 45, y: 50 },
    { name: 'Южная Африка', color: '#0EA5E9', x: 48, y: 70 },
    { name: 'Океания', color: '#8B5CF6', x: 85, y: 65 }
  ];

  const selectedCountries = selectedRegion 
    ? countries.filter(c => c.region === selectedRegion)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-vivid-purple/10 via-ocean-blue/10 to-bright-orange/10 p-4">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-vivid-purple via-ocean-blue to-bright-orange bg-clip-text text-transparent">
            🗺️ Интерактивная карта мира
          </h2>
          <p className="text-xl text-muted-foreground">
            Нажми на регион, чтобы узнать о странах
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 animate-scale-in">
              <div className="relative w-full aspect-[2/1] bg-gradient-to-br from-ocean-blue/5 to-vivid-purple/5 rounded-lg overflow-hidden">
                <svg viewBox="0 0 100 80" className="w-full h-full">
                  <defs>
                    <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#0EA5E9', stopOpacity: 0.1 }} />
                      <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.1 }} />
                    </linearGradient>
                  </defs>

                  <rect width="100" height="80" fill="url(#oceanGrad)" />

                  {regions.map((region) => {
                    const isHovered = hoveredRegion === region.name;
                    const isSelected = selectedRegion === region.name;
                    const count = regionStats[region.name] || 0;
                    
                    return (
                      <g key={region.name}>
                        <circle
                          cx={region.x}
                          cy={region.y}
                          r={isHovered || isSelected ? 6 : 5}
                          fill={region.color}
                          opacity={isHovered || isSelected ? 1 : 0.7}
                          className="cursor-pointer transition-all duration-300"
                          style={{
                            filter: isHovered || isSelected ? 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.8))' : 'none',
                            animation: isSelected ? 'pulse 2s ease-in-out infinite' : 'none'
                          }}
                          onMouseEnter={() => setHoveredRegion(region.name)}
                          onMouseLeave={() => setHoveredRegion(null)}
                          onClick={() => setSelectedRegion(region.name === selectedRegion ? null : region.name)}
                        />
                        {count > 0 && (
                          <text
                            x={region.x}
                            y={region.y - 8}
                            textAnchor="middle"
                            fontSize="3"
                            fontWeight="bold"
                            fill={region.color}
                            className="pointer-events-none"
                          >
                            {count}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>

                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur p-3 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-vivid-purple animate-pulse" />
                    <span className="text-muted-foreground">Активные регионы</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
                {regions.map((region) => {
                  const count = regionStats[region.name] || 0;
                  if (count === 0) return null;
                  
                  return (
                    <button
                      key={region.name}
                      onClick={() => setSelectedRegion(region.name === selectedRegion ? null : region.name)}
                      onMouseEnter={() => setHoveredRegion(region.name)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedRegion === region.name 
                          ? 'border-vivid-purple bg-vivid-purple/10' 
                          : 'border-transparent bg-muted/50 hover:border-muted'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: region.color }}
                        />
                        <span className="text-sm font-medium text-left">{region.name}</span>
                      </div>
                      <Badge variant="secondary" className="mt-2">
                        {count} {count === 1 ? 'страна' : 'стран'}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              {selectedRegion ? (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{selectedRegion}</h3>
                    <Badge className="bg-vivid-purple">
                      {selectedCountries.length} {selectedCountries.length === 1 ? 'страна' : 'стран'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {selectedCountries.map((country) => (
                      <div
                        key={country.id}
                        className="p-4 bg-gradient-to-br from-vivid-purple/5 to-ocean-blue/5 rounded-lg hover:shadow-md transition-all hover:scale-105"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-4xl">{country.flag}</span>
                          <div>
                            <div className="font-bold text-lg">{country.name}</div>
                            <div className="text-sm text-muted-foreground">{country.capital}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                          <div className="flex items-center gap-1">
                            <Icon name="Users" size={12} />
                            <span>{country.population}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="MessageCircle" size={12} />
                            <span>{country.language}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="MousePointerClick" size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Выбери регион на карте</p>
                  <p className="text-sm mt-2">чтобы увидеть список стран</p>
                </div>
              )}
            </Card>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-6 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Icon name="Globe" size={32} className="mx-auto mb-2 text-vivid-purple" />
            <div className="text-3xl font-bold">{countries.length}</div>
            <div className="text-sm text-muted-foreground">Стран в базе</div>
          </Card>
          <Card className="p-6 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Icon name="Map" size={32} className="mx-auto mb-2 text-ocean-blue" />
            <div className="text-3xl font-bold">{Object.keys(regionStats).length}</div>
            <div className="text-sm text-muted-foreground">Регионов</div>
          </Card>
          <Card className="p-6 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Icon name="Users" size={32} className="mx-auto mb-2 text-bright-orange" />
            <div className="text-3xl font-bold">5.4+</div>
            <div className="text-sm text-muted-foreground">Млрд людей</div>
          </Card>
          <Card className="p-6 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Icon name="Languages" size={32} className="mx-auto mb-2 text-magenta-pink" />
            <div className="text-3xl font-bold">20+</div>
            <div className="text-sm text-muted-foreground">Языков</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
