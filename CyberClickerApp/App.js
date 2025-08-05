import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, StatusBar } from 'react-native';

const gameHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>CyberClicker - Imperio Ciberpunk</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        /* Reset y base */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Rajdhani', sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a1a1a 100%);
            color: #00ffff;
            overflow-x: hidden;
            min-height: 100vh;
            position: relative;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        /* Animación de lluvia cyberpunk de fondo */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                radial-gradient(2px 2px at 20% 30%, #00ffff, transparent),
                radial-gradient(2px 2px at 40% 70%, #ff00ff, transparent),
                radial-gradient(1px 1px at 90% 40%, #00ff00, transparent),
                radial-gradient(1px 1px at 10% 90%, #ffff00, transparent);
            background-repeat: repeat;
            background-size: 300px 300px;
            animation: rain 20s linear infinite;
            opacity: 0.1;
            pointer-events: none;
            z-index: -1;
        }

        @keyframes rain {
            0% { transform: translateY(-100vh); }
            100% { transform: translateY(100vh); }
        }

        /* Contenedor principal */
        .game-container {
            max-width: 100%;
            margin: 0 auto;
            padding: 10px;
            position: relative;
            z-index: 1;
        }

        /* Header */
        .game-header {
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #00ffff;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
            backdrop-filter: blur(10px);
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
        }

        .game-title {
            font-family: 'Orbitron', monospace;
            font-size: 1.8rem;
            font-weight: 900;
            text-shadow: 0 0 10px #00ffff;
            animation: pulse-glow 2s ease-in-out infinite alternate;
        }

        .game-title .accent {
            color: #ff00ff;
            text-shadow: 0 0 10px #ff00ff;
        }

        @keyframes pulse-glow {
            from { text-shadow: 0 0 10px #00ffff; }
            to { text-shadow: 0 0 20px #00ffff, 0 0 30px #00ffff; }
        }

        .stats-display {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            font-size: 0.9rem;
        }

        .stat-item {
            text-align: center;
        }

        .stat-label {
            display: block;
            font-size: 0.8rem;
            color: #aaa;
            margin-bottom: 3px;
        }

        .stat-value {
            display: block;
            font-family: 'Orbitron', monospace;
            font-size: 1.1rem;
            font-weight: 700;
            color: #00ff00;
            text-shadow: 0 0 10px #00ff00;
        }

        /* Área principal */
        .game-main {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 15px;
        }

        /* Paneles */
        .clicker-panel,
        .production-panel,
        .upgrades-panel {
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #444;
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.1);
            backdrop-filter: blur(5px);
        }

        .clicker-panel {
            border-color: #00ffff;
        }

        .production-panel {
            border-color: #ff00ff;
        }

        .upgrades-panel {
            border-color: #00ff00;
        }

        /* Información de etapa */
        .stage-info {
            text-align: center;
            margin-bottom: 15px;
        }

        .stage-info h2 {
            font-family: 'Orbitron', monospace;
            font-size: 1.2rem;
            color: #00ffff;
            margin-bottom: 8px;
            text-shadow: 0 0 10px #00ffff;
        }

        .stage-info p {
            color: #aaa;
            font-style: italic;
            line-height: 1.4;
            font-size: 0.9rem;
        }

        /* Botón principal de click */
        .click-area {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }

        .cyber-button {
            position: relative;
            width: 180px;
            height: 180px;
            background: linear-gradient(135deg, #001a1a, #003333);
            border: 3px solid #00ffff;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s ease;
            overflow: hidden;
            font-family: 'Orbitron', monospace;
            touch-action: manipulation;
        }

        .cyber-button:active {
            transform: scale(0.95);
            box-shadow: 0 0 50px rgba(0, 255, 255, 0.8);
        }

        .button-content {
            position: relative;
            z-index: 2;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #00ffff;
        }

        .click-icon {
            font-size: 2.5rem;
            margin-bottom: 8px;
            animation: electric-pulse 1s ease-in-out infinite;
        }

        @keyframes electric-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); text-shadow: 0 0 20px #00ffff; }
        }

        .click-text {
            font-size: 0.9rem;
            font-weight: 700;
            margin-bottom: 5px;
        }

        .click-reward {
            font-size: 0.8rem;
            color: #00ff00;
        }

        .button-glow {
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
            animation: rotate 4s linear infinite;
            pointer-events: none;
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* Listas de mejoras y edificios */
        .upgrades-list,
        .buildings-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            max-height: 300px;
            overflow-y: auto;
        }

        .upgrade-item,
        .building-item {
            background: rgba(0, 20, 20, 0.8);
            border: 1px solid #333;
            border-radius: 5px;
            padding: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            touch-action: manipulation;
        }

        .upgrade-item:active,
        .building-item:active {
            transform: scale(0.98);
        }

        .upgrade-item.affordable,
        .building-item.affordable {
            border-color: #00ff00;
            background: rgba(0, 30, 10, 0.8);
        }

        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
        }

        .item-name {
            font-weight: 600;
            color: #00ffff;
            font-size: 0.9rem;
        }

        .item-cost {
            font-family: 'Orbitron', monospace;
            color: #ff00ff;
            font-weight: 700;
            font-size: 0.8rem;
        }

        .item-description {
            font-size: 0.75rem;
            color: #aaa;
            line-height: 1.3;
            margin-bottom: 4px;
        }

        .item-production {
            font-size: 0.8rem;
            color: #00ff00;
            font-weight: 600;
        }

        .building-count {
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(0, 255, 255, 0.2);
            color: #00ffff;
            border-radius: 12px;
            padding: 2px 6px;
            font-size: 0.7rem;
            font-weight: 600;
        }

        /* Panel de progreso */
        .progress-panel {
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #ffff00;
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 0 15px rgba(255, 255, 0, 0.2);
        }

        .progress-label {
            text-align: center;
            color: #ffff00;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 0.9rem;
        }

        .progress-bar {
            width: 100%;
            height: 15px;
            background: rgba(50, 50, 0, 0.5);
            border: 1px solid #ffff00;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 8px;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #ffff00, #ff8800);
            width: 0%;
            transition: width 0.5s ease;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(255, 255, 0, 0.5);
        }

        .progress-text {
            text-align: center;
            font-family: 'Orbitron', monospace;
            color: #ffff00;
            font-weight: 600;
            font-size: 0.8rem;
        }

        /* Títulos de sección */
        h3 {
            font-family: 'Orbitron', monospace;
            font-size: 1.1rem;
            margin-bottom: 12px;
            text-align: center;
            color: #fff;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            border-bottom: 1px solid #333;
            padding-bottom: 8px;
        }

        /* Notificaciones */
        #notifications {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 1000;
        }

        .notification {
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #00ff00;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 8px;
            color: #00ff00;
            font-weight: 600;
            font-size: 0.8rem;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
            animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
        }

        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeOut {
            to { opacity: 0; transform: translateX(100%); }
        }

        /* Efectos de partículas */
        #particle-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
        }

        .particle {
            position: absolute;
            pointer-events: none;
            color: #00ff00;
            font-weight: bold;
            font-size: 1rem;
            animation: floatUp 1s ease-out forwards;
        }

        @keyframes floatUp {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-80px);
            }
        }

        /* Logros */
        .achievement {
            background: rgba(30, 20, 0, 0.8);
            border: 1px solid #ff8800;
            border-radius: 5px;
            padding: 8px;
            margin-bottom: 8px;
            opacity: 0.6;
            transition: all 0.3s ease;
        }

        .achievement.unlocked {
            opacity: 1;
            border-color: #ffff00;
            box-shadow: 0 0 15px rgba(255, 255, 0, 0.3);
        }

        .achievement-name {
            font-weight: 600;
            color: #ffff00;
            margin-bottom: 4px;
            font-size: 0.8rem;
        }

        .achievement-description {
            font-size: 0.7rem;
            color: #ccc;
        }

        .achievement-reward {
            font-size: 0.7rem;
            color: #00ff00;
            font-style: italic;
            margin-top: 4px;
        }

        /* Scrollbar personalizado */
        ::-webkit-scrollbar {
            width: 6px;
        }

        ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.3);
        }

        ::-webkit-scrollbar-thumb {
            background: #00ffff;
            border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #00ff00;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <!-- Header con información del jugador -->
        <header class="game-header">
            <div class="header-content">
                <h1 class="game-title">CYBER<span class="accent">CLICKER</span></h1>
                <div class="stats-display">
                    <div class="stat-item">
                        <span class="stat-label">CRÉDITOS:</span>
                        <span class="stat-value" id="credits">0</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">C/SEC:</span>
                        <span class="stat-value" id="credits-per-second">0</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">CLICKS:</span>
                        <span class="stat-value" id="total-clicks">0</span>
                    </div>
                </div>
            </div>
        </header>

        <!-- Área principal de juego -->
        <main class="game-main">
            <!-- Panel principal - Clicker -->
            <section class="clicker-panel">
                <div class="stage-info">
                    <h2 id="current-stage">MEGACIUDAD NEON</h2>
                    <p id="stage-description">Un hacker solitario en las calles lluviosas de la metrópolis...</p>
                </div>
                
                <div class="click-area">
                    <button id="main-clicker" class="cyber-button">
                        <div class="button-content">
                            <div class="click-icon">⚡</div>
                            <div class="click-text">HACKEAR</div>
                            <div class="click-reward">+<span id="click-value">1</span></div>
                        </div>
                        <div class="button-glow"></div>
                    </button>
                </div>

                <!-- Mejoras de click -->
                <div class="click-upgrades">
                    <h3>MEJORAS DE HACK</h3>
                    <div class="upgrades-list" id="click-upgrades">
                        <!-- Se llenarán dinámicamente -->
                    </div>
                </div>
            </section>

            <!-- Panel de unidades pasivas -->
            <section class="production-panel">
                <h3>UNIDADES AUTOMÁTICAS</h3>
                <div class="buildings-list" id="buildings-list">
                    <!-- Se llenarán dinámicamente -->
                </div>
            </section>

            <!-- Panel de mejoras y logros -->
            <section class="upgrades-panel">
                <div class="upgrades-section">
                    <h3>TECNOLOGÍAS</h3>
                    <div class="upgrades-list" id="tech-upgrades">
                        <!-- Se llenarán dinámicamente -->
                    </div>
                </div>

                <div class="achievements-section">
                    <h3>LOGROS</h3>
                    <div class="achievements-list" id="achievements">
                        <!-- Se llenarán dinámicamente -->
                    </div>
                </div>
            </section>
        </main>

        <!-- Panel de progreso -->
        <footer class="progress-panel">
            <div class="progress-container">
                <div class="progress-label">Progreso hacia próxima etapa</div>
                <div class="progress-bar">
                    <div class="progress-fill" id="stage-progress"></div>
                </div>
                <div class="progress-text" id="progress-text">0 / 1,000 créditos</div>
            </div>
        </footer>
    </div>

    <!-- Notificaciones -->
    <div id="notifications"></div>

    <!-- Efectos de partículas -->
    <div id="particle-container"></div>

    <script>
        // CyberClicker - Juego Clicker Ciberpunk
        const gameState = {
            credits: 0,
            totalCredits: 0,
            creditsPerSecond: 0,
            clickValue: 1,
            totalClicks: 0,
            stage: 0,
            lastSaveTime: Date.now(),
            buildings: {},
            upgrades: {
                click: [],
                tech: []
            },
            achievements: []
        };

        const stages = [
            {
                name: "MEGACIUDAD NEON",
                description: "Un hacker solitario en las calles lluviosas de la metrópolis...",
                requirement: 0,
                nextRequirement: 1000
            },
            {
                name: "PLANETA CYBERIA",
                description: "Controlando la economía de todo el planeta...",
                requirement: 1000,
                nextRequirement: 1000000
            },
            {
                name: "SISTEMA SOLAR NEO",
                description: "Expandiendo tu imperio a través de los planetas...",
                requirement: 1000000,
                nextRequirement: 1000000000
            },
            {
                name: "IMPERIO GALÁCTICO",
                description: "Dominando la galaxia con tu imperio tecnológico...",
                requirement: 1000000000,
                nextRequirement: Infinity
            }
        ];

        const buildingDefinitions = {
            0: [
                {
                    id: 'bot_mineria',
                    name: 'Bot de Minería',
                    baseCost: 10,
                    baseProduction: 1,
                    description: 'Extrae datos valiosos de la red.'
                },
                {
                    id: 'impresora_3d',
                    name: 'Impresora 3D',
                    baseCost: 100,
                    baseProduction: 5,
                    description: 'Fabrica gadgets ilegales.'
                },
                {
                    id: 'refugio_tech',
                    name: 'Refugio Tech',
                    baseCost: 1000,
                    baseProduction: 25,
                    description: 'Base de programadores.'
                },
                {
                    id: 'centro_datos',
                    name: 'Centro de Datos',
                    baseCost: 10000,
                    baseProduction: 100,
                    description: 'Almacena información corporativa.'
                }
            ],
            1: [
                {
                    id: 'servidor_cuantico',
                    name: 'Servidor Cuántico',
                    baseCost: 100000,
                    baseProduction: 500,
                    description: 'Procesamiento cuántico avanzado.'
                },
                {
                    id: 'fabrica_neural',
                    name: 'Fábrica Neural',
                    baseCost: 1000000,
                    baseProduction: 2500,
                    description: 'Produce implantes neurales.'
                }
            ],
            2: [
                {
                    id: 'base_lunar',
                    name: 'Base Lunar',
                    baseCost: 50000000,
                    baseProduction: 12500,
                    description: 'Extrae Helio-3 lunar.'
                },
                {
                    id: 'colonia_marte',
                    name: 'Colonia Marte',
                    baseCost: 500000000,
                    baseProduction: 62500,
                    description: 'Ciudad marciana productiva.'
                }
            ],
            3: [
                {
                    id: 'flota_estelar',
                    name: 'Flota Estelar',
                    baseCost: 25000000000,
                    baseProduction: 312500,
                    description: 'Explora sistemas completos.'
                }
            ]
        };

        const clickUpgradeDefinitions = [
            {
                id: 'dedos_bionicos',
                name: 'Dedos Biónicos',
                cost: 50,
                effect: 1,
                description: 'Mejora velocidad de clics.',
                purchased: false
            },
            {
                id: 'interfaz_neural',
                name: 'Interfaz Neural',
                cost: 500,
                effect: 5,
                description: 'Conexión mental directa.',
                purchased: false
            },
            {
                id: 'amplificador_sinaptico',
                name: 'Amplificador',
                cost: 5000,
                effect: 25,
                description: 'Multiplica procesamiento neural.',
                purchased: false
            },
            {
                id: 'matrix_hack',
                name: 'Matrix Hack',
                cost: 50000,
                effect: 100,
                description: 'Protocolos fundamentales.',
                purchased: false
            }
        ];

        const techUpgradeDefinitions = [
            {
                id: 'optimizacion_algoritmos',
                name: 'Optimización IA',
                cost: 1000,
                effect: 0.1,
                description: 'Mejora eficiencia global.',
                purchased: false
            },
            {
                id: 'ia_general',
                name: 'IA General',
                cost: 100000,
                effect: 1.0,
                description: 'IA gestiona operaciones.',
                purchased: false
            },
            {
                id: 'fusion_cuantica',
                name: 'Fusión Cuántica',
                cost: 10000000,
                effect: 2.0,
                description: 'Energía casi ilimitada.',
                purchased: false
            }
        ];

        const achievementDefinitions = [
            {
                id: 'first_click',
                name: 'Primer Hack',
                description: 'Realiza tu primer clic.',
                condition: () => gameState.totalClicks >= 1,
                reward: '+1 clic'
            },
            {
                id: 'hundred_clicks',
                name: 'Hacker Novato',
                description: 'Realiza 100 clics.',
                condition: () => gameState.totalClicks >= 100,
                reward: '+1 clic'
            },
            {
                id: 'first_building',
                name: 'Primera Auto',
                description: 'Compra primera unidad.',
                condition: () => Object.values(gameState.buildings).some(count => count > 0),
                reward: 'Nuevas mejoras'
            },
            {
                id: 'millionaire',
                name: 'Millonario Cyber',
                description: 'Acumula 1M créditos.',
                condition: () => gameState.totalCredits >= 1000000,
                reward: '+50% producción'
            }
        ];

        const elements = {
            credits: document.getElementById('credits'),
            creditsPerSecond: document.getElementById('credits-per-second'),
            totalClicks: document.getElementById('total-clicks'),
            clickValue: document.getElementById('click-value'),
            mainClicker: document.getElementById('main-clicker'),
            currentStage: document.getElementById('current-stage'),
            stageDescription: document.getElementById('stage-description'),
            stageProgress: document.getElementById('stage-progress'),
            progressText: document.getElementById('progress-text'),
            clickUpgrades: document.getElementById('click-upgrades'),
            buildingsList: document.getElementById('buildings-list'),
            techUpgrades: document.getElementById('tech-upgrades'),
            achievements: document.getElementById('achievements'),
            notifications: document.getElementById('notifications'),
            particleContainer: document.getElementById('particle-container')
        };

        function formatNumber(num) {
            if (num < 1000) return Math.floor(num).toString();
            if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
            if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
            if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
            return (num / 1000000000000).toFixed(1) + 'T';
        }

        function calculateBuildingCost(baseCost, owned) {
            return Math.floor(baseCost * Math.pow(1.15, owned));
        }

        function calculateTotalProduction() {
            let total = 0;
            
            for (let stage = 0; stage <= gameState.stage; stage++) {
                const availableBuildings = buildingDefinitions[stage] || [];
                for (const building of availableBuildings) {
                    const owned = gameState.buildings[building.id] || 0;
                    total += building.baseProduction * owned;
                }
            }
            
            let multiplier = 1;
            for (const upgrade of techUpgradeDefinitions) {
                if (gameState.upgrades.tech.includes(upgrade.id)) {
                    multiplier += upgrade.effect;
                }
            }
            
            if (gameState.achievements.includes('millionaire')) {
                multiplier *= 1.5;
            }
            
            return total * multiplier;
        }

        function createParticle(x, y, text, color = '#00ff00') {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = text;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.color = color;
            
            elements.particleContainer.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }

        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            
            elements.notifications.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 3000);
        }

        function performClick(event) {
            gameState.credits += gameState.clickValue;
            gameState.totalCredits += gameState.clickValue;
            gameState.totalClicks++;
            
            const rect = elements.mainClicker.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            createParticle(x, y, \`+\${formatNumber(gameState.clickValue)}\`);
            
            updateDisplay();
            checkAchievements();
        }

        function buyBuilding(buildingId) {
            let building = null;
            for (let stage = 0; stage <= gameState.stage; stage++) {
                if (buildingDefinitions[stage]) {
                    building = buildingDefinitions[stage].find(b => b.id === buildingId);
                    if (building) break;
                }
            }
            
            if (!building) return;
            
            const owned = gameState.buildings[buildingId] || 0;
            const cost = calculateBuildingCost(building.baseCost, owned);
            
            if (gameState.credits >= cost) {
                gameState.credits -= cost;
                gameState.buildings[buildingId] = owned + 1;
                
                showNotification(\`¡\${building.name} comprado!\`);
                updateDisplay();
                checkAchievements();
            }
        }

        function buyClickUpgrade(upgradeId) {
            const upgrade = clickUpgradeDefinitions.find(u => u.id === upgradeId);
            
            if (!upgrade || upgrade.purchased || gameState.credits < upgrade.cost) return;
            
            gameState.credits -= upgrade.cost;
            gameState.clickValue += upgrade.effect;
            upgrade.purchased = true;
            gameState.upgrades.click.push(upgradeId);
            
            showNotification(\`¡\${upgrade.name} adquirido!\`);
            updateDisplay();
        }

        function buyTechUpgrade(upgradeId) {
            const upgrade = techUpgradeDefinitions.find(u => u.id === upgradeId);
            
            if (!upgrade || upgrade.purchased || gameState.credits < upgrade.cost) return;
            
            gameState.credits -= upgrade.cost;
            upgrade.purchased = true;
            gameState.upgrades.tech.push(upgradeId);
            
            showNotification(\`¡\${upgrade.name} desarrollado!\`);
            updateDisplay();
        }

        function checkStageProgression() {
            const currentStage = stages[gameState.stage];
            const nextStage = stages[gameState.stage + 1];
            
            if (nextStage && gameState.totalCredits >= nextStage.requirement) {
                gameState.stage++;
                showNotification(\`¡Nueva etapa: \${nextStage.name}!\`, 'stage');
                updateDisplay();
            }
        }

        function checkAchievements() {
            for (const achievement of achievementDefinitions) {
                if (!gameState.achievements.includes(achievement.id) && achievement.condition()) {
                    gameState.achievements.push(achievement.id);
                    showNotification(\`¡Logro: \${achievement.name}!\`, 'achievement');
                    
                    if (achievement.id === 'first_click' || achievement.id === 'hundred_clicks') {
                        gameState.clickValue += 1;
                    }
                }
            }
        }

        function updateDisplay() {
            elements.credits.textContent = formatNumber(gameState.credits);
            elements.creditsPerSecond.textContent = formatNumber(gameState.creditsPerSecond);
            elements.totalClicks.textContent = formatNumber(gameState.totalClicks);
            elements.clickValue.textContent = formatNumber(gameState.clickValue);
            
            const currentStage = stages[gameState.stage];
            elements.currentStage.textContent = currentStage.name;
            elements.stageDescription.textContent = currentStage.description;
            
            const nextStage = stages[gameState.stage + 1];
            if (nextStage) {
                const progress = (gameState.totalCredits / nextStage.requirement) * 100;
                elements.stageProgress.style.width = Math.min(progress, 100) + '%';
                elements.progressText.textContent = \`\${formatNumber(gameState.totalCredits)} / \${formatNumber(nextStage.requirement)}\`;
            } else {
                elements.stageProgress.style.width = '100%';
                elements.progressText.textContent = 'Imperio Completo';
            }
            
            updateBuildingsDisplay();
            updateUpgradesDisplay();
            updateAchievementsDisplay();
        }

        function updateBuildingsDisplay() {
            const availableBuildings = [];
            for (let stage = 0; stage <= gameState.stage; stage++) {
                if (buildingDefinitions[stage]) {
                    availableBuildings.push(...buildingDefinitions[stage]);
                }
            }
            
            elements.buildingsList.innerHTML = '';
            
            for (const building of availableBuildings) {
                const owned = gameState.buildings[building.id] || 0;
                const cost = calculateBuildingCost(building.baseCost, owned);
                const canAfford = gameState.credits >= cost;
                
                const buildingElement = document.createElement('div');
                buildingElement.className = \`building-item \${canAfford ? 'affordable' : ''}\`;
                buildingElement.onclick = () => buyBuilding(building.id);
                
                buildingElement.innerHTML = \`
                    <div class="item-header">
                        <span class="item-name">\${building.name}</span>
                        <span class="item-cost">\${formatNumber(cost)}€</span>
                    </div>
                    <div class="item-description">\${building.description}</div>
                    <div class="item-production">\${formatNumber(building.baseProduction)} c/seg</div>
                    \${owned > 0 ? \`<div class="building-count">\${owned}</div>\` : ''}
                \`;
                
                elements.buildingsList.appendChild(buildingElement);
            }
        }

        function updateUpgradesDisplay() {
            elements.clickUpgrades.innerHTML = '';
            for (const upgrade of clickUpgradeDefinitions) {
                if (upgrade.purchased) continue;
                
                const canAfford = gameState.credits >= upgrade.cost;
                const upgradeElement = document.createElement('div');
                upgradeElement.className = \`upgrade-item \${canAfford ? 'affordable' : ''}\`;
                upgradeElement.onclick = () => buyClickUpgrade(upgrade.id);
                
                upgradeElement.innerHTML = \`
                    <div class="item-header">
                        <span class="item-name">\${upgrade.name}</span>
                        <span class="item-cost">\${formatNumber(upgrade.cost)}€</span>
                    </div>
                    <div class="item-description">\${upgrade.description}</div>
                    <div class="item-production">+\${upgrade.effect} clic</div>
                \`;
                
                elements.clickUpgrades.appendChild(upgradeElement);
            }
            
            elements.techUpgrades.innerHTML = '';
            for (const upgrade of techUpgradeDefinitions) {
                if (upgrade.purchased) continue;
                
                const canAfford = gameState.credits >= upgrade.cost;
                const upgradeElement = document.createElement('div');
                upgradeElement.className = \`upgrade-item \${canAfford ? 'affordable' : ''}\`;
                upgradeElement.onclick = () => buyTechUpgrade(upgrade.id);
                
                upgradeElement.innerHTML = \`
                    <div class="item-header">
                        <span class="item-name">\${upgrade.name}</span>
                        <span class="item-cost">\${formatNumber(upgrade.cost)}€</span>
                    </div>
                    <div class="item-description">\${upgrade.description}</div>
                    <div class="item-production">+\${(upgrade.effect * 100).toFixed(0)}%</div>
                \`;
                
                elements.techUpgrades.appendChild(upgradeElement);
            }
        }

        function updateAchievementsDisplay() {
            elements.achievements.innerHTML = '';
            
            for (const achievement of achievementDefinitions) {
                const unlocked = gameState.achievements.includes(achievement.id);
                
                const achievementElement = document.createElement('div');
                achievementElement.className = \`achievement \${unlocked ? 'unlocked' : ''}\`;
                
                achievementElement.innerHTML = \`
                    <div class="achievement-name">\${achievement.name}</div>
                    <div class="achievement-description">\${achievement.description}</div>
                    <div class="achievement-reward">\${achievement.reward}</div>
                \`;
                
                elements.achievements.appendChild(achievementElement);
            }
        }

        function saveGame() {
            gameState.lastSaveTime = Date.now();
            localStorage.setItem('cyberclicker-mobile-save', JSON.stringify(gameState));
        }

        function loadGame() {
            const saveData = localStorage.getItem('cyberclicker-mobile-save');
            if (saveData) {
                const loaded = JSON.parse(saveData);
                Object.assign(gameState, loaded);
                
                const offlineTime = (Date.now() - gameState.lastSaveTime) / 1000;
                if (offlineTime > 60) {
                    const offlineCredits = gameState.creditsPerSecond * offlineTime;
                    gameState.credits += offlineCredits;
                    gameState.totalCredits += offlineCredits;
                    
                    showNotification(\`¡Bienvenido! +\${formatNumber(offlineCredits)} offline\`);
                }
                
                for (const upgrade of clickUpgradeDefinitions) {
                    upgrade.purchased = gameState.upgrades.click.includes(upgrade.id);
                }
                for (const upgrade of techUpgradeDefinitions) {
                    upgrade.purchased = gameState.upgrades.tech.includes(upgrade.id);
                }
            }
        }

        function gameLoop() {
            gameState.creditsPerSecond = calculateTotalProduction();
            
            const creditsThisTick = gameState.creditsPerSecond / 10;
            gameState.credits += creditsThisTick;
            gameState.totalCredits += creditsThisTick;
            
            checkStageProgression();
            updateDisplay();
            
            if (Date.now() - gameState.lastSaveTime > 30000) {
                saveGame();
            }
        }

        function initGame() {
            loadGame();
            
            elements.mainClicker.addEventListener('click', performClick);
            elements.mainClicker.addEventListener('touchstart', performClick);
            
            for (let stage = 0; stage < Object.keys(buildingDefinitions).length; stage++) {
                for (const building of buildingDefinitions[stage] || []) {
                    if (!(building.id in gameState.buildings)) {
                        gameState.buildings[building.id] = 0;
                    }
                }
            }
            
            updateDisplay();
            setInterval(gameLoop, 100);
            setInterval(saveGame, 10000);
            
            console.log('CyberClicker Mobile iniciado!');
        }

        document.addEventListener('DOMContentLoaded', initGame);
    </script>
</body>
</html>
`;

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <WebView 
        source={{ html: gameHTML }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
});
