package com.daw.club.controller;

import com.daw.club.Util;
import com.daw.club.model.Cliente;
import com.daw.club.model.dao.ClienteDAO;
import com.daw.club.model.dao.ClienteDAOJDBC;
import com.daw.club.model.dao.ClienteDAOList;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/clientesjson/*")
public class ClientesJSONController extends HttpServlet {
    
    private ClienteDAO clienteDAO;
    
    @Override
    public void init() throws ServletException {
        super.init();
        //clienteDAO=new ClienteDAOJDBC();
        clienteDAO=new ClienteDAOList();
    }
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        request.setCharacterEncoding("UTF-8");
        response.setHeader("Expires","0"); //Avoid browser caching response

    }   

    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        String action=(request.getPathInfo()!=null?request.getPathInfo():"");
        String jsonOut="{\"errMsg\": \"Operacion no soportada\"}";
        Map<String,String> err=new HashMap<>(); //Error messages
        switch (action) {
            case "/busca": { //OBTIENE UN CLIENTE
                    int id=Integer.parseInt(request.getParameter("id"));
                    Cliente c = clienteDAO.buscaId(id);
                    jsonOut=clienteToJSON(c).toString();
                    break;
            }       
            case "/borra": {//BORRAR CLIENTE
                    int id=Integer.parseInt(Util.getParam(request.getParameter("id"),"0"));
                    if (id>0) {
                        clienteDAO.borra(id);
                    }       
                    break;
            }
            default:
                //LISTAR TODOS LOS CLIENTES
                List<Cliente> lc = clienteDAO.buscaTodos();
                jsonOut=clientesToJSON(lc).toString();
                break;
        }
        //Return jsonOut code 
        try (PrintWriter writer = response.getWriter()) {
            writer.print(jsonOut);
        }
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        String action=(request.getPathInfo()!=null?request.getPathInfo():"");
        String jsonOut="{\"errMsg\": \"Operacion no soportada\"}";
        Map<String,String> err=new HashMap<>(); //Error messages

        switch (action) {
            case "/crea": {//ALTA DE UN CLIENTE
                    Cliente c = new Cliente();
                    if (validarCliente(request,c,err)) {
                        clienteDAO.crea(c); //Create new client
                        //Return primary key
                        jsonOut=clienteToJSON(c).toString();
                    } else {
                        jsonOut=errToJSON(err).toString();
                    }
                    break;
            }
            case "/guarda": { //EDICION DE UN CLIENTE
                    Cliente c=new Cliente();
                    if (request.getParameter("id")!=null) {
                        if (validarCliente(request,c,err)) {
                            //Guardar Cliente
                            clienteDAO.guarda(c);
                        } else {
                            jsonOut=errToJSON(err).toString();
                        }
                    } else {
                        jsonOut="{\"errMsg\": \"Falta el id del cliente\"}";
                    }   
                    break;
            }
        }
        //Return jsonOut code 
        try (PrintWriter writer = response.getWriter()) {
            writer.print(jsonOut);
        }

    }

    
    /**Recopilar datos de un formulario de cliente y generar mensajes de error*/
    private boolean validarCliente(HttpServletRequest request, Cliente c, Map<String,String> err) {
        boolean valido=true;
        //Capturamos y convertimos datos
        int id=Integer.parseInt(Util.getParam(request.getParameter("id"),"0"));
        String nombre=Util.getParam(request.getParameter("nombre"),"");
        String dni=Util.getParam(request.getParameter("dni"),"");
        boolean socio=Util.getParamBool(request.getParameter("socio"));
        //Asignamos datos al bean
        c.setId(id);
        c.setNombre(nombre);
        c.setDni(dni);
        c.setSocio(socio);
        //Validamos Datos
        if (nombre.length()<3 || nombre.length()>50) {
            err.put("errNombre", "La longitud del nombre no es válida");
            valido=false;
        }
        if (!dni.matches("^\\d{7,8}(-?[a-zA-Z{1}])?$")) {
            err.put("errDni", "El DNI no es válido");
            valido=false;
        }
        if (!valido) { 
            err.put("err","Los datos no son válidos");
        }
        return valido;
    }

    //GENERATE JSON OUTPUT
    
    /**Mapping client to JSON*/
    private JsonObject clienteToJSON (Cliente c) {
        JsonObject cliJson = Json.createObjectBuilder()
                .add("id",c.getId())
                .add("nombre", c.getNombre())
                .add("dni", c.getDni())
                .add("socio", c.isSocio())
                .build();
        return cliJson;
    }
    /**Mapping List of Clientes to JSON Array*/
    private JsonArray clientesToJSON(List<Cliente> lc) {
        JsonArrayBuilder lcJson = Json.createArrayBuilder();

        for(Cliente c: lc) {
                lcJson.add(clienteToJSON(c));
        }
        return lcJson.build();
    }
    
    /**Mapping Err Map to JSON Object*/
    private JsonObject errToJSON(Map<String,String> err) {
        JsonObjectBuilder jbuilder = Json.createObjectBuilder();

        for(String errId: err.keySet()) {
            jbuilder.add(errId,err.get(errId));
        }
        return jbuilder.build();
    }
    
    
    
    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }
}
