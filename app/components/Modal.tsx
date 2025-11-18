'use client';

interface ModalProps {
  prize: string;
  tries: number;
  onClose: () => void;
}

export default function Modal({ prize, tries, onClose }: ModalProps) {
  const isGameOver = tries === 0 && prize === 'NO MORE TRIES';
  const isTryAgain = prize === 'TRY AGAIN';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {isGameOver ? (
          <>
            <h2 className="modal__title">🎰 GAME OVER!</h2>
            <p className="modal__message">
              You've used all your tries!
              <br /><br />
              <strong style={{ fontSize: '20px', color: '#ffd700' }}>
                Sign up now to get more spins and amazing bonuses!
              </strong>
            </p>
            <button className="modal__button" onClick={onClose}>
              SIGN UP NOW
            </button>
          </>
        ) : isTryAgain ? (
          <>
            <h2 className="modal__title" style={{ color: '#ff6b6b' }}>😔 TRY AGAIN!</h2>
            <p className="modal__message">
              Better luck next time!
              <br /><br />
              {tries > 0 ? (
                <>You have <strong style={{ color: '#ffd700' }}>{tries} {tries === 1 ? 'try' : 'tries'}</strong> remaining!</>
              ) : (
                'Sign up to get more spins!'
              )}
            </p>
            <button className="modal__button" onClick={onClose}>
              {tries > 0 ? 'CONTINUE' : 'SIGN UP NOW'}
            </button>
          </>
        ) : (
          <>
            <h2 className="modal__title">🎉 CONGRATULATIONS!</h2>
            <p className="modal__message">
              You won:
              <br />
              <strong style={{ 
                fontSize: '32px', 
                color: '#ffd700',
                display: 'block',
                margin: '20px 0',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
              }}>
                {prize}
              </strong>
              {tries > 0 ? (
                <>You have <strong style={{ color: '#ffd700' }}>{tries} {tries === 1 ? 'try' : 'tries'}</strong> remaining!</>
              ) : (
                <strong style={{ fontSize: '18px', color: '#ffd700' }}>
                  Sign up now to claim your prize!
                </strong>
              )}
            </p>
            <button className="modal__button" onClick={onClose}>
              {tries > 0 ? 'CONTINUE PLAYING' : 'CLAIM YOUR PRIZE'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
