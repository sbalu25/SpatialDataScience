
import org.apache.log4j.{Level, Logger}
import org.apache.spark.sql.functions.{col,explode}
import org.apache.spark.sql.{DataFrame, SparkSession}
object ManageTrajectory {

  Logger.getLogger("org.spark_project").setLevel(Level.WARN)
  Logger.getLogger("org.apache").setLevel(Level.WARN)
  Logger.getLogger("akka").setLevel(Level.WARN)
  Logger.getLogger("com").setLevel(Level.WARN)


  def loadTrajectoryData(spark: SparkSession, filePath: String): DataFrame =
  {
    val sqlContext = new org.apache.spark.sql.SQLContext(spark.sparkContext)

    var df = sqlContext.read.option("multiline", "true").json(filePath)

    val sampledf = df.withColumn("trajectory", explode(df("trajectory")))
    df = sampledf
      .withColumn("location", sampledf("trajectory.location"))
      .withColumn("timestamp", sampledf("trajectory.timestamp"))
      .drop("trajectory")
      .withColumn("latitude", col("location").getItem(0))
      .withColumn("longitude", col("location").getItem(1))

    df.createOrReplaceTempView("trajectory")
    df = spark.sql("SELECT trajectory_id, vehicle_id,location,ST_POINT(latitude, longitude) AS point, timestamp FROM trajectory")
    df.show()
    df.printSchema()
    df
    // change the null to desired spark DataFrame object
  }


  def getSpatialRange(spark: SparkSession, dfTrajectory: DataFrame, latMin: Double, lonMin: Double, latMax: Double, lonMax: Double): DataFrame =
  {
    /* TO DO */
    //    Creating Spatial Range Data Table
    dfTrajectory.createOrReplaceTempView("Range_Data_Table")
    // Selecting trajectory id, vehicle id, timestamp as an array when the trajectory is within the polygon range
    val dataframe=spark.sql(s"SELECT trajectory_id,vehicle_id,collect_list(timestamp) as timestamp,collect_list(location) as location  FROM Range_Data_Table WHERE ST_Within(Range_Data_Table.point, ST_PolygonFromEnvelope($latMin,$lonMin,$latMax,$lonMax)) GROUP BY vehicle_id, trajectory_id")
    dataframe.createOrReplaceTempView("Spatial_Output_Table")
    val spatial_output_frame = spark.sql(s"SELECT trajectory_id,vehicle_id,timestamp,location FROM Spatial_Output_Table ")
    spatial_output_frame.show(truncate = false)
    spatial_output_frame
  }


  def getSpatioTemporalRange(spark: SparkSession, dfTrajectory: DataFrame, timeMin: Long, timeMax: Long, latMin: Double, lonMin: Double, latMax: Double, lonMax: Double): DataFrame =
  {
    /* TO DO */
    dfTrajectory.createOrReplaceTempView("Temporal_Data_Table")
//    Selecting trajectory id, vehicle id and timestamp array as timestamp from Temporal data table when the trajectory timestamp falls in the given timestamp range
    val dataframe = spark.sql(s"SELECT trajectory_id,vehicle_id,collect_list(timestamp) as timestamp,collect_list(location) as location FROM Temporal_Data_Table WHERE ST_Within(Temporal_Data_Table.point, ST_PolygonFromEnvelope($latMin,$lonMin,$latMax,$lonMax)) and Temporal_Data_Table.timestamp between $timeMin and $timeMax group by vehicle_id, trajectory_id")
    dataframe.createOrReplaceTempView("Temporal_Output_Table")
    val temporal_output_frame = spark.sql(s"SELECT trajectory_id,vehicle_id,timestamp,location FROM Temporal_Output_Table ")
    temporal_output_frame.show(numRows = 500, truncate = false)
    temporal_output_frame
  }


  def getKNNTrajectory(spark: SparkSession, dfTrajectory: DataFrame, trajectoryId: Long, neighbors: Int): DataFrame =
  {
    /* TO DO */
    dfTrajectory.createOrReplaceTempView("KNN_Data_Table")
    val trajectory_data_frame = spark.sql(s"SELECT trajectory_id, vehicle_id, location,point From KNN_Data_Table Where trajectory_id = $trajectoryId")
    trajectory_data_frame.createOrReplaceTempView("Trajectory_Data")
    val remaining_trajectory = spark.sql(s"SELECT trajectory_id, vehicle_id, location,point From KNN_Data_Table Where trajectory_id != $trajectoryId")
    remaining_trajectory.createOrReplaceTempView("Remaining_Trajectory_Data")
    val dataframe = spark.sql(s"SELECT point2.trajectory_id, ST_Distance(point1.point, point2.point) as distance FROM Trajectory_Data point1, Remaining_Trajectory_Data point2 ORDER BY distance asc")
    dataframe.createOrReplaceTempView("Result_Trajectory")
    val result_trajectory = spark.sql(s"SELECT trajectory_id, min(distance) as distance from Result_Trajectory GROUP BY trajectory_id ORDER BY distance asc")
    result_trajectory.createOrReplaceTempView("Output_Trajectory")
    val output_trajectory = spark.sql(s"SELECT trajectory_id from Output_Trajectory limit $neighbors")
    output_trajectory.show()
    output_trajectory
  }


}
