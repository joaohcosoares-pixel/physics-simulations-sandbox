/**
 * Sistema Solar: Mecânica Clássica vs. Relatividade Geral
 * Motor de Física Orbitais, Precessão do Periélio, Curvatura do Espaço-Tempo e Dilatação do Tempo
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Referências de Elementos do DOM ---
    const simCanvas = document.getElementById('simCanvas');
    const ctx = simCanvas.getContext('2d');

    // Botões de Modo e Abas
    const modeBtns = document.querySelectorAll('.mode-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const planetBtns = document.querySelectorAll('.planet-btn');

    // Sliders e Toggles
    const relScaleSlider = document.getElementById('relScaleSlider');
    const relScaleVal = document.getElementById('rel-scale-val');
    const speedSlider = document.getElementById('speedSlider');
    const speedVal = document.getElementById('speed-val');

    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const playText = document.getElementById('playText');
    const resetBtn = document.getElementById('resetBtn');

    const toggleTrails = document.getElementById('toggleTrails');
    const toggleVectors = document.getElementById('toggleVectors');
    const toggleGrid = document.getElementById('toggleGrid');

    // Elementos de Telemetria
    const precessionVal = document.getElementById('precession-val');
    const precessionTag = document.getElementById('precession-tag');
    const viewTitle = document.getElementById('view-title');

    // Relógios Relativísticos
    const clockDeepSpace = document.getElementById('clock-deep-space');
    const clockSun = document.getElementById('clock-sun');
    const clockMercury = document.getElementById('clock-mercury');
    const clockEarth = document.getElementById('clock-earth');

    // --- Estado da Aplicação ---
    const state = {
        activeTab: 'orbits',      // 'orbits', 'spacetime', 'light', 'clocks', 'comparison'
        simMode: 'relativity',    // 'relativity', 'classical', 'compare'
        selectedPlanet: 'mercury',// 'mercury', 'venus', 'earth', 'all'
        
        relScale: 100,            // Fator de exacerbação dos efeitos relativísticos
        simSpeed: 1.0,
        isAnimating: true,

        showTrails: true,
        showVectors: true,
        showGrid: true,

        // Tempo em segundos virtuais acumulados
        deepSpaceTime: 0,
        sunTime: 0,
        mercuryTime: 0,
        earthTime: 0,

        // Ângulo do fóton para o experimento da luz
        photonX: -400,
        photonY: 120
    };

    // --- Definição dos Corpos Celestes (Unidades Ajustadas para Canvas) ---
    const celestialBodies = {
        sun: {
            name: 'Sol',
            mass: 10000,
            radius: 26,
            color: '#ffb703'
        },
        mercury: {
            name: 'Mercúrio',
            symbol: '☿',
            a: 110,           // Semi-eixo maior (pixels)
            e: 0.2056,        // Excentricidade acentuada para evidenciar a precessão
            color: '#00f2fe', // Newton
            relColor: '#ffb703', // Einstein
            trailNewton: [],
            trailEinstein: [],
            angleN: 0,
            angleE: 0,
            precessionAngle: 0,
            v: 0,
            r: 0
        },
        venus: {
            name: 'Vênus',
            symbol: '♀',
            a: 170,
            e: 0.0067,
            color: '#e2e8f0',
            relColor: '#ff8c00',
            trailNewton: [],
            trailEinstein: [],
            angleN: 0,
            angleE: 0,
            precessionAngle: 0
        },
        earth: {
            name: 'Terra',
            symbol: '🜨',
            a: 230,
            e: 0.0167,
            color: '#38b000',
            relColor: '#9d4edd',
            trailNewton: [],
            trailEinstein: [],
            angleN: 0,
            angleE: 0,
            precessionAngle: 0
        }
    };

    // Estrelas de fundo
    const stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * simCanvas.width,
        y: Math.random() * simCanvas.height,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2
    }));

    // --- Inicialização ---
    function init() {
        resizeCanvas();
        setupEventListeners();
        requestAnimationFrame(animationLoop);
    }

    function resizeCanvas() {
        const wrapper = simCanvas.parentElement;
        simCanvas.width = wrapper.clientWidth;
        simCanvas.height = Math.min(560, wrapper.clientWidth * 0.62);
    }

    // --- Ciclo Principal de Animação ---
    function animationLoop(timestamp) {
        if (state.isAnimating) {
            updatePhysics();
            updateClocks();
        }

        renderCanvas();
        requestAnimationFrame(animationLoop);
    }

    // --- Atualização da Física (Newton vs Schwarzschild / Einstein) ---
    function updatePhysics() {
        const speed = state.simSpeed * 0.015;

        // Atualização de cada planeta
        Object.keys(celestialBodies).forEach(key => {
            if (key === 'sun') return;
            const planet = celestialBodies[key];

            // 1. Mecânica Clássica (Newton): Keplerian Orbit Estática sem precessão
            planet.angleN += (speed * Math.sqrt(10000 / Math.pow(planet.a, 3)));

            // 2. Relatividade Geral (Einstein): Adiciona a Precessão do Periélio dPhi
            // dPhi / dOrbit ~ 6 * pi * GM / (a * (1 - e^2) * c^2)
            const precessionRate = (0.0008 * state.relScale) / (planet.a * (1 - planet.e * planet.e));
            planet.precessionAngle += precessionRate * speed;

            planet.angleE += (speed * Math.sqrt(10000 / Math.pow(planet.a, 3)));

            // Posição no Plano Orbitário
            const rN = (planet.a * (1 - planet.e * planet.e)) / (1 + planet.e * Math.cos(planet.angleN));
            const rE = (planet.a * (1 - planet.e * planet.e)) / (1 + planet.e * Math.cos(planet.angleE));

            // Posição cartesiana Newton (Sem precessão)
            const xN = Math.cos(planet.angleN) * rN;
            const yN = Math.sin(planet.angleN) * rN;

            // Posição cartesiana Relativística (Com rotação do periélio)
            const xE = Math.cos(planet.angleE + planet.precessionAngle) * rE;
            const yE = Math.sin(planet.angleE + planet.precessionAngle) * rE;

            planet.posN = { x: xN, y: yN };
            planet.posE = { x: xE, y: yE };

            // Registra rastro para desenhar precessão
            if (state.showTrails) {
                planet.trailNewton.push({ x: xN, y: yN });
                planet.trailEinstein.push({ x: xE, y: yE });

                if (planet.trailNewton.length > 250) planet.trailNewton.shift();
                if (planet.trailEinstein.length > 400) planet.trailEinstein.shift();
            }
        });

        // Simulação do Fóton para Experimento de Luz (Eclipse 1919)
        if (state.activeTab === 'light') {
            state.photonX += 4 * state.simSpeed;
            if (state.photonX > simCanvas.width / 2 + 300) {
                state.photonX = -300;
            }
        }
    }

    // --- Atualização dos Relógios Gravitacionais (Dilatação do Tempo) ---
    function updateClocks() {
        // dTau = dt * sqrt(1 - 2GM / (r * c^2))
        const dt = 0.05 * state.simSpeed;
        state.deepSpaceTime += dt;

        // Fatores de dilatação gravitacional (Schwarzschild time dilation)
        const factorSun = 0.9999999;     // Sol (-66s / ano)
        const factorMercury = 0.99999999;// Mercúrio (-0.025s / ano)
        const factorEarth = 0.999999999; // Terra (-0.010s / ano)

        state.sunTime += dt * factorSun;
        state.mercuryTime += dt * factorMercury;
        state.earthTime += dt * factorEarth;

        clockDeepSpace.textContent = formatTime(state.deepSpaceTime);
        clockSun.textContent = formatTime(state.sunTime);
        clockMercury.textContent = formatTime(state.mercuryTime);
        clockEarth.textContent = formatTime(state.earthTime);
    }

    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);

        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    }

    // --- Renderizador Canvas Principal ---
    function renderCanvas() {
        const width = simCanvas.width;
        const height = simCanvas.height;
        const cx = width / 2;
        const cy = height / 2;

        ctx.clearRect(0, 0, width, height);

        // 1. Desenha estrelas no fundo
        stars.forEach(s => {
            ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // 2. Renderização por Aba
        switch (state.activeTab) {
            case 'orbits':
            case 'clocks':
                renderOrbitsView(cx, cy);
                break;
            case 'spacetime':
                renderSpacetimeMesh(cx, cy);
                break;
            case 'light':
                renderLightDeflectionView(cx, cy);
                break;
            default:
                renderOrbitsView(cx, cy);
                break;
        }
    }

    // Renderiza Órbitas e Precessão do Periélio
    function renderOrbitsView(cx, cy) {
        // Sol Central
        drawSun(cx, cy);

        // Determina quais planetas exibir
        const planetsToRender = state.selectedPlanet === 'all' 
            ? ['mercury', 'venus', 'earth'] 
            : [state.selectedPlanet];

        planetsToRender.forEach(pKey => {
            const planet = celestialBodies[pKey];
            if (!planet.posN || !planet.posE) return;

            // Modo Relativístico / Comparação: Exibe Rastros e Posição
            if (state.simMode === 'classical' || state.simMode === 'compare') {
                // Desenha Trajetória Clássica (Ciano)
                if (state.showTrails && planet.trailNewton.length > 1) {
                    ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    planet.trailNewton.forEach((pt, i) => {
                        if (i === 0) ctx.moveTo(cx + pt.x, cy + pt.y);
                        else ctx.lineTo(cx + pt.x, cy + pt.y);
                    });
                    ctx.stroke();
                }

                // Corpo Clássico
                ctx.fillStyle = '#00f2fe';
                ctx.beginPath();
                ctx.arc(cx + planet.posN.x, cy + planet.posN.y, 6, 0, Math.PI * 2);
                ctx.fill();
            }

            if (state.simMode === 'relativity' || state.simMode === 'compare') {
                // Desenha Precessão Relativística (Dourado / Magenta)
                if (state.showTrails && planet.trailEinstein.length > 1) {
                    ctx.strokeStyle = 'rgba(255, 183, 3, 0.6)';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    planet.trailEinstein.forEach((pt, i) => {
                        if (i === 0) ctx.moveTo(cx + pt.x, cy + pt.y);
                        else ctx.lineTo(cx + pt.x, cy + pt.y);
                    });
                    ctx.stroke();
                }

                // Corpo Relativístico
                ctx.fillStyle = '#ffb703';
                ctx.shadowColor = '#ffb703';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(cx + planet.posE.x, cy + planet.posE.y, 7, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Eixo do Periélio destacado
                if (state.showVectors) {
                    const periX = cx + Math.cos(planet.precessionAngle) * (planet.a * (1 - planet.e));
                    const periY = cy + Math.sin(planet.precessionAngle) * (planet.a * (1 - planet.e));

                    ctx.strokeStyle = 'rgba(255, 0, 127, 0.7)';
                    ctx.setLineDash([3, 3]);
                    ctx.beginPath();
                    ctx.moveTo(cx, cy);
                    ctx.lineTo(periX, periY);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.fillStyle = '#ff007f';
                    ctx.font = '10px Inter, sans-serif';
                    ctx.fillText('Periélio', periX + 6, periY + 4);
                }
            }
        });
    }

    // Renderiza Poço de Deformação da Malha do Espaço-Tempo (Geometria Curva)
    function renderSpacetimeMesh(cx, cy) {
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.25)';
        ctx.lineWidth = 1;

        const cols = 26;
        const rows = 18;
        const spacingX = simCanvas.width / cols;
        const spacingY = simCanvas.height / rows;

        // Renderiza linhas horizontais deformadas pela massa do Sol
        for (let r = 0; r <= rows; r++) {
            ctx.beginPath();
            for (let c = 0; c <= cols; c++) {
                const x = c * spacingX;
                const y = r * spacingY;

                const dx = x - cx;
                const dy = y - cy;
                const dist = Math.hypot(dx, dy);

                // Deformação da gravidade (Poço de Schwarzschild)
                const warp = Math.max(0, 60 - dist * 0.25);
                const warpedY = y + warp * Math.exp(-dist * 0.012);

                if (c === 0) ctx.moveTo(x, warpedY);
                else ctx.lineTo(x, warpedY);
            }
            ctx.stroke();
        }

        // Sol deformando a malha
        drawSun(cx, cy);

        // Planeta orbitando sobre a malha curva
        const planet = celestialBodies.mercury;
        if (planet.posE) {
            ctx.fillStyle = '#ffb703';
            ctx.shadowColor = '#ffb703';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(cx + planet.posE.x, cy + planet.posE.y, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // Renderiza Experimento da Deflexão Relativística da Luz (Sobral 1919)
    function renderLightDeflectionView(cx, cy) {
        drawSun(cx, cy);

        const photonX = state.photonX + cx;
        const photonY = state.photonY;

        // Estrela Real (Posição Verdadeira atrás do Sol)
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.arc(cx - 320, cy - 60, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText('Estrela Real', cx - 360, cy - 70);

        // Trajetória Newtoniana (Desvio = 0.875")
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(cx - 320, cy - 60);
        ctx.lineTo(cx, cy - 25);
        ctx.lineTo(cx + 320, cy - 10);
        ctx.stroke();

        // Trajetória Relativística (Desvio = 1.75" - DOBRO!)
        ctx.strokeStyle = '#ffb703';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(cx - 320, cy - 60);
        ctx.quadraticCurveTo(cx, cy + 20, cx + 320, cy - 90);
        ctx.stroke();

        // Fóton em movimento
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(photonX, photonY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Rótulos de Desvio
        ctx.fillStyle = '#00f2fe';
        ctx.font = '12px Outfit, sans-serif';
        ctx.fillText('Newton: θ = 0.875" (Deflexão Parcial)', cx + 80, cy - 15);

        ctx.fillStyle = '#ffb703';
        ctx.fillText('Einstein (RG): θ = 1.75" (Comprovado em Sobral 1919)', cx + 80, cy - 95);
    }

    function drawSun(cx, cy) {
        ctx.save();
        ctx.shadowColor = 'rgba(255, 183, 3, 0.8)';
        ctx.shadowBlur = 30;

        const sunGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 26);
        sunGrad.addColorStop(0, '#ffffff');
        sunGrad.addColorStop(0.4, '#ffb703');
        sunGrad.addColorStop(1, '#e67e22');

        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 26, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // --- Configuração dos Event Listeners ---
    function setupEventListeners() {
        window.addEventListener('resize', resizeCanvas);

        // Seleção de Modos (Relatividade vs Clássica vs Comparação)
        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.simMode = btn.dataset.mode;
            });
        });

        // Navegação de Abas
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.activeTab = btn.dataset.tab;

                updateTabTitles(state.activeTab);

                // Rola suavemente até a tabela se selecionada
                if (state.activeTab === 'comparison') {
                    document.getElementById('comparison-section').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Foco de Planetas
        planetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                planetBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.selectedPlanet = btn.dataset.planet;
            });
        });

        // Sliders
        relScaleSlider.addEventListener('input', (e) => {
            state.relScale = parseFloat(e.target.value);
            relScaleVal.textContent = `${state.relScale}x (Exagerado p/ Visualização)`;
        });

        speedSlider.addEventListener('input', (e) => {
            state.simSpeed = parseFloat(e.target.value);
            speedVal.textContent = `${state.simSpeed.toFixed(1)}x`;
        });

        // Controles de Animação
        playPauseBtn.addEventListener('click', () => {
            state.isAnimating = !state.isAnimating;
            playIcon.textContent = state.isAnimating ? '⏸' : '▶';
            playText.textContent = state.isAnimating ? 'Pausar' : 'Simular';
        });

        resetBtn.addEventListener('click', () => {
            Object.keys(celestialBodies).forEach(k => {
                if (k !== 'sun') {
                    celestialBodies[k].trailNewton = [];
                    celestialBodies[k].trailEinstein = [];
                    celestialBodies[k].precessionAngle = 0;
                }
            });
        });

        // Toggles
        toggleTrails.addEventListener('change', (e) => state.showTrails = e.target.checked);
        toggleVectors.addEventListener('change', (e) => state.showVectors = e.target.checked);
        toggleGrid.addEventListener('change', (e) => state.showGrid = e.target.checked);
    }

    function updateTabTitles(tab) {
        switch (tab) {
            case 'orbits':
                viewTitle.innerHTML = '<span class="icon">🪐</span> Órbitas Planetárias e Precessão Relativística';
                break;
            case 'spacetime':
                viewTitle.innerHTML = '<span class="icon">🌀</span> Malha de Curvatura do Espaço-Tempo (Einstein)';
                break;
            case 'light':
                viewTitle.innerHTML = '<span class="icon">💡</span> Experimento de Deflexão da Luz (Eclipse de 1919)';
                break;
            case 'clocks':
                viewTitle.innerHTML = '<span class="icon">⏱️</span> Dilatação Gravitacional do Tempo no Sistema Solar';
                break;
            case 'comparison':
                viewTitle.innerHTML = '<span class="icon">📊</span> Tabela Comparativa Física: Newton vs Einstein';
                break;
        }
    }

    init();
});
