## Eddy Currents and Electromagnetic Braking Pendulum Simulation

**Reference File:** `correntes_foucault_simulation.html`

### Logical Description
This script implements a two-dimensional simulation focused on the thermomechanical dynamics of a conductive pendulum subjected to a spatially delimited magnetic field. The computational architecture has the strict purpose of quantifying and rendering the energy dissipation arising from the induction of Eddy currents. The model allows a direct comparative analysis of the electromagnetic braking regime imposed on two distinct conductive mass topologies: a solid plate (continuous conduction) and a slotted plate (restricted conduction).

### Physico-Mathematical Modeling
The evolution of the system's dynamic state is governed by the ordinary differential equation of rotation for a rigid body. The model evaluates the torque network acting on the pivot ($I\ddot{\theta} = \sum \tau$), which encompasses gravitational torque, non-linear aerodynamic drag, and electromagnetic opposition. The magnetic braking force ($F_m$) is described with linear dependence on the tangential velocity $v = L\dot{\theta}$ and the intersection gradient of the metallic area under the magnetic flux ($A_{int}$), being regulated by the effective conductivity ($\sigma_{eff}$) of the selected geometry:

$$F_m = - \sigma_{eff} B_{ext}^2 A_{int} v$$

To ensure energy conservation in the thermodynamic balance, the formalism calculates the instantaneous power dissipated via Joule heating ($P_J = F_m \cdot v$) and decays the total mechanical energy (kinetic and potential) of the oscillatory system in real time.

### Code Dynamics
The algorithmic core of the physics engine solves the differential equations through an Euler-Cromer numerical integration method. To mitigate instabilities under high acceleration gradients, the routine applies temporal interpolation via sub-stepping (10 logical sub-steps per temporal delta cycle). The overlap verification (intersection between the plate and the magnetic field) operates deterministically, applying rotation matrix transformations over a parametric sampling grid (8x8 points) to transpose local coordinates to the global environment reference. From a rendering standpoint, the output interacts asynchronously with the HTML5 Canvas API to plot the vector matrices, feeding back a lateral telemetry module that renders the temporal oscillography of phase angles and force amplitudes at runtime.

---

## Interactive Simulation of Faraday's Electromagnetic Induction

**Reference File:** `faraday_induction_simulation.html`[cite: 2]

### Logical Description
This script implements a two-dimensional simulation environment focused on the electrodynamic and thermodynamic mechanics of magnetic induction described by the Faraday-Lenz Law[cite: 2]. The logical core of the system has the strict purpose of computing and rendering in real-time the magnetic flux variations induced by the relative displacement between a magnetic dipole (bar magnet) and a parametric conductive coil[cite: 2]. The architecture enables continuous extraction and quantitative analysis of the generated electromotive force (EMF), the resulting electric current, and the inertial response of a virtual galvanometer coupled to the circuit[cite: 2].

### Physico-Mathematical Modeling
The vector magnetic field ($\vec{B}$) at any point in the plane is modeled through the linear superposition of the contributions from the magnet's north and south magnetic monopoles, employing a dipole approximation with a spatial softening term ($\epsilon^2$) to avoid mathematical singularities at the core[cite: 2]. The magnetic flux ($\Phi_B$) passing through the coil is evaluated using a polar numerical integration subdivided into multiple concentric rings over the geometric cross-sectional area of the conductor[cite: 2].
The thermomechanical evolution of the circuit is governed by Faraday's formalism, incorporating Lenz's conservative restriction[cite: 2]:

$$\mathcal{E} = -N \frac{d\Phi_B}{dt}$$

Where $\mathcal{E}$ is the induced EMF and $N$ parametrizes the solenoid's turn multiplicity[cite: 2]. The electric current in the arrangement obeys the linearity of macroscopic Ohm's Law ($I = \mathcal{E}/R_{wire}$)[cite: 2]. Secondarily, the kinematics of the galvanometer needle is modeled as an underdamped harmonic oscillator, subjected to a virtual spring constant ($k$) and a damping factor ($c$), governed by the differential equation $\ddot{\theta} + \frac{c}{I}\dot{\theta} + \frac{k}{I}\theta = F_{target}$[cite: 2].

### Code Dynamics
From a software engineering perspective, the physics engine operates under a temporal iterator bound to the `requestAnimationFrame` of the HTML5 Canvas API[cite: 2]. At each integration step $dt$ (rigidly capped at $0.05$ s to mitigate numerical explosions), the algorithm recalculates the $\vec{B}$ field vector mesh and extracts the integral magnetic flux[cite: 2]. To neutralize the high-frequency noise inherent to cursor manipulation (drag jitter) during human-machine interaction, the discrete derivative of the spatial flux variation rate ($d\Phi_B/dt$) is processed by a low-pass exponential digital filter[cite: 2]. The graphics system bifurcates the rendering pipeline to dynamically trace the field lines via gradient-based iterative stepping and to feed the vector matrices (state history) of a real-time telemetry oscilloscope system[cite: 2].

---

## Solar System: Classical vs. Relativistic Gravitational Dynamics

**Reference File:** `sistema_solar_relatividade.html`

### Logical Description
This script implements an interactive simulation designed to contrast the orbital mechanics of the Solar System under the theoretical frameworks of Classical Mechanics (Newton) and General Relativity (Einstein)[cite: 3]. The primary architectural objective is to visually and mathematically quantify relativistic phenomena, specifically the anomalous perihelion precession of planetary bodies, gravitational time dilation across different celestial regions, and the relativistic deflection of light within a curved spacetime topology[cite: 3]. 

### Physico-Mathematical Modeling
The simulation's physics engine computes orbital trajectories by evaluating effective potential equations[cite: 3]. In the classical Newtonian mode, the gravitational dynamics are strictly governed by a $1/r$ potential, yielding perfectly closed and stable elliptical orbits[cite: 3]. This classical state is described by the equation:

$$V_{eff}(r) = -\frac{GM}{r} + \frac{L^2}{2r^2}$$[cite: 3]

In the General Relativity mode, the engine updates the dynamics to reflect the Schwarzschild metric[cite: 3]. This introduces a higher-order perturbation term to the effective potential:

$$V_{eff}(r) = -\frac{GM}{r} + \frac{L^2}{2r^2} - \frac{GML^2}{c^2 r^3}$$[cite: 3]

The supplementary term $\left(-\frac{GML^2}{c^2 r^3}\right)$ breaks the orbital closure, pulling the perihelion forward with each revolution[cite: 3]. This accurately models real-world anomalies, such as Mercury's observed precession rate of 43.03 arcseconds per century[cite: 3]. 

Additionally, the physics core continuously computes gravitational time dilation, applying the metric formula to allow real-time chronometric comparisons between deep space, the Sun, Mercury, and Earth[cite: 3]:

$$d\tau = dt \sqrt{1 - \frac{2GM}{rc^2}}$$[cite: 3]

Finally, the formalism calculates the trajectory of photons, demonstrating that light following spacetime curvature yields a deflection angle precisely double that of the theoretical Newtonian approximation[cite: 3]:

$$\theta = \frac{4GM}{c^2 b}$$[cite: 3]

### Code Dynamics
From a software engineering standpoint, the algorithm leverages an HTML5 Canvas (2D/3D) environment to render overlapping orbital trails, geodetic vectors, and a dynamic spacetime mesh[cite: 3]. To bypass the computational limitations of visualizing infinitesimal real-world relativistic deviations, the architecture incorporates an interactive variable scaling factor ($c$-scale) designed to artificially exaggerate these effects for analytical clarity, alongside modular time-stepping sliders to control simulation velocity[cite: 3]. A state-driven user interface handles concurrent rendering states—allowing isolated Newtonian, Relativistic, or side-by-side overlapping comparative views—while continuously feeding runtime data to peripheral telemetry dashboards that track time dilation clocks and specific celestial precession metrics[cite: 3].

---
## Interactive Ising Model and Statistical Phase Transitions

**Reference File:** `Modelo de Ising Interativo.html`[cite: 4]

### Logical Description
This script establishes a highly configurable, interactive didactic environment for simulating the Ising Model across distinct lattice topologies, including 1D chains, 2D square grids, and 2D triangular arrays[cite: 4]. The computational architecture is strictly designed to visualize and quantify statistical mechanics phenomena, specifically spontaneous symmetry breaking, ferromagnetic and antiferromagnetic phase transitions, geometric frustration, and spin glass complexity[cite: 4]. The environment allows real-time extraction of macroscopic thermodynamic observables, such as magnetization and energy per spin, derived directly from microscopic state fluctuations[cite: 4].

### Physico-Mathematical Modeling
The system's energy landscape is defined by the classical Ising Hamiltonian, which accounts for nearest-neighbor exchange interactions $(J)$ and the Zeeman energy induced by an external magnetic field (B)[cite: 4]:

$$H = -J Σ s_i s_j - B Σ s_i$$

where the discrete spin variables $s_i \in {+1, -1}$ represent magnetic dipole moments pointing up or down[cite: 4]. The thermodynamic evolution is driven by the Metropolis-Hastings Monte Carlo algorithm, simulating a canonical ensemble coupled to a thermal bath at temperature T[cite: 4]. A proposed spin-flip is accepted immediately if it minimizes the system's energy (ΔE ≤ 0), or probabilistically accepted based on the Boltzmann weight $P = exp(-ΔE / k_B T)$[cite: 4]. For a 2D square lattice with $B=0$, the system exhibits a phase transition at the Curie critical temperature, exactly solved by Lars Onsager[cite: 4]:

$$T_c = 2J / [k_B ln(1 + √2)] ≈ 2.269 J/k_B$$

The model also maps geometric frustration in triangular lattices and randomized coupling constraints $(J_ij)$ characteristic of Spin Glass systems with multiple local energy minima[cite: 4]. Furthermore, it demonstrates the Mermin-Wagner theorem in the $1D$ model, where thermal noise destroys long-range order for any $T > 0$[cite: 4].

### Code Dynamics
From a software engineering perspective, the simulation is built around a discrete lattice state array (supporting sizes from 32x32 up to 128x128) updated via Monte Carlo steps[cite: 4]. The rendering pipeline maps the discrete spin states directly to an HTML5 Canvas using a configurable visual theme matrix (e.g., Cyberpunk, Classic, Monochrome)[cite: 4]. Concurrently, global thermodynamic observables—specifically magnetization m, absolute magnetization |m|, and energy per spin e—are averaged over the lattice array and passed to an asynchronous charting module[cite: 4]. This module plots real-time telemetry including temporal state fluctuations, magnetic hysteresis loops (M x B), and phase transition diagrams $(|m| x T)$[cite: 4]. The user interface binds HTML slider inputs to the core simulation loop, permitting dynamic, on-the-fly adjustment of $T$, $J$, and $B$ parameters, as well as providing direct canvas interaction tools like magnetic lasers and forced spin alignment[cite: 4].

---

## Triple Pendulum and Non-Linear Chaotic Dynamics Simulation

**Reference File:** `Simulação do Pêndulo Triplo — Caos & Dinâmica Não-Linear.html`[cite: 5]

### Logical Description
This script establishes a high-fidelity interactive computational environment to simulate the non-linear dynamics and deterministic chaos inherent to a triple pendulum system[cite: 5]. The architecture is rigorously engineered to visualize extreme sensitivity to initial conditions—the foundational premise of chaos theory—by permitting the concurrent execution of multiple interconnected pendulums parameterized with microscopic angular deviations[cite: 5]. It serves as a strict numerical laboratory for analyzing phase space divergence, Lyapunov exponents, and the transition from periodic to highly chaotic regimes in multi-degree-of-freedom classical mechanical systems[cite: 5].

### Physico-Mathematical Modeling
The system's dynamic evolution is governed by the equations of motion derived from the Lagrangian formalism for a coupled three-mass physical pendulum ($m_1, m_2, m_3$) connected by rigid, massless rods ($L_1, L_2, L_3$)[cite: 5]. The resulting coupled non-linear differential equations are algebraically structured into a matrix format $M(\theta)\vec{\alpha} = \vec{B}(\theta, \omega)$[cite: 5]. Here, $M$ is the symmetric $3 \times 3$ mass-inertia matrix, $\vec{\alpha}$ is the angular acceleration vector, and $\vec{B}$ encapsulates gravitational components, centrifugal terms, and linear friction (damping)[cite: 5]. The model computes the angular accelerations at any given state by solving this linear system via Cramer's rule[cite: 5]. Furthermore, the algorithm continuously tracks the thermodynamic constraints by evaluating the Kinetic Energy ($T$) and Potential Energy ($V$), guaranteeing that the Total Mechanical Energy ($E = T + V$) remains strictly conserved when the damping coefficient is zero[cite: 5].

### Code Dynamics
From a software engineering perspective, the physics engine advances the $6$-dimensional state vector $\vec{y} = [\theta_1, \theta_2, \theta_3, \omega_1, \omega_2, \omega_3]^T$ through time utilizing an explicit 4th-Order Runge-Kutta (RK4) integration algorithm[cite: 5]. To preserve numerical stability and prevent energy drift during chaotic transients characterized by extreme angular velocities, the core temporal delta ($dt$) is heavily fractionated using a sub-stepping loop execution (15 mathematical steps per single rendering frame)[cite: 5]. The graphical pipeline utilizes the HTML5 Canvas API to perform coordinate transformations from polar to Cartesian space, efficiently rendering the overlapping kinematic trails, instantaneous velocity vectors, and the synchronous energy conservation chart[cite: 5]. The telemetry and user interface modules interact directly with the memory state, enabling real-time phase perturbations via pointer-driven coordinate overrides[cite: 5].

---

## Structural Analysis of a 2D Truss Bridge and Influence Lines

**Reference File:** `Simulador de Ponte Treliçada 2D`[cite: 6]

### Logical Description
This script implements a two-dimensional computational environment for the real-time structural analysis of a statically determinate truss bridge subjected to a moving point load[cite: 6]. The primary objective of the architecture is to dynamically quantify and visualize the distribution of axial forces (tension and compression) across the structural members, compute global support reactions, and plot influence line diagrams as a function of the spatial coordinate of the traversing load[cite: 6].

### Physico-Mathematical Modeling
The structural integrity is evaluated using the Method of Joints, establishing mechanical equilibrium at each node by enforcing the translational constraints $\sum F_x = 0$ and $\sum F_y = 0$[cite: 6]. The modeled topology is statically determinate, satisfying the necessary condition $m + r = 2j$, corresponding to $7$ members, $3$ support reactions, and $5$ nodes[cite: 6]. The continuous moving load $P$ (representing the vehicle) is discretely mapped to the adjacent lower deck nodes through linear interpolation[cite: 6]. The kinematic constraints and unit direction vectors (direction cosines) of the members are assembled into a $10 \times 10$ coefficient matrix $A$[cite: 6]. The deterministic state of the static system is resolved by computing the linear algebraic equation:

$$A \mathbf{x} = \mathbf{B}$$

Where $\mathbf{x}$ is the state vector containing the unknown internal axial forces and support reactions, and $\mathbf{B}$ is the right-hand side vector containing the external nodal loads[cite: 6].

### Code Dynamics
From a software engineering perspective, the simulation is driven by an event-based recalculation loop tied to user interface sliders and an autonomous animation frame iterator[cite: 6]. At each state change, the algorithm recalculates the nodal coordinates based on span and height parameters, performs the load interpolation, and populates the matrix $A$ and vector $\mathbf{B}$[cite: 6]. A custom Gaussian Elimination subroutine is invoked to solve the linear system[cite: 6]. The resulting scalar fields are passed to a dual-canvas rendering pipeline constructed with the vanilla HTML5 Canvas API[cite: 6]. The primary viewport draws the spatial truss topology, modulating stroke widths based on force magnitudes and applying a strict color topology (cyan/blue for tension, rose/red for compression, and gray for zero-force members)[cite: 6]. Concurrently, a secondary canvas iterates the solver across 100 discrete spatial steps to compute and plot the real-time influence line chart for a selected target member[cite: 6].

---

## Hamiltonian Invariance, Canonical Transformations, and Noether's Theorem

**Reference File:** `hamiltonian_noether_invariance.html`

### Logical Description
This script provides an interactive educational simulation designed for advanced undergraduate physics students to explore the fundamental connections between continuous symmetries, canonical transformations, cyclic coordinates, and conserved dynamical quantities as formalized by Hamilton's mechanics and Noether's Theorem. The simulation models a classical two-dimensional central-force gravitational system (a point mass $m$ orbiting a massive central attractor $M$). It demonstrates how switching from Cartesian coordinates $(x, y, p_x, p_y)$ to canonical Polar coordinates $(r, \theta, p_r, p_\theta)$ exposes the rotational symmetry of the potential, causing the angular coordinate $\theta$ to vanish from the Hamiltonian (forming a cyclic coordinate) and directly guaranteeing the exact temporal conservation of the conjugate angular momentum $p_\theta$.

### Physico-Mathematical Modeling
In Cartesian coordinates, the system Hamiltonian $H$ explicitly depends on both spatial degrees of freedom through the central potential $V(x, y) = - \frac{GMm}{\sqrt{x^2 + y^2}}$:

$$H(x, y, p_x, p_y) = \frac{p_x^2 + p_y^2}{2m} - \frac{GMm}{\sqrt{x^2 + y^2}}$$

Because $\frac{\partial H}{\partial x} \neq 0$ and $\frac{\partial H}{\partial y} \neq 0$, Hamilton's canonical equations ($\dot{p}_i = -\frac{\partial H}{\partial q_i}$) yield non-zero momentum time-derivatives ($\dot{p}_x \neq 0, \dot{p}_y \neq 0$), meaning neither Cartesian momentum is conserved independently.

Applying a point transformation to canonical polar coordinates $(r, \theta)$ with conjugate momenta $p_r = m\dot{r} = \frac{x p_x + y p_y}{r}$ and $p_\theta = x p_y - y p_x = m r^2 \dot{\theta}$ yields the transformed Hamiltonian:

$$H(r, p_r, p_\theta) = \frac{p_r^2}{2m} + \frac{p_\theta^2}{2m r^2} - \frac{GMm}{r}$$

Here, the angular coordinate $\theta$ is explicitly absent from $H$ ($\frac{\partial H}{\partial \theta} = 0$), establishing $\theta$ as a **cyclic coordinate**. Hamilton's canonical equation of motion directly dictates:

$$\dot{p}_\theta = -\frac{\partial H}{\partial \theta} = 0 \implies p_\theta = \text{constant}$$

Furthermore, under an active continuous rotational transformation of the spatial frame ($\theta \to \theta + \delta\theta$), the value of the Hamiltonian $H$ and the angular momentum $p_\theta$ remain strictly invariant, demonstrating the Noether correspondence between spatial rotational symmetry and angular momentum conservation.

### Code Dynamics
From a software engineering and numerical standpoint, the application executes a standalone, dependency-free physics engine driven by the browser's `requestAnimationFrame` API. The equations of motion are resolved using a symplectic **Velocity Verlet** numerical integration scheme paired with temporal sub-stepping (12 sub-steps per frame), ensuring negligible long-term energy drift and machine-precision angular momentum preservation across arbitrary orbital eccentricities. The graphics pipeline renders a dynamic dual-coordinate canvas showing real-time orbital trajectories, fading phosphorescent trails, and decomposed momentum vector fields ($p_x, p_y$ vs $p_r, p_\theta$). Synchronously, a secondary canvas oscilloscope plots live time series of total energy $H(t)$, conjugate angular momentum $p_\theta(t)$, and oscillating radial momentum $p_r(t)$, giving immediate visual and pedagogical confirmation of Noether's theorem.

---

## Einstein Solid, Microstates, Multiplicity, and Boltzmann Entropy

**Reference File:** `einstein_solid_simulation.html`

### Logical Description
This script implements a self-contained interactive simulation designed to teach the statistical mechanics of the Einstein Solid. The platform provides an intuitive visual and mathematical bridge between microscopic quantum states and macroscopic thermodynamic properties. Users can manipulate the number of independent quantum harmonic oscillators ($N$) and thermal energy quanta ($q$), visualize individual microstates using quantum orbs and harmonic energy ladders, inspect the combinatorial "Stars and Bars" representation $\{xx|xxx||x|xx|x\}$, track exact multiplicity $\Omega(N, q)$ calculated using arbitrary-precision `BigInt` arithmetic, and observe dimensionless Boltzmann entropy $S/k_B = \ln \Omega$ alongside dynamic thermodynamic curves. An additional thermal contact module demonstrates the statistical origin of the Second Law of Thermodynamics and spontaneous heat flow toward the macrostate of maximum multiplicity.

### Physico-Mathematical Modeling
The Einstein Solid models a crystalline lattice as a collection of $N$ independent quantum harmonic oscillators of identical angular frequency $\omega$. The quantized energy eigenvalues of each oscillator are:

$$\epsilon_n = \left(n + \frac{1}{2}\right)\hbar\omega, \quad n \in \{0, 1, 2, \dots\}$$

Due to the Heisenberg Uncertainty Principle ($\Delta x \Delta p \ge \hbar/2$), the solid retains an irreducible zero-point ground state energy $E_0 = \frac{1}{2}N\hbar\omega$ even at absolute zero ($q=0$). The total vibrational energy is:

$$E_{\text{total}} = \left(q + \frac{N}{2}\right)\hbar\omega, \quad \text{where } q = \sum_{i=1}^N n_i$$

The number of distinct microstates $\Omega(N, q)$ for a given macrostate $(N, q)$ is evaluated using the "Stars and Bars" combinatorial bijection: distributing $q$ indistinguishable quanta among $N$ distinguishable oscillators separated by $N-1$ partition lines:

$$\Omega(N, q) = \binom{N+q-1}{q} = \frac{(N+q-1)!}{q!\,(N-1)!}$$

The dimensionless thermodynamic entropy is determined by Boltzmann's relation:

$$\frac{S}{k_B} = \ln \Omega(N, q)$$

For composite systems in thermal contact ($A$ and $B$) with total energy $q_{\text{total}} = q_A + q_B$, the total multiplicity is the product $\Omega_{\text{total}}(q_A) = \Omega_A(q_A) \times \Omega_B(q_{\text{total}} - q_A)$, which exhibits an extremely sharp Gaussian peak at thermal equilibrium where temperatures match ($T_A = T_B$).

### Code Dynamics
The application is structured as a single self-contained HTML/CSS/JavaScript file with no build step required. Factorial computations for values up to $79!$ are executed with exact integer precision using native JavaScript `BigInt` to prevent numerical overflow and precision loss. Microstate sampling in the microcanonical ensemble is implemented through uniform Fisher-Yates permutations of stars-and-bars arrays. A real-time stochastic thermal fluctuation engine models continuous quanta exchanges between oscillators. Multiplicity and entropy scaling curves are rendered using Chart.js with linear and logarithmic toggleable axes, while mathematical expressions are dynamically typeset using KaTeX.

---

## DC Inductance, Back-EMF, and Electrical Inertia in RL Circuits

**Reference File:** `dc_inductance_simulation.html`

### Logical Description
This script implements a self-contained, interactive physics laboratory simulation designed to provide deep physical and mathematical intuition into the concept of inductance as "electrical inertia" in a Direct Current (DC) series resistor-inductor ($RL$) circuit. The environment visually and quantitatively demonstrates how an inductor opposes changes in current through Faraday-Lenz magnetic induction (Back-EMF $\mathcal{E}_L = -L \frac{dI}{dt}$). When the circuit closes, current rises gradually according to the classic exponential response rather than jumping instantaneously. When disconnected or routed through a discharge bypass, the collapsing magnetic field releases its stored magnetic energy ($E = \frac{1}{2} L I^2$) to act as a temporary battery, sustaining electron flow.

### Physico-Mathematical Modeling
The time evolution of the current $I(t)$ in a series $RL$ circuit connected to an applied DC voltage source $V(t)$ is governed by Kirchhoff's Voltage Law combined with Faraday's Law of Induction:

$$V_{\text{applied}} = V_R(t) + V_L(t) = I(t) R + L \frac{dI(t)}{dt}$$

Rearranging for the instantaneous rate of change of current:

$$\frac{dI}{dt} = \frac{V_{\text{applied}} - I(t) R}{L}$$

For constant parameters with initial condition $I(0) = 0$ upon switch closure ($V_{\text{applied}} = V$), the exact analytical solution gives the exponential rise:

$$I(t) = \frac{V}{R} \left(1 - e^{-\frac{R}{L}t}\right) = I_{\text{max}} \left(1 - e^{-\frac{t}{\tau}}\right)$$

where $\tau = \frac{L}{R}$ is the inductive time constant. Upon switching to the discharge loop ($V_{\text{applied}} = 0$) with initial current $I_0$, the current undergoes exponential decay:

$$I(t) = I_0 \, e^{-\frac{R}{L}t} = I_0 \, e^{-\frac{t}{\tau}}$$

The stored magnetic energy in the inductor core is given by:

$$E_B(t) = \frac{1}{2} L I(t)^2$$

### Code Dynamics
The software architecture is entirely self-contained within a single `.html` file with zero external dependencies. The core simulation engine executes numerical sub-stepping using an exact exponential propagator per sub-delta $\Delta t$, eliminating numerical drift, instability, or divergence across extreme parameter values ($L \in [0.2, 10]\text{ H}, R \in [1, 20]\,\Omega, V \in [1, 24]\text{ V}$). The graphical rendering pipeline features:
1. **Interactive Circuit Canvas**: Real-time animation of flowing electron particles ($v \propto I$), radiant filament lightbulb with thermal lag and power emission ($P = I^2 R$), dynamically parameterized 3D helical inductor coil ($N_{\text{turns}} \propto L$), toroidal magnetic flux field lines with expansion/collapse pulsations, and directional Back-EMF vector overlays.
2. **Real-Time Dual-Channel Oscilloscope Canvas**: Live sliding time window plotting current $I(t)$, inductor voltage $V_L(t)$, and resistor voltage $V_R(t)$, complete with theoretical asymptote guidelines ($I_{\text{max}} = V/R$) and time constant $\tau$ references.
3. **Didactic State Coach**: Context-aware educational engine explaining the instantaneous physics across energizing, steady-state, collapsing, and idle circuit phases.
4. **Synthesized Web Audio API Engine**: Dynamic electromagnetic coil hum (frequency and amplitude modulated by $I$ and $dI/dt$), tactile switch clicks, and spark sound synthesis.

---

## Stern-Gerlach Quantum Experiment: Spin-1/2, Superposition & Sequential Measurements

**Reference File:** `stern_gerlach_experiment.html`

### Logical Description
This script implements a complete, self-contained, interactive quantum physics laboratory simulation of the iconic 1922 Stern-Gerlach Experiment. The computational environment provides physical and mathematical intuition into spatial quantization, electron spin-1/2 observables, quantum state superposition, wave function collapse, and non-commuting measurement operators ($[\hat{S}_x, \hat{S}_z] \neq 0$). The simulation models sequential Stern-Gerlach filter apparatuses (SG stages) with orientable magnetic gradients, customizable beam-blocking shutters for pure state preparation, and a photoluminescent phosphor detector screen with real-time Monte Carlo statistics.

### Physico-Mathematical Modeling
The simulation rigorously implements the quantum mechanics of spin-1/2 systems (such as silver $^{107}\text{Ag}$ atoms with an unpaired $5s^1$ valence electron).

1. **Spin Operators & Eigenstates**:
   In the standard $\{|+z\rangle, |-z\rangle\}$ basis, the spin operator along an arbitrary axis $\vec{n} = (\sin\theta, 0, \cos\theta)$ in the $x-z$ plane is:
   $$S_{\vec{n}} = \vec{S}\cdot\hat{n} = \frac{\hbar}{2}\begin{pmatrix} \cos\theta & \sin\theta \\ \sin\theta & -\cos\theta \end{pmatrix}$$
   The corresponding positive ($+\hbar/2$) and negative ($-\hbar/2$) orthonormal eigenstates are:
   $$|+\theta\rangle = \cos\left(\frac{\theta}{2}\right)|+z\rangle + \sin\left(\frac{\theta}{2}\right)|-z\rangle$$
   $$|-\theta\rangle = -\sin\left(\frac{\theta}{2}\right)|+z\rangle + \cos\left(\frac{\theta}{2}\right)|-z\rangle = |+(\theta + 180^\circ)\rangle$$

2. **Transition Probabilities (Born Rule)**:
   When an atom in state $|+\theta_1\rangle$ enters a magnetic field oriented at angle $\theta_2$, the transition probabilities are:
   $$P_+ = |\langle +\theta_2 | +\theta_1 \rangle|^2 = \cos^2\left(\frac{\theta_1 - \theta_2}{2}\right)$$
   $$P_- = |\langle -\theta_2 | +\theta_1 \rangle|^2 = \sin^2\left(\frac{\theta_1 - \theta_2}{2}\right)$$

3. **Unpolarized Initial State (Oven)**:
   The thermal effusive beam from the silver furnace is described by the maximally mixed density matrix $\rho = \frac{1}{2}\mathbb{I} = \frac{1}{2}|+z\rangle\langle+z| + \frac{1}{2}|-z\rangle\langle-z|$, yielding a 50/50 split ($P_+ = P_- = 0.5$) for any initial orientation $\theta_1$.

4. **The Z-X-Z Quantum Paradox (State Erasure & Collapse)**:
   - **SG1 at 0° (Z)** with $(-)$ blocked $\implies$ output is 100% pure $|+Z\rangle$.
   - **SG2 at 90° (X)** with $(-)$ blocked $\implies$ $|+Z\rangle = \frac{1}{\sqrt{2}}(|+X\rangle + |-X\rangle)$; measurement collapses state to $|+X\rangle$ with 50% transmission.
   - **SG3 at 0° (Z)** $\implies$ $|+X\rangle = \frac{1}{\sqrt{2}}(|+Z\rangle + |-Z\rangle)$, yielding a fresh 50/50 split in the Z-basis ($25\%$ $|+Z\rangle$ and $25\%$ $|-Z\rangle$ of SG2 input), demonstrating that measurement along $X$ completely destroyed the prior $Z$ spin phase information.

### Code Dynamics
The software runs entirely in Vanilla JavaScript and HTML5 Canvas with no dependencies:
- **Dual Visual Representation**: Simultaneous continuous wave intensity ribbons (alpha & stroke width mapped to $I$) and discrete Poisson/Monte Carlo particle stream with glowing trails and micro-spin vector precession arrows.
- **Dynamic Cascading Engine**: Dynamic recursive tree calculation propagating split beam intensities and cubic Bézier splines across up to 4 sequential SG stages.
- **Interactive Shutter System**: Physical absorber plates with warning indicators that selectively block $(+)$ or $(-)$ outputs.
- **Real-Time Phosphor Screen & Telemetry**: Accumulates atom impacts with exponential phosphorescent decay flashes, continuous digital histograms, and empirical vs theoretical probability matching.
- **Synthesized Web Audio API**: Procedural Geiger counter clicks on particle detection, electromagnetic hum, shutter clicks, and preset chimes.

---

## Galileo's Free Fall Law: Feather vs. Freight Train in Vacuum and Atmosphere

**Reference File:** `galileo_free_fall_feather_train.html`

### Logical Description
This script implements a high-precision, interactive computational physics laboratory designed to demonstrate and prove Galileo Galilei's Principle of Free Fall and the Weak Equivalence Principle. The simulation establishes an extreme mass-contrast scenario by dropping a delicate bird feather ($m_1 = 5\text{ g}$) alongside a heavy industrial cargo locomotive train ($m_2 = 50\text{ metric tons}$) under both atmospheric conditions (with non-linear aerodynamic drag) and an ideal evacuated vacuum tube ($P = 0\text{ Pa}, \rho = 0$). The architecture provides real-time side-by-side dual-chamber comparative visualization, optical laser photogates, ghost stroboscopic trajectories, synchronized multi-variable kinematic charts, and interactive environment parameter tuning.

### Physico-Mathematical Modeling
In the absence of a fluid medium (vacuum regime, $\rho = 0$), the only force acting on a body is the gravitational attraction. According to Newton's Second Law combined with the Weak Equivalence Principle ($m_{\text{inertial}} = m_{\text{gravitational}}$):

$$F_{\text{net}} = m_i a = m_g g \implies a(t) = g = \text{constant}$$

Because the mass algebraically cancels out, all objects undergo identical uniform gravitational acceleration regardless of mass, geometry, or composition. The kinematics in vacuum are strictly quadratic:

$$v(t) = g t, \quad y(t) = \frac{1}{2} g t^2, \quad t_{\text{queda}} = \sqrt{\frac{2h}{g}}$$

In real atmospheric air ($\rho = 1.225\text{ kg/m}^3$), falling bodies experience upward aerodynamic drag modeled in the turbulent Newtonian drag regime ($\text{Re} \gg 10^3$):

$$F_d = \frac{1}{2} \rho C_d A v^2$$

The resulting non-linear ordinary differential equation governing the vertical motion is:

$$m \frac{dv}{dt} = m g - \frac{1}{2} \rho C_d A v |v| \implies a(t) = g - \left(\frac{\rho C_d}{2}\right) \left(\frac{A}{m}\right) v^2$$

Here, the decisive parameter governing real-world fall dynamics is the **area-to-mass ratio** ($A/m$):
- **Feather**: $A/m \approx 3.0\text{ m}^2/\text{kg}$ (enormous ratio $\implies$ massive deceleration per unit velocity). It rapidly reaches a very low terminal velocity $v_t \approx 2.11\text{ m/s}$ ($7.6\text{ km/h}$) in less than $0.3\text{ s}$, after which $a \approx 0$ and motion becomes linear: $y(t) \approx v_t t$.
- **Train**: $A/m \approx 0.0002\text{ m}^2/\text{kg}$ (negligible ratio $\implies$ drag is miniscule compared to its immense weight $mg$). Its terminal velocity is $v_t \approx 338.2\text{ m/s}$ ($1,217\text{ km/h}$), meaning over typical drop heights ($10\text{ m} - 150\text{ m}$) the train behaves essentially as a free-falling body at $a \approx g$.

Terminal velocity ($v_t$) and the exact analytical kinematic solution from rest are given by:

$$v_t = \sqrt{\frac{2 m g}{\rho C_d A}}, \quad v(t) = v_t \tanh\left(\frac{g t}{v_t}\right), \quad y(t) = \frac{v_t^2}{g} \ln\left(\cosh\left(\frac{g t}{v_t}\right)\right)$$

### Code Dynamics
From a software engineering and numerical analysis perspective, the simulation core executes:
- **Numerical Integration Engine**: Resolves the non-linear differential equations using an explicit 4th-Order Runge-Kutta (RK4) integration algorithm with 10 temporal sub-steps per frame to ensure zero numerical drift and sub-millisecond impact precision.
- **Dual-Chamber HTML5 Canvas Pipeline**: Simultaneously renders the atmospheric tube (with procedural aerodynamic streamlines, air dust motes, dynamic vector arrows, and flutter oscillations) and the evacuated vacuum tube (with synchronous Galileo alignment guidelines and ghost stroboscopic trails at $\Delta t = 0.25\text{ s}$).
- **Optical Laser Photogate Matrix**: Millisecond-accurate digital sensors placed along the drop column ($0\%, 25\%, 50\%, 75\%, 100\%$) that record precision interrupt timestamps.
- **Synchronized Real-Time Oscilloscope**: Interactive Chart.js module streaming live curves of position $y(t)$, velocity $v(t)$, and acceleration $a(t)$ across all 4 body-environment permutations.
- **Synthesized Web Audio API**: Procedurally synthesizes mechanical latch release clicks, velocity-modulated aerodynamic rush/friction, optical photogate beeps, low-frequency train ground impact booms, and soft feather landings without external audio files.
- **Comprehensive Didactic Engine**: Integrated KaTeX mathematical derivations, historical context (Galileo's thought experiment and Apollo 15 Lunar drop), and parametric environment presets (Earth, Moon, Tower of Pisa, Jupiter).

---

## Statistical Mechanics: Phase Space, Density Function, and Gibbs Ensembles

**Reference File:** `mecanica_estatistica_espaco_fase.html`

### Logical Description
This single-file interactive application models and visualizes the core conceptual foundation of Classical Statistical Mechanics for a one-dimensional Simple Harmonic Oscillator (SHO). The computational architecture bridges microscopic Hamiltonian trajectories with macroscopic thermodynamic ensembles. The simulation provides real-time exploration of 2D canonical phase space $(q, p)$, continuous probability density heatmaps $\rho(q, p)$, exact symplectic time evolution obeying Hamilton's equations of motion, and a direct visual demonstration of Liouville's Theorem (phase-flow incompressibility and volume conservation).

### Physico-Mathematical Modeling
The mechanical state of a single one-dimensional harmonic oscillator ($m=1, k=1$) is represented by a single point (microstate) in the two-dimensional phase space spanned by generalized coordinate $q$ and conjugate momentum $p$. The system Hamiltonian is:

$$H(q, p) = \frac{p^2}{2m} + \frac{1}{2} k q^2 = \frac{1}{2}(p^2 + q^2)$$

The canonical equations of motion govern the temporal trajectories:

$$\dot{q} = \frac{\partial H}{\partial p} = p, \quad \dot{p} = -\frac{\partial H}{\partial q} = -q$$

The phase-space velocity field is $\vec{v} = (\dot{q}, \dot{p}) = (p, -q)$. Because the velocity field has identically zero divergence:

$$\nabla \cdot \vec{v} = \frac{\partial \dot{q}}{\partial q} + \frac{\partial \dot{p}}{\partial p} = \frac{\partial^2 H}{\partial q \partial p} - \frac{\partial^2 H}{\partial p \partial q} = 0$$

The phase flow acts as an **incompressible fluid**. By Liouville's Theorem, the total convective time derivative of the phase-space probability density function $\rho(q, p)$ along system orbits vanishes:

$$\frac{d\rho}{dt} = \frac{\partial \rho}{\partial t} + \{\rho, H\} = 0$$

Furthermore, any arbitrary domain volume (phase area) $\Delta\Gamma = \iint_{\Omega(t)} dq dp$ remains strictly invariant over time ($\frac{d\Delta\Gamma}{dt} = 0$).

#### Ensembles:
1. **Microcanonical Ensemble ($N, V, E$ fixed)**:
   Describes an isolated system with constant total energy $E_0$. By the fundamental postulate of equal a priori probabilities, microstates are uniformly distributed over the constant energy hypersphere (a circle of radius $R = \sqrt{2E_0}$ in 2D):
   $$\rho_{\text{micro}}(q, p) = \frac{1}{\Omega(E_0)} \delta(H(q, p) - E_0)$$
   The density heatmap exhibits a luminous narrow annular shell concentrated at $R = \sqrt{2E_0}$ and vanishes everywhere else.

2. **Canonical Ensemble ($N, V, T$ fixed)**:
   Describes a system in thermal equilibrium with a heat reservoir at temperature $T$ ($\beta = 1/k_B T$, setting $k_B = 1$). Microstates are distributed according to the Boltzmann-Gibbs distribution:
   $$\rho_{\text{can}}(q, p) = \frac{1}{Z} e^{-\beta H(q, p)} = \frac{1}{2\pi T} \exp\left(-\frac{q^2 + p^2}{2T}\right)$$
   This represents an isotropic bivariate Gaussian cloud in phase space with variance $\sigma_q^2 = \sigma_p^2 = T$, yielding an average energy $\langle H \rangle = k_B T = T$ (consistent with the Classical Equipartition Theorem).

### Code Dynamics
- **Single-File Vanilla Web Architecture**: Pure HTML5, modern Dark Mode CSS3, and Vanilla JavaScript Canvas API with zero external dependencies.
- **Symplectic Time Integrator**: Utilizes the exact $2 \times 2$ symplectic rotation matrix $R(\omega \cdot dt)$ with $\det(R) = 1$, guaranteeing absolute energy conservation and zero numerical area drift.
- **High-Performance Heatmap Pipeline**: Evaluates the continuous probability density function $\rho(q, p)$ over an offscreen typed array buffer with a scientific thermal colormap (cold deep-blue $\to$ cyan $\to$ green $\to$ amber $\to$ fiery red $\to$ incandescent white peak) and blits via bilinear hardware scaling.
- **Liouville Phase-Droplet Tracker**: Allows spawning and interactive positioning of a localized test cluster of microstates with a continuous geometric boundary ellipse; computes and tracks the invariant enclosed phase area $\Delta\Gamma$ in real time.
- **Real-Time Thermodynamic Telemetry & Histogram**: Dynamically samples active microstates, calculates sample mean $\langle H \rangle$ vs theoretical expectation $\langle H \rangle_{\text{theo}}$, energy variance $\Delta H$, and renders a live energy probability distribution histogram $P(E)$ overlaid against the analytical distribution curve.
- **Pedagogical Intuitive Panel**: Provides an accessible, didactic breakdown explaining the bridge between microstates and macrostates, geometric phase space orbits, and phase fluid incompressibility.

---

## Classical Electrodynamics: Poynting Vector and Plane Wave Propagation

**Reference File:** `poynting_vector_simulation.html` (also available as `index.html`)

### Logical Description
This single-file interactive application provides a high-fidelity 3D computational visualization of energy transport in electromagnetic radiation, focusing on the Poynting Vector ($\mathbf{S}$) and its strict orthogonal triad with the Electric Field ($\mathbf{E}$) and Magnetic Field ($\mathbf{B}$) in a monochromatic plane wave propagating through free space. The simulation allows users to inspect continuous wave envelopes, spatially distributed vector fields, and instantaneous local field probes at arbitrary coordinates $x_0$, validating conservation of energy, unidirectional power flow, and the cross-product relationship $\mathbf{S} = \frac{1}{\mu_0}(\mathbf{E} \times \mathbf{B})$.

### Physico-Mathematical Modeling
The theoretical framework is governed by the microscopic Maxwell equations in vacuum ($\rho = 0, \mathbf{J} = \mathbf{0}$):

$$\nabla \cdot \mathbf{E} = 0, \quad \nabla \cdot \mathbf{B} = 0, \quad \nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}, \quad \nabla \times \mathbf{B} = \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}$$

Considering the electromagnetic energy density $u = \frac{1}{2}\left( \varepsilon_0 |\mathbf{E}|^2 + \frac{1}{\mu_0} |\mathbf{B}|^2 \right)$, differentiation with respect to time and application of the vector calculus identity $\nabla \cdot (\mathbf{E} \times \mathbf{B}) = \mathbf{B} \cdot (\nabla \times \mathbf{E}) - \mathbf{E} \cdot (\nabla \times \mathbf{B})$ yields Poynting's Theorem in differential form:

$$\frac{\partial u}{\partial t} + \nabla \cdot \mathbf{S} = -\mathbf{J} \cdot \mathbf{E}$$

where the **Poynting Vector** $\mathbf{S} \equiv \frac{1}{\mu_0} (\mathbf{E} \times \mathbf{B})$ denotes the directional energy flux density ($\text{W/m}^2$).

For a linearly polarized monochromatic plane wave propagating along the $+x$ axis ($\hat{\mathbf{k}} = \hat{\mathbf{x}}$):

$$\mathbf{E}(x, t) = E_0 \cos(kx - \omega t) \, \hat{\mathbf{y}}$$
$$\mathbf{B}(x, t) = B_0 \cos(kx - \omega t) \, \hat{\mathbf{z}} = \frac{E_0}{c} \cos(kx - \omega t) \, \hat{\mathbf{z}}$$

Evaluating the cross product directly reveals the fundamental electrodynamic properties:

$$\mathbf{S}(x, t) = \frac{1}{\mu_0} \mathbf{E} \times \mathbf{B} = \frac{E_0^2}{\mu_0 c} \cos^2(kx - \omega t) \, (\hat{\mathbf{y}} \times \hat{\mathbf{z}}) = c \varepsilon_0 E_0^2 \cos^2(kx - \omega t) \, \hat{\mathbf{x}}$$

1. **Strict Orthogonal Triad**: $\mathbf{E} \cdot \mathbf{B} = 0$, $\mathbf{E} \cdot \mathbf{S} = 0$, and $\mathbf{B} \cdot \mathbf{S} = 0$ everywhere at all times.
2. **Unidirectional Energy Flow**: Because $\cos^2(kx - \omega t) \ge 0$, $\mathbf{S}$ never reverses direction, pointing relentlessly forward along $+x$ (transport of energy strictly in the direction of wave propagation).
3. **Double Frequency and Time Average**: The instantaneous power density pulsates at twice the wave frequency ($2\omega$), with time-average intensity:
   $$\langle \mathbf{S} \rangle = \frac{1}{2} c \varepsilon_0 E_0^2 \, \hat{\mathbf{x}} = \frac{E_0 B_0}{2 \mu_0} \, \hat{\mathbf{x}}$$

### Code Dynamics
- **Three.js WebGL 3D Pipeline**: Hardware-accelerated rendering utilizing dynamic buffer geometries for continuous transverse wave curves, parametric vector arrow fields, and ground reference grids.
- **Interactive Probe Station**: A movable point probe along the propagation axis that isolates the local instantaneous triad $(\mathbf{E}, \mathbf{B}, \mathbf{S})$ with real-time numeric dot-product calculation proving exact orthogonality ($\mathbf{E} \cdot \mathbf{B} = 0.000$).
- **Bidirectional Spherical Camera Controls**: Synchronizes orbital mouse dragging with analytical pitch ($\theta$) and yaw ($\phi$) sliders, preventing coordinate singularities and telemetry jitter.
- **Real-Time Scientific Telemetry HUD**: Continuously evaluates and displays probe phase $\phi(x_0, t)$, instantaneous field components $E_y$, $B_z$, instantaneous Poynting flux $S_x$, and time-averaged radiation intensity $\langle S \rangle$.
- **Integrated KaTeX Academic Documentation**: Full in-page theoretical deduction, vector calculus derivation, and standard textbook citations (Griffiths, Jackson, Halliday & Resnick, Feynman) rendered via LaTeX math typography.

---

## Vector Calculus: Gradient, Divergence, and Curl Rigorous Geometric Simulation

**Reference File:** `calculo_vetorial_grad_div_rot.html`

### Logical Description
This single-file interactive application provides a mathematically rigorous visualization of the fundamental first-order differential operators of 2D vector calculus: the **Gradient** ($\nabla f$), the **Divergence** ($\nabla \cdot \mathbf{F}$), and the **Curl** ($\nabla \times \mathbf{F}$). The application avoids abstract or hand-waving simplifications, rendering exact geometric representations of level curves (isolines), normal boundary flux through infinitesimal 2D test volumes, and rotational paddle-wheel torque dynamics. The user can switch seamlessly between operators, test multiple canonical presets (e.g., saddle points, sources, sinks, shear flows, and irrotational vortices), manipulate position and intensity variables via responsive sliders, and inspect real-time LaTeX telemetry verified against Gauss' Divergence Theorem and Stokes' Circulation Theorem.

### Physico-Mathematical Modeling
1. **The Gradient ($\nabla f$)**:
   Given a 2D scalar potential $f(x, y)$, the gradient vector field is defined by:
   $$\nabla f = \left( \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right)$$
   - *Strict Orthogonality*: For any regular level curve $f(x, y) = c$, parameterized by $\mathbf{r}(t)$, differentiation yields $\frac{df}{dt} = \nabla f \cdot \frac{d\mathbf{r}}{dt} = \nabla f \cdot \mathbf{T} = 0$. The gradient is strictly perpendicular to the level curves ($\nabla f \perp \mathbf{T}$).
   - *Direction of Steepest Ascent*: The directional derivative along any unit vector $\hat{\mathbf{u}}$ satisfies $D_{\hat{\mathbf{u}}} f = \nabla f \cdot \hat{\mathbf{u}} = \|\nabla f\| \cos\theta \le \|\nabla f\|$, with equality if and only if $\hat{\mathbf{u}}$ is parallel to $\nabla f$.

2. **The Divergence ($\nabla \cdot \mathbf{F}$)**:
   For a vector field $\mathbf{F}(x, y) = F_x \hat{\mathbf{i}} + F_y \hat{\mathbf{j}}$, the scalar divergence is defined as:
   $$\nabla \cdot \mathbf{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y}$$
   - *Gauss-Green Divergence Theorem*: Over a closed circular test region $D$ of radius $R$ centered at $(x_0, y_0)$ with boundary $\partial D$:
     $$\Phi_{\text{net}} = \oint_{\partial D} \mathbf{F} \cdot \hat{\mathbf{n}} \, ds = \iint_D (\nabla \cdot \mathbf{F}) \, dA \approx (\nabla \cdot \mathbf{F})|_{(x_0, y_0)} \cdot \pi R^2$$
   - *Physical Source/Sink Classification*: When $\nabla \cdot \mathbf{F} > 0$, net flux emerges outward from the region (source, highlighted in red). When $\nabla \cdot \mathbf{F} < 0$, net flux converges inward (sink, highlighted in blue). When $\nabla \cdot \mathbf{F} = 0$, the flow is solenoidal / incompressible (neutral).

3. **The Curl ($\nabla \times \mathbf{F}$)**:
   In two dimensions, the out-of-plane scalar vorticity component is:
   $$(\nabla \times \mathbf{F})_z = \frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y}$$
   - *Cauchy-Stokes Hydrodynamic Kinematics*: By fluid kinematics, an infinitesimal, freely pivoted paddle wheel immersed in a velocity field $\mathbf{F}$ rotates with an instantaneous angular velocity strictly equal to half the local vorticity:
     $$\vec{\omega}_{\text{wheel}} = \frac{1}{2} (\nabla \times \mathbf{F})$$
   - *Stokes' Circulation Theorem*: The line integral of the tangential flow around the wheel perimeter $\partial D$ satisfies:
     $$\Gamma = \oint_{\partial D} \mathbf{F} \cdot d\mathbf{r} = \iint_D (\nabla \times \mathbf{F})_z \, dA \approx (\nabla \times \mathbf{F})_z|_{(x_0, y_0)} \cdot \pi R_w^2$$
   - *The Shear Flow Paradox*: Rectilinear flows with transverse shear (e.g., $\mathbf{F} = k y \, \hat{\mathbf{i}}$) possess non-zero curl ($(\nabla \times \mathbf{F})_z = -k$), driving clockwise rotation despite straight streamlines. Conversely, an irrotational vortex ($\mathbf{F} \propto (-y/r^2, x/r^2)$) yields zero rotation outside the origin.

### Code Dynamics
- **p5.js High-Performance Vector Canvas**: High-DPI 2D rendering pipeline with custom Cartesian coordinate mapping, real-time vector field sampling, smooth particle streamlines, and dynamic grabbing/crosshair cursor feedback.
- **Marching Squares Contour Generation**: Fast grid evaluation producing exact, continuous piecewise-linear isolines for scalar fields alongside an offscreen bilinear colormap buffer.
- **Interactive Geometric Probes**:
  - *Gradient Probe*: Computes exact tangent line $\mathbf{T}$, gradient vector $\nabla f$, $90^\circ$ orthogonality indicator, numerical dot product $\nabla f \cdot \mathbf{T} \equiv 0.000$, and a rotatable directional derivative vector $\hat{\mathbf{u}}$ with real-time maximal variation telemetry.
  - *Divergence Test Disk*: Draggable circular volume calculating both the numerical perimetric flux integral $\oint \mathbf{F} \cdot \hat{\mathbf{n}} \, ds$ and analytical divergence $(\nabla \cdot \mathbf{F})\pi R^2$, dynamically shaded in red (source), blue (sink), or emerald (solenoidal).
  - *Paddle Wheel Model*: Drag-and-drop 6-blade paddle wheel whose rotation angle $\theta(t)$ integrates $\omega = \frac{1}{2}(\nabla \times \mathbf{F})_z$ in real time, displaying right-hand rule out-of-plane indicators ($\odot$ for $+z$, $\otimes$ for $-z$) and boundary circulation $\Gamma$.
- **KaTeX Academic Telemetry HUD**: Live mathematical expressions displaying analytical formulas, instantaneous field values, and theorem verification metrics without DOM thrashing.

---

## Heisenberg Uncertainty Principle: Rigorous Quantum Simulation

**Reference File:** `heisenberg_uncertainty_simulation.html`

### Logical Description
This single-file interactive application provides a mathematically rigorous, epistemologically sound, and visually intuitive laboratory illustrating the **Heisenberg Uncertainty Principle** ($\Delta x \cdot \Delta p \ge \frac{\hbar}{2}$). Moving beyond the common pop-science misconception that uncertainty is merely an experimental observer perturbation, the simulation demonstrates that uncertainty is a fundamental, ontic wave-mechanical property originating from the non-commutativity of quantum observables ($[\hat{x}, \hat{p}] = i\hbar$) and the Fourier conjugate nature of position and momentum Hilbert representations.

The application features four interconnected, specialized laboratory modes:
1. **Fourier Duality & Wave Packet Engine ($\psi(x) \leftrightarrow \phi(p)$)**: Dual synchronized high-DPI canvases illustrating the spatial wave packet $\psi(x)$ alongside its continuous Fourier transform in momentum space $\phi(p)$, with direct mouse-drag manipulation, phase-color mapping ($e^{i\theta} \mapsto \text{HSV}$), constituent Fourier harmonic superposition decomposition, and real-time Schrödinger time evolution dispersion.
2. **Quantum Slit Diffraction & Measurement Collapse**: Simulates electron beam diffraction through an aperture of variable width $a = \Delta x$, implementing stochastic Monte Carlo particle detection at a distant screen to visually demonstrate how spatial confinement directly inflates transversal momentum dispersion ($\Delta p_x \propto \hbar / a$).
3. **Phase Space & Planck Cell Geometry ($(x, p)$ / Wigner Representation)**: Explores the irreducible minimum phase space cell area ($\pi \hbar \approx h/2$), demonstrating quantum squeezing (where variance reduction in one quadrature forces variance dilation in the conjugate quadrature) and phase space shear dynamics.
4. **Heisenberg's Gamma-Ray Microscope Gedankenexperiment**: Animates the classic 1927 thought experiment showing why shortening the photon wavelength ($\lambda$) improves optical spatial resolution ($\Delta x \approx \lambda / (2\sin\theta)$) but unavoidably delivers an equal and opposite Compton momentum recoil kick ($\Delta p_x \approx (h/\lambda)\sin\theta$), proving $\Delta x \cdot \Delta p_x \approx h/2$ invariant of wavelength.

### Physico-Mathematical Modeling
1. **Robertson-Schrödinger Inequality & Non-Commutativity**:
   For any two Hermitian operators $\hat{A}$ and $\hat{B}$, statistical standard deviations obey:
   $$\sigma_A \sigma_B \ge \frac{1}{2} \left| \langle [\hat{A}, \hat{B}] \rangle \right|$$
   Substituting the fundamental canonical commutation relation $[\hat{x}, \hat{p}] = i\hbar \hat{I}$:
   $$\sigma_x \sigma_p \ge \frac{1}{2} |i\hbar| = \frac{\hbar}{2}$$
   In simulation natural units ($\hbar = 1$), the absolute quantum floor is $\sigma_x \sigma_p \ge 0.50$.

2. **Fourier Transform Pair & Minimum Wave Packet**:
   The momentum representation $\phi(p)$ is the Fourier transform of the spatial wave function:
   $$\phi(p) = \frac{1}{\sqrt{2\pi\hbar}} \int_{-\infty}^{\infty} \psi(x) e^{-i p x / \hbar} dx$$
   The equality $\sigma_x \sigma_p = \frac{\hbar}{2}$ is saturated exclusively by unchirped Gaussian wave packets:
   $$\psi(x) = \left( \frac{1}{2\pi \sigma_x^2} \right)^{1/4} \exp\left( -\frac{x^2}{4\sigma_x^2} + \frac{i p_0 x}{\hbar} \right)$$
   Any quadratic phase modulation (chirp $\alpha x^2$), boundary clipping (slit rectangular packet), or bimodal interference (Schrödinger cat state) yields $\sigma_x \sigma_p > \frac{\hbar}{2}$.

3. **Time-Dependent Schrödinger Wave Packet Dispersion**:
   Under the free Hamiltonian $\hat{H} = \frac{\hat{p}^2}{2m}$, spatial dispersion evolves as:
   $$\sigma_x(t) = \sigma_0 \sqrt{1 + \left( \frac{\hbar t}{2m \sigma_0^2} \right)^2}$$
   States prepared with extreme spatial localization ($\sigma_0 \ll 1$) necessarily possess immense momentum variance ($\sigma_p \gg 1$), resulting in catastrophic kinetic spreading across space over time.

4. **Quantum Diffraction and Slit Measurement**:
   Spatial transmission through slit $a$ produces transversal momentum probability density:
   $$P(p_x) \propto \text{sinc}^2\left( \frac{p_x a}{2\hbar} \right)$$
   The central diffraction envelope width spans $\Delta p_x \approx \frac{2\pi\hbar}{a} = \frac{h}{\Delta x}$, guaranteeing $\Delta x \cdot \Delta p_x \approx h$.

### Code Dynamics
- **Radix-2 Cooley-Tukey FFT Engine**: Pure JavaScript discrete Fourier transform operating over a 512-point grid with sub-millisecond execution, enabling 60 FPS continuous spectral updates and fftshift centering.
- **Split-Step Spectral Schrödinger Solver**: Unitary time integration applying diagonal kinetic phase steps $\exp\left(-i \frac{p^2}{2m\hbar} dt\right)$ in momentum space, strictly preserving $L^2$ norm conservation ($\int |\psi|^2 dx \equiv 1.000$).
- **Multi-Modal High-DPI Canvas Rendering Pipeline**: Device pixel ratio adaptive rendering featuring dynamic glow shaders, HSV complex phase coloring, interactive draggable control handles on position, slit, and phase-space canvases, and animated particle impacts.
- **Web Audio API Quantum Synthesizer**: Realistic synthetic audio feedback modeling stochastic Poisson arrivals and Geiger counter clicks during single-electron diffraction detection.
- **Interactive Preset Station & Telemetry**: Instant presets (Gaussian Fundamental, Spatial Localization, Plane Wave, Schrödinger Cat State, Slit Cut, Dispersive Chirp), live Heisenberg saturation gauge, and KaTeX mathematical formulas.

