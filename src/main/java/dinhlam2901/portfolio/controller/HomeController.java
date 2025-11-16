package dinhlam2901.portfolio.controller;

import dinhlam2901.portfolio.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @Autowired
    private PortfolioService portfolioService;

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("projects", portfolioService.getAllProjects());
        model.addAttribute("skills", portfolioService.getAllSkills());
        model.addAttribute("experiences", portfolioService.getAllExperiences());
        return "index";
    }
}