import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Minimize2, Maximize2 } from 'lucide-react';
import { getRandomResponse } from './responses';
import './AICompanion.css';

function AICompanion() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const lastSectionRef = useRef('');
  const idleTimerRef = useRef(null);
  const thinkingTimerRef = useRef(null);
  const isShowingMessageRef = useRef(false);

  const showMessage = useCallback((category) => {
    // Prevent overlapping messages
    if (isShowingMessageRef.current) return;
    isShowingMessageRef.current = true;

    // Clear any pending thinking timer
    if (thinkingTimerRef.current) {
      clearTimeout(thinkingTimerRef.current);
    }

    setIsThinking(true);
    setMessage('');

    // Simulate "thinking" delay
    const thinkTime = 500 + Math.random() * 1000;

    thinkingTimerRef.current = setTimeout(() => {
      setIsThinking(false);
      setMessage(getRandomResponse(category));
      // Allow new messages after a brief cooldown
      setTimeout(() => {
        isShowingMessageRef.current = false;
      }, 2000);
    }, thinkTime);
  }, []);

  // Show initial greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      showMessage('greetings');
    }, 1500);
    return () => clearTimeout(timer);
  }, [showMessage]);

  // Track which section is visible
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            if (section !== lastSectionRef.current) {
              lastSectionRef.current = section;

              const sectionMap = {
                home: 'greetings',
                about: 'about',
                projects: 'projects',
                skills: 'skills',
                contact: 'contact',
              };

              // Only show message sometimes to not be annoying
              if (Math.random() > 0.4) {
                showMessage(sectionMap[section] || 'scroll');
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showMessage]);

  // Idle timer
  useEffect(() => {
    const resetIdleTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      idleTimerRef.current = setTimeout(() => {
        if (!isMinimized && Math.random() > 0.5) {
          showMessage('idle');
        }
      }, 30000); // 30 seconds idle
    };

    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    resetIdleTimer();

    return () => {
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isMinimized, showMessage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  const handleClose = () => {
    showMessage('farewell');
    setTimeout(() => setIsOpen(false), 2000);
  };

  if (!isOpen) {
    return (
      <motion.button
        className="ai-companion-reopen"
        onClick={() => {
          setIsOpen(true);
          showMessage('greetings');
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bot size={24} />
      </motion.button>
    );
  }

  return (
    <motion.div
      className={`ai-companion ${isMinimized ? 'minimized' : ''}`}
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="ai-header">
        <div className="ai-avatar">
          <Bot size={20} />
          <span className="ai-status-dot" />
        </div>
        <span className="ai-name">ARIA</span>
        <span className="ai-label">AI Assistant</span>
        <div className="ai-controls">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="ai-control-btn"
            aria-label={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
          <button
            onClick={handleClose}
            className="ai-control-btn"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            className="ai-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="ai-message-container">
              {isThinking ? (
                <div className="ai-thinking">
                  <span className="thinking-dot" />
                  <span className="thinking-dot" />
                  <span className="thinking-dot" />
                </div>
              ) : (
                <motion.p
                  className="ai-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={message}
                >
                  {message}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AICompanion;
