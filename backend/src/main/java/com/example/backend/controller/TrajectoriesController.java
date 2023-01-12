package com.example.backend.controller;

import com.example.backend.models.TrajectoryRequest;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.spark.launcher.SparkLauncher;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("trajectories")
public class TrajectoriesController {
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/list")
    public ResponseEntity<String> getTrajectories(@RequestBody @NotNull TrajectoryRequest trajectoryRequest) throws IOException, InterruptedException {
        System.out.println(trajectoryRequest.toString());
        System.out.println(trajectoryRequest.getInputPath());
        String input_path = "C:\\Users\\sandh\\Desktop\\SpatialDataScience\\Project\\backend\\src\\assets\\" + trajectoryRequest.getInputPath();
        SparkLauncher launcher = new SparkLauncher();
        if(String.valueOf(trajectoryRequest.getSpatioTemporalRange().getMaxLat()).equals("")){

        }
        launcher.setAppResource("C:\\Users\\sandh\\Downloads\\SDSE-Phase-1\\SDSE-Phase-1\\target\\scala-2.12\\SDSE-Phase-1-assembly-0.1.jar").addAppArgs("C:\\Users\\sandh\\Desktop\\SpatialDataScience\\Project\\front-end\\src\\assets","get-spatial-range", String.valueOf(trajectoryRequest.getSpatialRange().getMinLat()), String.valueOf(trajectoryRequest.getSpatialRange().getMinLon()), String.valueOf(trajectoryRequest.getSpatialRange().getMaxLat()), String.valueOf(trajectoryRequest.getSpatialRange().getMaxLon()),  "get-spatiotemporal-range", String.valueOf(trajectoryRequest.getSpatioTemporalRange().getStartTime()), String.valueOf(trajectoryRequest.getSpatioTemporalRange().getEndTime()), String.valueOf(trajectoryRequest.getSpatioTemporalRange().getMinLat()), String.valueOf(trajectoryRequest.getSpatioTemporalRange().getMinLon()),
        String.valueOf(trajectoryRequest.getSpatioTemporalRange().getMaxLat()), String.valueOf(trajectoryRequest.getSpatioTemporalRange().getMaxLon()), "get-knn", String.valueOf(trajectoryRequest.getKnnQuery().getTrajectoryId()), String.valueOf(trajectoryRequest.getKnnQuery().getKnnValue())
);
        System.out.println("Launching process");
        Process process = launcher.launch();
        System.out.println("Process launched");
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line;
        while ((line = reader.readLine()) != null)
            System.out.println("tasklist: " + line);
//        process.waitFor();
        int exitCode = process.waitFor();

        System.out.println("Finished! Exit code is "  + exitCode);
        return new ResponseEntity<String>("Success",HttpStatus.OK);
    }
}
