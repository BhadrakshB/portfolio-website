Digital Jaeger Protocol: A Production-Grade Next.js Portfolio
Table of Contents
Project Overview
Core Architectural Mandates
Next.js Foundation
Software Design Patterns
Modularity & Scalability
Mandatory Technology Stack
Detailed Implementation Directives
A. Concept 1: The Jaeger Cockpit Interface (Hero Section & Navigation)
B. Concept 2: Kaiju Threat Level & Combat Log (Project Showcase)
C. Concept 3: Modular Jaeger Assembly & Upgrade Bay (Skills & About Me)
Production-Grade Performance Optimization
Accessibility (WCAG 2.1 Compliance)
Development Workflow & Tools
Getting Started
Contributing
License
1. Project Overview
The "Digital Jaeger Protocol" is a high-performance, frontend-heavy portfolio website. Its purpose is to deliver an industry-grade, unique user experience. The project draws profound inspiration from the "Pacific Rim" universe, translating its themes of immense scale, advanced technology, and dynamic interaction into a compelling digital narrative. This project will serve as a living demonstration of cutting-edge web development capabilities, leveraging a meticulously defined technology stack and adhering to rigorous production standards.
2. Core Architectural Mandates
The project's architecture must be built on principles of modularity, scalability, and maintainability. All development must strictly adhere to these mandates.
Next.js Foundation
Framework Selection: Next.js (React) is the sole framework for this project. Its robust ecosystem, flexible rendering strategies, and built-in optimizations are critical for achieving the project's performance and scalability goals.
Project Initialization: The project must be initialized using create-next-app with TypeScript. Tailwind CSS must be configured for all styling. ESLint and Prettier must be set up and configured for strict code quality and formatting enforcement.
Folder Structure: The following precise folder structure must be maintained:
app/: Contains all Next.js App Router pages (e.g., app/page.tsx, app/projects/page.tsx, app/about/page.tsx).
components/: Houses all reusable UI components. Sub-categorization must include components/CockpitUI/, components/ProjectCard/, components/JaegerConfigurator/, components/Shared/ (for generic components like Preloader.tsx, CustomCursor.tsx, PageTransition.tsx).
hooks/: Contains all custom React hooks for encapsulating reusable logic.
utils/: For utility functions (e.g., math helpers, data formatters).
services/: Abstracts all data fetching and external API interactions.
public/: Stores static assets (3D models, Lottie JSONs, optimized images).
styles/: For global CSS or Tailwind configuration.
types/: For all TypeScript type definitions and interfaces.
Hybrid Rendering Strategy:
Static Site Generation (SSG): The app/page.tsx (Hero Section) and app/about/page.tsx (About Me section) must be pre-rendered using SSG. This ensures optimal initial load times and superior SEO.
Client-Side Rendering (CSR): Highly interactive components within SSG pages (e.g., 3D models, physics simulations, interactive UI elements) must be hydrated and rendered client-side after the initial static load to ensure responsiveness.
Incremental Static Regeneration (ISR): ISR must be implemented for SSG pages where content might occasionally update, ensuring freshness without full redeployments.
Software Design Patterns
Strict adherence to these software design patterns is mandatory:
Component-Based Architecture: All UI elements must be developed as small, reusable, and self-contained React components, adhering to Atomic Design principles where applicable.
Container/Presentational Pattern: Separation of concerns must be strictly enforced. "Container" components must handle all logic, data fetching, and state management, passing data and callbacks to "Presentational" components, which are solely responsible for rendering UI.
Custom Hooks: All reusable logic (e.g., animation controls, 3D scene setup, physics interactions, data fetching) must be encapsulated within custom React hooks (hooks/ directory) to promote code reusability and maintainability.
Service Layer: All data fetching and external API interactions must be abstracted into dedicated service modules (services/ directory).
State Management: Localized component state must be prioritized. For global state, React's Context API must be utilized. Prop drilling must be avoided by using Context where appropriate. For complex, global, mutable state, Zustand or Jotai must be used; state must be localized as much as possible to prevent unnecessary re-renders.
Dependency Injection (Implicit): Components must receive their dependencies (e.g., animation instances, 3D scene objects, utility functions) via props or custom hooks.
Modularity & Scalability
All code must be written in TypeScript to enforce strong typing, improve code quality, and reduce bugs.
3. Mandatory Technology Stack
The following libraries must be installed and configured. No deviations are permitted.
Frontend Framework: next, react, react-dom.
Styling: tailwindcss.
3D Graphics Engine: @babylonjs/core, @babylonjs/loaders, @babylonjs/gui. Babylon.js is the primary 3D engine for all complex 3D rendering due to its robust game engine features, built-in physics, and advanced rendering capabilities (e.g., PBR, WebGPU support).
Animation Libraries:
gsap (specifically gsap/ScrollTrigger): Mandatory for complex, timeline-based cinematic sequences, scroll-triggered narratives, and precise choreography. Its ScrollTrigger plugin must be used for features like pinning, scrubbing, and snapping.
framer-motion: Mandatory for physics-based micro-interactions, gestures (hover, tap, pan, drag, inView), and component-level animations within React. It must utilize its built-in spring physics for realistic motion.
@lottiefiles/react-lottie-player: Mandatory for lightweight, vector-based UI animations, engaging preloaders, and animated icons. It must be integrated via Lottie player components and utilize the Lottie-Interactivity library for advanced controls based on user interactions (click, hover, scroll).
animejs: Mandatory for advanced text animations (character-by-character reveals, staggered effects), SVG morphing, or custom motion paths for specific UI elements.
Physics Engine: @dimforge/rapier3d-compat. Rapier.js is mandatory for high-performance 2D/3D physics simulations, enabling realistic rigid body dynamics (e.g., scattering debris, component assembly with weight). Its WebAssembly foundation must be leveraged for near-native performance.
3D Asset Creation/Export: Spline must be used for creating and exporting GLTF/USDZ models. It must be utilized for rapid prototyping of 3D assets and simpler interactive 3D elements (e.g., 3D icons, abstract backgrounds).
Data Visualization: d3 must be used for any complex, interactive data visualizations, styled with a futuristic HUD aesthetic.
4. Detailed Implementation Directives
Each concept must be implemented as a distinct section or page, strictly adhering to the following instructions.
A. Concept 1: The Jaeger Cockpit Interface (Hero Section & Navigation)
Page/Component: app/page.tsx (Hero Section), utilizing components from components/CockpitUI/ and components/Shared/.
Preloader (components/Shared/Preloader.tsx)
Visuals: A full-screen preloader must be implemented. It must feature a Lottie animation (e.g., jaeger_boot_up.json from public/animations/) depicting a Jaeger booting up or a system check.
Animation Orchestration: A gsap.timeline() must orchestrate the entire preloader sequence. This timeline will control:
Lottie animation playback.
Text reveals ("SYSTEM BOOTING...", "CALIBRATING NEURAL LINK...") using anime.js for character-by-character staggered effects and subtle flickering.
A progress bar filling linearly with an electric blue glow.
Transition to Hero: Upon preloader completion, the GSAP timeline must trigger a brief, full-screen glitch effect (chromatic aberration, scanlines) followed by a smooth fade-out of the preloader, revealing the main CockpitScene.
Accessibility: The loading text must have aria-live="polite" to inform screen readers.
Cockpit UI (components/CockpitUI/CockpitScene.tsx)
3D Cockpit Environment: A Babylon.js scene must be initialized within a dedicated React component. This scene must render a detailed, dark, metallic Jaeger cockpit interior (load cockpit.glb from public/models/). Dramatic, high-contrast lighting with subtle neon glows must be implemented.
Dynamic Background: The main viewport must display a subtle, slow parallax scrolling effect of a deep-sea or stormy urban environment with volumetric fog and rain streaks on the translucent glass. This parallax effect must be driven by GSAP's ScrollTrigger or Framer Motion's useScroll. Rain streaks must be a continuous, looping animation.
Headline Text: The headline "PILOTING DIGITAL FRONTIERS" / "FORGING INDUSTRY-GRADE EXPERIENCES" must be rendered as a React component. anime.js must be used for kinetic, slightly distorted typography, including a character-by-character reveal on load and a continuous, subtle pulsing glow effect.
HUD Data Displays: Dedicated React components must be created for HUD elements (e.g., "SYSTEM STATUS: ONLINE", "THREAT LEVEL: NOMINAL"). These must use Lottie animations for subtle pulsing/flickering effects and anime.js for dynamic data stream animations (e.g., numbers rapidly changing, lines appearing as if being typed). Accessibility: aria-live="polite" must be ensured for dynamic data updates.
Navigation Elements (components/CockpitUI/NavigationControls.tsx)
Navigation links must be rendered as glowing, translucent "control inputs" or "system modules" in a non-traditional, asymmetrical layout.
Framer Motion Interactions:
whileHover: A vibrant electric blue glow, a subtle ripple effect, and a semi-transparent holographic projection of a stylized icon or miniature project thumbnail with a sci-fi glitch effect must be applied.
whileTap: A satisfying click/depress animation with spring physics must be implemented.
Keyboard Accessibility: All navigation elements must be fully focusable and operable via keyboard (tabindex, onKeyDown handlers for Enter/Space to trigger click).
Custom Cursor (components/Shared/CustomCursor.tsx)
A React component for a custom glowing crosshair cursor must be created. Framer Motion must be used to create a faint, electric blue trailing effect as the cursor moves.
Page Transitions (components/Shared/PageTransition.tsx)
Full-page "Drift" transitions must be implemented using GSAP. This must involve animating a root container's opacity, scale, or a custom shader effect to simulate a neural handshake/flicker between pages. This must be integrated with Next.js routing.
B. Concept 2: Kaiju Threat Level & Combat Log (Project Showcase)
Page/Component: app/projects/page.tsx, utilizing components/ProjectCard/ProjectCard.tsx.
Scroll-Triggered Narrative
A vertical scroll-driven layout must be implemented.
GSAP ScrollTrigger: ScrollTrigger must be used to orchestrate the "Kaiju emergence" effect for each ProjectCard component as it enters the viewport. This will include elements zooming, sliding, or fading in with dramatic flair.
ScrollTrigger must also manage pinning sections or scrubbing animations based on scroll progress, creating a guided narrative.
Accessibility: For any scroll-triggered animations that last longer than 5 seconds or could be distracting, a clearly visible and keyboard-operable pause/stop button must be provided.
Project Card Component (components/ProjectCard/ProjectCard.tsx)
Visual Design: The card must have a dark, metallic design with sharp, angular edges, styled with Tailwind CSS. The background must be a subtle animated deep-sea or stormy urban environment.
"Kaiju" 3D Model: A stylized, abstract 3D model of a "Kaiju" (representing the project's challenge) must be embedded using Babylon.js. Interactive hotspots on the 3D model must be implemented that, when clicked, reveal specific project details or methodologies.
Physics-Based Impact: When a "VIEW REPORT" button is clicked or a project section fully loads, Rapier.js must be integrated to simulate a subtle physics-driven effect. This must involve scattering glowing "debris" particles or a "shockwave" effect emanating from the element. Crucially, all Rapier.js physics calculations for this effect must be offloaded to a dedicated Web Worker to prevent main thread blocking.
Text Reveals: Project details (e.g., "MISSION OBJECTIVES," "POST-COMBAT ANALYSIS," "VICTORY CONDITIONS") must be revealed progressively using anime.js for character-by-character typing effects, data stream animations, or subtle glitch effects.
Data Visualization: If projects involve data, D3.js must be used to create dynamic, interactive charts/graphs styled with a futuristic HUD aesthetic (e.g., glowing nodes, connecting lines, minimal text).
C. Concept 3: Modular Jaeger Assembly & Upgrade Bay (Skills & About Me)
Page/Component: app/about/page.tsx, utilizing components/JaegerConfigurator/JaegerConfigurator.tsx and components/AboutMePanel/AboutMePanel.tsx.
Jaeger Configurator Component (components/JaegerConfigurator/JaegerConfigurator.tsx)
Interactive 3D Jaeger Model: A high-fidelity 3D model of a customizable Jaeger must be rendered using Babylon.js. The model (jaeger_base.glb from public/models/) must be loaded.
Modular Components: Different parts of the Jaeger (e.g., arm, torso, head) must be distinct 3D objects or groups, representing skill categories.
Clickable Interactions: Event listeners must be implemented on each 3D module. When clicked, the module must illuminate with a vibrant electric blue glow.
"Upgrade" Animations: GSAP must animate the Jaeger components "upgrading," "assembling," or "powering up" with glowing lines tracing internal structures.
Rapier.js must be integrated for physics-based snapping of components into place, conveying solidity and precision.
All Rapier.js physics calculations for this effect must be offloaded to a dedicated Web Worker.
Real-time Customization: UI controls (e.g., color swatches, specialization toggles) must be implemented to allow users to "configure" aspects of the Jaeger model (e.g., changing color scheme, adding "armor plating" for specializations). The 3D model's materials and textures must update in real-time based on user input, reflecting changes with realistic reflections and highlights.
About Me Panel Component (components/AboutMePanel/AboutMePanel.tsx)
Entrance/Exit: Framer Motion must handle smooth slide-in and slide-out animations for the panel.
Content: "MISSION HISTORY" (career timeline) and "TRAINING LOG" (education/certifications) must be displayed.
Animations within Panel: anime.js must be used for subtle text animations (e.g., lines appearing as if streamed from a terminal) and animated progress bars for skill proficiency.
5. Production-Grade Performance Optimization
Performance is a critical requirement for this highly interactive site. All optimizations must be implemented.
Next.js Built-in Optimizations
Image Optimization: next/image must be used for automatic image optimization, lazy loading, and responsive sizing for all raster images.
Font Optimization: next/font must be used for efficient font loading.
Code Splitting & Lazy Loading: next/dynamic must be leveraged for lazy loading of all complex components, especially 3D scenes and physics engine components, ensuring they are loaded only when needed.
Asset Optimization
3D Models: All GLTF/USDZ models and their associated textures must be rigorously compressed to minimize file size.
Images/Videos: All image and video assets must be optimized (e.g., WebP/AVIF formats, rigorous compression).
Minification: All HTML, CSS, and JavaScript files must be minified during the build process.
Runtime Performance
Web Workers: Mandatory: All Rapier.js physics calculations and any other computationally intensive 3D scene processing (e.g., complex lighting calculations, mesh manipulation) must be offloaded to dedicated Web Workers to prevent blocking the main UI thread.
requestAnimationFrame: All animation updates (GSAP, Framer Motion, Babylon.js render loops) must be synchronized with the browser's repaint cycles using requestAnimationFrame to prevent jank. Synchronous DOM reads/writes within animation loops must be avoided.
React Memoization: React.memo, useCallback, and useMemo must be used extensively and strategically to prevent unnecessary re-renders of React components, particularly those involved in animations or receiving frequently changing props.
CSS vs. JavaScript Animations: Native CSS animations must be used for simpler UI transitions (e.g., hover states, basic fades) as they can run on the GPU. GSAP, Framer Motion, and Anime.js must be reserved for complex, choreographed, or interactive animations.
Event Handling Optimization: Passive event listeners ({ passive: true }) must be used for scroll and touch events to improve responsiveness.
Network Performance
CDN: All static assets (images, 3D models, Lottie JSONs) must be deployed via a Content Delivery Network (CDN) for faster global delivery.
Browser Caching: Proper Cache-Control headers must be implemented for efficient browser caching of static resources.
Gzip Compression: Server-side Gzip compression must be enabled for all text-based assets.
6. Accessibility (WCAG 2.1 Compliance)
Accessibility must be a core design and development consideration, not an afterthought.
Animation Controls: For any auto-playing animation lasting longer than 5 seconds (e.g., background videos, complex 3D intros, continuous HUD animations), a clearly visible and keyboard-operable pause/stop/hide button must be implemented. The default behavior for such animations must not be autoplay; instead, a play button must be provided for user control.
Alternative Text & ARIA Attributes: All images (including animated GIFs), interactive 3D elements, and dynamic UI components must have descriptive alt text and appropriate ARIA attributes (aria-live, aria-label, role) to ensure screen reader compatibility and proper semantic meaning.
Keyboard Navigation: All interactive elements (buttons, navigation, 3D model hotspots, customization controls) must be fully navigable and operable via keyboard (tabindex attributes, onKeyDown handlers for activation).
Reduced Motion Preference: The website must detect the prefers-reduced-motion media query and provide a simplified, less intense animation experience for users who prefer it (e.g., fades instead of complex transforms, static backgrounds instead of animated ones).
Color Contrast: All text and UI elements must meet WCAG color contrast guidelines, especially within the dark, futuristic theme, to ensure readability for users with visual impairments.
7. Development Workflow & Tools
Version Control: Git must be used with a clear branching strategy (e.g., GitFlow).
Deployment: The project must be prepared for deployment to Vercel, leveraging its seamless integration and performance benefits for Next.js.
Local Development: Hot Module Replacement (HMR) and Fast Refresh must be fully functional.
Testing:
Unit Tests: Use Jest and React Testing Library for all components and custom hooks.
End-to-End Tests: Use Cypress or Playwright for critical user flows and interactive elements.
8. Getting Started
To set up and run the project locally, follow these steps:
Clone the repository:
git clone [repository-url]
cd digital-jaeger-protocol


Install dependencies:
npm install
# or
yarn install


Run the development server:
npm run dev
# or
yarn dev


Open http://localhost:3000 in your browser to view the application.
9. Contributing
All contributions must adhere to the architectural mandates and implementation directives outlined in this README.md. Please follow the standard GitFlow branching model for feature development and bug fixes.
10. License
This project is licensed under the MIT License.
