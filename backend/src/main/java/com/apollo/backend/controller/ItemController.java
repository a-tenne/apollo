package com.apollo.backend.controller;

import com.apollo.backend.dto.ItemCreateDTO;
import com.apollo.backend.dto.ItemDTO;
import com.apollo.backend.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Controller
public class ItemController {
    @Autowired
    private ItemService itemService;

    @GetMapping("/api/v1/items")
    public ResponseEntity<List<ItemDTO>> findAll() {
        return ResponseEntity.ok().body(itemService.findAll());
    }

    @GetMapping("/api/v1/items/{id}")
    public ResponseEntity<ItemDTO> findById(@PathVariable Long id) {
        return itemService.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/api/v1/items")
    public ResponseEntity<ItemDTO> save(@RequestBody ItemCreateDTO item) {
        ItemDTO saved = itemService.save(item);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getId())
                .toUri();
        return ResponseEntity.created(location).body(saved);
    }

    @PutMapping("/api/v1/items")
    public ResponseEntity<ItemDTO> update(@RequestBody ItemDTO item) {
        return itemService.update(item).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/api/v1/items/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (itemService.deleteById(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
