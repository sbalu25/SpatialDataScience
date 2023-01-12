package com.example.backend.models;

public class TrajectoryRequest {
    public String getInputPath() {
        return inputPath;
    }

    public void setInputPath(String inputPath) {
        this.inputPath = inputPath;
    }

    public spatialRangeRequest getSpatialRange() {
        return spatialRange;
    }

    public void setSpatialRange(spatialRangeRequest spatialRange) {
        this.spatialRange = spatialRange;
    }

    public spatioTemporalRequest getSpatioTemporalRange() {
        return spatioTemporalRange;
    }

    public void setSpatioTemporalRange(spatioTemporalRequest spatioTemporalRange) {
        this.spatioTemporalRange = spatioTemporalRange;
    }

    private String inputPath;
    private spatialRangeRequest spatialRange;
    private spatioTemporalRequest spatioTemporalRange;

    public KnnQuery getKnnQuery() {
        return knnQuery;
    }

    public void setKnnQuery(KnnQuery knnQuery) {
        this.knnQuery = knnQuery;
    }

    private KnnQuery knnQuery;
}
