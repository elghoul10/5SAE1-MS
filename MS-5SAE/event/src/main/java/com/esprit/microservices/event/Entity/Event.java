package com.esprit.microservices.event.Entity;






import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Event implements Serializable {
    private static final long serialVersionUID = 6;

    @Id
    @GeneratedValue
    private Long id;

    private String eventCode;
    private String type;
    private String description;
    private LocalDateTime timestamp;
    private String status;
    private Long chauffeurId;
    private Long orderTransportId;
    private String location;
    private String impactLevel;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;



    public Event() {}

    public Event(String eventCode, String type, String description, LocalDateTime timestamp, String status, Long chauffeurId, Long orderTransportId, String location, String impactLevel, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.eventCode = eventCode;
        this.type = type;
        this.description = description;
        this.timestamp = timestamp;
        this.status = status;
        this.chauffeurId = chauffeurId;
        this.orderTransportId = orderTransportId;
        this.location = location;
        this.impactLevel = impactLevel;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventCode() {
        return eventCode;
    }

    public void setEventCode(String eventCode) {
        this.eventCode = eventCode;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getChauffeurId() {
        return chauffeurId;
    }

    public void setChauffeurId(Long chauffeurId) {
        this.chauffeurId = chauffeurId;
    }

    public Long getOrderTransportId() {
        return orderTransportId;
    }

    public void setOrderTransportId(Long orderTransportId) {
        this.orderTransportId = orderTransportId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImpactLevel() {
        return impactLevel;
    }

    public void setImpactLevel(String impactLevel) {
        this.impactLevel = impactLevel;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
