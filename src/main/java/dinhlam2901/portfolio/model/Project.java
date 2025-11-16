package dinhlam2901.portfolio.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    private String id;
    private String title;
    private String description;
    private List<String> technologies;
    private String link;
    private String imageUrl;
}
