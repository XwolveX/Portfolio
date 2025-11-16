package dinhlam2901.portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Experience {
    private String title;
    private String company;
    private String period;
    private List<String> responsibilities;
}