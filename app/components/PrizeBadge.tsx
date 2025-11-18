'use client';

interface PrizeBadgeProps {
  prize: string;
  isVisible: boolean;
}

export default function PrizeBadge({ prize, isVisible }: PrizeBadgeProps) {
  if (!isVisible) return null;

  // Determine the content based on prize
  const getBadgeContent = () => {
    if (prize.includes('100% BONUS')) {
      return { main: '+100%', sub: 'BONUS', color: 'red' };
    } else if (prize.includes('$100')) {
      return { main: '$100', sub: 'CASH', color: 'purple' };
    } else if (prize.includes('1000')) {
      return { main: '+1000', sub: 'FREE SPINS', color: 'purple' };
    } else if (prize.includes('iPHONE')) {
      return { main: 'iPHONE', sub: '17', color: 'purple' };
    } else if (prize.includes('TRY AGAIN')) {
      return { main: 'TRY', sub: 'AGAIN', color: 'purple' };
    }
    return null;
  };

  const content = getBadgeContent();
  if (!content) return null;

  return (
    <div className={`prize-badge prize-badge--${content.color}`}>
      <div className="prize-badge__content">
        <div className="prize-badge__main">{content.main}</div>
        <div className="prize-badge__sub">{content.sub}</div>
      </div>
    </div>
  );
}

