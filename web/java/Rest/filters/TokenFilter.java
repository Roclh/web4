package Rest.filters;

import services.AuthService;

import javax.annotation.Priority;
import javax.ejb.EJB;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.util.Optional;

import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;
import static javax.ws.rs.core.Response.Status.FORBIDDEN;

@Authorized
@Priority(Priorities.AUTHENTICATION)
@Provider
public class TokenFilter implements ContainerRequestFilter {
    private static final String AUTHENTICATION_SCHEME = "Bearer";

    @EJB
    private AuthService authService;

    @Override
    public void filter(ContainerRequestContext containerRequestContext) {
        // get token from headers
        Optional<String> token = getTokenFromContext(containerRequestContext);

        // check if token is present
        if (!token.isPresent()) {
            containerRequestContext.abortWith(
                    Response.status(FORBIDDEN).entity("MISSING_AUTHORIZATION_TOKEN").build()
            );
            return;
        }

        // try to get username from token
        // validates token and returns username
        Optional<String> usernameByToken = authService.getUsernameByToken(token.get());

        // if token missing or bad, respond with FORBIDDEN
        if (!usernameByToken.isPresent()) {
            containerRequestContext.abortWith(
                    Response.status(FORBIDDEN).entity("INVALID_TOKEN").build()
            );
            return;
        }

        // put username to headers for further use
        containerRequestContext.getHeaders().add("username", usernameByToken.get());
    }

    private Optional<String> getTokenFromContext(@NotNull ContainerRequestContext containerRequestContext) {
        String authHeaderString = containerRequestContext.getHeaderString(AUTHORIZATION);
        return authHeaderString == null ?
                Optional.empty() : Optional.of(authHeaderString.substring(AUTHENTICATION_SCHEME.length()).trim());
    }
}
