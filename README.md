# SpatialDataScience
Objective of the project is given a trajectory dataset and inputs for range queries from a front end application a spark application is run through a backend api and generates the output data which is used by the front end interface to display the trips layer.
 Project Implementation is divided into 4 layers
 * Front end: User Interface of the application is implemented using Angular Framework consists of taking query inputs from the user and displaying the trips layer to the user. 
 <img width="416" alt="image" src="https://user-images.githubusercontent.com/60153091/212195468-33d6c69b-c461-4021-9e2c-7f2ba2e1d4eb.png">

Spatial Range Query takes four inputs maximum and minimum latitudes, longitudes. Spatio Temporal Range Query takes six inputs maximum and minimum latitudes, longitudes, timestamp. KNN Query takes two inputs trajectory Id and k nearest neighbor value. The above screenshot is an example of how the inputs for queries can be entered Once the user inputs data for any query and requests for displaying the trips layer, a user interface for that query is displayed to the user. An example of how the trips layer is displayed to the user is as below:
<img width="307" alt="image" src="https://user-images.githubusercontent.com/60153091/212195698-0a1383b6-c9cb-4014-90e4-415e91dc45a7.png">

* Backend API
API of the application is implemented using Spring Framework. Once the user clicks request to display the trips layer a REST api request is made to the Spring Framework and the Spring runs the spark submit by taking the parameters from the REST API which are enter in the front end, jar file generated by the spark application and generates files in the path mentioned. Once the spark-submit is run from Spring application, it displays the log in the console which can be used to track any errors or progress of the spark-submit.
* Visualization Layer
A Rest API is implemented in python which takes the files generated in previous step of spark submission and with the use of pydeck a plot is created by taking latitudes, longitudes and timestamps from the files. Below is an example of how trips layer plot is generated using pydeck. Configuration of trips layer such as width, trail_length can be mentioned while creating the plot. Response of pydeck api is a html which can be embedded in an iframe in the front end to display the maps layer.
<img width="368" alt="image" src="https://user-images.githubusercontent.com/60153091/212196055-34c7129c-eebe-49cc-a1ad-75d5e785a20b.png">

