import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton, ThreeDModel } from '../components';
import '../Onboarding.css';

const useScrollAnimation = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return elementsRef;
};

const Onboarding = () => {
  const navigate = useNavigate();
  const sectionsRef = useScrollAnimation();

  const fundamentals = [
    {
      title: "What is Web3 Crowdfunding?",
      text: "It's a new way to fund creative projects directly from the community, built on transparent and secure blockchain technology."
    },
    {
      title: "Full Transparency",
      text: "Every single donation is a transaction recorded on the blockchain, visible to everyone. You can see exactly where the money goes."
    },
    {
      title: "Your Wallet, Your Identity",
      text: "Your Web3 wallet is your key. It's how you connect, create campaigns, and donate. You are in full control of your funds."
    },
  ];

  return (
    <div className="onboarding-container">
      <ThreeDModel />
      <div className="glass-overlay"></div> {/* Lapisan Kaca */}
      <div className="onboarding-content">
        <div ref={(el) => (sectionsRef.current[0] = el)} className="onboarding-section header-section">
          <h1>The Fundamentals</h1>
          <p>A quick look at how this decentralized world works.</p>
        </div>

        {fundamentals.map((item, index) => (
          <div key={index} ref={(el) => (sectionsRef.current[index + 1] = el)} className="onboarding-section">
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </div>
        ))}

        <div ref={(el) => (sectionsRef.current[fundamentals.length + 1] = el)} className="onboarding-section">
          <CustomButton
            btnType="button"
            title="Enter the Dashboard"
            styles={{ background: 'linear-gradient(to right, var(--color-accent-primary), #27a063)', color: 'white' }}
            handleClick={() => navigate('/')}
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;