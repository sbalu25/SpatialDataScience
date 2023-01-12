import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Deck, MapView} from '@deck.gl/core';
import {ScatterplotLayer, LineLayer, GeoJsonLayer} from '@deck.gl/layers';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  title = 'front-end';
  inputForm = new FormGroup({
    inputPath: new FormControl("", Validators.required),
  })
  showLayers : boolean = false;
  spatialRangeForm = new FormGroup({
    minLatitude: new FormControl("", Validators.required),
    maxLatitude : new FormControl("", Validators.required),
    minLongitude: new FormControl("", Validators.required),
    maxLongitude: new FormControl("", Validators.required)
  })
  spatioTemporalRangeForm = new FormGroup({
    minLatitude: new FormControl("", Validators.required),
    maxLatitude : new FormControl("", Validators.required),
    minLongitude: new FormControl("", Validators.required),
    maxLongitude: new FormControl("", Validators.required),
    startTime: new FormControl("", Validators.required),
    endTime : new FormControl("", Validators.required)
  })
  knnForm = new FormGroup({
    trajectoryId: new FormControl("", Validators.required),
    kValue : new FormControl("", Validators.required)
  })
  jsonData: any;
  dataLoaded: boolean = false;

  constructor(private appService: AppService, private router: Router){
    
    
  }
  getData(){
    
  }
  ngOnInit(){
  }
  getTrajectories(){
    this.dataLoaded=true;
    console.log(this.jsonData);
    let request={
      inputPath:this.jsonData?.name,
      spatialRange:{
        minLat:this.spatialRangeForm.get("minLatitude").value,
        maxLat:this.spatialRangeForm.get("maxLatitude").value,
        minLon:this.spatialRangeForm.get("minLongitude").value,
        maxLon:this.spatialRangeForm.get("maxLongitude").value
      },
      spatioTemporalRange:{
        minLat:this.spatioTemporalRangeForm.get("minLatitude").value,
        maxLat:this.spatioTemporalRangeForm.get("maxLatitude").value,
        minLon:this.spatioTemporalRangeForm.get("minLongitude").value,
        maxLon:this.spatioTemporalRangeForm.get("maxLongitude").value,
        startTime:this.spatioTemporalRangeForm.get("startTime").value,
        endTime:this.spatioTemporalRangeForm.get("endTime").value
      },
      knnQuery:{
        trajectoryId:this.knnForm.get("trajectoryId").value,
        kValue:this.knnForm.get("kValue").value
      }
    }
    console.log(this.inputForm.get("inputPath").value)
    this.appService.getTrajectories(request).subscribe((data)=>{
        this.showLayers = true;
        this.dataLoaded = false;
        this.router.navigateByUrl('knnmap')
        console.log(data)

    })
  }
  getPath(event){
    let fileReader = new FileReader();
    // fileReader.onload = (e) => {
    //   this.jsonData = fileReader.result.toString();
    // }
    fileReader.readAsText(event.target.files[0])
    this.jsonData = event.target.files[0]
    // console.log(event.target.files[0])
  }
}
