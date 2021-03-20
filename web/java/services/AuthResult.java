package services;

import enums.ResponseMessage;
import lombok.Getter;

@Getter
public class AuthResult {
    private final ResponseMessage errorMessage;
    private final String token;
    private final boolean successful;

    public AuthResult(ResponseMessage errorMessage, String token, boolean successful) {
        this.errorMessage = errorMessage;
        this.token = token;
        this.successful = successful;
    }

    public boolean isSuccessful() {
        return successful;
    }

    public static AuthResult message(ResponseMessage message) {
        return new AuthResult(message, null, false);
    }

    public static AuthResult token(String token) {
        return new AuthResult(null, token, true);
    }

    public ResponseMessage getErrorMessage() {
        return errorMessage;
    }

    public String getToken() {
        return token;
    }
}
