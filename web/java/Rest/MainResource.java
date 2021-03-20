package Rest;

import beans.Point;
import Rest.filters.Authorized;
import Rest.PointJSON;
import services.PointService;

import javax.ejb.EJB;
import javax.json.Json;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/points")
@Authorized
@Produces(MediaType.APPLICATION_JSON)
public class MainResource {
    @EJB
    private PointService hitService;

    @GET
    public Response getHitsData(@Context HttpHeaders headers) {
        String username = headers.getHeaderString("username");
        return Response.ok(hitService.getAllJSON(username)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addHit(@Context HttpHeaders headers, @Valid PointJSON pointJSON) {
        String username = headers.getHeaderString("username");
        Point hit = new Point(pointJSON.getX(), pointJSON.getY().floatValue(), pointJSON.getR());
        hitService.add(hit, username);
        return Response.ok(jsonMessage("point added (owner is " + username + ")")).build();
    }

    @DELETE
    public Response clear(@Context HttpHeaders headers) {
        String username = headers.getHeaderString("username");
        hitService.clear(username);
        return Response.ok().build();
    }

    private String jsonMessage(String message) {
        return Json.createObjectBuilder().add("message", message).build().toString();
    }


}
