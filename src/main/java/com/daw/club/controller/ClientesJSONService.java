package com.daw.club.controller;

import com.daw.club.model.Cliente;
import com.daw.club.model.dao.ClienteDAO;
import com.daw.club.model.dao.qualifiers.DAOList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Clientes JSON REST Web Service
 *
 * @author jrbalsas
 */
@Path("clientes")
@Produces(MediaType.APPLICATION_JSON+";charset=utf-8")

@RequestScoped 
public class ClientesJSONService {

    @Context
    private UriInfo context;

    @Inject     @DAOList
    ClienteDAO clienteDAO;

    public ClientesJSONService() {
    }

    @GET
    public List<Cliente> getClientes() {
        return clienteDAO.buscaTodos();
    }

    @GET
    @Path("/{id}")
    public Cliente getCliente(@PathParam("id") int id) {
        return clienteDAO.buscaId(id);
    }

    @DELETE
    @Path("/{id}")
    public Response borraCliente(@PathParam("id") int id) {
        Response response;
        
        if (clienteDAO.borra(id)==true) {
            response= Response.ok(id).build();
        } else {
            Map<String,String> err=new HashMap<>(); //Error messages
            err.put("error", "El cliente no existe");
            response=Response.status(Response.Status.BAD_REQUEST).entity(err).build();
        }
        
        return response;        
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response creaCliente(@Valid Cliente c) {
        Response response;
        if (clienteDAO.crea(c)==true) {
            response= Response.ok(c).build();
        } else {
            Map<String,Object> err=new HashMap<>(); //Error messages
            err.put("error", "No se ha podido crear el cliente");
            err.put("cliente", c);
            response=Response.status(Response.Status.BAD_REQUEST).entity(err).build();
        }
        return response;
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response modificaCliente(@Valid Cliente c, @PathParam("id") Integer id) {
        Response response;
        c.setId(id);
        if (clienteDAO.guarda(c)) {
            response= Response.ok(c).build();
        } else {
            Map<String,Object> err=new HashMap<>(); //Error messages
            err.put("error", "No se ha podido modificar el cliente");
            err.put("cliente", c);
            response=Response.status(Response.Status.BAD_REQUEST).entity(err).build();
        }
        return response;
    }
}
