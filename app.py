from flask import Flask,request,render_template
import json
from flask.ext.mysqldb import MySQL

app = Flask(__name__)
mysql = MySQL(app)
app.secret_key = 'superzoman'  
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Ayush22x'
app.config['MYSQL_DB'] = 'flasktest'


def date_handler(obj):
	return obj.isoformat() if hasattr(obj, 'isoformat') else obj

@app.after_request
def add_cors_headers(response):
	response.headers.add('Access-Control-Allow-Origin', '*')
	response.headers.add('Access-Control-Allow-Credentials', 'true')
	response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
	response.headers.add('Access-Control-Allow-Headers', 'Authorization')
	response.headers.add('Access-Control-Allow-Methods', 'GET')
	response.headers.add('Access-Control-Allow-Methods', 'POST')
	response.headers.add('Access-Control-Allow-Methods', 'PUT')
	response.headers.add('Access-Control-Allow-Methods', 'DELETE')
	return response

@app.route("/")
def index():
	return render_template("ng-index.html")

@app.route("/db",methods=['GET','PUT','PATCH','DELETE'])
def db_info():
	db = {}
	table_name = 'person'
	db['name'] = app.config['MYSQL_DB']
	
	if request.method == 'GET':
		cur= mysql.connection.cursor()
		k = cur.execute('''SELECT * FROM '''+table_name)
		data = cur.fetchall()
		desc = cur.description
		result = []
		for i in xrange(k):
			dict = {}
			for j in xrange(len(desc)):
				dict[desc[j][0]] = data[i][j]
			result.append(dict)
		db['table_data'] = result
		return json.dumps(db)

# @app.route("/table",methods=['GET'])
# def table():
# 	cur = mysql.connection.cursor()
# 	cur.execute('''show TABLES''')
# 	rv = cur.fetchall()
# 	result = []
# 	for row in rv:
# 		d = dict()
# 		d['table_name'] = row[0]
# 		d['value'] = row[0]
# 		result.append(d)
# 	return json.dumps(result)

# @app.route("/tabledata",methods=['POST'])
# def tabledata():
# 	table_name = request.json['table_name']
# 	cur= mysql.connection.cursor()
# 	k = cur.execute('''SELECT * FROM '''+table_name)
# 	data = cur.fetchall()
# 	desc = cur.description
# 	result = []
# 	for i in xrange(k):
# 		dict = {}
# 		for j in xrange(len(desc)):
# 			dict[desc[j][0]] = data[i][j]
# 		result.append(dict)
# 	return json.dumps(result,default=date_handler)

if __name__ == "__main__":
    app.run(debug=True)



