package db;

import beans.Person;
import beans.Point;

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

    public void save(Person person) {
        entityManager.persist(person);
        entityManager.flush();
    }

    public List<Point> findAllByOwner(Person owner) {
        String query = "select Point from Point point where Point.owner = :owner";
        return entityManager.createQuery(query, Point.class).setParameter("owner", owner).getResultList();
    }
}
