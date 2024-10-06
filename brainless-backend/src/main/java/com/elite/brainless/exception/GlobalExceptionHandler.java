package com.elite.brainless.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        
        // Coletando todos os erros de validação
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        // Retornando os erros de uma maneira mais limpa
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MultipleErrorsException.class)
    public ResponseEntity<Map<String, String>> handleMultipleErrors(MultipleErrorsException ex) {
        MyErrorResponse errorResponse = new MyErrorResponse();
        
        // Adiciona todos os erros ao ErrorResponse
        for (Map.Entry<String, String> entry : ex.getErrors().entrySet()) {
            errorResponse.addError(entry.getKey(), entry.getValue());
        }

        return new ResponseEntity<>(errorResponse.getErrors(), HttpStatus.BAD_REQUEST);
    }

}
