import React, { useEffect, useRef } from 'react';

interface MeasuredWord {
    text: string;
    isKeyword: boolean;
    width: number;
}

interface CodeLine {
    text: string;
    x: number;
    y: number;
    opacity: number;
    speed: number;
    words: MeasuredWord[];
}

const cppKeywords = new Set([
    'alignas', 'alignof', 'and', 'and_eq', 'asm', 'atomic_cancel', 'atomic_commit', 'atomic_noexcept', 'auto', 'bitand', 'bitor', 'bool', 'break', 'case', 'catch', 'char', 'char16_t', 'char32_t', 'class', 'compl', 'concept', 'const', 'const_cast', 'constexpr', 'continue', 'decltype', 'default', 'delete', 'do', 'double', 'dynamic_cast', 'else', 'enum', 'explicit', 'export', 'extern', 'false', 'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long', 'mutable', 'namespace', 'new', 'noexcept', 'not', 'not_eq', 'nullptr', 'operator', 'or', 'or_eq', 'private', 'protected', 'public', 'register', 'reinterpret_cast', 'return', 'short', 'signed', 'sizeof', 'static', 'static_assert', 'static_cast', 'struct', 'switch', 'template', 'this', 'thread_local', 'throw', 'true', 'try', 'typedef', 'typeid', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void', 'volatile', 'wchar_t', 'while', 'xor', 'xor_eq', 'std::'
]);

const cppSnippets = [
    '#include <iostream>',
    '',
    'int main() {',
    '    std::cout << "Hello, World!" << std::endl;',
    '    return 0;',
    '}',
    '',
    'template<typename T>',
    'class MyVector {',
    'public:',
    '    void push_back(const T& val) {',
    '        // Implementation here',
    '    }',
    'private:',
    '    T* data;',
    '    size_t size;',
    '};',
    '',
    'void calculateSum(int a, int b) {',
    '    int sum = a + b;',
    '    // More logic',
    '}',
    '',
    'namespace MyNamespace {',
    '    void doSomething() {',
    '        // Execute task',
    '    }',
    '}',
    '',
    'struct Point {',
    '    double x, y;',
    '};',
    '',
    'for (int i = 0; i < 10; ++i) {',
    '    // Loop through',
    '}',
    '',
    'if (condition) {',
    '    // Do something',
    '} else {',
    '    // Do something else',
    '}',
    '',
    'class LinkedListNode {',
    'public:',
    '    int value;',
    '    LinkedListNode* next;',
    '};',
    '',
    '// This is a comment',
    '/* This is a multi-line',
    '   comment block */'
];

const Background: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Array<{
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        opacity: number;
        color: string;
        initialSize: number;
        initialOpacity: number;
    }>>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const timeRef = useRef(0);
    const codeLinesRef = useRef<CodeLine[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let isRunning = true;

        const prefersReducedMotion =
            typeof window !== 'undefined' && typeof window.matchMedia === 'function'
                ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
                : false;

        // Ajuster la taille du canvas à la fenêtre avec debounce
        let resizeTimeout: number;
        const resizeCanvas = () => {
            cancelAnimationFrame(resizeTimeout);
            resizeTimeout = requestAnimationFrame(() => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        };
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        window.addEventListener('resize', resizeCanvas);

        // Créer les particules
        const createParticles = () => {
            const particles = [];
            const maxParticles = prefersReducedMotion ? 12 : 35;
            const particleCount = Math.min(window.innerWidth * window.innerHeight / 15000, maxParticles);
            const colors = [
                'rgba(232, 67, 147, 0.22)',  // #e84393 Framboise
                'rgba(253, 121, 168, 0.20)',  // #fd79a8 Nuance claire
                'rgba(178, 190, 195, 0.22)',  // #b2bec3 Finition argentée
                'rgba(232, 67, 147, 0.14)',  // #e84393
            ];

            for (let i = 0; i < particleCount; i++) {
                const size = Math.random() * 1.8 + 0.8;
                const opacity = Math.random() * 0.25 + 0.1;
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.25,
                    speedY: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.25,
                    opacity: opacity,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    initialSize: size,
                    initialOpacity: opacity
                });
            }
            return particles;
        };

        const buildWordsForSnippet = (text: string): MeasuredWord[] => {
            ctx.font = "16px 'Fira Code', 'Consolas', monospace";
            return text.split(/(\s+)/g).map(w => ({
                text: w,
                isKeyword: cppKeywords.has(w.trim()),
                width: ctx.measureText(w).width || 8,
            }));
        };

        // Créer les lignes de code avec pré-calcul des largeurs
        const createCodeLines = () => {
            const lines: CodeLine[] = [];
            const numLines = Math.floor(canvas.height / 30);

            for (let i = 0; i < numLines; i++) {
                let text = '';
                while (text === '') {
                    text = cppSnippets[Math.floor(Math.random() * cppSnippets.length)];
                }
                lines.push({
                    text: text,
                    words: buildWordsForSnippet(text),
                    x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
                    y: canvas.height + i * 30,
                    opacity: 0,
                    speed: prefersReducedMotion ? 0.02 : Math.random() * 0.1 + 0.05,
                });
            }
            return lines;
        };

        particlesRef.current = createParticles();
        codeLinesRef.current = createCodeLines();

        // Gérer le mouvement de la souris
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        };
        window.addEventListener('mousemove', handleMouseMove);

        const handleVisibilityChange = () => {
            if (document.hidden) {
                isRunning = false;
                cancelAnimationFrame(animationFrameId);
            } else if (!isRunning) {
                isRunning = true;
                animationFrameId = requestAnimationFrame(animate);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Animation haute performance (sans allocation GC ni filtres lourds)
        const animate = () => {
            if (!isRunning) return;

            timeRef.current += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dessiner le dégradé de fond animé
            const gradient = ctx.createLinearGradient(
                Math.sin(timeRef.current) * canvas.width * 0.5 + canvas.width * 0.5,
                Math.cos(timeRef.current) * canvas.height * 0.5 + canvas.height * 0.5,
                Math.cos(timeRef.current) * canvas.width * 0.5 + canvas.width * 0.5,
                Math.sin(timeRef.current) * canvas.height * 0.5 + canvas.height * 0.5
            );

            gradient.addColorStop(0, 'rgba(45, 52, 54, 0.98)');
            gradient.addColorStop(0.5, 'rgba(30, 35, 36, 0.99)');
            gradient.addColorStop(1, 'rgba(45, 52, 54, 0.98)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Halo interactif sous le curseur
            if (!prefersReducedMotion && (mouseRef.current.x > 0 || mouseRef.current.y > 0)) {
                const glowGradient = ctx.createRadialGradient(
                    mouseRef.current.x,
                    mouseRef.current.y,
                    0,
                    mouseRef.current.x,
                    mouseRef.current.y,
                    180
                );
                glowGradient.addColorStop(0, 'rgba(232, 67, 147, 0.10)');
                glowGradient.addColorStop(1, 'rgba(232, 67, 147, 0)');
                ctx.fillStyle = glowGradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // Mettre à jour et dessiner les particules (halo par cercle sans allocation d'objet gradient)
            particlesRef.current.forEach(particle => {
                if (!prefersReducedMotion) {
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;

                    if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

                    particle.size = particle.initialSize + Math.sin(timeRef.current * 2 + particle.x * 0.01) * 0.5;
                    particle.opacity = particle.initialOpacity + Math.sin(timeRef.current * 2 + particle.y * 0.01) * 0.15;

                    const dx = mouseRef.current.x - particle.x;
                    const dy = mouseRef.current.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 180) {
                        const angle = Math.atan2(dy, dx);
                        const force = (180 - distance) / 180;
                        particle.x -= Math.cos(angle) * force * 1.5;
                        particle.y -= Math.sin(angle) * force * 1.5;
                    }
                }

                // Cercle halo doux
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                // Cœur de la particule
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });

            // Mettre à jour et dessiner les lignes de code (rendu vectoriel direct, sans shadowBlur)
            ctx.font = "16px 'Fira Code', 'Consolas', monospace";
            ctx.textBaseline = 'alphabetic';

            codeLinesRef.current.forEach(line => {
                line.y -= line.speed;

                if (line.y > canvas.height - 100) {
                    line.opacity = Math.min(0.4, (canvas.height - line.y) / 100 * 0.4);
                } else if (line.y < 100) {
                    line.opacity = Math.min(0.4, line.y / 100 * 0.4);
                } else {
                    line.opacity = 0.4;
                }

                if (line.y < -20) {
                    line.y = canvas.height + Math.random() * 30;
                    let newText = '';
                    while (newText === '') {
                        newText = cppSnippets[Math.floor(Math.random() * cppSnippets.length)];
                    }
                    line.text = newText;
                    line.words = buildWordsForSnippet(newText);
                    line.x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
                    line.opacity = 0;
                    line.speed = prefersReducedMotion ? 0.02 : Math.random() * 0.1 + 0.05;
                }

                let currentX = line.x;

                line.words.forEach(word => {
                    ctx.fillStyle = `rgba(${word.isKeyword ? '232, 67, 147' : '178, 190, 195'}, ${line.opacity})`;
                    ctx.fillText(word.text, currentX, line.y);
                    currentX += word.width;
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        // Nettoyage
        return () => {
            isRunning = false;
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
            style={{ background: 'transparent' }}
        />
    );
};

export default Background; 