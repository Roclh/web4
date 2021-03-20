package services;

import beans.Point;
import beans.Person;
import db.PointRepository;
import db.PersonRepository;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

@Stateless
@Transactional
public class PointService {
    @EJB
    private PointRepository pointRepository;
    @EJB
    private PersonRepository personRepository;

    public Person loadUser(@NotNull String username){
        Optional<Person> optionalUser = personRepository.findByUsername(username);
        return optionalUser.orElse(null);
    }

    public void add(@NotNull Point point, @NotNull String username){
        pointRepository.save(point, username);
    }

    public void clear(@NotNull String username) {
        pointRepository.clear(username);
    }

    public List<Point> getAllByOwnerUsername(@NotNull String username) {
        return pointRepository.findAllByOwner(username);
    }

    public String getAllJSON(@NotNull String username) {
        List<Point> points = getAllByOwnerUsername(username);
        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        for (Point point : points) {
            arrayBuilder.add(point.toJSONObject());
        }
        return arrayBuilder.build().toString();
    }
}
