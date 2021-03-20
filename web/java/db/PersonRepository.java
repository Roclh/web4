package db;

import beans.Person;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Optional;

@Stateless
@Transactional
public class PersonRepository {

    @PersistenceContext(unitName = "default")
    private EntityManager entityManager;

    public void save(Person person) {
        entityManager.persist(person);
        entityManager.flush();
    }

    public Optional<Person> findByUsername(String username) {
        Person person = entityManager.find(Person.class, username);
        return Optional.ofNullable(person);
    }

    public boolean checkIfUserExists(String username) {
        return findByUsername(username).isPresent();
    }
}
