package services;

import beans.Person;
import db.PersonRepository;
import enums.ResponseMessage;
import org.apache.commons.codec.digest.DigestUtils;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.validation.constraints.NotNull;
import java.util.Optional;

@Stateless
public class AuthService {
    @EJB
    private PersonRepository persons;
    @EJB
    private TokenService tokenService;


    public AuthResult login(@NotNull String username, @NotNull String password) {
        Optional<Person> optionalPerson = persons.findByUsername(username);
        if (optionalPerson.isPresent()) {
            if (optionalPerson.get().getPassword().equals(encode(password))) {
                return AuthResult.token(tokenService.generate(username));
            } else {
                return AuthResult.message(ResponseMessage.WRONG_PASSWORD);
            }
        } else {
            return AuthResult.message(ResponseMessage.PERSON_NOT_FOUND);
        }
    }

    public AuthResult register(@NotNull String username, @NotNull String password) {
        if (persons.checkIfUserExists(username)) {
            return AuthResult.message(ResponseMessage.USER_ALREADY_EXISTS);
        } else {
            persons.save(new Person(username, encode(password)));
            return AuthResult.token(tokenService.generate(username));
        }
    }

    public Optional<String> getUsernameByToken(String token) {
        return tokenService.verify(token);
    }

    private String encode(String s) {
        return DigestUtils.sha256Hex(s);
    }

}
