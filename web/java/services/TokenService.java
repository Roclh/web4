package services;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.JwtException;

import javax.ejb.Stateless;
import java.security.Key;
import java.util.Optional;

@Stateless
public class TokenService {
    private final Key key = new KeyGenerator("kolesnikov").generate();

    public String generate(String username) {
        return Jwts.builder()
                .setSubject(username)
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();
    }

    public Optional<String> verify(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token);
            return Optional.of(claimsJws.getBody().getSubject());
        } catch (JwtException e) {
            // validation failed
            System.out.println(e.getMessage());
            return Optional.empty();
        }
    }
}
