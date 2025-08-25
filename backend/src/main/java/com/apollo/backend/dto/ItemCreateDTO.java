package com.apollo.backend.dto;

import java.io.Serial;
import java.io.Serializable;

public class ItemCreateDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 2L;

    private String title;
    private String contents;

    public ItemCreateDTO(String title, String contents) {
        this.title = title;
        this.contents = contents;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }
}
