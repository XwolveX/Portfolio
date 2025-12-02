package dinhlam2901.portfolio.service;

import dinhlam2901.portfolio.model.Experience;
import dinhlam2901.portfolio.model.Project;
import dinhlam2901.portfolio.model.Skill;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class PortfolioService {

    public List<Project> getAllProjects() {
        return Arrays.asList(
                new Project(
                        "field-inspection",
                        "FieldInspection App",
                        "On-site inspection app with Inspector/Supervisor roles, offline mode, auto-sync, OTP login, Maps, photo reports (ML Kit), chat, notifications, and PDF export.",
                        Arrays.asList("Kotlin", "Jetpack Compose", "ML Kit", "Firebase"),
                        "https://github.com/XwolveX",
                        "Project Scope & Collaboration\n" +
                                "    In this demo (0:00 - 3:20): The Supervisor role module was developed by my teammate.\n" +
                                "    From (3:20 - End): The Inspector role module was developed and demonstrated by me.\n" +
                                "    We collaborated closely on system analysis, requirement evaluation, and development planning.\n" +
                                "\n" +
                                "Why Our Team Made This App\n" +
                                "    At Phuong Hai company, traditional workflows relied on manual note-taking and fragmented communication, causing delays and risks.\n" +
                                "    We built this app to centralize all inspection data into a single, reliable platform.\n" +
                                "    It reduces paperwork, improves accuracy, and minimizes human errors.\n" +
                                "    Enables supervisors to monitor tasks, assign jobs, and review reports instantly.\n" +
                                "    Strengthens collaboration via real-time messaging and notifications.\n" +
                                "    Goal: Streamline the inspection process and help the company make faster, better-informed decisions.\n" +
                                "\n" +
                                "For Inspector\n" +
                                "    Login with phone number + OTP (Firebase Phone Auth).\n" +
                                "    Dashboard: view assigned tasks, filter by branch/priority.\n" +
                                "    Create Report: title, description, inspection type, score, location (lat/lng), photos/videos.\n" +
                                "    ML Kit Image Labeling: auto-suggests labels from attached images.\n" +
                                "    Offline support: reports stored in Room → auto-synced to Firestore when online.\n" +
                                "    Report history: view past reports with status and supervisor notes.\n" +
                                "    1–1 Chat with Supervisor, plus notifications for updates.\n" +
                                "\n" +
                                "For Supervisor\n" +
                                "    Dashboard + Google Maps view of report locations.\n" +
                                "    Review reports: update status (ASSIGN, COMPLETED, OVERDUE) and result (PASSED/FAILED).\n" +
                                "    Manage notifications and chat with Inspectors.\n" +
                                "    Filter by Branch, Priority, or time.\n",
                        "https://firebasestorage.googleapis.com/v0/b/portfolio-bfbd9.firebasestorage.app/o/videos%2FFieldInspectionDemo.mp4?alt=media&token=f824758c-3752-49f2-bfcc-6f70f356ebda"
                ),
                new Project(
                        "petpal-app", // ID
                        "PetPal: Pet Community Platform", // Title
                        "A modern Android application connecting pet lovers for adoption and lost-and-found support. Built with Kotlin, Jetpack Compose, and Clean Architecture.", // Short Description
                        Arrays.asList("Kotlin", "Jetpack Compose", "Firebase", "Google Maps API", "Hilt/DI", "Clean Architecture"), // Tech stack
                        "https://github.com/XwolveX/PetPal", // Link GitHub (tôi lấy từ tên thư mục bạn upload)
                        "Project Vision\n" +
                                "   Pet ownership comes with challenges, especially when a pet goes missing or when looking to adopt. PetPal was created to bridge this gap.\n" +
                                "   It serves as a centralized mobile platform that connects pet owners, shelters, and animal lovers to facilitate adoption and reunite lost pets.\n\n" +
                                "Key Features\n" +
                                "   • Lost & Found Reporting: Users can report lost or sighted pets by pinning their exact location on an interactive Map (Google Maps integration).\n" +
                                "   • Real-time Chat: Integrated messaging system allowing adopters and owners to communicate instantly regarding pet status.\n" +
                                "   • Smart Filtering: Advanced search filters to find pets by breed, age, or distance.\n" +
                                "   • Secure Auth: Implemented OTP-based authentication via phone number for verified user identities.\n\n" +
                                "Technical Architecture\n" +
                                "   • Clean Architecture: The app is strictly structured into Domain, Data, and Presentation layers, ensuring scalability and maintainability.\n" +
                                "   • Modern UI: 100% UI built with Jetpack Compose, utilizing declarative patterns for a responsive and smooth user experience.\n" +
                                "   • Serverless Backend: Powered by Firebase ecosystem (Firestore for NoSQL data, Authentication for security, and Cloud Messaging for push notifications).\n" +
                                "   • Dependency Injection: Utilized Hilt for efficient dependency management across the app modules.",
                        "https://firebasestorage.googleapis.com/v0/b/portfolio-bfbd9.firebasestorage.app/o/videos%2FPetPalAppDemo.mp4?alt=media&token=5e59a5fc-eb0f-4b60-a5e9-bc13f81f9dc5"
                ),
                new Project(
                        "owl-remote", // ID
                        "OwlRemote: Remote Desktop", // Title
                        "A cross-platform remote desktop application enabling screen sharing and remote control over the internet. Features P2P connectivity via ZeroTier integration.", // Short Description
                        Arrays.asList("Java", "Swing/AWT", "Socket Programming", "ZeroTier SDK", "Multi-threading"), // Tech stack
                        "https://github.com/XwolveX/OwlRemote", // Link GitHub

                        // Long Description (Format kỹ thuật & kể chuyện)
                        "Project Concept\n" +
                                "   Built a lightweight remote desktop solution (similar to TeamViewer) to control computers remotely without relying on third-party cloud servers for data relay.\n" +
                                "   The application allows real-time screen viewing and full mouse/keyboard control with low latency.\n\n" +
                                "Key Technical Features\n" +
                                "   • Smart Networking (ZeroTier): Integrated ZeroTier SDK to establish Peer-to-Peer (P2P) Virtual LAN connections. This allows devices to connect seamlessly across different networks (NAT/Firewalls) without requiring manual Port Forwarding.\n" +
                                "   • Screen Capture Engine: Developed a high-performance screen scraper using Java AWT Robot, optimized to capture and compress screenshots for network transmission.\n" +
                                "   • Remote Input Injection: Implemented a command protocol to serialize mouse coordinates and keystrokes from the Client, transmitting them to the Server to be replayed instantly on the host machine.\n" +
                                "   • Client-Server Architecture: Designed a multi-threaded server capable of handling image streaming (Downlink) and control commands (Uplink) simultaneously on separate sockets.",
                        "#" // Video URL
                ),
                new Project(
                        "tma-tourist",
                        "TMA Tourist Website",
                        "Designed and built a basic corporate website for TMA Tourist with responsive design and smooth animations.",
                        Arrays.asList("HTML5", "CSS3", "JavaScript"),
                        "http://tmatourist.com",
                        "/images/project3.jpg",
                        "/videos/tma-tourist-demo.mp4"
                ),
                new Project(
                        "flappy-bird", // ID
                        "Flappy Bird Game", // Title
                        "A faithful web adaptation of a Flappy Bird clone originally written in C for Bare-Metal Raspberry Pi 4. Rewritten in JavaScript to make the embedded experience accessible to everyone.", // Short Description
                        Arrays.asList("JavaScript", "HTML5 Canvas", "Physics Port", "C/Embedded (Origin)"), // Tech stack
                        "/game/flappybird", // Link (Trỏ về GameController)

                        // Long Description (Format kể chuyện)
                        "Project Origin: The Embedded Version\n" +
                                "   This project began as a low-level challenge: programming a Flappy Bird clone directly on Raspberry Pi 4 hardware without an Operating System (Bare-Metal).\n" +
                                "   It involved managing memory manually, interacting with GPIOs, and writing directly to the Framebuffer for graphics.\n\n" +
                                "Why I Built This Web Version\n" +
                                "   Showcasing a bare-metal project requires physical hardware, which isn't easy to share online.\n" +
                                "   I created this web version to let anyone experience the game mechanics immediately without needing a Raspberry Pi.\n" +
                                "   It serves as a bridge, demonstrating how low-level logic can be translated into modern web technologies.\n\n" +
                                "Technical Implementation\n" +
                                "   Physics Port: Translated the gravity and collision logic 1:1 from C structs to JavaScript objects.\n" +
                                "   Asset-less Rendering: Instead of loading images, the game draws graphics (Bird, Mario-style pipes) programmatically using HTML5 Canvas, mimicking the original hex-bitmap rendering.\n" +
                                "   Performance: Optimized the game loop to maintain a steady 60 FPS, matching the hardware refresh rate.",
                        "#" // Video URL (Để # vì sẽ chơi trực tiếp)
                ),
                new Project(
                        "tetris-game", // ID
                        "Tetris: Embedded to Web", // Title
                        "A web-based adaptation of my embedded C Tetris game originally built for Raspberry Pi 4. Rewritten in JavaScript to allow anyone to play directly in the browser.", // Short Description
                        Arrays.asList("JavaScript", "HTML5 Canvas", "Algorithm", "C/Embedded (Origin)"), // Tech stack
                        "/game/tetris", // Link (Trỏ về GameController)
                        "Project Origin: The Embedded Version\n" +
                                "   This project started as a low-level challenge: building a fully functional Tetris game in C for the Raspberry Pi 4.\n" +
                                "   It originally ran directly on hardware, handling memory management and interacting with GPIO pins for controls and an LCD display.\n\n" +
                                "Why I Built This Web Version\n" +
                                "   While the hardware version was a great engineering milestone, it was limited to the physical device and hard to showcase remotely.\n" +
                                "   I wanted to create a version that is accessible to everyone, allowing friends and recruiters to experience the game logic instantly.\n" +
                                "   This web port bridges the gap between low-level logic and modern frontend accessibility.\n\n" +
                                "Technical Implementation\n" +
                                "   Ported the core game algorithms (collision detection, matrix rotation) from C to JavaScript.\n" +
                                "   Replaced hardware interrupts with browser DOM Event Listeners for keyboard control.\n" +
                                "   Rendered graphics using HTML5 Canvas instead of writing to a display buffer.\n" +
                                "   Optimized the game loop to run smoothly at 60FPS in the browser.",
                        "#"
                )
        );
    }

    public List<Skill> getAllSkills() {
        return Arrays.asList(
                new Skill("Programming Languages",
                        Arrays.asList("C / C++", "Java", "JavaScript", "Kotlin","Flutter", "Python", "SQL","HTML/CSS")),
                new Skill("Frameworks & Technologies",
                        Arrays.asList("Jetpack Compose", "Spring Boot","Websocket","java Swing" )),
                new Skill("Database",
                        Arrays.asList("Firebase","MySQL","PostgreSQL","ORACLE")),
                new Skill("Tools & Platforms",
                        Arrays.asList("Git/GitHub","Android Studio", "IntelliJ IDEA", "VS Code","MatLab")),
                new Skill("AI-Assisted Development",
                        Arrays.asList("ChatGPT", "Claude", "Gemini","Copilot"))
        );
    }

    public List<Experience> getAllExperiences() {
        return Arrays.asList(
                new Experience(
                        "Web Developer",
                        "TMA TOURIST",
                        "2 week in contract",
                        Arrays.asList(
                                "Designed and built a corporate website for TMA Tourist",
                                "Gained experience in client requirement analysis",
                                "Implemented responsive layouts and user-friendly interfaces"
                        )
                ),
                new Experience(
                        "Livestream Operator",
                        "AIRRLAB",
                        "October 2024 - June 2025",
                        Arrays.asList(
                                "Managed and operated live streaming systems for TikTok and Shopee platforms",
                                "Diagnosed and resolved technical issues during live sessions",
                                "Provided technical support for Yadea Electric Scooter Launch Event"
                        )
                ),
                new Experience(
                        "Content Creator",
                        "TITEK",
                        "April 2024 - October 2024",
                        Arrays.asList(
                                "Created engaging tech-focused content on modern software and hardware solutions",
                                "Conducted research on emerging technologies and products",
                                "Strengthened technical troubleshooting skills"
                        )
                )
        );
    }
}