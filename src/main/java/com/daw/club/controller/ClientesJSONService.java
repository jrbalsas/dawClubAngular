package com.daw.club.controller;

import com.daw.club.model.Cliente;
import com.daw.club.model.dao.ClienteDAO;
import com.daw.club.model.dao.qualifiers.DAOList;
import java.util.List;
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
@RequestScoped 
public class ClientesJSONService {

    @Context
    private UriInfo context;

    @Inject     @DAOList
    ClienteDAO clienteDAO;

    public ClientesJSONService() {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Cliente> getClientes() {
        return clienteDAO.buscaTodos();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Cliente getCliente(@PathParam("id") int id) {
        return clienteDAO.buscaId(id);
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response borraCliente(@PathParam("id") int id) {
        Response response;
        
        if (clienteDAO.borra(id)==true) {
            response= Response.ok(id).build();
        } else {
            response=Response.notModified().build();
        }
        
        return response;        
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response creaCliente(@Valid Cliente c) {
        Response r;
        if (clienteDAO.crea(c)==true) {
            r= Response.ok(c).build();
        } else {
            r=Response.notModified().build();
        }
        return r;
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response modificaCliente(@Valid Cliente c) {
        Response r;
        if (clienteDAO.guarda(c)) {
            r= Response.ok(c).build();
        } else {
            r=Response.notModified().build();
        }
        return r;
    }
}
