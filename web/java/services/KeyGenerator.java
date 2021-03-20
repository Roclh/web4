package services;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

public class KeyGenerator {
    private final Key key;

    public KeyGenerator(String keyword){
        this(keyword, "HmacSHA512");
    }

    public KeyGenerator(String keyword, String algorithm){
        key = new SecretKeySpec(keyword.getBytes(), 0, keyword.getBytes().length, algorithm);
    }

    public Key generate(){
        return key;
    }
}
