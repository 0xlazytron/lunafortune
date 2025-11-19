'use client';

import { useState, useEffect, useRef } from 'react';
import './globals.css';
import Loader from './components/Loader';
import PrizeBadge from './components/PrizeBadge';
import RegistrationModal from './components/RegistrationModal';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [tries, setTries] = useState(2);
  const [rotation, setRotation] = useState(0);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showPrizeBadge, setShowPrizeBadge] = useState(false);
  const [prize, setPrize] = useState('');
  const [winningIndex, setWinningIndex] = useState(-1);

  const prizes = [
    { name: 'TRY AGAIN', big: '', small: 'TRY AGAIN', icon: 'iconsix', color: 'red' },
    { name: '100% BONUS', big: '100', percent: '%', small: 'BONUS', icon: 'iconone', color: 'green' },
    { name: '1000 FREE SPINS', big: '1000', small: 'FREE SPINS', icon: 'icontwo', color: 'purple' },
    { name: '$100 CASH', big: '$100', small: 'CASH', icon: 'iconthree', color: 'purple' },
    { name: 'TRY AGAIN', big: '', small: 'TRY AGAIN', icon: 'iconsix', color: 'purple' },
    { name: 'iPHONE 17', big: '', small: 'iPHONE 17', icon: 'iconfour', color: 'purple' },
    { name: '1000 FREE SPINS', big: '1000', small: 'FREE SPINS', icon: 'iconfive', color: 'purple' },
    { name: '$100 CASH', big: '$100', small: 'CASH', icon: 'iconthree', color: 'purple' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const lockedScrollYRef = useRef(0);
  useEffect(() => {
    if (showRegistrationModal) {
      lockedScrollYRef.current = window.scrollY || 0;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${lockedScrollYRef.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      const y = Math.abs(parseInt(document.body.style.top || '0', 10)) || lockedScrollYRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, y);
    }
    return () => {
      const y = Math.abs(parseInt(document.body.style.top || '0', 10)) || lockedScrollYRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, y);
    };
  }, [showRegistrationModal]);

  const spinWheel = () => {
    if (spinning || tries <= 0) return;

    setSpinning(true);
    setTries(tries - 1);
    setShowPrizeBadge(false);
    setWinningIndex(-1);

    // First spin = TRY AGAIN (index 0), Second spin = 100% BONUS (index 1)
    let targetIndex;
    if (tries === 2) {
      // First spin - TRY AGAIN (no win)
      targetIndex = 0;
    } else if (tries === 1) {
      // Second spin - 100% BONUS (win)
      targetIndex = 1;
    } else {
      targetIndex = Math.floor(Math.random() * prizes.length);
    }

    const segmentAngle = 360 / prizes.length; // 45 degrees per segment (8 segments)

    // The wheel's initial position has index 0 at the top
    // Simply multiply targetIndex by segment angle to get rotation needed
    const prizeAngle = segmentAngle * targetIndex;

    const spins = 5; // number of full rotations for visual effect
    // Rotate to align the winning segment center with the top arrow
    const finalRotation = rotation + (360 * spins) - prizeAngle;

    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      setPrize(prizes[targetIndex].name);
      setWinningIndex(targetIndex);

      // Show prize badge after a short delay
      setTimeout(() => {
        setShowPrizeBadge(true);
      }, 500);

      // Show registration modal if no tries left or after 3 seconds
      setTimeout(() => {
        if (tries - 1 === 0) {
          setShowRegistrationModal(true);
        }
      }, 3000);
    }, 4000);
  };

  const closeRegistrationModal = () => {
    setShowRegistrationModal(false);
  };

  // Show ONLY loader while loading, then show main page
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="app-wrapper">
        <div className="app-wrapper__bg" />

        <header data-v-ba98396c="" data-v-88196f00="" className="header header__wrapper">
          <div className="header__logo-card">
            <picture data-v-09a91d5b="" data-v-ba98396c="" className="header__logo">
              <img data-v-09a91d5b="" className="logo" src="/assets/images/logo/logo.svg" alt="Logo: 1win" />
            </picture>
          </div>

          <div data-v-ba98396c="" className="header__account">
            <div data-v-8fb44ac0="" data-v-ba98396c="" className="dropdown header__select-lang">
              <button data-v-8fb44ac0="" type="button" className="dropdown__header">
                <svg data-v-8fb44ac0="" className="dropdown__flag" aria-hidden="true" width="16" height="16">
                  <use data-v-8fb44ac0="" href="/assets/sprites/flags.svg#en"></use>
                </svg>
                <span data-v-8fb44ac0="">EN</span>
                <svg data-v-8fb44ac0="" xmlns="http://www.w3.org/2000/svg" className="icon dropdown__arrow" aria-hidden="true" role="presentation" width="8" height="5" viewBox="0 0 10 6">
                  <path data-v-8fb44ac0="" fill="#fff" d="M.234.334A.8.8 0 0 1 1.276.256l.09.078L4 2.968 6.634.334A.8.8 0 0 1 7.676.256l.09.078a.8.8 0 0 1 .077 1.042l-.077.09-3.2 3.2a.8.8 0 0 1-1.042.077l-.09-.078-3.2-3.2a.8.8 0 0 1 0-1.131Z" opacity=".5"></path>
                </svg>
              </button>
            </div>

            <a href="https://mrlunacasino.com" target="_blank" rel="noopener noreferrer" data-v-5e81c9f5="" data-v-ba98396c="" className="have-an-account have-an-account_inside_header">
              <span data-v-5e81c9f5="" className="have-an-account__description" tabIndex={0}>
                <span data-v-5e81c9f5="" className="have-an-account__question">Already have an account?</span>
                <span data-v-5e81c9f5="" className="have-an-account__link">Go to the website</span>
              </span>
              <svg data-v-f6adb99e="" data-v-5e81c9f5="" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 35 35" className="have-an-account__arrow" aria-hidden="true">
                <rect data-v-f6adb99e="" width="35" height="35" fill="#fff" rx="17.5"></rect>
                <rect data-v-f6adb99e="" width="19" height="19" fill="#D8D8D8" opacity=".01" rx="2" transform="matrix(-1 0 0 1 27 8)"></rect>
                <path data-v-f6adb99e="" fill="#000" fillRule="evenodd" d="m18.39 11.42 5.2 5.2c.4.4.4 1.06 0 1.47l-5.2 5.2a1.04 1.04 0 0 1-1.47-1.47l3.42-3.43h-8.9a1.04 1.04 0 1 1 0-2.08h8.9l-3.42-3.42a1.04 1.04 0 0 1 0-1.47c.4-.41 1.06-.41 1.47 0Z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </header>

        {/* Title ABOVE the wheel */}
        <h1 data-v-a1e68c04="" data-v-88196f00="" className="title title__wrapper main__title">
          <span data-v-896b25e0="" data-v-a1e68c04="" className="text text_theme-light text_font-family-halvarbreit text_uppercase title__text title__text_md">SPIN THE WHEEL</span>
          <span data-v-896b25e0="" data-v-a1e68c04="" className="text text_theme-light text_font-family-halvarbreit text_uppercase title__text title__text_lg">AND GET THE BONUSES</span>
        </h1>

        <main data-v-88196f00="" className="main">
          <div className="gold"></div>
          <div className="registration-crutch"></div>

          <div className="wheel">
            <div data-v-abb2d16f="" className="name__wheel"></div>
            <div data-v-654aabab="" className="wheel-border wheel__border">
              <div data-v-654aabab="" className="wheel-border__backdrop">
                <ul
                  className={`wheel__list ${spinning ? 'wheel__list_animation_type_default-rotation' : 'wheel__list_animation_type_first-default-rotation'}`}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
                  }}
                >
                  {prizes.map((prizeItem, index) => (
                    <li
                      key={index}
                      className={`wheel-item wheel__list-item ${winningIndex === index ? `wheel-item--winning wheel-item--${prizeItem.color}` : ''}`}
                    >
                      <div className={`wheel-item__img wheel-item__img_${prizeItem.icon}`}></div>
                      <span className="wheel-item__text wheel-item__text_type_big wheel-item__text_white">
                        <div className="wraper-text">
                          <span>{prizeItem.big}</span>
                          {prizeItem.percent && <span className="wheel__list-element wheel__list-element_right"> {prizeItem.percent} </span>}
                        </div>
                      </span>
                      <span className="wheel-item__text wheel-item__text_type_small wheel-item__text_white">{prizeItem.small}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div data-v-654aabab="" className="wheel-border__shadow"></div>
            </div>

            {/* SPIN button - stays static */}
            <button
              data-v-01b565ea=""
              className="wheel-button wheel__button"
              type="button"
              onClick={spinWheel}
              disabled={spinning || tries <= 0}
            >
              <span data-v-01b565ea="" className="wheel-button__container">
                <span data-v-01b565ea="" className="wheel-button__main-circle">
                  <span data-v-01b565ea="" className="wheel-button__inner-circle"></span>
                  <span data-v-896b25e0="" data-v-01b565ea="" className="text text_theme-pink text_font-family-halvarbreit text_uppercase wheel-button__text">
                    SPIN
                  </span>
                </span>
              </span>
              <span data-v-01b565ea="" className="wheel-button__hover"></span>
              <span data-v-01b565ea="" className="wheel-button__active"></span>
            </button>

            <div data-v-d588f77d="" className="counter-of-spin">
              <p data-v-d588f77d="" className="counter-of-spin__text-wrapper">
                <span data-v-896b25e0="" data-v-d588f77d="" className="text text_theme-default text_font-family-halvarbreit text_uppercase counter-of-spin__text counter-of-spin__text_md">REMAINING</span>
                <span data-v-896b25e0="" data-v-d588f77d="" className="text text_theme-default text_font-family-halvarbreit text_uppercase counter-of-spin__text counter-of-spin__text_lg">{tries} {tries === 1 ? 'TRY' : 'TRIES'}</span>
              </p>
            </div>
          </div>
        </main>

        <div data-v-7c329a3d="" data-v-88196f00="" className="decor">
          <div className="decor__pharaon" data-v-7c329a3d=""></div>
          <div className="decor__zeus" data-v-7c329a3d=""></div>
          <div className="decor__multi" data-v-7c329a3d=""></div>
          <div className="decor__golg-blur" data-v-7c329a3d=""></div>
          <div className="decor__gold-jug" data-v-7c329a3d=""></div>
          <div className="decor__firsticon" data-v-7c329a3d=""></div>
          <div className="decor__secondicon" data-v-7c329a3d=""></div>
          <div className="decor__coin" data-v-7c329a3d=""></div>
        </div>

        <footer data-v-f0e69d08="" data-v-88196f00="" className="footer footer__wrapper">
          <a href="https://mrlunacasino.com" target="_blank" rel="noopener noreferrer" data-v-5e81c9f5="" data-v-f0e69d08="" className="have-an-account footer__select-lang">
            <span data-v-5e81c9f5="" className="have-an-account__description" tabIndex={0}>
              <span data-v-5e81c9f5="" className="have-an-account__question">Already have an account?</span>
              <span data-v-5e81c9f5="" className="have-an-account__link">Go to the website</span>
            </span>
          </a>
          <span data-v-896b25e0="" data-v-f0e69d08="" className="text text_theme-light footer__text">© 2025 MrLuna Casino | All rights reserved</span>
        </footer>
      </div>

      {/* Prize Badge (bottom left/right) */}
      <PrizeBadge prize={prize} isVisible={showPrizeBadge} />

      {/* Registration Modal */}
      {showRegistrationModal && (
        <RegistrationModal
          prize={prize}
          onClose={closeRegistrationModal}
        />
      )}
    </>
  );
}
