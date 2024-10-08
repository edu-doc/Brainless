package com.elite.brainless.exception;

import java.util.HashMap;
import java.util.Map;

public class MyErrorResponse {
    private Map<String, String> errors;

    // Construtor público
    public MyErrorResponse() {
        this.errors = new HashMap<>();
    }

    public void addError(String field, String message) {
        errors.put(field, message);
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}
