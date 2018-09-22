#flask dependencies
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

#sqlalchemy dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

#import pandas
import pandas as pd, json

def df_to_geojson(merged_df, properties, lat='lat', lon='lng'):
    
    
    geojson = {'type':'FeatureCollection', 'features':[]}

    # loop through each row in the dataframe and convert each row to geojson format
    for _, row in merged_df.iterrows():
        # create a feature template to fill in
        feature = {'type':'Feature',
                   'properties':{},
                   'geometry':{'type':'Point',
                               'coordinates':[]}}

        # fill in the coordinates
        feature['geometry']['coordinates'] = [row[lon],row[lat]]

        # for each column, get the value and add it as a new feature property
        for prop in properties:
            feature['properties'][prop] = row[prop]
        
        # add this feature (aka, converted dataframe row) to the list of features inside our dict
        geojson['features'].append(feature)
    
    return geojson
    
# Flask Setup
app = Flask(__name__)

# Database Setup
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/ski_resorts.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
ski_area = Base.classes.ski_area




@app.route('/data')
def data():
    #statement in connection, place holder..?
    stmt = db.session.query(ski_area).statement

    #convert to pandas
    df = pd.read_sql_query(stmt, db.session.bind)

    #convert data to floats
    df['lat'] = df['lat'].astype(float)
    df['lng'] = df['lng'].astype(float)

    useful_columns= ['name']

    geojson_dict = df_to_geojson(df, properties=useful_columns)
    geojson_str = json.dumps(geojson_dict, indent=2)

    return geojson_str
@app.route("/d_three")
def d_three():
    """This LOADS DDDDD 3"""
    
    return render_template("d3.html")
@app.route("/d_three_two")
def d_three_two():
    """This LOADS DDDDD 3"""
    
    return render_template("d3_2.html")
@app.route("/")
def index():
    """Return the homepage."""

    return render_template("index.html")



if __name__ == "__main__":
    app.run(debug=True)