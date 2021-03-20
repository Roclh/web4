package beans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name = "persons")
public class Person implements Serializable {
  @Id
  @Column(name = "username", unique = true, nullable = false)
  private String login;
  @Column(name = "password")
  private String password;

  @OneToMany(mappedBy = "owner")
  private List<Point> personPoints;

  public Person(String login, String password){
    this.login = login;
    this.password = password;
  }

  public Person() {

  }

  public String getPassword() {
    return this.password;
  }

    public String getLogin() {
      return this.login;
    }
}
