package com.apollo.backend.service;

import com.apollo.backend.dto.ItemCreateDTO;
import com.apollo.backend.dto.ItemDTO;
import com.apollo.backend.entity.Item;
import com.apollo.backend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    public List<ItemDTO> findAll() {
        return itemRepository.findAll().stream().map(ItemDTO::from).toList();
    }
    public Optional<ItemDTO>findById(Long id) {
        return itemRepository.findById(id).map(ItemDTO::from);
    }

    public ItemDTO save(ItemCreateDTO item) {
        Item toSave = Item.from(item);
        Item saved = itemRepository.save(toSave);
        return ItemDTO.from(saved);
    }

    public Optional<ItemDTO> update(ItemDTO itemDTO) {
        return itemRepository.findById(itemDTO.getId()).map(item -> {
            item.updateWithDTO(itemDTO);
            Item saved = itemRepository.save(item);
            return ItemDTO.from(saved);
        });
    }

    public boolean deleteById(Long id) {
        boolean exists = itemRepository.existsById(id);
        if (!exists) {
            return false;
        }
        itemRepository.deleteById(id);
        return !itemRepository.existsById(id);
    }
}
