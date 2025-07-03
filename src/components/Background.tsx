import React, { useEffect, useRef } from 'react';

interface CodeLine {
    text: string;
    x: number;
    y: number;
    opacity: number;
    speed: number;
}

const cppKeywords = new Set([
    'alignas', 'alignof', 'and', 'and_eq', 'asm', 'atomic_cancel', 'atomic_commit', 'atomic_noexcept', 'auto', 'bitand', 'bitor', 'bool', 'break', 'case', 'catch', 'char', 'char16_t', 'char32_t', 'class', 'compl', 'concept', 'const', 'const_cast', 'constexpr', 'continue', 'decltype', 'default', 'delete', 'do', 'double', 'dynamic_cast', 'else', 'enum', 'explicit', 'export', 'extern', 'false', 'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long', 'mutable', 'namespace', 'new', 'noexcept', 'not', 'not_eq', 'nullptr', 'operator', 'or', 'or_eq', 'private', 'protected', 'public', 'register', 'reinterpret_cast', 'return', 'short', 'signed', 'sizeof', 'static', 'static_assert', 'static_cast', 'struct', 'switch', 'template', 'this', 'thread_local', 'throw', 'true', 'try', 'typedef', 'typeid', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void', 'volatile', 'wchar_t', 'while', 'xor', 'xor_eq', 'std::' // Added std:: as a special keyword
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

        // Ajuster la taille du canvas à la fenêtre
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Créer les particules
        const createParticles = () => {
            const particles = [];
            const particleCount = Math.min(window.innerWidth * window.innerHeight / 15000, 35);
            const colors = [
                'rgba(99, 102, 241, 0.15)',  // Indigo
                'rgba(139, 92, 246, 0.15)',  // Purple
                'rgba(236, 72, 153, 0.15)',  // Pink
                'rgba(59, 130, 246, 0.15)',  // Blue
            ];

            for (let i = 0; i < particleCount; i++) {
                const size = Math.random() * 1.8 + 0.8;
                const opacity = Math.random() * 0.25 + 0.1;
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speedX: (Math.random() - 0.5) * 0.25,
                    speedY: (Math.random() - 0.5) * 0.25,
                    opacity: opacity,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    initialSize: size,
                    initialOpacity: opacity
                });
            }
            return particles;
        };

        // Créer les lignes de code
        const createCodeLines = () => {
            const lines: CodeLine[] = [];
            const numLines = Math.floor(canvas.height / 30);
            const fontSize = 16;
            ctx.font = `${fontSize}px 'Fira Code', 'Consolas', monospace`;

            for (let i = 0; i < numLines; i++) {
                let text = '';
                while (text === '') {
                    text = cppSnippets[Math.floor(Math.random() * cppSnippets.length)];
                }
                lines.push({
                    text: text,
                    x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
                    y: canvas.height + i * 30,
                    opacity: 0,
                    speed: Math.random() * 0.1 + 0.05,
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

        // Animation
        const animate = () => {
            timeRef.current += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dessiner le dégradé de fond animé
            const gradient = ctx.createLinearGradient(
                Math.sin(timeRef.current) * canvas.width * 0.5 + canvas.width * 0.5,
                Math.cos(timeRef.current) * canvas.height * 0.5 + canvas.height * 0.5,
                Math.cos(timeRef.current) * canvas.width * 0.5 + canvas.width * 0.5,
                Math.sin(timeRef.current) * canvas.height * 0.5 + canvas.height * 0.5
            );

            gradient.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
            gradient.addColorStop(0.3, 'rgba(30, 27, 75, 0.9)');
            gradient.addColorStop(0.6, 'rgba(55, 48, 163, 0.9)');
            gradient.addColorStop(1, 'rgba(15, 23, 42, 0.9)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Effet de brillance
            const glowGradient = ctx.createRadialGradient(
                mouseRef.current.x,
                mouseRef.current.y,
                0,
                mouseRef.current.x,
                mouseRef.current.y,
                180
            );
            glowGradient.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
            glowGradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
            ctx.fillStyle = glowGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Mettre à jour et dessiner les particules
            particlesRef.current.forEach(particle => {
                // Mettre à jour la position
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Rebondir sur les bords
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

                // Effet de pulsation
                particle.size = particle.initialSize + Math.sin(timeRef.current * 2 + particle.x * 0.01) * 0.5;
                particle.opacity = particle.initialOpacity + Math.sin(timeRef.current * 2 + particle.y * 0.01) * 0.15;

                // Interaction avec la souris
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 180) {
                    const angle = Math.atan2(dy, dx);
                    const force = (180 - distance) / 180;
                    particle.x -= Math.cos(angle) * force * 1.5;
                    particle.y -= Math.sin(angle) * force * 1.5;
                }

                // Dessiner la particule avec un effet de lueur
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                // Effet de lueur
                const glow = ctx.createRadialGradient(
                    particle.x,
                    particle.y,
                    0,
                    particle.x,
                    particle.y,
                    particle.size * 2.5
                );
                glow.addColorStop(0, particle.color);
                glow.addColorStop(1, particle.color.replace(/\d\.\d+/, '0'));
                ctx.fillStyle = glow;
                ctx.fill();
            });

            // Mettre à jour et dessiner les lignes de code
            ctx.font = "16px 'Fira Code', 'Consolas', monospace";
            ctx.textBaseline = 'alphabetic';

            codeLinesRef.current.forEach(line => {
                line.y -= line.speed;

                // Gestion de l'opacité pour un effet de fondu en entrée/sortie
                if (line.y > canvas.height - 100) {
                    line.opacity = Math.min(0.4, (canvas.height - line.y) / 100 * 0.4); // Augmenter l'opacité max
                } else if (line.y < 100) {
                    line.opacity = Math.min(0.4, line.y / 100 * 0.4); // Augmenter l'opacité max
                } else {
                    line.opacity = 0.4; // Pleine opacité au milieu
                }

                // Réinitialiser la ligne quand elle sort de l'écran par le haut
                if (line.y < -20) {
                    line.y = canvas.height + Math.random() * 30;
                    let newText = '';
                    while (newText === '') {
                        newText = cppSnippets[Math.floor(Math.random() * cppSnippets.length)];
                    }
                    line.text = newText;
                    line.x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
                    line.opacity = 0;
                    line.speed = Math.random() * 0.1 + 0.05;
                }

                let currentX = line.x;
                const words = line.text.split(/(\s+)/g);

                words.forEach(word => {
                    const trimmedWord = word.trim();
                    const isKeyword = cppKeywords.has(trimmedWord);

                    // Couleurs ajustées pour un meilleur contraste
                    ctx.fillStyle = `rgba(${isKeyword ? '128, 200, 255' : '230, 230, 230'}, ${line.opacity})`;

                    // Ajouter un léger effet d'ombre
                    ctx.shadowColor = `rgba(0, 0, 0, ${line.opacity * 0.8})`; // Ombre plus opaque avec le texte
                    ctx.shadowBlur = 3; // Léger flou
                    ctx.shadowOffsetX = 1;
                    ctx.shadowOffsetY = 1;

                    ctx.fillText(word, currentX, line.y);
                    currentX += ctx.measureText(word).width;
                });

                // Réinitialiser les propriétés d'ombre pour les autres éléments du canvas
                ctx.shadowColor = 'rgba(0, 0, 0, 0)';
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
            });

            requestAnimationFrame(animate);
        };

        animate();

        // Nettoyage
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
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