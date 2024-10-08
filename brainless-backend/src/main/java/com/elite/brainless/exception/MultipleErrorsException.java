package com.elite.brainless.exception;

import java.util.HashMap;
import java.util.Map;

public class MultipleErrorsException extends RuntimeException {
    private Map<String, String> errors;

    public MultipleErrorsException() {
        this.errors = new HashMap<>();
    }

    public void addError(String field, String message) {
        errors.put(field, message);
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}
