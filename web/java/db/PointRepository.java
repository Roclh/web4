package db;

import beans.Person;
import beans.Point;
import services.PointService;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Stateless
@Transactional
public class PointRepository {
    @PersistenceContext(unitName = "default")
    private EntityManager entityManager;
    @EJB
    private PointService pointService;

    public void save(Person person) {
        entityManager.persist(person);
        entityManager.flush();
    }

    public void save(Point point, String username){
        Person person = pointService.loadUser(username);
        point.setOwner(person);
        entityManager.persist(point);
        entityManager.flush();
    }

    public List<Point> findAllByOwner(Person owner) {
        String query = "select Point from Point point where Point.owner = :owner";
        return entityManager.createQuery(query, Point.class).setParameter("owner", owner).getResultList();
    }

    public List<Point> findAllByOwner(String login) {
        return entityManager.createQuery("select point from Point point where point.owner.login = :login", Point.class)
                .setParameter("login", login)
                .getResultList();
    }

    public void clear(String login) {
        entityManager.createQuery("delete from Point point where point.owner.login = :login")
                .setParameter("login", login)
                .executeUpdate();
    }
}
