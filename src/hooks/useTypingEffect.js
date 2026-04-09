import { useState, useEffect } from 'react';

export const useTypingEffect = (strings, typingSpeed = 100, deletingSpeed = 50, delayBetween = 1500) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentString = strings[index % strings.length];

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText === '') {
          setIsDeleting(false);
          setIndex(prev => (prev + 1) % strings.length);
        }
      }, deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentString.slice(0, displayText.length + 1));
        if (displayText === currentString) {
          timeout = setTimeout(() => setIsDeleting(true), delayBetween);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index, strings, typingSpeed, deletingSpeed, delayBetween]);

  return displayText;
};