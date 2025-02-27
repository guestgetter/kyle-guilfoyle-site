const canvas = document.getElementById("synapseCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];
const maxNodes = 15; // Adjusted for balance
const maxDistance = 120;

// List of food-related emoji/icons
const foodIcons = ["🍽️", "🥂", "🍕", "👨‍🍳"]; // Fork & Knife, Wine Glass, Pizza, Chef

// Create nodes (dots)
class Node {
    constructor(x, y, type = "dot") {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 3 + 2;
        this.type = type;
        this.icon = this.type === "food" ? foodIcons[Math.floor(Math.random() * foodIcons.length)] : null;
        this.opacity = 0.5 + Math.random() * 0.5;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        if (this.type === "food") {
            // Draw a floating food icon
            ctx.font = "16px Arial";
            ctx.fillStyle = `rgba(13, 110, 253, ${this.opacity})`;
            ctx.fillText(this.icon, this.x, this.y);
        } else {
            // Draw a normal synapse node
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(13, 110, 253, 0.8)";
            ctx.fill();
            ctx.closePath();
        }
    }
}

// Generate random nodes (80% dots, 20% food icons)
for (let i = 0; i < maxNodes; i++) {
    let type = Math.random() < 0.8 ? "dot" : "food"; // 80% normal dots, 20% food
    nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height, type));
}

// Connect nodes with lines
function connectNodes() {
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            let dx = nodes[i].x - nodes[j].x;
            let dy = nodes[i].y - nodes[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = "rgba(13, 110, 253, 0.3)";
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    nodes.forEach((node) => {
        node.move();
        node.draw();
    });

    connectNodes();
    requestAnimationFrame(animate);
}

// Adjust canvas size on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start animation
animate();
console.log("Synapse animation script with food icons loaded!");