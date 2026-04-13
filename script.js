// --- Interactive Mouse Glow ---
const mouseGlow = document.getElementById('mouse-glow');
document.addEventListener('mousemove', (e) => {
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top = e.clientY + 'px';
});

// Add hover effect size increase for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .glass-card, .btn, .skill-tag');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        mouseGlow.style.width = '550px';
        mouseGlow.style.height = '550px';
        mouseGlow.style.background = 'radial-gradient(circle, rgba(0, 225, 255, 0.15) 0%, rgba(188, 19, 254, 0) 60%)';
    });
    el.addEventListener('mouseleave', () => {
        mouseGlow.style.width = '400px';
        mouseGlow.style.height = '400px';
        mouseGlow.style.background = 'radial-gradient(circle, rgba(188, 19, 254, 0.12) 0%, rgba(0, 225, 255, 0) 60%)';
    });
});

// --- Scroll Animation Observer ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// --- Dynamic GitHub Fetching ---
const GITHUB_USERNAME = 'yashdagar56';
const profileImg = document.getElementById('profile-img');
const projectsContainer = document.getElementById('projects-container');

// Fetch Profile Info removed to use static image.

// Fetch Repositories
async function fetchRepos() {
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        if(res.ok) {
            const repos = await res.json();
            
            projectsContainer.innerHTML = ''; 

            if(repos.length === 0) {
                projectsContainer.innerHTML = '<p>No public repositories found yet!</p>';
                return;
            }

            repos.forEach(repo => {
                const div = document.createElement('div');
                div.className = 'project-card glass-card fade-in';
                
                // Content generation
                let desc = repo.description || "A dynamic and specialized software solution that I am currently developing.";
                const nameLow = repo.name.toLowerCase();
                
                if(nameLow.includes('chatbot') || nameLow.includes('project 3')) {
                    desc = "An intelligent Python-based chatbot leveraging natural language processing techniques.";
                } else if(nameLow.includes('portfolio') || nameLow.includes('website')) {
                    desc = "My custom-built high-end personal portfolio showcasing full-stack development skills.";
                } else if(nameLow.includes('hangman') || nameLow.includes('pokequest')) {
                    desc = "An interactive programmatic game demonstrating complex application state management.";
                } else if(nameLow.includes('resume')) {
                    desc = "An AI Resume Analyzer utilizing advanced text parsing algorithms to evaluate applicant data.";
                }

                const mainLang = repo.language ? `<span class="tech-tag">${repo.language}</span>` : '<span class="tech-tag">Software Architecture</span>';
                
                div.innerHTML = `
                    <div>
                        <h3 class="project-title">
                            ${repo.name.replace(/-/g, ' ')}
                            <i class="far fa-folder-open"></i>
                        </h3>
                        <p class="project-desc">${desc}</p>
                        <div class="tech-stack">
                            ${mainLang}
                        </div>
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" title="View Source">
                            GitHub Code <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                `;
                
                projectsContainer.appendChild(div);
                
                setTimeout(() => {
                   div.classList.add('visible'); 
                }, 100);
            });

        } else {
            projectsContainer.innerHTML = '<p>Error fetching repositories. Please try again later.</p>';
        }
    } catch(err) {
        console.error("Error fetching repos", err);
        projectsContainer.innerHTML = '<p>Error loading projects via GitHub API.</p>';
    }
}

// Particle.js Configuration - enhanced for more movement
function initParticles() {
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        background: { color: { value: "transparent" } },
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: {
                    distance: 180,
                    links: { opacity: 0.8, color: "#bc13fe" }
                },
                push: { quantity: 3 }
            }
        },
        particles: {
            color: { value: ["#bc13fe", "#00e1ff", "#ffffff"] },
            links: {
                color: "#ffffff",
                distance: 140,
                enable: true,
                opacity: 0.25,
                width: 1.5
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: true,
                speed: 1.5,
                straight: false
            },
            number: {
                density: { enable: true, area: 800 },
                value: 80
            },
            opacity: {
                value: 0.4
            },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } }
        },
        detectRetina: true
    });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    fetchRepos();
    initParticles();
});
