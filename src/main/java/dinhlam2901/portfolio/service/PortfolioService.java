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
                        "#",
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
                        "Petpal-App",
                        "Petpal App",
                        "On-site inspection app with Inspector/Supervisor roles, offline mode, auto-sync, OTP login, Maps, photo reports (ML Kit), chat, notifications, and PDF export.",
                        Arrays.asList("Kotlin", "Jetpack Compose", "Firebase"),
                        "#",
                        "/static/images/profile1.png",
                        "https://firebasestorage.googleapis.com/v0/b/portfolio-bfbd9.firebasestorage.app/o/videos%2FPetPalAppDemo.mp4?alt=media&token=5e59a5fc-eb0f-4b60-a5e9-bc13f81f9dc5"
                ),
                new Project(
                        "owl-remote",
                        "OwlRemote",
                        "Desktop application that allows users to remotely control a PC by sending keyboard and mouse signals.",
                        Arrays.asList("Java", "Swing", "AWT", "WebSocket"),
                        "https://github.com/XwolveX",
                        "/images/project2.jpg",
                        "/videos/owl-remote-demo.mp4"
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
                        "flappy-bird",
                        "Flappy Bird Game",
                        "Developed a Flappy Bird–style game inspired by the original version, fully runnable on Raspberry Pi 4.",
                        Arrays.asList("C", "Raspberry Pi", "Game Development"),
                        "https://github.com/XwolveX",
                        "/images/project4.jpg",
                        "/videos/flappy-bird-demo.mp4"
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