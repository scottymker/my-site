import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Terminal.css';

const COMMANDS = {
  help: {
    description: 'Show available commands',
    output: `Available commands:
  help        - Show this help message
  about       - Learn about me
  skills      - View my tech stack
  projects    - See my work
  contact     - Get in touch
  clear       - Clear the terminal
  sudo hire-me - ???
  matrix      - ???
  coffee      - Essential fuel status`,
  },
  about: {
    description: 'Learn about the developer',
    output: `> Scott
> Full-Stack Web Developer
> Location: United States

I build things for the web. I love turning ideas into
reality through clean code and intuitive design.

Type 'skills' to see what I work with.`,
  },
  skills: {
    description: 'View tech stack',
    output: `// Technical Skills

Frontend:
  ├── React / Next.js
  ├── JavaScript / TypeScript
  ├── HTML5 / CSS3
  └── Tailwind / Framer Motion

Backend:
  ├── Node.js / Express
  ├── Python
  ├── PostgreSQL / MongoDB
  └── REST APIs

Tools:
  ├── Git / GitHub
  ├── Docker
  ├── AWS / Vercel
  └── Figma`,
  },
  projects: {
    description: 'View projects',
    output: `// Featured Projects

[1] Just For Phishing
    E-commerce fishing supply platform
    Tech: Shopify, JavaScript, Payment Integration
    URL: justforphishing.com

[2] You Still Matter
    Mental health companion app
    Tech: React Native, iOS, Android
    URL: youstillmatter.org

[3] Wall Decor Plus More
    Custom home decor e-commerce
    Tech: BigCommerce, Custom Development
    URL: walldecorplusmore.com

Scroll down to see more details, or type 'contact' to discuss a project.`,
  },
  contact: {
    description: 'Get contact info',
    output: `// Let's Connect

Email:    info@thedevside.com
Phone:    (605) 550-0828
GitHub:   github.com/scottymker
LinkedIn: linkedin.com/in/scott-ymker-244ab81ab
Location: South Dakota, USA

Or scroll down to use the contact form.

I'm currently available for freelance projects!`,
  },
  clear: {
    description: 'Clear terminal',
    output: null,
    action: 'clear',
  },
  'sudo hire-me': {
    description: 'Secret command',
    output: `[sudo] password for visitor: ********
Verifying credentials...
Access GRANTED.

🎉 Congratulations! You've unlocked the secret hiring protocol.

Initializing offer acceptance module...
Preparing contract...
Calculating competitive rates...

Just kidding. But seriously, let's talk!
Type 'contact' for my info.`,
  },
  matrix: {
    description: 'Enter the matrix',
    output: `Wake up, Neo...
The Matrix has you...
Follow the white rabbit.

🐇

Just kidding, this is just a portfolio.
But the code IS real.`,
  },
  coffee: {
    description: 'Coffee status',
    output: `☕ Coffee Status Report:
━━━━━━━━━━━━━━━━━━━
Cups today:     ████████░░  80%
Productivity:   ██████████  100%
Bugs created:   ░░░░░░░░░░  0%
Bugs fixed:     ██████████  100%

Status: CAFFEINATED AND CODING`,
  },
  ls: {
    description: 'List files',
    output: `about.txt    projects/    skills.json    secrets/
README.md    contact.sh   resume.pdf     .hidden

Try 'cat secrets' for a surprise.`,
  },
  'cat secrets': {
    description: 'View secrets',
    output: `🔐 Accessing classified information...

SECRET #1: I actually enjoy writing documentation.
SECRET #2: I name all my test variables after food.
SECRET #3: I've mass-closed browser tabs in panic.
SECRET #4: Stack Overflow is my second home.

Your clearance level doesn't permit more secrets.`,
  },
  whoami: {
    description: 'Who am I',
    output: `You are: visitor@portfolio
Status: Potential collaborator
Clearance: Guest
Recommendation: Type 'contact' to upgrade status`,
  },
  date: {
    description: 'Current date',
    output: () => `Current timestamp: ${new Date().toLocaleString()}
Time zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
Status: It's always coding o'clock`,
  },
};

function Terminal() {
  const [history, setHistory] = useState([
    {
      type: 'output',
      content: `Welcome to The Dev Side Terminal v1.0.0
Type 'help' for available commands.
`,
    },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add to command history
    if (trimmedCmd) {
      setCommandHistory((prev) => [...prev, trimmedCmd]);
      setHistoryIndex(-1);
    }

    // Add command to history display
    setHistory((prev) => [...prev, { type: 'command', content: cmd }]);

    if (!trimmedCmd) return;

    // Find and execute command
    const command = COMMANDS[trimmedCmd];

    if (command) {
      if (command.action === 'clear') {
        setHistory([]);
        return;
      }

      const output = typeof command.output === 'function'
        ? command.output()
        : command.output;

      if (output) {
        setHistory((prev) => [...prev, { type: 'output', content: output }]);
      }
    } else {
      setHistory((prev) => [
        ...prev,
        {
          type: 'error',
          content: `Command not found: ${trimmedCmd}
Type 'help' for available commands.`,
        },
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    // Handle command history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1
          ? historyIndex + 1
          : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <motion.div
      className="terminal"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn close" />
          <span className="terminal-btn minimize" />
          <span className="terminal-btn maximize" />
        </div>
        <span className="terminal-title">guest@portfolio ~ zsh</span>
      </div>

      <div
        className="terminal-body"
        ref={terminalRef}
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type}`}>
            {item.type === 'command' && (
              <span className="prompt">
                <span className="prompt-user">visitor</span>
                <span className="prompt-at">@</span>
                <span className="prompt-host">portfolio</span>
                <span className="prompt-symbol"> $ </span>
              </span>
            )}
            <pre className="terminal-content">{item.content}</pre>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span className="prompt">
            <span className="prompt-user">visitor</span>
            <span className="prompt-at">@</span>
            <span className="prompt-host">portfolio</span>
            <span className="prompt-symbol"> $ </span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            spellCheck="false"
            autoComplete="off"
            aria-label="Terminal input"
          />
          <span className="cursor" />
        </form>
      </div>
    </motion.div>
  );
}

export default Terminal;
