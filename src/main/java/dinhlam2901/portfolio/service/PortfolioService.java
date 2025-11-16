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
                        "/static/images/profile.png"
                ),
                new Project(
                        "owl-remote",
                        "OwlRemote",
                        "Desktop application that allows users to remotely control a PC by sending keyboard and mouse signals.",
                        Arrays.asList("Java", "Swing", "AWT", "Socket Programming"),
                        "https://github.com/XwolveX",
                        "/images/project2.jpg"
                ),
                new Project(
                        "tma-tourist",
                        "TMA Tourist Website",
                        "Designed and built a basic corporate website for TMA Tourist with responsive design and smooth animations.",
                        Arrays.asList("HTML5", "CSS3", "JavaScript"),
                        "http://tmatourist.com",
                        "/images/project3.jpg"
                ),
                new Project(
                        "flappy-bird",
                        "Flappy Bird Game",
                        "Developed a Flappy Bird–style game inspired by the original version, fully runnable on Raspberry Pi 4.",
                        Arrays.asList("C", "Raspberry Pi", "Game Development"),
                        "https://github.com/XwolveX",
                        "/images/project4.jpg"
                )
        );
    }

    public List<Skill> getAllSkills() {
        return Arrays.asList(
                new Skill("Programming Languages",
                        Arrays.asList("C / C++", "Java", "JavaScript", "Kotlin","Flutter", "Python", "SQL","HTML/CSS")),
                new Skill("Frameworks & Technologies",
                        Arrays.asList("Jetpack Compose", "Spring Boot","Websocket","java Swing" )),
                new Skill("Tools & Platforms",
                        Arrays.asList("Git/GitHub", "Firebase", "PostgreSQL", "Android Studio", "IntelliJ IDEA", "VS Code")),
                new Skill("AI-Assisted Development",
                        Arrays.asList("ChatGPT", "Claude", "Gemini"))
        );
    }

    public List<Experience> getAllExperiences() {
        return Arrays.asList(
                new Experience(
                        "Web Developer",
                        "TMA TOURIST",
                        "2 week contract",
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