package dinhlam2901.portfolio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GameController {

    @GetMapping("/game/tetris")
    public String tetrisPage() {
        return "game";
    }
}