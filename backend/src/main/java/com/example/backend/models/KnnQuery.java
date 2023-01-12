package com.example.backend.models;

public class KnnQuery {
    private int trajectoryId;

    public int getTrajectoryId() {
        return trajectoryId;
    }

    public void setTrajectoryId(int trajectoryId) {
        this.trajectoryId = trajectoryId;
    }

    public int getKnnValue() {
        return knnValue;
    }

    public void setKnnValue(int knnValue) {
        this.knnValue = knnValue;
    }

    private int knnValue;
}
