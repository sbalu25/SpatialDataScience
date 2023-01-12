import pydeck as pdk
import pandas as pd
from pathlib import Path
from flask import Flask, request, jsonify, make_response, send_file
from flask_cors import CORS
app = Flask(__name__)
CORS(app)




def getJsonPath(folder):
    for path in Path(folder).rglob('*.json'):
        return path

def getLayers(datafile):
    layers = []
    with open(datafile) as fp:
        for line in fp:
            df = pd.read_json(line)
            minimum_timestamp = df['timestamp'].min().timestamp()

            new_df = pd.DataFrame()
            new_df["coordinates"] = [[[location[1], location[0]] for location in df["location"]]]
            new_df["timestamps"] = [[int(timestamp.timestamp() - minimum_timestamp) for timestamp in df["timestamp"]]]
            print(new_df)

            layers.append(pdk.Layer(
                "TripsLayer",
                new_df,
                get_path="coordinates",
                get_timestamps="timestamps",
                get_color=[253, 128, 93],
                opacity=0.8,
                width_min_pixels=5,
                rounded=True,
                trail_length=600,
                current_time=500,
            ))

    return layers

@app.route('/', methods=['GET'])
def index():
    return send_file('index.html')


@app.route('/plot', methods=['POST'])
def plot():
    spatial_range_data_path = getJsonPath("C:\\Users\\sandh\\Desktop\\SpatialDataScience\\Project\\front-end\\src\\assets\\get-spatial-range")
    spatiotemporal_range_data_path = getJsonPath("C:\\Users\\sandh\\Desktop\\SpatialDataScience\\Project\\front-end\\src\\assets\\get-spatiotemporal-range")
    knn_data_path = getJsonPath("C:\\Users\\sandh\\Desktop\\SpatialDataScience\\Project\\front-end\\src\\assets\\get-knn")

    layers = []
    if spatiotemporal_range_data_path:
        layers += getLayers(spatiotemporal_range_data_path)
    if spatial_range_data_path:
        layers += getLayers(spatial_range_data_path)
    if knn_data_path:
        layers += getLayers(knn_data_path)
    view_state = pdk.ViewState(latitude=33.414291502635706, longitude=-111.92518396810091, zoom=15, bearing=0, pitch=45)
    r = pdk.Deck(layers=layers, initial_view_state=view_state)
    # Render
    html_render = r.to_html(as_string=True)
    response = make_response(jsonify({"html": html_render}), 201)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == '__main__':
       app.run("localhost", port=4201, debug = True)