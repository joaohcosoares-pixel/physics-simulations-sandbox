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