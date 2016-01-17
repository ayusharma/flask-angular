from flask import Flask,request,render_template,make_response,jsonify
import json
from flask.ext.mysqldb import MySQL

app = Flask(__name__)
mysql = MySQL(app)
app.secret_key = 'superzoman'  
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flasktest'

@app.route("/")
def index():
	return render_template("ng-index.html")

@app.route("/db",methods=['GET','PUT','POST','DELETE'])
def db_info():
	db = {}
	table_name = 'person'
	db['name'] = app.config['MYSQL_DB']
	cur= mysql.connection.cursor()
	
	if request.method == 'GET':
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

	elif request.method == 'POST':
		if cur.execute('''INSERT INTO person (`name`, `city`) VALUES (%s,%s)''',(request.json['name'],request.json['city'])):
			mysql.connection.commit()
			return make_response(jsonify({'msg': 'Successfully updated', 'status':201}), 201)
		else:
			return make_response(jsonify({'msg': 'error', 'status':401}), 401)

	elif request.method == 'DELETE':
		if cur.execute('''DELETE FROM person WHERE `id` = %s ''',[request.json['id']]):
			mysql.connection.commit()
			return make_response(jsonify({'msg': 'Successfully deleted', 'status':201}), 201)
		else:
			return make_response(jsonify({'msg': 'error', 'status':401}), 401)

	elif request.method == 'PUT':
		if cur.execute('''UPDATE person SET '''+request.json['keyterm']+'''= %s WHERE `id`= %s ''',[request.json['value'],request.json['id']]):
			mysql.connection.commit()
			return make_response(jsonify({'msg': 'Successfully updated', 'status':201}), 201)
		else:
			return make_response(jsonify({'msg': 'error', 'status':401}), 401)

if __name__ == "__main__":
    app.run(debug=True)



