import dateutil.parser
import requests

from datetime import datetime
from flask import Flask, render_template, url_for

# API DOCS
# graffiti removal
# https://dev.socrata.com/foundry/data.cityofchicago.org/cdmx-wzbz
# abandoned vehicles
# https://dev.socrata.com/foundry/data.cityofchicago.org/suj7-cg3j
# rodent baiting
# https://dev.socrata.com/foundry/data.cityofchicago.org/dvua-vftq
# potholes
# https://dev.socrata.com/foundry/data.cityofchicago.org/787j-mys9
potholes = 'https://data.cityofchicago.org/resource/787j-mys9.json?$limit=1000'


app = Flask(__name__)
app.config['SERVER_NAME'] = 'localhost:5000'
app.config['DEBUG'] = True

with app.app_context():
    url_for('static', filename='style.css')

def seconds_to_completion(startDate, endDate):
    startDate = dateutil.parser.parse(startDate)
    if endDate:
        endDate = dateutil.parser.parse(endDate)
        return (endDate - startDate).total_seconds()
    else:
        returnVal = (datetime.now() - startDate).total_seconds()
        return f'incomplete-{returnVal}'


@app.route('/')
def index():
    response = requests.get(potholes)
    if response.status_code == 200:
        response_data = response.json()
        response_data = [
            {
                'coordinates': [float(point.get('longitude')) if point.get('longitude') else 0, float(point.get('latitude')) if point.get('latitude') else 0],
                'seconds_to_completion': seconds_to_completion(point.get('creation_date'), point.get('completion_date')),
            }
            for point in response_data]
    return render_template('index.html', apiData=response_data)


if __name__ == "__main__":
    app.run()