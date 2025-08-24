package com.apollo.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PersonController {

    @GetMapping("/api/person")
    public List<Person> getPerson() {
        return List.of(new Person(1L,"Alex", 23), new Person(2L, "Test Person", 30));
    }

}