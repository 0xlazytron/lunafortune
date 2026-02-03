'use client';

type LanguageCode = 'en' | 'pt' | 'es' | 'ja' | 'ro';

interface PrizeBadgeProps {
  prize: string;
  isVisible: boolean;
  language: LanguageCode;
}

const badgeTranslations: Record<
  LanguageCode,
  Record<
    'BONUS_100' | 'CASH_100' | 'SPINS_1000' | 'IPHONE_17' | 'TRY_AGAIN',
    { main: string; sub: string }
  >
> = {
  en: {
    BONUS_100: { main: '+100%', sub: 'BONUS' },
    CASH_100: { main: '$100', sub: 'CASH' },
    SPINS_1000: { main: '+1000', sub: 'FREE SPINS' },
    IPHONE_17: { main: 'iPHONE', sub: '17' },
    TRY_AGAIN: { main: 'TRY', sub: 'AGAIN' }
  },
  pt: {
    BONUS_100: { main: '+100%', sub: 'BÔNUS' },
    CASH_100: { main: '$100', sub: 'DINHEIRO' },
    SPINS_1000: { main: '+1000', sub: 'GIROS' },
    IPHONE_17: { main: 'iPhone', sub: '17' },
    TRY_AGAIN: { main: 'TENTE', sub: 'NOVAMENTE' }
  },
  es: {
    BONUS_100: { main: '+100%', sub: 'BONO' },
    CASH_100: { main: '$100', sub: 'EFECTIVO' },
    SPINS_1000: { main: '+1000', sub: 'GIROS' },
    IPHONE_17: { main: 'iPhone', sub: '17' },
    TRY_AGAIN: { main: 'INTÉNTALO', sub: 'DE NUEVO' }
  },
  ja: {
    BONUS_100: { main: '+100%', sub: 'ボーナス' },
    CASH_100: { main: '$100', sub: '現金' },
    SPINS_1000: { main: '＋1000', sub: 'フリースピン' },
    IPHONE_17: { main: 'アイフォン', sub: '17' },
    TRY_AGAIN: { main: 'もう', sub: '一度' }
  },
  ro: {
    BONUS_100: { main: '+100%', sub: 'BONUS' },
    CASH_100: { main: '$100', sub: 'BANI' },
    SPINS_1000: { main: '+1000', sub: 'ROTIRI' },
    IPHONE_17: { main: 'iPhone', sub: '17' },
    TRY_AGAIN: { main: 'ÎNCEARCĂ', sub: 'DIN NOU' }
  }
};

export default function PrizeBadge({ prize, isVisible, language }: PrizeBadgeProps) {
  if (!isVisible) return null;

  // Determine the content based on prize
  const getBadgeContent = () => {
    if (prize.includes('100% BONUS')) {
      return { key: 'BONUS_100' as const, color: 'red' };
    } else if (prize.includes('$100')) {
      return { key: 'CASH_100' as const, color: 'purple' };
    } else if (prize.includes('1000')) {
      return { key: 'SPINS_1000' as const, color: 'purple' };
    } else if (prize.includes('iPHONE')) {
      return { key: 'IPHONE_17' as const, color: 'purple' };
    } else if (prize.includes('TRY AGAIN')) {
      return { key: 'TRY_AGAIN' as const, color: 'purple' };
    }
    return null;
  };

  const config = getBadgeContent();
  if (!config) return null;

  const languageMap = badgeTranslations[language] ?? badgeTranslations.en;
  const content = languageMap[config.key] ?? badgeTranslations.en[config.key];

  return (
    <div className={`prize-badge prize-badge--${config.color}`}>
      <div className="prize-badge__content">
        <div className="prize-badge__main">{content.main}</div>
        <div className="prize-badge__sub">{content.sub}</div>
      </div>
    </div>
  );
}
