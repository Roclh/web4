package beans;

import lombok.Data;
import lombok.NoArgsConstructor;
import services.CheckPoint;

import javax.json.Json;
import javax.json.JsonObject;
import javax.persistence.*;

@Data
@Entity
@Table(name="points")
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "x", nullable = false)
    private int x;
    @Column(name = "y", nullable = false)
    private float y;
    @Column(name = "r", nullable = false)
    private int r;
    @Column(name="result", nullable = false)
    private boolean result;

    @ManyToOne
    @JoinColumn(name="owner", referencedColumnName = "username")
    private Person owner;

    public Point(int x, float y, int r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = CheckPoint.checkPoint(x ,y, r);
    }

    public Point() {

    }

    public JsonObject toJSONObject(){
        return Json.createObjectBuilder()
                .add("x", x)
                .add("y", y)
                .add("r", r)
                .add("result", result)
                .build();
    }

    public void setOwner(Person person) {
        this.owner = person;
    }
}
