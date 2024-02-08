from flask import jsonify, request, Flask, make_response, abort
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config["DEBUG"] = True

CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}}, max_age=86400)

all_heros = [
     { 'id': 11, 'name': 'Dr Nice'},
    { 'id': 12, 'name': 'Narco'},
    { 'id': 13, 'name': 'Bombasto'},
    { 'id': 14, 'name': 'Celeritas'},
    { 'id': 15, 'name': 'Magneta'},
    { 'id': 16, 'name': 'RubberMan'},
    { 'id': 17, 'name': 'Dynama'},
    { 'id': 18, 'name': 'Dr IQ'},
    { 'id': 19, 'name': 'Magma'},
    { 'id': 20, 'name': 'Tornado'}
]

@app.route('/heroes', methods=['GET'])
def heroes():
    return jsonify(all_heros)

@app.route('/detail/<id>', methods=['GET'])
def detail(id):
    for hero in all_heros:
        if hero['id'] == int(id):
            return jsonify(hero)
    abort(400)

@app.errorhandler(400)
def not_found(error):
    resp = make_response('Record not found', 400)
    resp.access_control_max_age = 86400
    resp.headers['X-Client-Header'] = 'Not Found'
    return resp

@app.route('/update', methods=['POST'])
def update():
    print(request.data)
    data = request.data
    string = data.decode('UTF-8')
    data = eval(string)

    for x in all_heros:
        if x['id'] == data['id']:
            x['name'] = data['name']
            return jsonify(x)
    return "Record not found", 400

app.run()