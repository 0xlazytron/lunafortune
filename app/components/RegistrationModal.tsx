/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import countryDialCodes, { CountryDialCode } from '../data/countryDialCodes';

type LanguageCode = 'en' | 'pt' | 'es' | 'ja' | 'ro';

interface RegistrationModalProps {
  prize: string;
  onClose: () => void;
  language: LanguageCode;
}

const modalTranslations: Record<
  LanguageCode,
  {
    youWon: string;
    toYourDeposit: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    hidePasswordAria: string;
    showPasswordAria: string;
    submitButton: string;
    footerText: string;
    footerLink: string;
    emailError: string;
    passwordError: string;
  }
> = {
  en: {
    youWon: 'YOU WON',
    toYourDeposit: 'TO YOUR DEPOSIT',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    hidePasswordAria: 'Hide password',
    showPasswordAria: 'Show password',
    submitButton: 'REGISTER CLAIM YOUR BONUSES',
    footerText: 'Already have an account?',
    footerLink: 'Log in',
    emailError: 'Enter a valid e-mail address',
    passwordError: 'The password should be at least 6 characters'
  },
  pt: {
    youWon: 'VOCÊ GANHOU',
    toYourDeposit: 'NO SEU DEPÓSITO',
    emailPlaceholder: 'E-mail',
    passwordPlaceholder: 'Senha',
    hidePasswordAria: 'Ocultar senha',
    showPasswordAria: 'Mostrar senha',
    submitButton: 'REGISTRE-SE E RESGATE SEUS BÔNUS',
    footerText: 'Já tem uma conta?',
    footerLink: 'Entrar',
    emailError: 'Digite um e-mail válido',
    passwordError: 'A senha deve ter pelo menos 6 caracteres'
  },
  es: {
    youWon: 'HAS GANADO',
    toYourDeposit: 'EN TU DEPÓSITO',
    emailPlaceholder: 'Correo electrónico',
    passwordPlaceholder: 'Contraseña',
    hidePasswordAria: 'Ocultar contraseña',
    showPasswordAria: 'Mostrar contraseña',
    submitButton: 'REGÍSTRATE Y RECLAMA TUS BONOS',
    footerText: '¿Ya tienes una cuenta?',
    footerLink: 'Iniciar sesión',
    emailError: 'Introduce un correo electrónico válido',
    passwordError: 'La contraseña debe tener al menos 6 caracteres'
  },
  ja: {
    youWon: 'おめでとうございます',
    toYourDeposit: '入金に適用されます',
    emailPlaceholder: 'メールアドレス',
    passwordPlaceholder: 'パスワード',
    hidePasswordAria: 'パスワードを非表示',
    showPasswordAria: 'パスワードを表示',
    submitButton: '登録してボーナスを受け取る',
    footerText: 'すでにアカウントをお持ちですか？',
    footerLink: 'ログイン',
    emailError: '有効なメールアドレスを入力してください',
    passwordError: 'パスワードは6文字以上で入力してください'
  },
  ro: {
    youWon: 'AI CÂȘTIGAT',
    toYourDeposit: 'LA DEPUNEREA TA',
    emailPlaceholder: 'E-mail',
    passwordPlaceholder: 'Parolă',
    hidePasswordAria: 'Ascunde parola',
    showPasswordAria: 'Afișează parola',
    submitButton: 'ÎNREGISTREAZĂ-TE ȘI REIVENDICĂ-ȚI BONUSURILE',
    footerText: 'Ai deja un cont?',
    footerLink: 'Conectează-te',
    emailError: 'Introdu o adresă de e-mail validă',
    passwordError: 'Parola trebuie să aibă cel puțin 6 caractere'
  }
};

export default function RegistrationModal({ prize, onClose, language }: RegistrationModalProps) {
  const t = modalTranslations[language] ?? modalTranslations.en;

  const getSubtitle = () => {
    if (prize.includes('BONUS')) return t.toYourDeposit;
    if (prize.includes('CASH')) return '';
    if (prize.includes('FREE SPINS')) return '';
    if (prize.includes('iPHONE')) return '';
    return '';
  };

  const [countryOpen, setCountryOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryDialCode>(() => {
    const def = countryDialCodes.find((c) => c.iso2 === 'pl');
    return def ?? countryDialCodes[0];
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; email?: string; password?: string }>({});

  type Currency = { code: string; name: string; symbol: string };
  const currencies: Currency[] = [
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'UAH', name: 'Ukrainian hryvnia', symbol: '₴' },
    { code: 'RUB', name: 'Russian ruble', symbol: '₽' },
    { code: 'USD', name: 'US dollar', symbol: '$' },
    { code: 'KZT', name: 'Kazakhstani tenge', symbol: '₸' },
    { code: 'PLN', name: 'Polish złoty', symbol: 'zł' },
    { code: 'PKR', name: 'Pakistan rupee', symbol: '₨' },
    { code: 'GBP', name: 'British pound', symbol: '£' },
    { code: 'TRY', name: 'Turkish lira', symbol: '₺' },
    { code: 'BRL', name: 'Brazilian real', symbol: 'R$' },
    { code: 'INR', name: 'Indian rupee', symbol: '₹' },
    { code: 'KGS', name: 'Kyrgyzstani som', symbol: '⃀' },
    { code: 'KWD', name: 'Kuwaiti dinar', symbol: 'د.ك' },
  ];
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(() => currencies.find((c) => c.code === 'PLN') ?? currencies[0]);

  const countryBtnRef = useRef<HTMLButtonElement | null>(null);
  const countryModalRef = useRef<HTMLDivElement | null>(null);
  const currencyBtnRef = useRef<HTMLButtonElement | null>(null);
  const currencyModalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryOpen) {
        const t = e.target as Node;
        if (countryModalRef.current && !countryModalRef.current.contains(t) && countryBtnRef.current && !countryBtnRef.current.contains(t)) {
          setCountryOpen(false);
        }
      }
      if (currencyOpen) {
        const t = e.target as Node;
        if (currencyModalRef.current && !currencyModalRef.current.contains(t) && currencyBtnRef.current && !currencyBtnRef.current.contains(t)) {
          setCurrencyOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [countryOpen, currencyOpen]);

  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return countryDialCodes;
    return countryDialCodes.filter((c) => c.name.toLowerCase().includes(q));
  }, [searchQuery]);

  /*
  const validate = () => {
    const newErrors: { phone?: string; email?: string; password?: string } = {};
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) newErrors.email = t.emailError;
    if (password.length < 6) newErrors.password = t.passwordError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  */

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (!validate()) return;
    const payload = {
      email,
      password
    };
    console.log('Registration payload', payload);
    window.location.href = 'https://mrluna.io';
  };

  return (
    <div className="modal-overlay">
      <div className="modal-registration" onClick={(e) => e.stopPropagation()}>
        {/* Zeus Character Header */}
        <div className="modal-registration__header">
          <div className="modal-registration__character">
            <img src="/assets/images/reg/regpopup.webp" alt="Registration Character" />
          </div>
          <div className="modal-registration__wrap">
            <span className="modal-registration__text modal-registration__text_md">{t.youWon}</span>
          </div>
          <div className="modal-registration__bonus-wrapper">
            <span className="modal-registration__text modal-registration__text_xxl">{prize}</span>
            {getSubtitle() && (
              <span className="modal-registration__text modal-registration__text_xl">{getSubtitle()}</span>
            )}
          </div>

        </div>

        <form className="form" onSubmit={onSubmit}>
          {/*
          <div className="form__field">
            <div className="phone-input">
              <button
                type="button"
                className="phone-input__code country-dropdown__header"
                onClick={() => setCountryOpen((v) => !v)}
                ref={countryBtnRef}
              >
                <img
                  src={`https://flagcdn.com/24x18/${selectedCountry.iso2}.png`}
                  alt={selectedCountry.name}
                  width={24}
                  height={18}
                  style={{ borderRadius: 4 }}
                />
                <span style={{ marginLeft: 8 }}>{selectedCountry.dialCode}</span>
              </button>
              <input
                type="tel"
                placeholder="Phone"
                className={`phone-input__number ${errors.phone ? 'is-error' : ''}`}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {errors.phone && <p className="form__error">{errors.phone}</p>}
            {countryOpen && (
              <div className="dropdown__modal" ref={countryModalRef} style={{ width: '100%', maxWidth: 428 }}>
                <label className="dropdown__search">
                  <input
                    type="text"
                    className="dropdown__input"
                    placeholder="Country search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </label>
                <ul className="dropdown__list">
                  {filteredCountries.map((c) => (
                    <li className="dropdown__item" key={c.iso2}>
                      <button
                        type="button"
                        className="dropdown__button-item"
                        onClick={() => {
                          setSelectedCountry(c);
                          setCountryOpen(false);
                        }}
                      >
                        <img
                          src={`https://flagcdn.com/24x18/${c.iso2}.png`}
                          alt={c.name}
                          width={24}
                          height={18}
                          className="dropdown__flag"
                        />
                        <span style={{ flex: 1 }}>{c.name}</span>
                        <span style={{ color: '#77829b' }}>{c.dialCode}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          */}

          {/* <div className="form__field">
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              className={`form__input ${errors.email ? 'is-error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="form__error">{errors.email}</p>}
          </div> */}

          {/* <div className="form__field">
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t.passwordPlaceholder}
                className={`form__input ${errors.password ? 'is-error' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                aria-label={showPassword ? t.hidePasswordAria : t.showPasswordAria}
                className="password-toggle"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3l18 18" stroke="#77829b" strokeWidth="2" strokeLinecap="round" />
                    <path d="M21 12s-4-7-9-7c-2.5 0-4.73.9-6.5 2.21" stroke="#77829b" strokeWidth="2" strokeLinecap="round" />
                    <path d="M3 12s4 7 9 7c2.5 0 4.73-.9 6.5-2.21" stroke="#77829b" strokeWidth="2" strokeLinecap="round" />
                    <path d="M10.6 10.6A3 3 0 0012 9a3 3 0 013 3 3 3 0 01-3 3" stroke="#77829b" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" stroke="#77829b" strokeWidth="2" />
                    <circle cx="12" cy="12" r="3" stroke="#77829b" strokeWidth="2" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="form__error">{errors.password}</p>}
          </div> */}

          {/*
          <div className="form__field">
            <div className="currency-row">
              <div className="currency-dropdown">
                <button
                  type="button"
                  className="form__select currency-dropdown__header"
                  onClick={() => setCurrencyOpen((v) => !v)}
                  ref={currencyBtnRef}
                >
                  <span style={{ marginRight: 8 }}>{selectedCurrency.symbol}</span>
                  <span style={{ flex: 1 }}>
                    {selectedCurrency.name} ({selectedCurrency.code})
                  </span>
                  <svg className="dropdown__caret" aria-hidden="true" width="10" height="6" viewBox="0 0 10 6">
                    <path fill="#77829b" d="M.234.334A.8.8 0 0 1 1.276.256l.09.078L4 2.968 6.634.334A.8.8 0 0 1 7.676.256l.09.078a.8.8 0 0 1 .077 1.042l-.077.09-3.2 3.2a.8.8 0 0 1-1.042.077l-.09-.078-3.2-3.2a.8.8 0 0 1 0-1.131Z" opacity=".5" />
                  </svg>
                </button>
                {currencyOpen && (
                  <div className="dropdown__modal" ref={currencyModalRef}>
                    <ul className="dropdown__list">
                      {currencies.map((cur) => (
                        <li className="dropdown__item" key={cur.code}>
                          <button
                            type="button"
                            className="dropdown__button-item"
                            onClick={() => {
                              setSelectedCurrency(cur);
                              setCurrencyOpen(false);
                            }}
                          >
                            <span style={{ width: 24, textAlign: 'center' }}>{cur.symbol}</span>
                            <span style={{ flex: 1 }}>{cur.name}</span>
                            <span style={{ color: '#77829b' }}>({cur.code})</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <span
                className="form__promo-link form__promo-link_inline"
                onClick={() => setShowPromoInput((v) => !v)}
              >
                {showPromoInput ? 'Hide promo code' : 'Add promo code'}
              </span>
            </div>
            {showPromoInput && (
              <div className="promo-input-wrapper">
                <input
                  type="text"
                  className="form__input promo-input"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  type="button"
                  className="promo-input__clear"
                  aria-label="Clear promo code"
                  onClick={() => { setPromoCode(''); setShowPromoInput(false); }}
                >
                  ×
                </button>
              </div>
            )}
          </div>
          */}

          <button className="form__button" type="submit">
            {t.submitButton}
          </button>

          <p className="form__footer">
            {t.footerText} <a href="#" className="form__link">{t.footerLink}</a>
          </p>
        </form>
      </div>
    </div>
  );
}
