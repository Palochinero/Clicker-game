# CyberClicker - Imperio Ciberpunk 🌆⚡

Un juego incremental (idle clicker) ambientado en un futuro ciberpunk distópico donde construyes tu imperio tecnológico desde las calles lluviosas de una megaciudad hasta dominar toda la galaxia.

## 🎮 Características Principales

### 🔥 Mecánicas de Clicker
- **Clics Activos**: Gana créditos hackeando sistemas con cada clic
- **Efectos Visuales**: Partículas ciberpunk y retroalimentación inmersiva
- **Mejoras de Clic**: Aumenta tu poder de hackeo con implantes y tecnología

### 🏭 Sistema de Ingresos Pasivos
- **Unidades Automáticas**: Bots, fábricas y centros de datos que trabajan 24/7
- **Edificios Escalables**: Cada compra aumenta el costo pero mejora la producción
- **Producción Offline**: Gana créditos incluso cuando no estás jugando

### 🚀 Progresión por Etapas
1. **Megaciudad Neon** - Comienza como hacker callejero
2. **Planeta Cyberia** - Controla la economía planetaria
3. **Sistema Solar Neo** - Expande a la Luna, Marte y más allá
4. **Imperio Galáctico** - Domina sistemas estelares completos

### 🔬 Sistema de Tecnología
- **Mejoras de Eficiencia**: Optimiza todas tus operaciones
- **IA Avanzada**: Automatiza y multiplica tu producción
- **Tecnologías Futuristas**: Fusión cuántica y manipulación espacio-temporal

### 🏆 Logros y Recompensas
- **Sistema de Logros**: Desbloquea mejoras permanentes
- **Notificaciones**: Feedback constante de tu progreso
- **Recompensas por Hitos**: Bonificaciones especiales por alcanzar metas

## 🎯 Cómo Jugar

### Primeros Pasos
1. **Haz Clic**: Comienza hackeando sistemas para ganar tus primeros créditos
2. **Compra Mejoras**: Invierte en "Dedos Biónicos" para mejorar tus clics
3. **Automatiza**: Compra tu primer "Bot de Minería de Datos" para ingresos pasivos

### Estrategia de Progresión
1. **Equilibra**: Alterna entre mejoras de clic y unidades automáticas
2. **Expande**: Compra múltiples unidades del mismo tipo para mayor producción
3. **Tecnología**: Invierte en tecnologías globales para multiplicadores masivos
4. **Progresa**: Alcanza los requisitos para desbloquear nuevas etapas

### Consejos Avanzados
- Las tecnologías globales afectan TODA tu producción
- Los logros dan bonificaciones permanentes
- El juego calcula progreso offline basado en tu producción por segundo
- Cada etapa desbloquea nuevos tipos de edificios más poderosos

## 🛠️ Características Técnicas

### Guardado Automático
- **Local Storage**: Tu progreso se guarda automáticamente cada 10 segundos
- **Cálculo Offline**: Ganas créditos proporcionales al tiempo que estuviste ausente
- **Persistencia**: El juego recuerda todo tu progreso entre sesiones

### Optimización
- **60 FPS**: Interfaz fluida con animaciones suaves
- **Formateo Inteligente**: Números grandes se muestran como K, M, B, T
- **Responsive**: Se adapta a diferentes tamaños de pantalla

### Efectos Visuales
- **Tema Ciberpunk**: Colores neón, efectos de lluvia y atmósfera futurista
- **Partículas**: Efectos visuales en cada clic
- **Animaciones**: Botones y elementos con feedback visual
- **Notificaciones**: Sistema de alertas para logros y compras

## 🎨 Temática y Narrativa

### Ambientación
Año 22XX. Las megacorporaciones dominan el mundo con puño de hierro. Tú eres un hacker independiente que comienza desde las calles lluviosas de una megaciudad cyberpunk. Tu objetivo: construir un imperio tecnológico que rivalice con las corporaciones más poderosas de la galaxia.

### Progresión Narrativa
- **Ciudad**: Sobrevive en las calles, hackea sistemas corporativos
- **Planeta**: Convierte tu operación en un imperio planetario
- **Sistema Solar**: Expande a la Luna, Marte y estaciones espaciales
- **Galaxia**: Conquista sistemas estelares y domina la Vía Láctea

### Elementos de Historia
- Descubre la verdad detrás de las megacorporaciones
- Encuentra aliados y enemigos en tu ascenso al poder
- Desentraña los misterios de la tecnología avanzada
- Decide el destino de la humanidad en el espacio

## 📱 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexión a internet (solo para cargar fuentes de Google)

### Cómo Ejecutar
1. Descarga o clona este repositorio
2. Abre `index.html` en tu navegador web
3. ¡Comienza a hacer clic y construye tu imperio!

### Archivos Principales
- `index.html` - Estructura HTML del juego
- `styles.css` - Estilos y animaciones ciberpunk
- `game.js` - Lógica principal del juego

## 🚀 Características Futuras (Roadmap)

### Próximas Actualizaciones
- [ ] Sistema de prestigio/reinicio con bonificaciones
- [ ] Eventos temporales especiales
- [ ] Más tipos de recursos (energía, datos, materia oscura)
- [ ] Sistema de investigación más profundo
- [ ] Modo multijugador con rankings
- [ ] Integración de publicidad recompensada
- [ ] Microtransacciones opcionales
- [ ] Más etapas (otras galaxias, universos paralelos)

### Mejoras Técnicas
- [ ] Optimización para dispositivos móviles
- [ ] Sistema de guardado en la nube
- [ ] Compresión de datos de guardado
- [ ] Análiticas de juego
- [ ] Modo sin conexión completo

## 🎮 Mecánicas de Juego Detalladas

### Sistema de Costos
- Los edificios aumentan de precio siguiendo la fórmula: `costo_base * (1.15 ^ cantidad_poseída)`
- Las tecnologías tienen costo fijo pero efectos permanentes
- Los logros otorgan bonificaciones gratuitas por alcanzar hitos

### Cálculo de Producción
```javascript
Producción Total = Σ(edificio.producción_base * cantidad_poseída) * multiplicador_tecnológico
```

### Progresión de Etapas
- **Etapa 1**: 1,000 créditos totales
- **Etapa 2**: 1,000,000 créditos totales  
- **Etapa 3**: 1,000,000,000 créditos totales
- **Etapa 4**: Completar la galaxia

## 🎨 Créditos y Tecnologías

### Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Animaciones y efectos visuales avanzados
- **JavaScript ES6+**: Lógica de juego moderna
- **Google Fonts**: Tipografías Orbitron y Rajdhani
- **Local Storage API**: Sistema de guardado

### Inspiración de Diseño
- Estética cyberpunk clásica (Blade Runner, Neuromancer)
- Juegos incrementales modernos (Cookie Clicker, AdVenture Capitalist)
- Interfaz futurista con elementos de neón
- Paleta de colores: azul cyan, magenta, verde neón, amarillo

---

## 🔥 ¡Comienza Tu Imperio Ciberpunk Ahora!

Descarga el juego, abre `index.html` en tu navegador y comienza tu viaje desde hacker callejero hasta emperador galáctico. ¿Tendrás lo necesario para dominar la galaxia?

**¡El futuro está en tus clics!** ⚡🌆🚀
