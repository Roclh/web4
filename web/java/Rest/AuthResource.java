package Rest;

import Rest.Credentials;
import services.AuthResult;
import services.AuthService;

import javax.annotation.security.PermitAll;
import javax.ejb.EJB;
import javax.json.Json;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import static javax.ws.rs.core.Response.Status.FORBIDDEN;

@Path("/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthResource {
    @EJB
    private AuthService authService;

    @POST
    @PermitAll
    @Path("/login")
    public Response login(@NotNull(message = "MISSING_CREDENTIALS") @Valid Credentials credentials) {
        AuthResult result = authService.login(credentials.getUsername(), credentials.getPassword());
        if (result.isSuccessful()) {
            return Response.ok(tokenJSON(result.getToken())).build();
        } else {
            return Response.status(FORBIDDEN).entity(result.getErrorMessage()).build();
        }
    }

    @POST
    @PermitAll
    @Path("/register")
    public Response register(@NotNull(message = "MISSING_CREDENTIALS") @Valid Credentials credentials) {
        AuthResult result = authService.register(credentials.getUsername(), credentials.getPassword());
        if (result.isSuccessful()) {
            return Response.ok(tokenJSON(result.getToken())).build();
        } else {
            return Response.status(FORBIDDEN).entity(result.getErrorMessage()).build();
        }
    }

    private String tokenJSON(String token) {
        return Json.createObjectBuilder().add("token", token).build().toString();
    }
}
