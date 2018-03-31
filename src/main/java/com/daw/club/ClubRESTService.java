package com.daw.club;

import javax.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;

/**
 *
 * @author jrbalsas
 */
@ApplicationPath("webservice")  //  Service URL: /webservice/*
public class ClubRESTService extends ResourceConfig {

    public ClubRESTService() {
        super();
        //Configure JAX-RS implementation for sending BeanValidation messages
        property("jersey.config.beanValidation.enableOutputValidationErrorEntity.server", true);
    }
    
}
