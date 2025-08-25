package com.apollo.backend.dto;

import com.apollo.backend.entity.Item;

import java.io.Serial;
import java.io.Serializable;


public class ItemDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String title;
    private String contents;
    private boolean completed;
    private String creationDate;

    private ItemDTO(Long id, String title, String contents, boolean completed, String creationDate) {
        this.id = id;
        this.title = title;
        this.contents = contents;
        this.completed = completed;
        this.creationDate = creationDate;
    }

    public static ItemDTO from(Item item) {
        return new ItemDTO(item.getId(), item.getTitle(), item.getContents(), item.isCompleted(), item.getCreationDate().toString());
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
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
}
