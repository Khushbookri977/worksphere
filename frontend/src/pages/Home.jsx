import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system
    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.vz = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Wrap around
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        if (this.z < 0) this.z = canvas.width;
        if (this.z > canvas.width) this.z = 0;
      }

      draw() {
        const scale = canvas.width / (this.z + canvas.width);
        const x = this.x * scale;
        const y = this.y * scale;
        const radius = this.radius * scale;

        ctx.fillStyle = `rgba(100, 150, 255, ${this.opacity * scale})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Connect nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const opacity = (1 - distance / 200) * 0.3;
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connections
      drawConnections();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleViewDashboard = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
const token = localStorage.getItem("token");
  return (
    <div className="home-container">
      <canvas ref={canvasRef} className="animated-bg"></canvas>

      {/* Navbar */}
      <nav className="home-navbar">
        <div className="container-lg navbar-content">
          <div className="brand">
            <span className="brand-icon">⚙️</span>
            <span className="brand-text">EMS</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#dashboard">Metrics</a>
            <a href="#workflow">Workflow</a>
            <a href="#faq">FAQ</a>
          </div>
          
          <div className="nav-buttons">
            <button className="btn-dashboard" onClick={handleViewDashboard}>
              Open Dashboard →
            </button>

            {token ? (
              <button
                className="btn-signin"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                Logout
              </button>
            ) : (
              <button className="btn-signin" onClick={() => navigate("/login")}>
                Sign in
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot">●</span>
            EMPLOYEE MANAGEMENT PLATFORM
          </div>

          <h1 className="hero-title">
            Run your workforce with{" "}
            <span className="gradient-text">clarity & confidence</span>.
          </h1>

          <p className="hero-subtitle">
            One place for dashboards, departments, and people operations — built
            for teams that need insights, not spreadsheets.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleViewDashboard}>
              View Dashboard
            </button>
            <button className="btn-secondary">Browse Directory</button>
            <button className="btn-tertiary">Learn More ↓</button>
          </div>

          {/* Features List */}
          <div className="features-list">
            <div className="feature-item">
              <span className="checkmark">✓</span>
              <span>Faster onboarding</span>
            </div>
            <div className="feature-item">
              <span className="checkmark">✓</span>
              <span>Role-based access</span>
            </div>
            <div className="feature-item">
              <span className="checkmark">✓</span>
              <span>Export-ready data</span>
            </div>
            <div className="feature-item">
              <span className="checkmark">✓</span>
              <span>Insightful dashboards</span>
            </div>
          </div>
        </div>

        {/* Animated shapes */}
        <div className="floating-shapes">
          <div className="shape cube"></div>
          <div className="shape diamond"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container-lg">
          <h2>Powerful Features Built for Teams</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-time Analytics</h3>
              <p>
                Get instant insights into your workforce with interactive
                dashboards and detailed metrics.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Department Management</h3>
              <p>
                Organize, track, and manage your departments efficiently with
                comprehensive tools.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Employee Profiles</h3>
              <p>
                Maintain detailed employee records with salary, joining dates,
                and department assignments.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Access</h3>
              <p>
                JWT-based authentication ensures your data stays secure with
                role-based access control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="dashboard" className="stats-section">
        <div className="container-lg">
          <h2>Why Choose Our Platform?</h2>
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Employees Managed</div>
            </div>
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Active Companies</div>
            </div>
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="workflow" className="cta-section">
        <div className="container-lg">
          <div className="cta-content">
            <h2>Ready to Transform Your Workforce Management?</h2>
            <p>
              Start managing your employees smarter, faster, and better with our
              platform.
            </p>
            <button
              className="btn-primary-large"
              onClick={() => navigate("/login")}
            >
              Get Started Now →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
