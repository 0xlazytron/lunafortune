'use client';

interface RegistrationModalProps {
  prize: string;
  onClose: () => void;
}

export default function RegistrationModal({ prize, onClose }: RegistrationModalProps) {
  // Determine subtitle based on prize type
  const getSubtitle = () => {
    if (prize.includes('BONUS')) return 'TO YOUR DEPOSIT';
    if (prize.includes('CASH')) return '';
    if (prize.includes('FREE SPINS')) return '';
    if (prize.includes('iPHONE')) return '';
    return '';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-registration" onClick={(e) => e.stopPropagation()}>
        {/* Zeus Character Header */}
        <div className="modal-registration__header">
          <div className="modal-registration__character">
            <img src="/assets/images/reg/regpopup.webp" alt="Registration Character" />
          </div>
          <div className="modal-registration__wrap">
            <span className="modal-registration__text modal-registration__text_md">YOU WON</span>
          </div>
          <div className="modal-registration__bonus-wrapper">
            <span className="modal-registration__text modal-registration__text_xxl">{prize}</span>
            {getSubtitle() && (
              <span className="modal-registration__text modal-registration__text_xl">{getSubtitle()}</span>
            )}
          </div>

        </div>

        {/* Registration Form */}
        <div className="form">
          <div className="form__field">
            <div className="phone-input">
              <select className="phone-input__code">
                <option value="+48">🇵🇱 +48</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <input
                type="tel"
                placeholder="Phone"
                className="phone-input__number"
              />
            </div>
          </div>

          <div className="form__field">
            <input
              type="email"
              placeholder="Email"
              className="form__input"
            />
          </div>

          <div className="form__field">
            <input
              type="password"
              placeholder="Password"
              className="form__input"
            />
          </div>

          <div className="form__field">
            <select className="form__select">
              <option value="PLN">🇵🇱 Polish złoty (PLN)</option>
              <option value="USD">🇺🇸 US Dollar (USD)</option>
              <option value="EUR">🇪🇺 Euro (EUR)</option>
            </select>
            <a href="#" className="form__promo-link">Add promo code</a>
          </div>

          <button className="form__button" type="submit">
            CLAIM YOUR BONUSES
          </button>

          <p className="form__footer">
            Already have an account? <a href="#" className="form__link">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

