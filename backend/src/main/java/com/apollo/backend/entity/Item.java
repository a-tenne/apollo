package com.apollo.backend.entity;

import com.apollo.backend.dto.ItemCreateDTO;
import com.apollo.backend.dto.ItemDTO;
import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String contents;
    @Column(nullable = false)
    private boolean completed;
    @Column(nullable = false, updatable = false)
    private LocalDate creationDate;

    public Item() {
    }

    public Item(Long id, String title, String contents, boolean completed, LocalDate creationDate) {
        this.id = id;
        this.title = title;
        this.contents = contents;
        this.completed = completed;
        this.creationDate = creationDate;
    }

    public void updateWithDTO(ItemDTO itemDTO) {
        this.title = itemDTO.getTitle();
        this.contents = itemDTO.getContents();
        this.completed = itemDTO.isCompleted();
    }

    public static Item from(ItemCreateDTO itemCreateDTO) {
        Item item = new Item();
        item.title = itemCreateDTO.getTitle();
        item.contents = itemCreateDTO.getContents();
        item.completed = false;
        item.creationDate = Instant.now().atZone(ZoneId.systemDefault()).toLocalDate();
        return item;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return completed == item.completed && Objects.equals(id, item.id) && Objects.equals(title, item.title) && Objects.equals(contents, item.contents) && Objects.equals(creationDate, item.creationDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, contents, completed, creationDate);
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", contents='" + contents + '\'' +
                ", completed=" + completed +
                ", creationDate=" + creationDate +
                '}';
    }

}
